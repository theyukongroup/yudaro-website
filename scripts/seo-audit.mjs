import fs from 'node:fs/promises';
const target = (process.argv[2] || 'http://localhost:3197').replace(/\/$/, '');
const canonical = 'https://yudaro.com';
const checks = [],
  failures = [],
  pages = [];
const check = (ok, message) => {
  checks.push(message);
  if (!ok) failures.push(message);
};
const decode = (s) =>
  (s || '')
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#x27;', "'")
    .replaceAll('&#39;', "'");
const attrs = (tag) =>
  Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map((m) => [
      m[1].toLowerCase(),
      decode(m[2] ?? m[3]),
    ]),
  );
const tags = (html, name) =>
  [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map((m) =>
    attrs(m[0]),
  );
const clean = (html) =>
  decode(
    html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ''),
  );
const text = (html) =>
  decode(
    html
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim(),
  );
async function request(path, method = 'GET', redirect = 'manual') {
  const r = await fetch(new URL(path, target), {
    method,
    redirect,
    signal: AbortSignal.timeout(45000),
  });
  return {
    status: r.status,
    headers: Object.fromEntries(r.headers),
    html: method === 'HEAD' ? '' : await r.text(),
  };
}
async function pool(items, fn) {
  const result = [];
  let i = 0;
  await Promise.all(
    Array.from({ length: 5 }, async () => {
      while (i < items.length) {
        const index = i++;
        result[index] = await fn(items[index]);
      }
    }),
  );
  return result;
}
const site = await request('/sitemap.xml');
check(site.status === 200, 'sitemap 200');
const urls = [...site.html.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) =>
  decode(m[1]),
);
check(urls.length === new Set(urls).size, 'sitemap URLs unique');
check(
  urls.every((u) => u.startsWith(canonical + '/') && !u.includes('?')),
  'sitemap canonical host and no parameter variants',
);
const source = await fs.readFile('lib/seo.ts', 'utf8');
const base = [
  ...source.matchAll(
    /export const (?:marketingRoutes|resourceRoutes|authorityRoutes) = \[([\s\S]*?)\] as const/g,
  ),
].flatMap((m) => [...m[1].matchAll(/'([^']*)'/g)].map((v) => v[1]));
const extra = JSON.parse(await fs.readFile('lib/search-content.json', 'utf8'));
const expected = [...new Set([...base, ...extra.map((e) => e.path)])].map(
  (p) => canonical + (p || '/'),
);
check(
  expected.length === urls.length && expected.every((u) => urls.includes(u)),
  'sitemap matches complete public content registry',
);
const linkSet = new Set();
await pool(urls, async (url) => {
  const path = new URL(url).pathname;
  const r = await request(path);
  const html = clean(r.html);
  const meta = tags(html, 'meta');
  const links = tags(html, 'link');
  const title = text(
    (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '',
  );
  const description = meta.find((m) => m.name === 'description')?.content;
  const canon = links.find((l) => l.rel === 'canonical')?.href;
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) =>
    text(m[1]),
  );
  check(r.status === 200, `${path}: 200 without redirect`);
  check(Boolean(title), `${path}: title`);
  check(Boolean(description), `${path}: description`);
  check(
    canon?.replace(/\/$/, '') === url.replace(/\/$/, ''),
    `${path}: self canonical`,
  );
  check(h1s.length === 1, `${path}: exactly one H1`);
  check(
    !meta.some(
      (m) =>
        ['robots', 'googlebot'].includes(m.name) &&
        /noindex/i.test(m.content || ''),
    ) && !/noindex/i.test(r.headers['x-robots-tag'] || ''),
    `${path}: indexable`,
  );
  check(
    !tags(html, 'img').some((i) => !Object.hasOwn(i, 'alt')),
    `${path}: image alt attributes`,
  );
  check(
    meta.some((m) => m.property === 'og:image') &&
      meta.some((m) => m.name === 'twitter:card'),
    `${path}: social metadata`,
  );
  const schemas = [];
  for (const m of r.html.matchAll(
    /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
  )) {
    try {
      const schema = JSON.parse(m[1]);
      schemas.push(...(schema['@graph'] || [schema]));
      check(
        schema['@context'] === 'https://schema.org',
        `${path}: schema context`,
      );
    } catch {
      check(false, `${path}: valid JSON-LD`);
    }
  }
  check(
    schemas.some((s) => s['@id'] === canonical + '/#organization'),
    `${path}: organization identity`,
  );
  const ids = schemas.map((s) => s['@id']).filter(Boolean);
  check(ids.length === new Set(ids).size, `${path}: no duplicate schema IDs`);
  const entity = schemas.find((s) => s['@id'] === canonical + '/#organization');
  check(
    entity?.name === 'Yudaro AI & ERP Systems' &&
      entity?.address?.addressLocality === 'Stafford',
    `${path}: consistent business identity`,
  );
  for (const node of schemas) {
    if (node['@type'] === 'WebPage')
      check(
        node.isPartOf?.['@id'] === canonical + '/#website',
        `${path}: webpage belongs to website`,
      );
    if (node['@type'] === 'Article')
      check(
        node.publisher?.['@id'] === canonical + '/#organization',
        `${path}: article publisher identity`,
      );
  }

  for (const s of schemas) {
    if (s['@type'] === 'BreadcrumbList')
      check(
        s.itemListElement.every(
          (x, i) => x.position === i + 1 && x.item.startsWith(canonical),
        ),
        `${path}: breadcrumb positions and URLs`,
      );
    if (s['@type'] === 'Article')
      check(
        Boolean(
          s.headline &&
          s.author &&
          s.datePublished &&
          s.dateModified &&
          s.image,
        ),
        `${path}: article properties`,
      );
    if (s['@type'] === 'Service')
      check(
        s.provider?.['@id'] === canonical + '/#organization',
        `${path}: service provider`,
      );
  }
  const anchors = tags(html, 'a')
    .map((a) => a.href)
    .filter(Boolean);
  for (const href of anchors) {
    try {
      const u = new URL(href, canonical);
      if (
        u.origin === canonical &&
        !/^\/(api|signout|signin|login|account|admin|forgot|reset)/.test(
          u.pathname,
        )
      )
        linkSet.add(u.pathname);
    } catch {}
  }
  for (const img of tags(html, 'img')) {
    const src = img.src;
    if (src?.startsWith('/_next/image')) {
      const u = new URL(src, canonical);
      const asset = u.searchParams.get('url');
      if (asset?.startsWith('/')) linkSet.add(asset);
    } else if (src?.startsWith('/')) linkSet.add(src);
  }
  pages.push({
    path,
    status: r.status,
    title,
    description,
    canonical: canon,
    h1: h1s[0],
    h2: [...html.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) =>
      text(m[1]),
    ),
    words: text(
      (html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i) || [])[1] || '',
    ).split(/\s+/).length,
    metaRobots: meta
      .filter((m) => ['robots', 'googlebot'].includes(m.name))
      .map((m) => m.content),
    xRobotsTag: r.headers['x-robots-tag'] || '',
    mainLinks: [
      ...(
        (html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i) || [])[1] || ''
      ).matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi),
    ]
      .map((m) => ({ href: attrs('<a ' + m[1] + '>').href, label: text(m[2]) }))
      .filter((a) => a.href),
    schemas: schemas.map((s) => s['@type']),
    links: anchors,
    bytes: r.html.length,
  });
});
for (const field of ['title', 'description']) {
  const seen = new Map();
  for (const p of pages) {
    check(!seen.has(p[field]), `${p.path}: unique ${field}`);
    seen.set(p[field], p.path);
  }
}
const known = new Set(pages.map((p) => p.path));
await pool(
  [...linkSet].filter((p) => !known.has(p)),
  async (path) => {
    const r = await request(path, 'HEAD');
    check(r.status >= 200 && r.status < 400, `link/asset ${path}: ${r.status}`);
  },
);
for (const p of pages) {
  if (p.path === '/') continue;
  check(
    pages.some(
      (other) =>
        other.path !== p.path &&
        other.links.some((h) => {
          try {
            return new URL(h, canonical).pathname === p.path;
          } catch {
            return false;
          }
        }),
    ),
    `${p.path}: inbound public link`,
  );
}
for (const path of [
  '/does-not-exist-seo-check',
  '/solutions/unknown-seo-check',
  '/resources/unknown-seo-check',
  '/industries/unknown-seo-check',
  '/localized-content/es/unknown-seo-check',
]) {
  const r = await request(path);
  check(r.status === 404, `${path}: genuine 404`);
}
for (const path of ['/login', '/forgot-password', '/reset-password']) {
  const r = await request(path);
  check(
    /noindex/.test(r.headers['x-robots-tag'] || '') ||
      tags(r.html, 'meta').some(
        (m) => m.name === 'robots' && /noindex/.test(m.content || ''),
      ),
    `${path}: noindex`,
  );
}
for (const route of [
  '/',
  '/ai-solutions',
  '/resources/private-ai',
  '/assessment',
  '/industries/restaurants',
  '/solutions/odoo-integration',
])
  for (const lang of ['zh-cn', 'zh-tw', 'es']) {
    const path = route + '?lang=' + lang;
    const r = await request(path);
    check(r.status === 200, `${path}: language display retained`);
    check(
      /noindex/.test(r.headers['x-robots-tag'] || ''),
      `${path}: unreviewed translation noindex`,
    );
    check(
      !tags(r.html, 'link').some((l) => l.hreflang),
      `${path}: no unreviewed hreflang`,
    );
  }
const robots = await request('/robots.txt');
check(robots.status === 200, 'robots 200');
check(
  robots.html.includes(canonical + '/sitemap.xml'),
  'robots canonical sitemap',
);
check(!/^Disallow: \/\s*$/m.test(robots.html), 'robots public crawl allowed');
check(
  !/Disallow: \/(?:login|localized-content)/.test(robots.html),
  'noindex URLs crawlable',
);
const llms = await request('/llms.txt');
check(
  llms.status === 200 && llms.html.includes('13366 Murphy Road'),
  'supplementary llms directory',
);
const output = {
  target,
  checkedAt: new Date().toISOString(),
  checkCount: checks.length,
  passed: checks.length - failures.length,
  failures,
  pages: pages.sort((a, b) => a.path.localeCompare(b.path)),
};
await fs.mkdir('docs', { recursive: true });
await fs.writeFile(
  process.env.SEO_AUDIT_OUTPUT || 'docs/seo-qa-results.json',
  JSON.stringify(output, null, 2),
);
console.log(
  `${output.passed}/${checks.length} checks passed across ${pages.length} indexable routes against ${target}`,
);
if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
}
