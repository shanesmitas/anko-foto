import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const root = resolve('dist');
const base = '/anko-foto/';
const htmlFiles = [];

function walk(directory) {
  for (const name of readdirSync(directory)) {
    const path = join(directory, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (path.endsWith('.html')) htmlFiles.push(path);
  }
}

walk(root);
const failures = [];
for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  if (html.includes('https://example.github.io'))
    failures.push(`${file}: placeholder production origin`);
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const href = match[1];
    if (href.startsWith('/') && !href.startsWith(base))
      failures.push(`${file}: missing base prefix ${href}`);
    if (/^(?:https?:|mailto:|tel:|#|data:)/.test(href)) continue;
    const withoutBase = href.startsWith(base) ? href.slice(base.length) : href;
    const clean = withoutBase.split(/[?#]/)[0];
    if (!clean) continue;
    let target = href.startsWith(base) ? join(root, clean) : resolve(dirname(file), clean);
    if (clean.endsWith('/')) target = join(target, 'index.html');
    else if (!existsSync(target) && existsSync(`${target}.html`)) target = `${target}.html`;
    if (!existsSync(target)) failures.push(`${file}: missing target ${href}`);
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log(`Checked ${htmlFiles.length} HTML files; all local links and base paths resolve.`);
