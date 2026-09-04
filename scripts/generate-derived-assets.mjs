import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { spawn } from 'node:child_process';

const origin = 'http://127.0.0.1:4322';
const base = '/anko-foto';
mkdirSync('public/downloads', { recursive: true });

const server = spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', '4322'], {
  stdio: 'ignore',
  detached: true
});
server.unref();
async function ready() {
  for (let i = 0; i < 80; i += 1) {
    try {
      if ((await fetch(`${origin}${base}/`)).ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error('Preview server did not start');
}

try {
  await ready();
  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome' });
  const page = await browser.newPage({
    viewport: { width: 1080, height: 1920 },
    deviceScaleFactor: 1
  });
  for (const locale of ['ja', 'en']) {
    await page.goto(`${origin}${base}/print/quick-reference/${locale}/`, {
      waitUntil: 'networkidle'
    });
    await page.screenshot({
      path: `public/downloads/quick-reference-${locale}.png`,
      fullPage: false
    });
  }
  await page.goto(`${origin}${base}/print/bilingual/`, { waitUntil: 'networkidle' });
  await page.pdf({
    path: 'public/downloads/camera-guide-bilingual.pdf',
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' }
  });
  await browser.close();
  console.log('Generated two 1080×1920 quick-reference PNGs and the bilingual A4 PDF.');
} finally {
  if (server.pid) process.kill(-server.pid, 'SIGTERM');
}
