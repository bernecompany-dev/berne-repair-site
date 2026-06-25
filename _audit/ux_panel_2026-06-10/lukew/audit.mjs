// LukeW mobile audit — berne-repair.com, iPhone 390x844
import { chromium, devices } from "playwright";

const OUT = "C:/Users/golds/my-site/_audit/ux_panel_2026-06-10/lukew";
const BASE = "https://berne-repair.com";
const iphone = {
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
  userAgent: devices["iPhone 13"].userAgent,
};

const results = {};

function rectInfo(el) {
  const r = el.getBoundingClientRect();
  const cs = getComputedStyle(el);
  return {
    w: Math.round(r.width), h: Math.round(r.height),
    x: Math.round(r.x), y: Math.round(r.y),
    fontSize: cs.fontSize,
  };
}

const browser = await chromium.launch();
const ctx = await browser.newContext(iphone);
const page = await ctx.newPage();

async function go(url) {
  await page.goto(url, { waitUntil: "networkidle", timeout: 45000 }).catch(() => {});
  await page.waitForTimeout(800);
}

// ---------- 1. HOME ----------
await go(BASE + "/");
results.home = await page.evaluate(() => {
  const out = {};
  out.viewportMeta = document.querySelector('meta[name="viewport"]')?.content ?? null;
  out.hOverflow = {
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
    overflow: document.documentElement.scrollWidth > window.innerWidth,
  };
  // widest offenders
  if (out.hOverflow.overflow) {
    out.offenders = [...document.querySelectorAll("*")]
      .filter((e) => e.getBoundingClientRect().right > window.innerWidth + 1)
      .slice(0, 8)
      .map((e) => e.tagName + "." + (e.className?.toString?.().slice(0, 60) ?? ""));
  }
  const ri = (el) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return { w: Math.round(r.width), h: Math.round(r.height), fontSize: cs.fontSize };
  };
  out.headerPhoneCTA = ri(document.querySelector('header a[data-analytics="click-to-call"]'));
  out.menuBtn = ri(document.querySelector('header button[aria-controls="mobile-nav"]'));
  out.themeToggle = ri(document.querySelector("header button:not([aria-controls])"));
  out.fab = ri(document.querySelector(".berne-whatsapp-fab"));
  return out;
});
await page.screenshot({ path: OUT + "/01_home_top.png" });

// scroll to trigger sticky CTA
await page.evaluate(() => window.scrollTo(0, 900));
await page.waitForTimeout(700);
results.homeScrolled = await page.evaluate(() => {
  const ri = (el) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return {
      w: Math.round(r.width), h: Math.round(r.height),
      top: Math.round(r.top), bottom: Math.round(r.bottom),
      fontSize: cs.fontSize,
    };
  };
  const bar = document.querySelector('[aria-label="Quick actions"]');
  const out = {};
  out.stickyBarVisible = bar ? getComputedStyle(bar).opacity : null;
  out.stickyCall = ri(document.querySelector('a[data-analytics="sticky-call"]'));
  out.stickyBook = ri(document.querySelector('a[data-analytics="sticky-book"]'));
  out.stickyText = ri(document.querySelector('a[data-analytics="sticky-text"]'));
  out.fab = ri(document.querySelector(".berne-whatsapp-fab"));
  out.barBottomGap = bar ? Math.round(window.innerHeight - bar.querySelector("div").getBoundingClientRect().bottom) : null;
  // does FAB overlap the bar?
  const fab = document.querySelector(".berne-whatsapp-fab");
  if (fab && bar) {
    const f = fab.getBoundingClientRect();
    const b = bar.querySelector("div").getBoundingClientRect();
    out.fabBarOverlap = !(f.bottom < b.top || f.top > b.bottom || f.right < b.left || f.left > b.right);
  }
  return out;
});
await page.screenshot({ path: OUT + "/02_home_sticky_fab.png" });

// mobile menu
await page.evaluate(() => window.scrollTo(0, 0));
await page.click('header button[aria-controls="mobile-nav"]');
await page.waitForTimeout(500);
results.mobileMenu = await page.evaluate(() => {
  return [...document.querySelectorAll("#mobile-nav nav > a")].map((a) => {
    const r = a.getBoundingClientRect();
    return { label: a.textContent.trim(), h: Math.round(r.height), fontSize: getComputedStyle(a).fontSize };
  });
});
await page.screenshot({ path: OUT + "/03_home_menu_open.png" });

// ---------- 2. REQUEST-DISPATCH (form) ----------
await go(BASE + "/request-dispatch");
results.dispatch = await page.evaluate(() => {
  const out = {};
  const form = document.querySelector("form");
  out.noValidate = form?.noValidate;
  out.fields = [...form.querySelectorAll("input:not([type=hidden]), select, textarea")]
    .filter((el) => el.name !== "company_url")
    .map((el) => {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        name: el.name, tag: el.tagName.toLowerCase(), type: el.type ?? null,
        inputmode: el.getAttribute("inputmode"), autocomplete: el.getAttribute("autocomplete"),
        required: el.required, fontSize: cs.fontSize, h: Math.round(r.height),
      };
    });
  const submit = form.querySelector('button[type="submit"]');
  const sr = submit.getBoundingClientRect();
  out.submit = { w: Math.round(sr.width), h: Math.round(sr.height), fontSize: getComputedStyle(submit).fontSize };
  const consent = form.querySelector('input[name="consent"]');
  const cl = consent.closest("label").getBoundingClientRect();
  out.consentBox = { boxSize: Math.round(consent.getBoundingClientRect().width), labelH: Math.round(cl.height) };
  out.formTopFromViewport = Math.round(form.getBoundingClientRect().top);
  out.hOverflow = document.documentElement.scrollWidth > window.innerWidth;
  return out;
});
// scroll to form and screenshot
await page.evaluate(() => document.getElementById("lead-form")?.scrollIntoView());
await page.waitForTimeout(900);
results.dispatchFormView = await page.evaluate(() => {
  const bar = document.querySelector('[aria-label="Quick actions"]');
  const fab = document.querySelector(".berne-whatsapp-fab");
  const submit = document.querySelector('form button[type="submit"]');
  const s = submit?.getBoundingClientRect();
  const f = fab?.getBoundingClientRect();
  return {
    stickyOpacityAtForm: bar ? getComputedStyle(bar).opacity : null,
    fabBottom: f ? Math.round(window.innerHeight - f.bottom) : null,
    fabOverSubmit: f && s ? !(f.bottom < s.top || f.top > s.bottom || f.right < s.left || f.left > s.right) : null,
  };
});
await page.screenshot({ path: OUT + "/04_dispatch_form.png" });

// client-side validation check: tap submit empty (server action will reject; we intercept request? No — DO NOT submit)
// Instead just verify noValidate + missing client checks statically (already captured).

// ---------- 3. SERVICE PAGE ----------
await go(BASE + "/services/refrigerator-repair");
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.5));
await page.waitForTimeout(600);
results.service = await page.evaluate(() => ({
  hOverflow: document.documentElement.scrollWidth > window.innerWidth,
  pills: [...document.querySelectorAll('a[class*="rounded-full"]')].slice(0, 30).map((a) => {
    const r = a.getBoundingClientRect();
    return { t: a.textContent.trim().slice(0, 30), h: Math.round(r.height) };
  }).filter((p) => p.h > 0 && p.h < 40),
}));
await page.screenshot({ path: OUT + "/05_service_mid.png" });

// ---------- 4. CITY PAGE + footer ----------
await go(BASE + "/areas/miami");
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(900);
results.city = await page.evaluate(() => {
  const out = { hOverflow: document.documentElement.scrollWidth > window.innerWidth };
  // footer bottom legal links
  out.footerLegalLinks = [...document.querySelectorAll("footer a")].slice(-16).map((a) => {
    const r = a.getBoundingClientRect();
    return { t: a.textContent.trim().slice(0, 20), h: Math.round(r.height), fontSize: getComputedStyle(a).fontSize };
  });
  const tel = [...document.querySelectorAll('footer a[href^="tel:"]')].map((a) => {
    const r = a.getBoundingClientRect();
    return { t: a.textContent.trim().slice(0, 30), h: Math.round(r.height) };
  });
  out.footerTel = tel;
  return out;
});
await page.screenshot({ path: OUT + "/06_city_footer.png" });

// ---------- 5. ES home quick check ----------
await go(BASE + "/es");
results.es = await page.evaluate(() => ({
  hOverflow: document.documentElement.scrollWidth > window.innerWidth,
  scrollWidth: document.documentElement.scrollWidth,
}));

console.log(JSON.stringify(results, null, 2));
await browser.close();
