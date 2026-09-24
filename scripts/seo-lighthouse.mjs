import fs from 'node:fs';
import { chromium } from 'file:///C:/Users/l.leung/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
(async () => {
  const { default: lighthouse } =
    await import('file:///C:/Users/l.leung/AppData/Local/npm-cache/_npx/0f94ee7615faf582/node_modules/lighthouse/core/index.js');
  const browser = await chromium.launch({
    channel: 'msedge',
    headless: true,
    args: ['--remote-debugging-port=9227'],
  });
  const routes = [
    '/',
    '/ai-solutions',
    '/erp-solutions',
    '/ai-erp',
    '/solutions/business-automation',
    '/industries/distribution',
    '/locations/houston',
    '/contact',
  ];
  const summary = [];
  try {
    for (const mode of ['mobile', 'desktop'])
      for (const path of routes) {
        const flags = {
          port: 9227,
          logLevel: 'error',
          onlyCategories: ['performance', 'accessibility', 'seo'],
        };
        if (mode === 'desktop')
          Object.assign(flags, {
            formFactor: 'desktop',
            screenEmulation: {
              mobile: false,
              width: 1440,
              height: 900,
              deviceScaleFactor: 1,
              disabled: false,
            },
            throttling: {
              rttMs: 40,
              throughputKbps: 10240,
              cpuSlowdownMultiplier: 1,
            },
          });
        const result = await lighthouse('http://localhost:3197' + path, flags);
        const name = path.replaceAll('/', '_') || 'home';
        fs.writeFileSync(
          `docs/lighthouse-${name}-${mode}.json`,
          JSON.stringify(result.lhr),
        );
        const row = {
          path,
          mode,
          scores: Object.fromEntries(
            Object.entries(result.lhr.categories).map(([k, v]) => [
              k,
              Math.round(v.score * 100),
            ]),
          ),
          lcp: result.lhr.audits['largest-contentful-paint'].numericValue,
          cls: result.lhr.audits['cumulative-layout-shift'].numericValue,
          tbt: result.lhr.audits['total-blocking-time'].numericValue,
          issues: Object.entries(result.lhr.audits)
            .filter(
              ([_k, v]) =>
                v.score === 0 && v.scoreDisplayMode !== 'notApplicable',
            )
            .map(([k]) => k),
        };
        summary.push(row);
        fs.writeFileSync(
          'docs/seo-lighthouse-summary.json',
          JSON.stringify(summary, null, 2),
        );
        console.log(JSON.stringify(row));
      }
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
