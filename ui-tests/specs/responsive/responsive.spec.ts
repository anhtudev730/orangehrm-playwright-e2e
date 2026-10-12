import { expect } from '@playwright/test';
import { test } from '../../../src/fixtures/orangehrm';

test('login screen fits a mobile viewport', async ({ orangeHrm, page }, testInfo) => {
  await orangeHrm.openLogin();
  await orangeHrm.expectLoginForm();

  const dimensions = await page.evaluate(() => ({
    viewportWidth: window.innerWidth,
    documentWidth: document.documentElement.scrollWidth
  }));
  expect(dimensions.documentWidth).toBeLessThanOrEqual(dimensions.viewportWidth);

  await testInfo.attach('mobile-login-screen.png', {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png'
  });
});
