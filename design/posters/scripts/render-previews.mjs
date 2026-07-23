#!/usr/bin/env node
/**
 * Render preview PNGs of the poster SVGs with headless Chromium (Playwright).
 *   - full-size previews: ≥3000 px on the long side, sRGB
 *   - small inspection copies for quick visual QA
 * Usage: node scripts/render-previews.mjs [--small-only]
 */
import path from 'node:path';
import url from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('/opt/node22/lib/node_modules/playwright');

const ROOT = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..');
const EXPORTS = path.join(ROOT, 'exports');

const JOBS = [
  { svg: 'berne_usa_takeover_36x24_editable.svg',    png: 'berne_usa_takeover_36x24_preview.png',    w: 3625, h: 2425, scale: 1 },
  { svg: 'berne_florida_service_16x24_editable.svg', png: 'berne_florida_service_16x24_preview.png', w: 1625, h: 2425, scale: 1.3 },
];

const smallOnly = process.argv.includes('--small-only');

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const j of JOBS) {
  const fileUrl = 'file://' + path.join(EXPORTS, j.svg);
  for (const pass of ['full', 'small']) {
    if (pass === 'full' && smallOnly) continue;
    const scale = pass === 'full' ? j.scale : (j.w > j.h ? 1400 / j.w : 1100 / j.h);
    const page = await browser.newPage({
      viewport: { width: Math.round(j.w * scale), height: Math.round(j.h * scale) },
      deviceScaleFactor: 1,
    });
    await page.goto(fileUrl);
    await page.evaluate(() => {
      const svg = document.documentElement;
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '100%');
      svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    const out = pass === 'full' ? path.join(EXPORTS, j.png) : path.join(EXPORTS, 'qa_' + j.png);
    await page.screenshot({ path: out, fullPage: false });
    console.log('rendered', path.basename(out), `${Math.round(j.w * scale)}x${Math.round(j.h * scale)}`);
    await page.close();
  }
}
await browser.close();
