#!/usr/bin/env node
/**
 * Compose berne_maps_wall_mockup.png — both posters side by side on a neutral
 * office wall, flat view (no perspective), correct relative physical sizes:
 * USA 36×24 in (left), Florida 16×24 in (right), small gap between frames.
 */
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('/opt/node22/lib/node_modules/playwright');

const ROOT = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..');
const EXPORTS = path.join(ROOT, 'exports');

const PPI = 72;                      // mockup pixels per physical inch
const gapIn = 2.5, marginX = 260, marginY = 280;
const usaW = 36 * PPI, flW = 16 * PPI, posterH = 24 * PPI, gap = gapIn * PPI;
const W = Math.round(usaW + flW + gap + marginX * 2);
const H = Math.round(posterH + marginY * 2);

const html = `<!doctype html><html><head><style>
  * { margin: 0; padding: 0; }
  body { width: ${W}px; height: ${H}px; overflow: hidden;
    background:
      radial-gradient(120% 90% at 50% 8%, rgba(255,255,255,0.16), rgba(0,0,0,0.10) 85%),
      linear-gradient(180deg, #B9B3A8 0%, #ACA69A 55%, #A19B8F 100%);
  }
  .rail { position: absolute; left: 0; right: 0; bottom: 64px; height: 10px;
    background: linear-gradient(180deg, #8F897E, #7C766C); opacity: .5; }
  .poster { position: absolute; top: ${marginY}px;
    box-shadow: 0 22px 44px rgba(30,26,20,0.38), 0 4px 10px rgba(30,26,20,0.28);
    outline: 1px solid rgba(0,0,0,0.22); }
  .poster img { display: block; height: ${posterH}px; }
  #usa { left: ${marginX}px; }
  #fla { left: ${marginX + usaW + gap}px; }
</style></head><body>
  <div class="rail"></div>
  <div class="poster" id="usa"><img src="berne_usa_takeover_36x24_preview.png"></div>
  <div class="poster" id="fla"><img src="berne_florida_service_16x24_preview.png"></div>
</body></html>`;

fs.writeFileSync(path.join(EXPORTS, '_wall_mockup.html'), html);

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const page = await browser.newPage({ viewport: { width: W, height: H } });
await page.goto('file://' + path.join(EXPORTS, '_wall_mockup.html'));
await page.waitForTimeout(400);
await page.screenshot({ path: path.join(EXPORTS, 'berne_maps_wall_mockup.png') });
console.log('rendered berne_maps_wall_mockup.png', `${W}x${H}`);
await browser.close();
