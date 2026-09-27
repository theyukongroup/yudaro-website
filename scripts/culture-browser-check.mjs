import fs from 'node:fs';
import { chromium } from 'file:///C:/Users/l.leung/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
const base = process.argv[2] || 'http://localhost:3197',
  out = 'output/culture-previews';
const b = await chromium.launch({ channel: 'msedge', headless: true });
const results = [];
try {
  for (const width of [390, 768, 1440]) {
    const p = await b.newPage({
      viewport: { width, height: 950 },
      reducedMotion: 'reduce',
    });
    let errors = [];
    p.on('pageerror', (e) => errors.push(e.message));
    await p.addInitScript(() => {
      window.__cls = 0;
      new PerformanceObserver((list) => {
        for (const e of list.getEntries())
          if (!e.hadRecentInput) window.__cls += e.value;
      }).observe({ type: 'layout-shift', buffered: true });
    });
    for (const path of ['/', '/corporate-culture-intelligence']) {
      errors = [];
      const r = await p.goto(base + path, { waitUntil: 'networkidle' });
      await p.locator('img').evaluateAll(async (xs) => {
        for (const x of xs) x.loading = 'eager';
        await Promise.all(xs.map((x) => x.decode().catch(() => {})));
      });
      const check = {
        path,
        width,
        status: r.status(),
        h1: await p.locator('h1').count(),
        overflow: await p.evaluate(
          () => document.documentElement.scrollWidth > innerWidth + 1,
        ),
        brokenImages: await p
          .locator('img')
          .evaluateAll((xs) =>
            xs
              .filter((x) => !x.complete || x.naturalWidth === 0)
              .map((x) => x.src),
          ),
        reducedMotion: await p
          .locator('.culture-core')
          .evaluate(
            (e) => getComputedStyle(e.querySelector('small')).animationName,
          ),
        cls: await p.evaluate(() => window.__cls),
        errors: [...errors],
      };
      results.push(check);
      if (path === '/') {
        await p.locator('#corporate-culture').scrollIntoViewIfNeeded();
        await p
          .locator('#corporate-culture')
          .screenshot({
            style:
              '.site-header,.motion-toggle,.skip-link{visibility:hidden!important}',
            path: `${out}/website-home-feature-${width}.png`,
          });
        const a = p.getByRole('link', {
          name: 'Explore Corporate Culture Intelligence',
          exact: true,
        });
        await a.click();
        await p.waitForURL('**/corporate-culture-intelligence');
        results.push({
          test: 'Homepage one-click destination',
          width,
          pass: p.url().endsWith('/corporate-culture-intelligence'),
        });
      } else {
        await p.screenshot({
          style:
            '.site-header,.motion-toggle,.skip-link{visibility:hidden!important}',
          path: `${out}/website-culture-full-${width}.png`,
          fullPage: true,
        });
        for (const [name, selector] of [
          ['hero', '.culture-hero'],
          ['cycle', '.culture-process'],
          ['departments', '#section-3'],
          ['governance', '#section-4'],
          ['cta', '.culture-page .mini-cta'],
        ])
          await p
            .locator(selector)
            .screenshot({
              style:
                '.site-header,.motion-toggle,.skip-link{visibility:hidden!important}',
              path: `${out}/website-culture-${name}-${width}.png`,
            });
        await p
          .getByRole('link', { name: 'See How It Works', exact: true })
          .click();
        results.push({
          test: 'Cycle anchor',
          width,
          pass: p.url().endsWith('#how-it-works'),
        });
        await p
          .getByRole('link', {
            name: 'Build Your Corporate Intelligence',
            exact: true,
          })
          .click();
        await p.waitForURL('**/contact');
        results.push({
          test: 'Consultation CTA',
          width,
          pass: await p.locator('[name=email]').isVisible(),
        });
      }
    }
    await p.goto(base + '/');
    if (width === 1440) {
      await p.getByRole('button', { name: 'Solutions', exact: true }).click();
      await p
        .locator('.mega-links')
        .getByRole('link', { name: /Corporate Culture Intelligence/ })
        .click();
    } else {
      await p.getByRole('button', { name: 'Open navigation menu' }).click();
      const dialog = p.getByRole('dialog');
      const link = dialog.getByRole('link', {
        name: 'Corporate Culture Intelligence',
        exact: true,
      });
      if (!(await link.isVisible()))
        await dialog.getByText('Services', { exact: true }).click();
      await link.click();
    }
    await p.waitForURL('**/corporate-culture-intelligence');
    results.push({ test: 'Navigation destination', width, pass: true });
    await p.close();
  }
  const p = await b.newPage({
    viewport: { width: 1440, height: 950 },
    reducedMotion: 'reduce',
  });
  const entries = JSON.parse(fs.readFileSync('lib/search-content.json', 'utf8'))
    .filter((e) =>
      e.sections.some((s) => s.title === 'Corporate Culture Intelligence'),
    )
    .map((e) => e.path);
  for (const path of [
    ...entries,
    '/ai-erp',
    '/industries/restaurants',
    '/resources/private-ai',
    '/resources/ai-erp',
    '/resources/comparisons',
  ]) {
    await p.goto(base + path, { waitUntil: 'networkidle' });
    const sec = p
      .locator('section')
      .filter({
        has: p.getByRole('heading', {
          name: 'Corporate Culture Intelligence',
          exact: true,
        }),
      });
    const loc = (await sec.count())
      ? sec.first()
      : p.locator('.culture-context').first();
    if (await loc.count()) {
      await loc.scrollIntoViewIfNeeded();
      await loc.screenshot({
        style:
          '.site-header,.motion-toggle,.skip-link{visibility:hidden!important}',
        path: `${out}/website-context-${path.replaceAll('/', '_')}.png`,
      });
      results.push({ test: 'Related section', path, pass: true });
    } else results.push({ test: 'Related section', path, pass: false });
  }
  const nojs = await b.newPage({ javaScriptEnabled: false });
  await nojs.goto(base + '/corporate-culture-intelligence');
  results.push({
    test: 'Content without JavaScript',
    pass: (await nojs.locator('.culture-cycle li').count()) === 6,
  });
  await p.emulateMedia({ reducedMotion: 'no-preference' });
  await p.goto(base + '/corporate-culture-intelligence');
  await p.evaluate(() => (document.documentElement.dataset.motion = 'off'));
  results.push({
    test: 'Site motion pause',
    pass:
      (await p
        .locator('.culture-core')
        .evaluate(
          (e) => getComputedStyle(e.querySelector('small')).animationName,
        )) === 'none',
  });
} finally {
  await b.close();
  fs.writeFileSync(
    'output/culture-browser-results.json',
    JSON.stringify(results, null, 2),
  );
  console.log(JSON.stringify(results, null, 2));
}
if (
  results.some(
    (r) =>
      r.pass === false ||
      r.overflow ||
      r.errors?.length ||
      r.brokenImages?.length ||
      (r.status && r.status !== 200) ||
      (r.reducedMotion && r.reducedMotion !== 'none'),
  )
)
  process.exitCode = 1;
