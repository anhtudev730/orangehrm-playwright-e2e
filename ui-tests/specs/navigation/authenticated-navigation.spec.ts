import { test } from '../../../src/fixtures/authenticated';

test('opens the PIM employee list from authenticated navigation', async ({ authenticatedOrangeHrm }) => {
  await authenticatedOrangeHrm.goTo('PIM');
  await authenticatedOrangeHrm.expectEmployeeList();
});

test('returns to the login form after logout', async ({ authenticatedOrangeHrm }) => {
  await authenticatedOrangeHrm.logout();
  await authenticatedOrangeHrm.expectLoginForm();
});
