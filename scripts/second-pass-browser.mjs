import fs from 'node:fs';
import { chromium } from 'file:///C:/Users/l.leung/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
const base=process.argv[2]||'http://localhost:3197';
const b = await chromium.launch({ channel: 'msedge', headless: true });
const results = [];
try {
  for (const width of [390, 1440]) {
    const p = await b.newPage({
      viewport: { width, height: 900 },
      reducedMotion: 'reduce',
    });
    for (const path of [
      '/ai-erp',
      '/resources/ai-erp',
      '/resources/architecture',
      '/resources/architecture/private-ai-odoo',
      '/case-studies',
    ]) {
      const errors = [];
      const listener = (e) => errors.push(e.message);
      p.on('pageerror', listener);
      const response = await p.goto(base + path, {
        waitUntil: 'networkidle',
      });
      const record = {
        origin: base,
        path,
        width,
        status: response.status(),
        h1: await p.locator('h1').count(),
        overflow: await p.evaluate(
          () => document.documentElement.scrollWidth > innerWidth + 1,
        ),
        errors,
      };
      results.push(record);
      if (path === '/resources/architecture/private-ai-odoo')
        await p.screenshot({
          path: `docs/second-architecture-${width}.png`,
          fullPage: true,
        });
      p.off('pageerror', listener);
    }
    await p.close();
  }
  const context = await b.newContext({ javaScriptEnabled: false });
  const p = await context.newPage();
  await p.goto(base+'/resources/ai-erp');
  results.push({
    test: 'Guide and diagrams without JavaScript',
    pass:
      (await p.locator('figure').count()) === 2 &&
      (await p
        .getByRole('heading', { name: 'What is an AI ERP system?' })
        .count()) === 1,
  });
} finally {
  await b.close();
  fs.writeFileSync(
    'docs/second-pass-browser.json',
    JSON.stringify(results, null, 2),
  );
  console.log(results);
  if (results.some((x) => x.errors?.length || x.overflow || x.pass === false))
    process.exitCode = 1;
}
