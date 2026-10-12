import { test } from '../../../src/fixtures/orangehrm';

test('ESS user does not see the Admin menu', async ({ orangeHrm }) => {
  const username = process.env.E2E_ESS_USERNAME;
  const password = process.env.E2E_ESS_PASSWORD;
  test.skip(!username || !password, 'Set E2E_ESS_USERNAME and E2E_ESS_PASSWORD to run the ESS navigation check.');

  await orangeHrm.openLogin();
  await orangeHrm.login(username!, password!);
  await orangeHrm.expectDashboard();
  await orangeHrm.expectAdminMenuHidden();
});
