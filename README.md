# OrangeHRM Playwright E2E

TypeScript / Playwright Test framework. Specs use test-scoped OrangeHrmSteps; selectors are under Elements, screen behavior under Pages, and business flows under Steps.

## Setup
Install Node.js 20+, then run npm install and npx playwright install chromium. Copy .env.example to .env and set E2E_USERNAME and E2E_PASSWORD. Optional: set E2E_LEAVE_TYPE to a leave type available in the demo tenant (default US - Vacation). Run npm run typecheck and npm run test:smoke.

## Coverage
Login validation, authenticated dashboard, PIM employee creation/list, Admin ESS user create/search/role check, Leave entitlement and apply/approval/cancel flow, Directory search, and best-effort cleanup of test-created users, employees, entitlements, and leave requests through a shared cleanup helper. Test data uses unique E2E-PMLM-prefixed names. Cleanup targets exact generated names and is attempted in finally blocks. The shared demo can reject names/leave types or retain data if the remote UI is unavailable; inspect the HTML report and test artifacts after a run.

## Commands
npm test
npm run test:sequential
npm run test:parallel
npm run test:single -- tests/orangehrm/admin.spec.ts
npm run test:headed
npm run test:ui
npm run test:debug
npm run test:report

Environment: BASE_URL, E2E_USERNAME, E2E_PASSWORD, E2E_LEAVE_TYPE, PW_HEADLESS, PW_WORKERS, PW_FULLY_PARALLEL, PW_RETRIES, PW_RETAIN_TRACE. Local defaults are headed, one worker, no full parallelism, zero retries. CI defaults to headless and two retries. Failure artifacts include screenshot, video, and trace; PW_RETAIN_TRACE=true also keeps passing traces.

## Layout
tests/orangehrm: specs and support test data.
src/fixtures: per-test and authenticated fixtures.
src/sites/orangehrm: OrangeHRM Elements, Pages, and Steps.
src/core: shared page/step primitives and terminal reporting.

## CI

Pull requests run OrangeHRM smoke tests with GitHub Actions.