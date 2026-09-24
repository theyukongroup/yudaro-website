import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validUrl,
  delta,
  materialHash,
  reviewDelta,
} from './indexnow-core.mjs';
test('only canonical public URLs are eligible', () => {
  assert.equal(validUrl('https://yudaro.com/ai-erp'), true);
  for (const u of [
    'https://www.yudaro.com/',
    'https://example.com/',
    'https://user:password@yudaro.com/',
    'http://yudaro.com/',
    'https://yudaro.com/?lang=es',
    'https://yudaro.com/ai-erp#section',
    'https://yudaro.com/api/events',
    'https://yudaro.com/admin',
    'https://yudaro.com/account',
  ])
    assert.equal(validUrl(u), false, u);
});
test('unchanged publication creates no notification', () =>
  assert.deepEqual(delta({ a: '1' }, { a: '1' }), {
    created: [],
    updated: [],
    deleted: [],
  }));
test('delta separates creation material update and deletion', () =>
  assert.deepEqual(
    delta({ a: '1', b: '2', c: '3' }, { a: '1', b: '4', d: '5' }),
    { created: ['d'], updated: ['b'], deleted: ['c'] },
  ));
test('cosmetic markup and global navigation do not resubmit pages', () =>
  assert.equal(
    materialHash('<nav>Old</nav><main><p>Useful text</p></main>'),
    materialHash(
      '<nav>New</nav><main class="new"><p> Useful   text </p></main>',
    ),
  ));
test('material body changes notify', () =>
  assert.notEqual(
    materialHash('<main>One policy</main>'),
    materialHash('<main>Updated policy</main>'),
  ));
test('title changes notify', () =>
  assert.notEqual(
    materialHash('<title>A</title><main>Text</main>'),
    materialHash('<title>B</title><main>Text</main>'),
  ));
test('script churn does not notify', () =>
  assert.equal(
    materialHash('<main>Text<script>one</script></main>'),
    materialHash('<main>Text<script>two</script></main>'),
  ));
test('missing server-rendered main fails closed', () =>
  assert.throws(() => materialHash('<div>Loading</div>'), /Missing main/));

test('material review excludes cosmetic changes', () =>
  assert.deepEqual(
    reviewDelta(['a', 'b'], 's', {
      snapshot: 's',
      decisions: [
        {
          url: 'a',
          action: 'notify',
          reason: 'Substantive new architecture guidance',
        },
        {
          url: 'b',
          action: 'cosmetic',
          reason: 'Only the byline label and date display changed',
        },
      ],
    }),
    ['a'],
  ));
test('stale review cannot submit changed content', () =>
  assert.throws(
    () => reviewDelta(['a'], 'new', { snapshot: 'old', decisions: [] }),
    /stale/,
  ));
test('unclassified changes cannot silently advance state', () =>
  assert.throws(
    () =>
      reviewDelta(['a', 'b'], 's', {
        snapshot: 's',
        decisions: [
          {
            url: 'a',
            action: 'notify',
            reason: 'Substantive new architecture guidance',
          },
        ],
      }),
    /Every/,
  ));
test('unknown or duplicated review URL is rejected', () =>
  assert.throws(
    () =>
      reviewDelta(['a'], 's', {
        snapshot: 's',
        decisions: [
          {
            url: 'x',
            action: 'notify',
            reason: 'Substantive new architecture guidance',
          },
        ],
      }),
    /Invalid/,
  ));
