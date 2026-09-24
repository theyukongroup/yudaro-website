import fs from 'node:fs/promises';
const root = process.argv[2] || 'https://yudaro.com';
const agents = {
  desktop:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130.0.0.0 Safari/537.36',
  googlebot:
    'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
  bingbot:
    'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
};
const rows = [];
const sitemap = await (await fetch(root + '/sitemap.xml')).text();
const paths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (m) => new URL(m[1]).pathname,
);
const extras = ['/robots.txt', '/sitemap.xml', '/login', '/?lang=es'];
const tasks = Object.entries(agents).flatMap(([agent, ua]) =>
  [...paths, ...extras].map((path) => ({ agent, ua, path })),
);
let cursor = 0;
await Promise.all(
  Array.from({ length: 3 }, async () => {
    while (cursor < tasks.length) {
      const { agent, ua, path } = tasks[cursor++];
      const start = performance.now();
      try {
        const response = await fetch(root + path, {
          headers: { 'User-Agent': ua },
          redirect: 'manual',
          signal: AbortSignal.timeout(30000),
        });
        const ttfb = Math.round(performance.now() - start);
        const html = await response.text();
        rows.push({
          path,
          agent,
          status: response.status,
          ttfb,
          headers: Object.fromEntries(response.headers),
          canonical: html.match(
            /<link[^>]*rel="canonical"[^>]*href="([^"]+)"/,
          )?.[1],
          robots: [
            ...html.matchAll(
              /<meta[^>]*name="(?:robots|googlebot)"[^>]*content="([^"]+)"/g,
            ),
          ].map((m) => m[1]),
          h1: html
            .match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1]
            ?.replace(/<[^>]*>/g, ''),
          challenge:
            /cf-chl-|challenge-platform|Vercel Security Checkpoint|Just a moment\.\.\./i.test(
              html,
            ),
          bytes: Buffer.byteLength(html),
          inSitemap: paths.includes(path),
        });
      } catch (e) {
        rows.push({ path, agent, error: e.message });
      }
    }
  }),
);
for (const url of [
  'http://yudaro.com/',
  'http://www.yudaro.com/',
  'https://www.yudaro.com/',
]) {
  const chain = [];
  let current = url;
  for (let hop = 0; hop < 5; hop++) {
    try {
      const r = await fetch(current, {
        redirect: 'manual',
        signal: AbortSignal.timeout(15000),
      });
      chain.push({
        url: current,
        status: r.status,
        location: r.headers.get('location'),
      });
      if (!r.headers.get('location')) break;
      current = new URL(r.headers.get('location'), current).href;
    } catch (e) {
      chain.push({ url: current, error: e.message });
      break;
    }
  }
  rows.push({ redirectTest: url, chain });
}
await fs.writeFile(
  process.env.CRAWL_OUTPUT || 'docs/second-pass-crawl.json',
  JSON.stringify({ time: new Date().toISOString(), root, rows }, null, 2),
);
console.log(
  'Requests',
  rows.length,
  'Problems',
  rows.filter((r) => r.error || r.challenge || r.status >= 400),
);
