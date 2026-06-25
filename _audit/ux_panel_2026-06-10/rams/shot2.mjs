import { chromium } from "playwright-core";

const OUT = "C:/Users/golds/my-site/_audit/ux_panel_2026-06-10/rams";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto("https://berne-repair.com/", { waitUntil: "networkidle", timeout: 60000 }).catch(() => {});
await page.waitForTimeout(1200);
for (const y of [900, 2700, 5400, 8100]) {
  await page.evaluate((v) => window.scrollTo(0, v), y);
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${OUT}/home_scroll_${y}.png` });
}
const h = await page.evaluate(() => document.body.scrollHeight);
await page.evaluate((v) => window.scrollTo(0, v), h);
await page.waitForTimeout(800);
await page.screenshot({ path: `${OUT}/home_bottom.png` });
console.log("height", h);

await page.goto("https://berne-repair.com/services/refrigerator-repair", { waitUntil: "networkidle", timeout: 60000 }).catch(() => {});
await page.waitForTimeout(1200);
await page.screenshot({ path: `${OUT}/service_viewport.png` });
await browser.close();
