import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";

// Temporary verification spec for GA4 conversion wiring.
// Waits for client hydration, replaces window.gtag with a capturing stub,
// then exercises the click-based conversions and asserts our events fire.

async function gotoHydrated(page: Page) {
  await page.goto("/", { waitUntil: "networkidle" });
  // AnalyticsEvents installs its listener in a useEffect; wait for that to run.
  await page.waitForFunction(
    () => (window as unknown as { __aeMounted?: boolean }).__aeMounted === true,
    undefined,
    { timeout: 15_000 },
  );
}

async function installStub(page: Page) {
  await page.evaluate(() => {
    const w = window as unknown as { __ev: unknown[][]; gtag?: (...a: unknown[]) => void };
    w.__ev = [];
    w.gtag = (...args: unknown[]) => { w.__ev.push(args); };
    // Block tel:/wa.me navigation so it doesn't interrupt the run.
    document.querySelectorAll('a[href^="tel:"], a[href*="wa.me"]').forEach((a) =>
      a.addEventListener("click", (e) => e.preventDefault(), false),
    );
  });
}

async function eventNames(page: Page) {
  const events = await page.evaluate(
    () => (window as unknown as { __ev: unknown[][] }).__ev,
  );
  return events.map((e) => `${e[0]}:${e[1]}`);
}

test("phone_call fires on tel: click", async ({ page }) => {
  await gotoHydrated(page);
  await installStub(page);
  await page.locator('a[href^="tel:"]').first().click({ force: true });
  expect(await eventNames(page)).toContain("event:phone_call");
});

test("whatsapp_click fires on WhatsApp FAB click", async ({ page }) => {
  await gotoHydrated(page);
  await installStub(page);
  await page.locator('a[data-analytics="whatsapp-fab"]').click({ force: true });
  const names = await eventNames(page);
  // Exactly one whatsapp_click (FAB's own handler; AnalyticsEvents skips the FAB).
  expect(names.filter((n) => n === "event:whatsapp_click")).toHaveLength(1);
});

test("generate_lead fires when the form reaches success", async ({ page }) => {
  await gotoHydrated(page);
  await installStub(page);
  // Drive the form to a success state via the honeypot path (returns
  // status:"success" without needing Resend), which triggers the
  // generate_lead useEffect in LeadForm.
  await page.evaluate(() => {
    const ts = document.querySelector('input[name="ts"]') as HTMLInputElement | null;
    if (ts) ts.value = String(Date.now() - 5000);
    const hp = document.querySelector('input[name="company_url"]') as HTMLInputElement | null;
    if (hp) hp.value = "https://spam.example/" + Date.now();
  });
  await page.fill('input[name="name"]', "Lead Event QA");
  await page.fill('input[name="phone"]', "305-555-0143");
  await page.selectOption('select[name="city"]', "miami");
  await page.selectOption('select[name="appliance"]', "refrigerator-repair");
  await page.check('input[name="consent"]');
  await page.getByRole("button", { name: /Request a callback/i }).click();
  await expect(page.getByText(/talk soon|Got it/i)).toBeVisible({ timeout: 10_000 });
  await expect
    .poll(async () => (await eventNames(page)).filter((n) => n === "event:generate_lead").length)
    .toBe(1);
});
