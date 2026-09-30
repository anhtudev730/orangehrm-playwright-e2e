import { test } from '../../src/fixtures/authenticated';
test('@smoke dashboard loads after login', async ({ authenticatedOrangeHrm }) => {
  await authenticatedOrangeHrm.expectDashboard();
});
