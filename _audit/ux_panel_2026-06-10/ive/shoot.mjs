import { chromium } from "playwright";

const OUT = "C:/Users/golds/my-site/_audit/ux_panel_2026-06-10/ive";
const BASE = "https://www.berne-repair.com";

const shots = [
  { name: "home_desktop_light", url: "/", w: 1440, h: 900, full: true },
  { name: "home_desktop_dark", url: "/", w: 1440, h: 900, full: true, dark: true },
  { name: "home_mobile", url: "/", w: 390, h: 844, full: true },
  { name: "brand_subzero_desktop", url: "/brands/sub-zero", w: 1440, h: 900, full: true },
  { name: "service_fridge_mobile", url: "/services/refrigerator-repair", w: 390, h: 844, full: true },
  { name: "dispatch_mobile_dark", url: "/request-dispatch", w: 390, h: 844, full: true, dark: true },
];

const browser = await chromium.launch();
for (const s of shots) {
  const ctx = await browser.newContext({
    viewport: { width: s.w, height: s.h },
    deviceScaleFactor: s.w < 500 ? 2 : 1,
    isMobile: s.w < 500,
  });
  if (s.dark) {
    await ctx.addInitScript(() => localStorage.setItem("theme", "dark"));
  }
  const page = await ctx.newPage();
  await page.goto(BASE + s.url, { waitUntil: "networkidle", timeout: 45000 }).catch(() => {});
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${OUT}/${s.name}.png`, fullPage: !!s.full });
  console.log("done", s.name);
  await ctx.close();
}
await browser.close();
