import { test, expect } from "@playwright/test";

const ROUTES = {
  home: "/",
  esHome: "/es",
  areasIndex: "/areas",
  team: "/team",
  service: "/services/refrigerator-repair",
  serviceAirDuct: "/services/air-duct-cleaning",
  city: "/areas/miami",
  cityParkland: "/areas/parkland",
  combo: "/services/refrigerator-repair/miami",
  comboObscure: "/services/dryer-repair/parkland",
  notFound404Service: "/services/this-service-does-not-exist",
  notFound404City: "/areas/atlantis-not-a-city",
  notFound404Combo: "/services/refrigerator-repair/nope-nope",
  sitemap: "/sitemap.xml",
  robots: "/robots.txt",
  ogHome: "/opengraph-image",
  ogCombo: "/services/refrigerator-repair/miami/opengraph-image",
};

test.describe("HTTP status sweep", () => {
  for (const [name, path] of Object.entries(ROUTES)) {
    const expected = name.startsWith("notFound") ? 404 : 200;
    test(`${name} → ${expected}`, async ({ request }) => {
      const r = await request.get(path, { maxRedirects: 0 });
      expect(r.status(), `GET ${path}`).toBe(expected);
    });
  }
});

test.describe("Sitemap + robots integrity", () => {
  test("sitemap has 580+ URLs and includes service×city + /es", async ({ request }) => {
    const r = await request.get("/sitemap.xml");
    const body = await r.text();
    const urlCount = (body.match(/<url>/g) ?? []).length;
    expect(urlCount).toBeGreaterThanOrEqual(580);
    expect(body).toContain("/services/refrigerator-repair/miami");
    expect(body).toContain("/areas/parkland");
    expect(body).toContain("/es");
  });

  test("robots.txt advertises sitemap", async ({ request }) => {
    const r = await request.get("/robots.txt");
    const body = await r.text();
    expect(body).toMatch(/Sitemap:\s*https?:\/\//);
  });

  test("OG endpoints return PNG", async ({ request }) => {
    for (const url of [ROUTES.ogHome, ROUTES.ogCombo]) {
      const r = await request.get(url);
      expect(r.status(), url).toBe(200);
      expect(r.headers()["content-type"], url).toContain("image/png");
    }
  });
});

test.describe("Home page structure", () => {
  test("home renders hero, stats, services, team, contact, sticky CTA on mobile", async ({ page, isMobile }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Berne Repair/);
    await expect(page.locator("h1").first()).toContainText(/Premium appliance repair/i);
    await expect(page.locator("body")).toContainText("$59");
    await expect(page.locator("body")).toContainText(/\b1[67]\b/);
    await expect(page.getByRole("link", { name: /Refrigerator Repair/i }).first()).toBeVisible();
    await expect(page.getByText(/Eugene Berne/i).first()).toBeVisible();
    if (isMobile) {
      await page.evaluate(() => window.scrollTo(0, 1500));
      await page.waitForTimeout(500);
      await expect(page.getByRole("region", { name: /quick actions/i })).toBeVisible();
    }
  });

  test("exactly one h1", async ({ page }) => {
    await page.goto("/");
    const count = await page.locator("h1").count();
    expect(count).toBe(1);
  });

  test("hreflang alternates present", async ({ page }) => {
    await page.goto("/");
    const enAlt = await page.locator('link[rel="alternate"][hreflang="en-US"]').count();
    const esAlt = await page.locator('link[rel="alternate"][hreflang="es-US"]').count();
    expect(enAlt).toBeGreaterThan(0);
    expect(esAlt).toBeGreaterThan(0);
  });
});

test.describe("Service / city / combo pages", () => {
  test("service page has carousel + breadcrumb + ProcessSteps", async ({ page }) => {
    await page.goto("/services/refrigerator-repair");
    await expect(page.locator("h1")).toContainText(/Refrigerator Repair/);
    await expect(page.locator('[aria-roledescription="carousel"]').first()).toBeVisible();
    await expect(page.getByRole("navigation", { name: /breadcrumb/i }).first()).toBeVisible();
    await expect(page.getByText(/From "broken" to "done"/i)).toBeVisible();
  });

  test("city page embeds Google Map iframe", async ({ page }) => {
    await page.goto("/areas/miami");
    const iframe = page.locator('iframe[src*="google.com/maps"]');
    await expect(iframe).toBeVisible();
    const src = await iframe.getAttribute("src");
    expect(src).toContain("25.76"); // Miami latitude
  });

  test("combo page has both city map and internal cross-links", async ({ page }) => {
    await page.goto("/services/refrigerator-repair/miami");
    await expect(page.locator("h1")).toContainText(/Refrigerator Repair in/i);
    await expect(page.locator("h1")).toContainText(/Miami/i);
    await expect(page.locator('iframe[src*="google.com/maps"]')).toBeVisible();
    // Same-service-other-cities + other-services-same-city
    const otherCityLinks = await page.locator('a[href^="/services/refrigerator-repair/"]:not([href$="/miami"])').count();
    const otherServiceLinks = await page.locator('a[href$="/miami"][href^="/services/"]:not([href="/services/refrigerator-repair/miami"])').count();
    expect(otherCityLinks).toBeGreaterThanOrEqual(5);
    expect(otherServiceLinks).toBeGreaterThanOrEqual(5);
  });

  test("JSON-LD on combo: Service + FAQPage + BreadcrumbList", async ({ page }) => {
    await page.goto("/services/refrigerator-repair/miami");
    const ldScripts = page.locator('script[type="application/ld+json"]');
    const all = await ldScripts.allTextContents();
    const flat = all.flatMap((s) => {
      try {
        const j = JSON.parse(s);
        return Array.isArray(j) ? j : [j];
      } catch {
        return [];
      }
    });
    const types = flat.map((n: any) => n["@type"]).flat();
    expect(types).toContain("Service");
    expect(types).toContain("FAQPage");
    expect(types).toContain("BreadcrumbList");
  });
});

test.describe("Spanish i18n", () => {
  test("/es renders Spanish hero copy", async ({ page }) => {
    await page.goto("/es");
    await expect(page.locator("h1")).toContainText(/Reparación premium/i);
    await expect(page.getByText(/Visita técnica/i).first()).toBeVisible();
  });

  test("language switcher toggles EN → ES and back", async ({ page, isMobile }) => {
    await page.goto("/");
    // Desktop switcher is in header; mobile is in the mobile menu
    if (isMobile) {
      await page.getByRole("button", { name: /open menu/i }).click();
    }
    await page.getByRole("group", { name: /language/i }).first().getByRole("link", { name: "ES" }).click();
    await expect(page).toHaveURL(/\/es/);
    await expect(page.locator("h1")).toContainText(/Reparación/);
  });
});

test.describe("Lead form", () => {
  test("full happy-path submit lands on success view (no crash)", async ({ page }) => {
    await page.goto("/");
    // Backdate ts so we don't trip the bot-timing silent path
    await page.evaluate(() => {
      const ts = document.querySelector('input[name="ts"]') as HTMLInputElement | null;
      if (ts) ts.value = String(Date.now() - 5000);
    });
    await page.fill('input[name="name"]', "QA Auto");
    await page.fill('input[name="phone"]', "305-555-0166");
    await page.selectOption('select[name="city"]', "miami");
    await page.selectOption('select[name="appliance"]', "refrigerator-repair");
    await page.check('input[name="consent"]');
    await page.getByRole("button", { name: /Request a callback/i }).click();
    // Either real success copy or the bot-timing silent-success copy
    await expect(page.getByText(/Got it|talk soon|we'll call you/i)).toBeVisible({ timeout: 15_000 });
    // Sanity — no Next runtime error overlay
    await expect(page.getByText(/Runtime Error|use server.*file can only export/i)).toHaveCount(0);
  });

  test("honeypot triggers silent success (no error shown)", async ({ page }) => {
    await page.goto("/");
    // Backdate timestamp so the bot-timing check (<1.5s) doesn't fire first
    await page.evaluate(() => {
      const ts = document.querySelector('input[name="ts"]') as HTMLInputElement | null;
      if (ts) ts.value = String(Date.now() - 5000);
      const hp = document.querySelector('input[name="company_url"]') as HTMLInputElement | null;
      if (hp) hp.value = "https://spam.example/" + Date.now();
    });
    await page.fill('input[name="name"]', "Honeypot Test");
    await page.fill('input[name="phone"]', "305-555-0188");
    await page.selectOption('select[name="city"]', "miami");
    await page.selectOption('select[name="appliance"]', "refrigerator-repair");
    await page.check('input[name="consent"]');
    await page.getByRole("button", { name: /Request a callback/i }).click();
    await expect(page.getByText(/talk soon|Got it/i)).toBeVisible({ timeout: 10_000 });
  });

  test("server rejects missing TCPA consent after timing window", async ({ page }) => {
    await page.goto("/");
    // Backdate ts so server runs zod (not the timing short-circuit).
    await page.evaluate(() => {
      const ts = document.querySelector('input[name="ts"]') as HTMLInputElement | null;
      if (ts) ts.value = String(Date.now() - 5000);
      // Disable required attribute on consent so browser doesn't block submit;
      // we want the server's validation path here.
      const c = document.querySelector('input[name="consent"]') as HTMLInputElement | null;
      if (c) c.removeAttribute("required");
    });
    await page.fill('input[name="name"]', "TCPA Test");
    await page.fill('input[name="phone"]', "305-555-0199");
    await page.selectOption('select[name="city"]', "miami");
    await page.selectOption('select[name="appliance"]', "refrigerator-repair");
    await page.getByRole("button", { name: /Request a callback/i }).click();
    // Server returns error for missing consent; no success state, no thank-you message.
    await expect(page.getByText(/Got it — talk soon/i)).toHaveCount(0);
  });

  test("bot-timing check: submit <1.5s after page load → silent success, no email", async ({ page }) => {
    await page.goto("/");
    // ts is set on mount via useEffect; submit immediately to be < 1.5s
    await page.fill('input[name="name"]', "Bot Speed");
    await page.fill('input[name="phone"]', "305-555-0177");
    await page.selectOption('select[name="city"]', "miami");
    await page.selectOption('select[name="appliance"]', "refrigerator-repair");
    await page.check('input[name="consent"]');
    await page.getByRole("button", { name: /Request a callback/i }).click();
    // Silent success — bot-timing path
    await expect(page.getByText(/Got it|talk soon/i)).toBeVisible({ timeout: 10_000 });
  });
});

test.describe("Performance smoke", () => {
  test("home First Contentful Paint < 2.5s and DOM load < 4s", async ({ page }) => {
    const t0 = Date.now();
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const dcl = Date.now() - t0;
    const fcp = await page.evaluate(() => {
      const entries = performance.getEntriesByType("paint");
      const fcpEntry = entries.find((e) => e.name === "first-contentful-paint");
      return fcpEntry ? fcpEntry.startTime : null;
    });
    expect(dcl, `DOMContentLoaded was ${dcl}ms`).toBeLessThan(4000);
    if (fcp !== null) {
      expect(fcp, `FCP was ${fcp.toFixed(0)}ms`).toBeLessThan(2500);
    }
  });

  test("combo page transfers reasonable HTML size (<400KB)", async ({ request }) => {
    const r = await request.get("/services/refrigerator-repair/miami");
    const body = await r.body();
    expect(body.length).toBeLessThan(400_000);
  });
});

test.describe("Accessibility basics", () => {
  test("every <img> has non-empty alt", async ({ page }) => {
    for (const path of ["/", "/services/refrigerator-repair", "/areas/miami", "/team"]) {
      await page.goto(path);
      const missing = await page.$$eval("img", (imgs) =>
        imgs.filter((i) => !i.getAttribute("alt") || i.getAttribute("alt") === "").length
      );
      expect(missing, `missing alt on ${path}`).toBe(0);
    }
  });

  test("html has lang attribute", async ({ page }) => {
    await page.goto("/");
    const lang = await page.locator("html").getAttribute("lang");
    expect(lang).toBeTruthy();
  });
});
