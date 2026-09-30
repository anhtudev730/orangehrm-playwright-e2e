import { test as base } from './orangehrm';
import type { OrangeHrmSteps } from '../sites/orangehrm/steps/orangeHrmSteps';
export const test = base.extend<{ authenticatedOrangeHrm: OrangeHrmSteps }>({
  authenticatedOrangeHrm: async ({ orangeHrm }, use) => {
    const username = process.env.E2E_USERNAME;
    const password = process.env.E2E_PASSWORD;
    if (!username || !password) throw new Error('Set E2E_USERNAME and E2E_PASSWORD in .env before authenticated tests.');
    await orangeHrm.openLogin();
    await orangeHrm.login(username, password);
    await orangeHrm.expectDashboard();
    await use(orangeHrm);
  }
});
export { expect } from '@playwright/test';
