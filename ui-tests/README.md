# UI Test suite

This suite checks user-visible form states, navigation, and session behavior independently from the existing OrangeHRM business-flow E2E suite under `tests/orangehrm`.

## Run

- `npx playwright test --config=playwright.ui.config.ts`
- `npx playwright test --config=playwright.ui.config.ts --grep @smoke`
- `npx playwright test --config=playwright.ui.config.ts --headed`
- `npx playwright show-report playwright-report/ui-tests`

The suite reuses fixtures and page behavior from `src/`. Keep locators in the existing `src/sites/orangehrm/elements` layer and UI actions in `src/sites/orangehrm/pages`; do not create duplicate page objects here.

The role-based navigation spec uses optional `E2E_ESS_USERNAME` and `E2E_ESS_PASSWORD` credentials. It skips with a clear reason when either value is missing. Keep credentials in `.env` or CI secrets, never in source control.

The desktop project runs the functional UI checks. The mobile project runs only `specs/responsive/responsive.spec.ts` at the Pixel 7 viewport. The UI config saves a screenshot and trace for every test under `test-results/ui-tests`; video is retained on failure. The responsive test also attaches a full-page screenshot to the HTML report.
