import fs from 'node:fs/promises';
import { unlinkSync } from 'node:fs';
import {
  origin,
  validUrl,
  materialHash,
  delta,
  reviewDelta,
  snapshotHash,
} from './indexnow-core.mjs';
const flags = new Set(process.argv.slice(2));
const stateFile = process.env.INDEXNOW_STATE_FILE || '.indexnow/state.json';
if (flags.has('--baseline') && flags.has('--submit'))
  throw new Error('Baseline and submission are separate operations');
await fs.mkdir('.indexnow', { recursive: true });
const lock = await fs.open('.indexnow/run.lock', 'wx').catch(() => {
  throw new Error(
    'IndexNow run already active or stale lock; inspect before retrying',
  );
});
await lock.close();
process.once('exit', () => {
  try {
    unlinkSync('.indexnow/run.lock');
  } catch {}
});
const previous = await fs
  .readFile(stateFile, 'utf8')
  .then(JSON.parse)
  .catch((e) => {
    if (e.code === 'ENOENT') return null;
    throw e;
  });
if (
  previous &&
  (!previous.hashes ||
    typeof previous.hashes !== 'object' ||
    Array.isArray(previous.hashes) ||
    !Object.entries(previous.hashes).every(
      ([url, hash]) =>
        validUrl(url) &&
        typeof hash === 'string' &&
        /^[a-f0-9]{64}$/.test(hash),
    ))
)
  throw new Error('Invalid checkpoint; refusing submission');
if (!previous && !flags.has('--baseline'))
  throw new Error(
    'Initialize a baseline before publication; refusing an accidental full-site submission',
  );
const mapResponse = await fetch(origin + '/sitemap.xml', {
  redirect: 'error',
  signal: AbortSignal.timeout(30000),
});
if (!mapResponse.ok) throw new Error('Sitemap fetch failed');
const xml = await mapResponse.text();
const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
if (!urls.length || !urls.every(validUrl))
  throw new Error('Invalid sitemap URL');
const current = {};
for (const url of urls) {
  const response = await fetch(url, {
    redirect: 'error',
    signal: AbortSignal.timeout(30000),
  });
  if (response.status !== 200) throw new Error('Non-200 canonical page');
  const html = await response.text();
  const canonical = html.match(
    /<link[^>]*rel="canonical"[^>]*href="([^"]+)"/,
  )?.[1];
  const meta = [
    ...html.matchAll(
      /<meta[^>]*name="(?:robots|googlebot)"[^>]*content="([^"]+)"/g,
    ),
  ].map((m) => m[1]);
  if (
    canonical?.replace(/\/$/, '') !== url.replace(/\/$/, '') ||
    meta.some((m) => /noindex/i.test(m)) ||
    /noindex/i.test(response.headers.get('x-robots-tag') || '')
  )
    throw new Error('Non-indexable canonical page');
  current[url] = materialHash(html);
}
const changes = delta(previous?.hashes || {}, current);
const changed = [...changes.created, ...changes.updated, ...changes.deleted];
if (!changed.every(validUrl) || changed.length > 10000)
  throw new Error('Unsafe delta');
const report = {
  snapshot: snapshotHash(current),
  at: new Date().toISOString(),
  mode: flags.has('--baseline')
    ? 'baseline'
    : flags.has('--submit')
      ? 'submit'
      : 'dry-run',
  ...changes,
};
await fs.mkdir('.indexnow', { recursive: true });
await fs.writeFile('.indexnow/last-plan.json', JSON.stringify(report, null, 2));
if (flags.has('--baseline')) {
  if (previous)
    throw new Error('Baseline exists; refusing to erase pending changes');
  await fs.writeFile(
    stateFile,
    JSON.stringify({ hashes: current, at: report.at }, null, 2),
  );
  console.log('Baseline recorded; no URLs submitted.');
  process.exit(0);
}
console.log(JSON.stringify(report));
if (!flags.has('--submit') || !changed.length) process.exit(0);
for (const url of changes.deleted) {
  const r = await fetch(url, {
    redirect: 'manual',
    signal: AbortSignal.timeout(15000),
  });
  if (![404, 410].includes(r.status))
    throw new Error(
      'Removed sitemap URL is not a verified deletion; review before submitting',
    );
}
const review = JSON.parse(
  await fs.readFile(
    process.env.INDEXNOW_REVIEW_FILE || '.indexnow/review.json',
    'utf8',
  ),
);
const notifications = reviewDelta(changed, report.snapshot, review);
if(!notifications.length){await fs.writeFile(stateFile+'.tmp',JSON.stringify({hashes:current,at:report.at,status:'reviewed-cosmetic'},null,2));await fs.rename(stateFile+'.tmp',stateFile);console.log('Only reviewed cosmetic changes; checkpoint updated without notification.');process.exit(0)}
const key = (
  process.env.INDEXNOW_KEY || (await fs.readFile('.indexnow/key', 'utf8'))
).trim();
if (!/^[a-zA-Z0-9-]{8,128}$/.test(key)) throw new Error('Invalid IndexNow key');
const keyLocation = origin + '/indexnow-key.txt';
const proof = await fetch(keyLocation, {
  redirect: 'error',
  signal: AbortSignal.timeout(15000),
});
if (!proof.ok || (await proof.text()).trim() !== key)
  throw new Error('Production ownership proof does not match');
const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    host: new URL(origin).host,
    key,
    keyLocation,
    urlList: notifications,
  }),
  signal: AbortSignal.timeout(30000),
});
if (![200, 202].includes(response.status))
  throw new Error(
    `IndexNow HTTP ${response.status}; state unchanged. Retry-After: ${response.headers.get('retry-after') || 'not supplied'}`,
  );
await fs.writeFile(
  stateFile + '.tmp',
  JSON.stringify(
    { hashes: current, at: report.at, status: response.status },
    null,
    2,
  ),
);
await fs.rename(stateFile + '.tmp', stateFile);
await fs.writeFile(
  '.indexnow/last-receipt.json',
  JSON.stringify(
    {
      ...report,
      notified: notifications,
      reviewed: review.decisions,
      status: response.status,
    },
    null,
    2,
  ),
);
console.log(
  `IndexNow accepted ${notifications.length} changed URLs (HTTP ${response.status}); indexing is not guaranteed.`,
);
