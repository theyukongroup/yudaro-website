import { createHash } from 'node:crypto';
export const origin = 'https://yudaro.com';
export function validUrl(value) {
  try {
    const u = new URL(value);
    return (
      u.origin === origin &&
      !u.username &&
      !u.password &&
      !u.search &&
      !u.hash &&
      !/^\/(api|admin|account|login|localized-content|signin|signout|forgot-password|reset-password)(\/|-|$)/.test(
        u.pathname,
      )
    );
  } catch {
    return false;
  }
}
export function materialHash(html) {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
  if (!main) throw new Error('Missing main content');
  const meta = [...html.matchAll(/<(?:title|meta|link)\b[^>]*>/gi)]
    .map((m) => m[0])
    .filter((t) => /name="description"|rel="canonical"/.test(t));
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '';
  const content = main
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return createHash('sha256')
    .update(JSON.stringify([title, meta, content]))
    .digest('hex');
}
export function delta(before, after) {
  return {
    created: Object.keys(after).filter((u) => !before[u]),
    updated: Object.keys(after).filter(
      (u) => before[u] && before[u] !== after[u],
    ),
    deleted: Object.keys(before).filter((u) => !after[u]),
  };
}

export function reviewDelta(changed, snapshot, review) {
  if (
    !review ||
    review.snapshot !== snapshot ||
    !Array.isArray(review.decisions)
  )
    throw new Error('Missing or stale material-change review');
  const seen = new Set();
  for (const d of review.decisions) {
    if (
      !changed.includes(d.url) ||
      seen.has(d.url) ||
      !['notify', 'cosmetic'].includes(d.action) ||
      typeof d.reason !== 'string' ||
      d.reason.trim().length < 20
    )
      throw new Error('Invalid review classification');
    seen.add(d.url);
  }
  if (seen.size !== changed.length)
    throw new Error('Every detected change must be reviewed');
  return review.decisions
    .filter((d) => d.action === 'notify')
    .map((d) => d.url);
}
export function snapshotHash(hashes) {
  return createHash('sha256')
    .update(
      JSON.stringify(
        Object.entries(hashes).sort(([a], [b]) => a.localeCompare(b)),
      ),
    )
    .digest('hex');
}
