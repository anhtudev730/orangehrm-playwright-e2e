# U2 — PMLM-001 first live run

## Repository inventory

| Item | Finding |
|---|---|
| Runner | Playwright Test, package scripts include `test:single`, `test:smoke`, and typecheck. |
| Browser/project | Chromium project in `playwright.config.ts`. |
| Base URL | `BASE_URL` or public OrangeHRM demo default. |
| Secrets | `dotenv/config`; `E2E_USERNAME` and `E2E_PASSWORD` read from environment. `.env` is ignored. |
| Artifacts | HTML and terminal reporters; screenshots/video on failure; trace on failure unless retain-all env set. |
| CI | `CI` toggles headless/retries; worker count and parallelism are environment-controlled. |

These are static configuration observations, not a live target confirmation. No CI workflow file is present in this repository snapshot.

## Implementation

`tests/orangehrm/login.spec.ts` now contains PMLM-001: open sign-in, submit credentials from environment, then assert the `/dashboard/index` URL and Dashboard heading through the shared business flow. The test skips with an explicit reason if credentials are absent. These are source assertions; live URL/heading and credential field accessibility still need confirmation against the approved target.

## Run record

- Test ID: `PMLM-001` plus authenticated specs in the full run
- Command: `npm test`
- Target: configured default `https://opensource-demo.orangehrmlive.com`; authorization/account not established
- Browser/project: Chromium
- Source revision: local workspace snapshot; no Git metadata available
- Test data ID: none; authenticated fixture failed before any test data action
- Result: `ENV-BLOCKED`. Playwright recorded six failed authenticated specs on 2026-09-28; each saved error context says `Set E2E_USERNAME and E2E_PASSWORD in .env before authenticated tests.`
- Assertions observed: no dashboard assertion ran in those six specs; the fixture threw before `openLogin()`.
- Artifacts: sanitized error-context files under `test-results/` and the HTML report; no secrets are included in this record.
- Cleanup: not applicable; setup stopped before creating data.
- Notes: `PMLM-001` explicitly skips when either variable is absent. The `.env.example` template has blank credential values. This run does not show that the site rejected a login; it shows credentials were unavailable to the fixture. Use an approved synthetic account, then rerun the focused login test.
