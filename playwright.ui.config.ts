import { defineConfig, devices } from '@playwright/test';
import baseConfig from './playwright.config';

export default defineConfig({
  ...baseConfig,
  testDir: './ui-tests',
  outputDir: './test-results/ui-tests',
  use: {
    ...(baseConfig.use ?? {}),
    screenshot: 'on',
    trace: 'on',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'desktop-ui',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: '**/responsive.spec.ts'
    },
    {
      name: 'mobile-ui',
      use: { ...devices['Pixel 7'] },
      testMatch: '**/responsive.spec.ts'
    }
  ],
  reporter: [
    ['html', { open: 'never', outputFolder: 'playwright-report/ui-tests' }],
    ['./src/core/terminalReporter.ts']
  ]
});
