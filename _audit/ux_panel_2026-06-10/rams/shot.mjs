import { chromium } from "playwright-core";

const OUT = "C:/Users/golds/my-site/_audit/ux_panel_2026-06-10/rams";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const targets = [
  ["https://berne-repair.com/", "home_full", true],
  ["https://berne-repair.com/", "home_viewport", false],
  ["https://berne-repair.com/services/refrigerator-repair", "service_full", true],
  ["https://berne-repair.com/areas/coral-gables", "city_full", true],
  ["https://berne-repair.com/request-dispatch", "dispatch_viewport", false],
];

for (const [url, name, full] of targets) {
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: full });
  console.log("done", name);
}
await browser.close();
