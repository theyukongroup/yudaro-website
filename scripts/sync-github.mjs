import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const env = { ...process.env, GIT_TERMINAL_PROMPT: '0' };
const git = (...args) => execFileSync('git', args, { cwd: root, env, encoding: 'utf8', timeout: 120000, maxBuffer: 20 * 1024 * 1024 }).trim();
const expected = 'https://github.com/theyukongroup/yudaro-website.git';
let lock;
try {
  if (git('remote', 'get-url', 'origin') !== expected || git('remote', 'get-url', '--push', 'origin') !== expected) throw Error('Unexpected origin; sync stopped.');
  if (git('branch', '--show-current') !== 'main') throw Error('Switch back to main before syncing.');
  const gitDir = path.resolve(root, git('rev-parse', '--git-dir'));
  lock = path.join(gitDir, 'yudaro-sync.lock');
  try { fs.writeFileSync(lock, String(process.pid), { flag: 'wx' }); } catch { lock = undefined; throw Error('Another sync is running or a stale sync lock needs review.'); }
  for (const marker of ['MERGE_HEAD', 'CHERRY_PICK_HEAD', 'REVERT_HEAD', 'rebase-merge', 'rebase-apply', 'index.lock']) {
    if (fs.existsSync(path.join(gitDir, marker))) throw Error('An unfinished Git operation needs attention.');
  }
  if (git('ls-files', '-u')) throw Error('Resolve existing conflicts before syncing.');
  git('fetch', 'origin', 'main');
  const [ahead, behind] = git('rev-list', '--left-right', '--count', 'HEAD...origin/main').split(/\s+/).map(Number);
  if (behind) {
    if (ahead || git('status', '--porcelain')) throw Error('GitHub has newer changes alongside local work. Review and merge manually; nothing was overwritten.');
    git('merge', '--ff-only', 'origin/main');
  }
  git('add', '--all');
  const staged = git('diff', '--cached', '--name-only', '--diff-filter=ACMR', '-z').split('\0').filter(Boolean);
  for (const name of staged) {
    if (/(^|\/)\.env(?:\.|$)|\.(pem|key)$/i.test(name)) throw Error(`Private configuration must not be uploaded: ${name}`);
    const content = execFileSync('git', ['show', ':' + name], { cwd: root, env, maxBuffer: 100 * 1024 * 1024 });
    if (content.length > 95000000) throw Error(`File is too large for sync: ${name}`);
    if (!content.includes(0) && /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,}|\bAKIA[A-Z0-9]{16}\b/.test(content.toString())) throw Error(`Potential credential detected in ${name}; review required.`);
  }
  if (git('diff', '--cached', '--name-only')) git('commit', '-m', `Sync Yudaro website ${new Date().toISOString()}`);
  if (git('rev-parse', 'HEAD') !== git('rev-parse', 'origin/main')) {
    git('push', 'origin', 'HEAD:main');
    console.log('Website changes saved to GitHub.');
  } else console.log('Already up to date.');
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  if (lock) fs.unlinkSync(lock);
}
