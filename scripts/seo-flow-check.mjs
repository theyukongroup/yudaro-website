import fs from 'node:fs';
import { chromium } from 'file:///C:/Users/l.leung/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const checks = [];
try {
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    reducedMotion: 'reduce',
  });
  const requests = [];
  page.on('request', (r) => requests.push(r.url()));
  await page.route('**/api/events', (r) => r.fulfill({ json: { ok: true } }));
  await page.goto('http://localhost:3197/');
  await page.getByRole('button', { name: 'Open navigation menu' }).click();
  checks.push({
    name: 'Mobile navigation opens',
    pass: await page.getByRole('dialog').isVisible(),
  });
  await page.keyboard.press('Escape');
  checks.push({
    name: 'Mobile navigation Escape closes',
    pass: (await page.getByRole('dialog').count()) === 0,
  });
  await page.goto('http://localhost:3197/assessment');
  await page
    .getByRole('button', { name: 'Start Assessment', exact: true })
    .click();
  checks.push({
    name: 'Assessment starts',
    pass: (await page.locator('input,select').count()) > 0,
  });
  let posted = false;
  await page.route('**/api/consultations', (r) => {
    posted = true;
    return r.fulfill({ status: 200, json: { ok: true } });
  });
  await page.goto('http://localhost:3197/contact');
  await page.locator('[name=name]').fill('Local browser test');
  await page.locator('[name=company]').fill('Test only');
  await page.locator('[name=email]').fill('qa@example.com');
  await page.locator('[name=interest]').selectOption('ERP');
  await page
    .locator('textarea[name=description]')
    .fill('Intercepted local test; no server submission.');
  await page.getByRole('button', { name: 'Request Consultation' }).click();
  await page.getByRole('heading', { name: /Thank you/ }).waitFor();
  checks.push({
    name: 'Contact success UI (mocked, no message sent)',
    pass: posted,
  });
  checks.push({
    name: 'No optional GA requests without configuration/consent',
    pass: !requests.some((u) => /google-analytics|googletagmanager/.test(u)),
  });
  for (const path of ['/api/admin', '/api/admin/seo-geo']) {
    const response = await page.request.get('http://localhost:3197' + path);
    checks.push({
      name: 'Anonymous protection ' + path,
      status: response.status(),
      pass: [401, 403].includes(response.status()),
    });
  }
} finally {
  await browser.close();
  fs.writeFileSync(
    'docs/seo-flow-results.json',
    JSON.stringify(checks, null, 2),
  );
  console.log(checks);
  if (checks.some((c) => !c.pass)) process.exitCode = 1;
}
