# IndexNow operational guide

Implemented: root ownership-proof route `app/indexnow-key.txt/route.ts`, guarded CLI notifier, persistent local checkpoint, dry-run default, delta selection tests. Production uses a dedicated INDEXNOW_KEY environment variable. It is not a password or API account credential. The protocol requires a publicly retrievable proof value; never reuse a secret as this value. The key is not logged or committed. `.indexnow/` is ignored by Git and Vercel uploads.

## Operation

1. Before first publication, `npm run indexnow -- --baseline` snapshots current canonical page hashes without notifying the whole site. An existing baseline cannot be silently overwritten.
2. Publish and verify production. `npm run indexnow` produces a dry-run change plan in `.indexnow/last-plan.json`.
3. Review created, updated and deleted URLs. Create `.indexnow/review.json` (or set `INDEXNOW_REVIEW_FILE`) with the exact `snapshot` from the dry-run plan and a `decisions` array covering every detected URL. Each entry has `url`, `action` (`notify` or `cosmetic`) and a meaningful `reason`. Classify only genuine new/substantive changes as notify. A stale snapshot, missing URL or duplicate decision fails closed. This review prevents attribution-label and related-link edits from being treated as substantive content updates. `npm run indexnow -- --submit` verifies the production key, current canonical/noindex status, and confirmed 404/410 for deletions, then posts the delta to the participating IndexNow endpoint.
4. HTTP 200/202 advances the checkpoint and records a receipt; 202 means verification may still be pending. Errors/timeouts/429 leave state unchanged. A fully reviewed cosmetic-only change set advances its checkpoint without contacting IndexNow. Respect Retry-After and investigate before retry. Re-running without a material content change produces no notification.
5. Run `npm run seo:notify` once after a successful production release (live SEO validation must pass before notification), not on every preview/build. No unauthenticated submission API is exposed. A local exclusive lock prevents concurrent notifier runs; after a crash confirm no run is active before removing a stale `.indexnow/run.lock`.

## Configuration and persistence

Set `INDEXNOW_KEY` in the production runtime; the CLI accepts the same environment value or reads ignored `.indexnow/key`. The live verification location is `https://yudaro.com/indexnow-key.txt`; it is not indexable content and is omitted from the sitemap. The state defaults to `.indexnow/state.json`; `INDEXNOW_STATE_FILE` can point to persistent release storage. Back up state securely with release tooling. An ephemeral CI runner must restore and save that state before activation; the PR quality-gate workflow intentionally does not submit.

Hashes identify candidate changes using title, canonical/description tags and normalized server-rendered main text; the snapshot-matched review determines which are material. Navigation, styles and script churn do not trigger notifications. Editorial media-only changes without text require review and an explicit future extension of the fingerprint, not a full-site resubmission. URLs are limited to canonical HTTPS yudaro.com without queries/fragments/private paths. A sitemap disappearance that is still 200 or redirected is not silently treated as deletion.

Initial baseline was recorded before second-pass changes. Configuration and final submission receipt are reported in SEO-GEO-SECOND-PASS.md. No notification is evidence of indexing. Protocol reference: [IndexNow documentation](https://www.indexnow.org/documentation).
