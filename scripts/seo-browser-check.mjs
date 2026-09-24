import fs from 'node:fs';
import { chromium } from 'file:///C:/Users/l.leung/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
(async () => {
  const b = await chromium.launch({ channel: 'msedge', headless: true });
  const results = [];
  const routes = [
    '/',
    '/ai-solutions',
    '/erp-solutions',
    '/ai-erp',
    '/solutions/business-automation',
    '/industries/distribution',
    '/resources/odoo-implementation-planning',
    '/locations/houston',
    '/contact',
    '/pricing',
  ];
  for (const width of [390, 1440]) {
    const context = await b.newContext({
      viewport: { width, height: 900 },
      reducedMotion: 'reduce',
    });
    for (const route of routes) {
      const p = await context.newPage();
      const errors = [];
      p.on('pageerror', (e) => errors.push(e.message));
      await p.goto('http://localhost:3197' + route, {
        waitUntil: 'networkidle',
      });
      await p.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 700) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 80));
        }
        window.scrollTo(0, 0);
      });
      await p.waitForTimeout(600);
      const data = await p.evaluate(() => ({
        h1: document.querySelectorAll('h1').length,
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
        brokenImages: [...document.images]
          .filter((i) => i.complete && i.naturalWidth === 0)
          .map((i) => i.src),
        canonical: document.querySelector('link[rel=canonical]')?.href,
        bodyWidth: document.body.scrollWidth,
      }));
      results.push({ route, width, ...data, errors });
      if (
        [
          '/',
          '/solutions/business-automation',
          '/locations/houston',
          '/resources/odoo-implementation-planning',
        ].includes(route)
      )
        await p.screenshot({
          path: `docs/seo-${route.replaceAll('/', '_') || 'home'}-${width}.png`,
          fullPage: true,
        });
      await p.close();
    }
    await context.close();
  }
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.route('**/api/events', (r) => r.fulfill({ json: { ok: true } }));
  await p.goto('http://localhost:3197/assessment');
  console.log('ASSESSMENT', await p.locator('button').allTextContents());
  await p.goto('http://localhost:3197/');
  await p.getByRole('button', { name: 'Solutions', exact: true }).click();
  const menu = await p
    .getByRole('link', { name: /Automation Less repetitive/ })
    .count();
  await p.keyboard.press('Escape');
  results.push({
    interaction: 'desktop menu and escape',
    menuLinkFound: menu > 0,
    expanded: await p
      .getByRole('button', { name: 'Solutions', exact: true })
      .getAttribute('aria-expanded'),
  });
  await p.locator('select').first().selectOption('es');
  await p.waitForURL('**?lang=es');
  await p.waitForLoadState('networkidle');
  results.push({
    interaction: 'Spanish selector',
    url: p.url(),
    language: await p.locator('html').getAttribute('lang'),
    hreflang: await p.locator('link[hreflang]').count(),
  });
  const nojs = await b.newContext({ javaScriptEnabled: false });
  const np = await nojs.newPage();
  await np.goto('http://localhost:3197/ai-solutions');
  results.push({
    interaction: 'no JavaScript service content',
    text: await np
      .getByRole('heading', {
        name: 'How does Yudaro implement a knowledge assistant?',
      })
      .count(),
  });
  await fs.promises.writeFile(
    'docs/seo-browser-results.json',
    JSON.stringify(results, null, 2),
  );
  console.log(JSON.stringify(results));
  await b.close();
  if (
    results.some(
      (x) =>
        x.overflow ||
        x.errors?.length ||
        x.brokenImages?.length ||
        (x.h1 && x.h1 !== 1),
    )
  )
    process.exitCode = 1;
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
