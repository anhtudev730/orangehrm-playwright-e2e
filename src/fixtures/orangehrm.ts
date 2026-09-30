import { test as base } from '@playwright/test';
import { OrangeHrmSteps } from '../sites/orangehrm/steps/orangeHrmSteps';
export type OrangeHrmFixture = { orangeHrm: OrangeHrmSteps };
export const test = base.extend<OrangeHrmFixture>({
  orangeHrm: async ({ page }, use) => { await use(new OrangeHrmSteps(page, (title, body) => base.step(title, body))); }
});
export { expect } from '@playwright/test';
