import assert from 'node:assert/strict';
import fs from 'node:fs';
const base = (process.argv[2] || 'http://localhost:3197').replace(/\/$/, '');
const origin = 'https://yudaro.com';
const expected = new Map([
  ['/', 'Yudaro AI + ERP | Private AI & Odoo ERP Implementation'],
  ['/ai-solutions', 'Yudaro AI | Private AI for Business & Company Knowledge'],
  ['/erp-solutions', 'Yudaro ERP | Odoo ERP Implementation & Consulting'],
  ['/ai-erp', 'Yudaro AI ERP | AI + Odoo ERP Integration'],
  ['/about', 'About Yudaro: AI + ERP Implementation Company | Yudaro'],
]);
const entries = JSON.parse(
  fs.readFileSync(new URL('../lib/search-content.json', import.meta.url)),
);
const paths = [
  ...new Set([
    ...expected.keys(),
    ...entries
      .filter((e) => e.sections.some((s) => s.links?.length))
      .map((e) => e.path),
  ]),
];
const decode = (s) =>
  s
    .replaceAll('&amp;', '&')
    .replaceAll('&#x27;', "'")
    .replaceAll('&quot;', '"');
const get = async (path) => {
  const r = await fetch(base + path, {
    redirect: 'manual',
    signal: AbortSignal.timeout(120000),
    headers: { 'User-Agent': 'Googlebot' },
  });
  assert.equal(r.status, 200, `${path}: HTTP 200`);
  assert(
    !/noindex/i.test(r.headers.get('x-robots-tag') || ''),
    `${path}: indexable header`,
  );
  return r.text();
};
let checks = 0;
for (const path of paths) {
  const html = await get(path);
  const title = decode(html.match(/<title>(.*?)<\/title>/s)?.[1] || '');
  if (expected.has(path))
    assert.equal(title, expected.get(path), `${path}: title`);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  assert.equal(
    new URL(canonical).href,
    origin + path,
    `${path}: self canonical`,
  );
  const robots = [
    ...html.matchAll(/<meta name="(?:robots|googlebot)" content="([^"]*)"/g),
  ];
  assert(
    robots.length && robots.every((m) => !/noindex/.test(m[1])),
    `${path}: indexable metadata`,
  );
  assert(
    html.match(/<meta name="description" content="[^"]+"/),
    `${path}: server description`,
  );
  assert.equal(
    (html.match(/<h1(?:\s|>)/g) || []).length,
    1,
    `${path}: single H1`,
  );
  const graph = [
    ...html.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    ),
  ].flatMap((m) => {
    const value = JSON.parse(m[1]);
    return value['@graph'] || [value];
  });
  const ofType = (type) =>
    graph.filter((n) => [n['@type']].flat().includes(type));
  const organizations = ofType('Organization');
  assert.equal(organizations.length, 1, `${path}: single Organization`);
  assert.equal(organizations[0].name, 'Yudaro');
  assert.equal(organizations[0]['@id'], origin + '/#organization');
  assert(
    !organizations[0].alternateName,
    'Service names are not alternate company names',
  );
  const websites = ofType('WebSite');
  assert.equal(websites.length, 1, `${path}: single WebSite`);
  assert.equal(websites[0].name, 'Yudaro');
  assert.equal(websites[0].publisher['@id'], origin + '/#organization');
  for (const page of ofType('WebPage')) {
    assert.equal(page.url, origin + path);
    assert.equal(page['@id'], origin + path + '#webpage');
    assert.equal(page.isPartOf['@id'], origin + '/#website');
    assert.equal(page.about['@id'], origin + '/#organization');
  }
  const e = entries.find((e) => e.path === path);
  for (const section of e?.sections || [])
    for (const link of section.links || []) {
      assert(
        section.body.includes(link.text),
        `${path}: contextual anchor exists in copy`,
      );
      const escaped = link.href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const anchors = [
        ...html.matchAll(
          new RegExp(
            `<a\\b[^>]*href="${escaped}"[^>]*>([\\s\\S]*?)<\\/a>`,
            'g',
          ),
        ),
      ];
      assert(
        anchors.some((m) => decode(m[1]) === link.text),
        `${path}: ${link.text} rendered as link`,
      );
      assert(
        expected.has(link.href),
        `${path}: target is a verified core page`,
      );
    }
  console.log(
    `PASS ${path}: server metadata, canonical, indexability, schema, contextual links`,
  );
  checks++;
}
const sitemap = await get('/sitemap.xml');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
assert.equal(urls.length, new Set(urls).size, 'No duplicate sitemap URLs');
assert(
  urls.every((url) => url.startsWith(origin + '/') && !url.includes('?')),
  'Canonical host; no query URLs',
);
for (const path of paths) {
  assert(urls.includes(origin + path), `${path}: sitemap inclusion`);
  const entry = sitemap
    .split('<url>')
    .find((s) => s.includes(`<loc>${origin}${path}</loc>`));
  assert(
    entry.includes('<lastmod>2026-10-01'),
    `${path}: actual editorial date`,
  );
}
const robots = await get('/robots.txt');
assert(robots.includes('Allow: /'));
assert(robots.includes('Sitemap: https://yudaro.com/sitemap.xml'));
for (const restriction of [
  '/account',
  '/admin',
  '/api/',
  '/signin-with-chatgpt',
  '/signout-with-chatgpt',
])
  assert(robots.includes(`Disallow: ${restriction}`));
console.log(`PASS ${checks} pages + sitemap + robots.txt`);
