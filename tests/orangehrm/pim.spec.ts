import { test } from '../../src/fixtures/authenticated';
test('opens the PIM employee list', async ({ authenticatedOrangeHrm }) => {
  await authenticatedOrangeHrm.goTo('PIM');
  await authenticatedOrangeHrm.expectEmployeeList();
});
