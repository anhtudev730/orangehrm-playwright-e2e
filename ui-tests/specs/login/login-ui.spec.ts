import { test } from '../../../src/fixtures/orangehrm';

test.describe('Login UI', () => {
  test('@smoke displays the login form', async ({ orangeHrm }) => {
    await orangeHrm.openLogin();
    await orangeHrm.expectLoginForm();
  });

  test('shows an authentication error for invalid credentials', async ({ orangeHrm }) => {
    await orangeHrm.openLogin();
    await orangeHrm.login('invalid-user', 'invalid-password');
    await orangeHrm.expectInvalidCredentials();
  });

  test('keeps the login form visible when credentials are empty', async ({ orangeHrm }) => {
    await orangeHrm.openLogin();
    await orangeHrm.login('', '');
    await orangeHrm.expectLoginForm();
  });
});
