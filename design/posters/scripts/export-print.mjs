#!/usr/bin/env node
/**
 * Export print PDFs at exact physical size (bleed included) from the editable
 * SVGs via headless Chromium. Vector content stays vector; fonts are embedded.
 */
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('/opt/node22/lib/node_modules/playwright');

const ROOT = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..');
const EXPORTS = path.join(ROOT, 'exports');

const JOBS = [
  { svg: 'berne_usa_takeover_36x24_editable.svg',    pdf: 'berne_usa_takeover_36x24_print.pdf',    w: '36.25in', h: '24.25in' },
  { svg: 'berne_florida_service_16x24_editable.svg', pdf: 'berne_florida_service_16x24_print.pdf', w: '16.25in', h: '24.25in' },
];

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const j of JOBS) {
  // inline the SVG in an HTML wrapper — SVG-as-<img> would not load embedded fonts
  let svg = fs.readFileSync(path.join(EXPORTS, j.svg), 'utf8').replace(/^<\?xml[^>]*\?>\s*/, '');
  // Chromium flattens SVG <pattern> fills into a full-page 72 dpi raster when
  // printing. Replace the grain-pattern rect with explicit 300 dpi image tiles:
  // direct <image> elements keep their source resolution in the PDF.
  const patMatch = svg.match(/<pattern id="([a-z]+-grain)"[^>]*>\s*<image href="(data:image\/png;base64,[^"]+)"/);
  if (patMatch) {
    const [, patId, dataUri] = patMatch;
    svg = svg.replace(
      new RegExp(`<rect width="(\\d+)" height="(\\d+)" fill="url\\(#${patId}\\)" opacity="[\\d.]+"/>`),
      (m, w, h) => {
        let tiles = `<g opacity="0.9">`;
        for (let y = 0; y < +h; y += 300)
          for (let x = 0; x < +w; x += 300)
            tiles += `<image href="${dataUri}" x="${x}" y="${y}" width="300" height="300"/>`;
        return tiles + `</g>`;
      });
  }
  const html = `<!doctype html><html><head><style>
    @page { size: ${j.w} ${j.h}; margin: 0; }
    html, body { margin: 0; padding: 0; }
    svg { display: block; width: ${j.w}; height: ${j.h}; }
  </style></head><body>${svg}</body></html>`;
  const tmp = path.join(EXPORTS, '_print_tmp.html');
  fs.writeFileSync(tmp, html);
  const page = await browser.newPage();
  await page.goto('file://' + tmp);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  await page.pdf({
    path: path.join(EXPORTS, j.pdf),
    width: j.w, height: j.h,
    printBackground: true,
    preferCSSPageSize: true,
    pageRanges: '1',
  });
  console.log('exported', j.pdf);
  await page.close();
  fs.unlinkSync(tmp);
}
await browser.close();
