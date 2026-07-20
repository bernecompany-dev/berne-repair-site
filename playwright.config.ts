import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: process.env.PW_BASE_URL ?? "http://localhost:3000",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: process.env.PW_NO_SERVER
    ? undefined
    : [
        {
          command: "node tests/helpers/resend-mock.mjs",
          url: "http://127.0.0.1:3101/health",
          reuseExistingServer: true,
          timeout: 30_000,
        },
        {
          command: "npm run dev",
          url: "http://localhost:3000",
          reuseExistingServer: false,
          timeout: 120_000,
          env: {
            ...process.env,
            RESEND_API_KEY: "re_playwright_test",
            RESEND_BASE_URL: "http://127.0.0.1:3101",
            LEAD_TO_EMAIL: "playwright@example.com",
          },
        },
      ],
  projects: [
    { name: "chromium-desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile-chrome", use: { ...devices["Pixel 7"] } },
  ],
  timeout: 30_000,
});
