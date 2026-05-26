import { chromium } from "playwright";

const BASE = process.env.SHOT_BASE ?? "http://localhost:3100";
const OUT = "_audit/theme_2026-05-26";

const targets = [
  { name: "home", path: "/" },
  { name: "blog", path: "/blog" },
];

async function shot(page, url, file) {
  await page.goto(url, { waitUntil: "networkidle" });
  // settle fonts/images
  await page.waitForTimeout(600);
  await page.screenshot({ path: file, fullPage: false });
  console.log("saved", file);
}

const browser = await chromium.launch();
try {
  // --- LIGHT (default, no stored theme) ---
  const ctxLight = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const pLight = await ctxLight.newPage();
  for (const t of targets) {
    await shot(pLight, BASE + t.path, `${OUT}/${t.name}-light.png`);
  }
  // Verify default class is NOT dark
  const isDarkDefault = await pLight.evaluate(() =>
    document.documentElement.classList.contains("dark"),
  );
  console.log("default-is-dark:", isDarkDefault, "(expected false)");

  // Click toggle on /blog, verify it flips to dark + persists in localStorage
  await pLight.goto(BASE + "/blog", { waitUntil: "networkidle" });
  await pLight.click('button[aria-label="Switch to dark theme"]');
  await pLight.waitForTimeout(300);
  const afterToggle = await pLight.evaluate(() => ({
    dark: document.documentElement.classList.contains("dark"),
    stored: localStorage.getItem("theme"),
  }));
  console.log("after-toggle:", JSON.stringify(afterToggle), "(expected dark=true, stored=dark)");
  await ctxLight.close();

  // --- DARK (simulate persisted choice via initScript) ---
  const ctxDark = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  await ctxDark.addInitScript(() => {
    try { localStorage.setItem("theme", "dark"); } catch {}
  });
  const pDark = await ctxDark.newPage();
  for (const t of targets) {
    await shot(pDark, BASE + t.path, `${OUT}/${t.name}-dark.png`);
  }
  const persisted = await pDark.evaluate(() =>
    document.documentElement.classList.contains("dark"),
  );
  console.log("persisted-dark-applied:", persisted, "(expected true)");

  // Toggle back to light, confirm persistence flips
  await pDark.click('button[aria-label="Switch to light theme"]');
  await pDark.waitForTimeout(200);
  const backToLight = await pDark.evaluate(() => ({
    dark: document.documentElement.classList.contains("dark"),
    stored: localStorage.getItem("theme"),
  }));
  console.log("toggle-back:", JSON.stringify(backToLight), "(expected dark=false, stored=light)");
  await ctxDark.close();
} finally {
  await browser.close();
}
