import { defineConfig, devices } from '@playwright/test';

const PORT = process.env.PORT || (process.env.CI ? '3000' : '3010');
const baseURL = process.env.BASE_URL || `http://127.0.0.1:${PORT}`;
const managesWebServer = !process.env.BASE_URL;

export default defineConfig({
  testDir: './e2e',
  timeout: process.env.CI ? 45_000 : 30_000,
  globalTimeout: process.env.CI ? 8 * 60_000 : undefined,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? 'line' : 'list',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  ...(managesWebServer
    ? {
        webServer: {
          command: `pnpm exec next start -p ${PORT}`,
          url: baseURL,
          reuseExistingServer: false,
          timeout: 120000,
        },
      }
    : {}),
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
