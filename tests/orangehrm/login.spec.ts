import { test } from '../../src/fixtures/orangehrm';
test.describe('Login', () => {
  test('@smoke renders the login form', async ({ orangeHrm }) => { await orangeHrm.openLogin(); await orangeHrm.expectLoginForm(); });
  test('@smoke PMLM-001 authenticates and reaches the dashboard', async ({ orangeHrm }) => {
    const username = process.env.E2E_USERNAME;
    const password = process.env.E2E_PASSWORD;
    test.skip(!username || !password, 'Requires an approved synthetic account in E2E_USERNAME and E2E_PASSWORD.');
    await orangeHrm.openLogin();
    await orangeHrm.login(username!, password!);
    await orangeHrm.expectDashboard();
  });
  test('rejects invalid credentials', async ({ orangeHrm }) => {
    await orangeHrm.openLogin(); await orangeHrm.login('invalid-user', 'invalid-password'); await orangeHrm.expectInvalidCredentials();
  });
});
