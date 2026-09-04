import lighthouse from 'lighthouse';
import { mkdirSync, writeFileSync } from 'node:fs';
import { spawn } from 'node:child_process';

const origin = 'http://127.0.0.1:4323';
const base = '/anko-foto';
const chromePort = 9223;
const server = spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', '4323'], {
  stdio: 'ignore',
  detached: true
});
server.unref();
const chrome = spawn(
  '/usr/bin/google-chrome',
  [
    `--remote-debugging-port=${chromePort}`,
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--user-data-dir=/tmp/anko-foto-lighthouse-profile'
  ],
  { stdio: 'ignore', detached: true }
);
chrome.unref();
const routes = ['/', '/en/', '/recipes/moving-subject/', '/controls/', '/help/'];
mkdirSync('lighthouse-reports', { recursive: true });

async function ready() {
  for (let i = 0; i < 100; i += 1) {
    try {
      if ((await fetch(`${origin}${base}/`)).ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error('Preview server did not start');
}

try {
  await ready();
  for (const route of routes) {
    const result = await lighthouse(`${origin}${base}${route}`, {
      port: chromePort,
      output: 'json',
      logLevel: 'error'
    });
    if (!result) throw new Error(`No Lighthouse result for ${route}`);
    const scores = Object.fromEntries(
      Object.entries(result.lhr.categories).map(([key, category]) => [
        key,
        Math.round((category.score ?? 0) * 100)
      ])
    );
    const failed = ['performance', 'accessibility', 'best-practices', 'seo'].filter(
      (key) => (scores[key] ?? 0) < 90
    );
    writeFileSync(
      `lighthouse-reports/${route.replaceAll('/', '_') || '_home'}.json`,
      result.report
    );
    console.log(route, scores);
    if (failed.length) throw new Error(`${route} is below 90 in: ${failed.join(', ')}`);
  }
} finally {
  if (chrome.pid) process.kill(-chrome.pid, 'SIGTERM');
  if (server.pid) process.kill(-server.pid, 'SIGTERM');
}
