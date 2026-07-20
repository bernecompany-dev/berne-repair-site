import { test, expect } from "@playwright/test";
import type { APIRequestContext, Page } from "@playwright/test";

type Captured = {
  ga: unknown[][];
  meta: unknown[][];
  openai: unknown[][];
  bing: unknown[][];
};

async function gotoHydrated(page: Page, path = "/") {
  await page.goto(path, { waitUntil: "networkidle" });
  await page.waitForFunction(
    () => (window as unknown as { __aeMounted?: boolean }).__aeMounted === true,
    undefined,
    { timeout: 15_000 },
  );
}

async function installStubs(page: Page) {
  await page.evaluate(() => {
    const captured: Captured = { ga: [], meta: [], openai: [], bing: [] };
    const w = window as unknown as {
      __captured: Captured;
      gtag?: (...args: unknown[]) => void;
      fbq?: (...args: unknown[]) => void;
      oaiq?: (...args: unknown[]) => void;
      uetq?: { push: (...args: unknown[]) => void };
    };
    w.__captured = captured;
    w.gtag = (...args: unknown[]) => { captured.ga.push(args); };
    w.fbq = (...args: unknown[]) => { captured.meta.push(args); };
    w.oaiq = (...args: unknown[]) => { captured.openai.push(args); };
    w.uetq = { push: (...args: unknown[]) => { captured.bing.push(args); } };

    document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"], a[href*="wa.me"]')
      .forEach((anchor) => anchor.addEventListener("click", (event) => event.preventDefault(), false));
  });
}

async function captured(page: Page): Promise<Captured> {
  return page.evaluate(
    () => (window as unknown as { __captured: Captured }).__captured,
  );
}

function conversionCounts(events: Captured) {
  return {
    gaLead: events.ga.filter((event) => event[0] === "event" && event[1] === "generate_lead").length,
    googleAds: events.ga.filter((event) => event[0] === "event" && event[1] === "conversion").length,
    metaLead: events.meta.filter((event) => event[0] === "track" && event[1] === "Lead").length,
    openaiLead: events.openai.filter((event) => event[0] === "measure" && event[1] === "lead_created").length,
    bingLead: events.bing.filter((event) => event[0] === "event" && event[1] === "submit_lead").length,
  };
}

async function fillLead(page: Page, name: string) {
  await page.fill('input[name="name"]', name);
  await page.fill('input[name="phone"]', "305-555-0143");
  await page.selectOption('select[name="city"]', "miami");
  await page.selectOption('select[name="appliance"]', "refrigerator-repair");
  await page.check('input[name="consent"]');
}

async function submit(page: Page) {
  await page.getByRole("button", { name: /Request a callback/i }).click();
  await expect(page.getByRole("status")).toBeVisible({ timeout: 10_000 });
}

test("one tel tap emits call_click only and no hard lead", async ({ page }) => {
  await gotoHydrated(page);
  await installStubs(page);
  await page.locator('a[href^="tel:"]:visible').first().click({ force: true });

  const events = await captured(page);
  const gaNames = events.ga.map((event) => `${event[0]}:${event[1]}`);
  const bingNames = events.bing.map((event) => `${event[0]}:${event[1]}`);
  expect(gaNames.filter((name) => name === "event:call_click")).toHaveLength(1);
  expect(bingNames.filter((name) => name === "event:call_click")).toHaveLength(1);
  expect(gaNames).not.toContain("event:phone_call");
  expect(gaNames).not.toContain("event:phone_click");
  expect(conversionCounts(events)).toEqual({
    gaLead: 0,
    googleAds: 0,
    metaLead: 0,
    openaiLead: 0,
    bingLead: 0,
  });
});

test("mailto emits contact intent but no Meta or OpenAI Lead", async ({ page }) => {
  await gotoHydrated(page, "/contact");
  await installStubs(page);
  await page.locator('a[href^="mailto:"]').first().click({ force: true });

  const events = await captured(page);
  expect(events.meta.filter((event) => event[0] === "trackCustom" && event[1] === "EmailClick")).toHaveLength(1);
  expect(conversionCounts(events).metaLead).toBe(0);
  expect(conversionCounts(events).openaiLead).toBe(0);
});

test("honeypot keeps neutral success UX and emits zero conversions", async ({ page }) => {
  await gotoHydrated(page);
  await installStubs(page);
  await fillLead(page, "Honeypot QA");
  await page.fill('input[name="company_url"]', `https://spam.example/${Date.now()}`);
  await page.evaluate(() => {
    const ts = document.querySelector('input[name="ts"]') as HTMLInputElement;
    ts.value = String(Date.now() - 5_000);
  });
  await submit(page);
  expect(conversionCounts(await captured(page))).toEqual({
    gaLead: 0,
    googleAds: 0,
    metaLead: 0,
    openaiLead: 0,
    bingLead: 0,
  });
});

test("timer trap keeps neutral success UX and emits zero conversions", async ({ page }) => {
  await gotoHydrated(page);
  await installStubs(page);
  await fillLead(page, "Timer QA");
  await page.evaluate(() => {
    const ts = document.querySelector('input[name="ts"]') as HTMLInputElement;
    ts.value = String(Date.now());
  });
  await submit(page);
  expect(conversionCounts(await captured(page))).toEqual({
    gaLead: 0,
    googleAds: 0,
    metaLead: 0,
    openaiLead: 0,
    bingLead: 0,
  });
});

test("confirmed Resend delivery emits one conversion set with one lead_id", async ({ page, request }) => {
  await gotoHydrated(page);
  await installStubs(page);
  await fillLead(page, `Delivered QA ${Date.now()}`);
  await page.evaluate(() => {
    const ts = document.querySelector('input[name="ts"]') as HTMLInputElement;
    ts.value = String(Date.now() - 5_000);
  });
  await submit(page);

  const events = await captured(page);
  expect(conversionCounts(events)).toEqual({
    gaLead: 1,
    googleAds: 1,
    metaLead: 1,
    openaiLead: 1,
    bingLead: 1,
  });

  const gaLead = events.ga.find((event) => event[0] === "event" && event[1] === "generate_lead");
  const metaLead = events.meta.find((event) => event[0] === "track" && event[1] === "Lead");
  const openaiLead = events.openai.find((event) => event[0] === "measure" && event[1] === "lead_created");
  const bingLead = events.bing.find((event) => event[0] === "event" && event[1] === "submit_lead");
  const leadIds = [
    (gaLead?.[2] as { lead_id?: string })?.lead_id,
    (metaLead?.[2] as { lead_id?: string })?.lead_id,
    (openaiLead?.[2] as { lead_id?: string })?.lead_id,
    (bingLead?.[2] as { lead_id?: string })?.lead_id,
  ];
  expect(leadIds[0]).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  expect(new Set(leadIds)).toEqual(new Set([leadIds[0]]));

  const messages = await readMockMessages(request);
  const matchingMessage = messages.find((message) =>
    message.subject.includes(leadIds[0] ?? "missing-lead-id"),
  );
  expect(matchingMessage).toBeTruthy();
  expect(matchingMessage?.html).toContain(`Lead ID</td><td style="padding:8px 12px;font-weight:600">${leadIds[0]}`);
});

async function readMockMessages(request: APIRequestContext) {
  const response = await request.get("http://127.0.0.1:3101/messages");
  expect(response.ok()).toBeTruthy();
  return response.json() as Promise<Array<{ subject: string; html: string }>>;
}
