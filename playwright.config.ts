import 'dotenv/config';
import { defineConfig, devices } from '@playwright/test';
const isTrue = (value: string | undefined): boolean => value?.toLowerCase() === 'true';
export default defineConfig({
  testDir: './tests',
  fullyParallel: isTrue(process.env.PW_FULLY_PARALLEL),
  workers: Number(process.env.PW_WORKERS ?? 1),
  retries: Number(process.env.PW_RETRIES ?? (process.env.CI ? 2 : 0)),
  reporter: [['html', { open: 'never' }], ['./src/core/terminalReporter.ts']],
  use: {
    baseURL: process.env.BASE_URL ?? 'https://opensource-demo.orangehrmlive.com',
    headless: process.env.PW_HEADLESS === undefined ? Boolean(process.env.CI) : isTrue(process.env.PW_HEADLESS),
    screenshot: 'only-on-failure', video: 'retain-on-failure',
    trace: isTrue(process.env.PW_RETAIN_TRACE) ? 'on' : 'retain-on-failure',
    ...devices['Desktop Chrome']
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }]
});
