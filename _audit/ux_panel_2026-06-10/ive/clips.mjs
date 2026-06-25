import { chromium } from "playwright";

const OUT = "C:/Users/golds/my-site/_audit/ux_panel_2026-06-10/ive";
const BASE = "https://www.berne-repair.com";

const browser = await chromium.launch();

async function clip(name, url, dark, selector) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  if (dark) await ctx.addInitScript(() => localStorage.setItem("theme", "dark"));
  const page = await ctx.newPage();
  await page.goto(BASE + url, { waitUntil: "networkidle", timeout: 45000 }).catch(() => {});
  await page.waitForTimeout(1200);
  if (selector) {
    const el = page.locator(selector).first();
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await el.screenshot({ path: `${OUT}/${name}.png` });
  } else {
    await page.screenshot({ path: `${OUT}/${name}.png` });
  }
  console.log("done", name);
  await ctx.close();
}

const BRANDS_SEC = "xpath=//span[contains(., 'Brands we service')]/ancestor::section";
await clip("clip_hero_light", "/", false, null);
await clip("clip_hero_dark", "/", true, null);
await clip("clip_brands_light", "/", false, BRANDS_SEC);
await clip("clip_brands_dark", "/", true, BRANDS_SEC);
await browser.close();
