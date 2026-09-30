# U1 — Execution model and MCP boundary

## Lifecycle

```text
npm run test:single -- <spec>
  → Playwright config loads dotenv and selects chromium/project settings
  → test discovery builds scenario and fixture dependency graph
  → worker starts; test-scoped page/browser context are provided by Playwright
  → orangeHrm fixture constructs Steps around the page
  → authenticated fixture opens login, submits env credentials, asserts dashboard
  → spec calls Steps → Pages → Elements; Playwright assertions observe UI state
  → reporter writes HTML/terminal output and failure artifacts per config
  → fixture teardown closes test resources; application data cleanup currently belongs to explicit spec finally blocks
```

Ownership: Playwright manages the browser process per worker/project; each test receives isolated context/page; the fixture owns the `OrangeHrmSteps` wrapper for that test; cleanup helper owns best-effort deletion/restoration of data created by that scenario. A shared mutable employee used by two workers can cause one scenario to edit/delete another's record, yielding false results and data loss. Use unique synthetic IDs and scenario-scoped records.

## Evidence ledger

| Label | Fact | Basis |
|---|---|---|
| `REQ-CONFIRMED` | Config selects Chromium, env BASE_URL, and configured screenshot/video/trace retention. | Static inspection of `playwright.config.ts`. |
| `REQ-CONFIRMED` | Fixture creates a test-scoped `OrangeHrmSteps`; auth fixture asserts dashboard after login. | Static inspection of `src/fixtures`. |
| `UNKNOWN` | Actual username/password label and submit accessible name on the live target. | No permitted DOM inspection supplied. |
| `UNKNOWN` | A live test passed on the configured target. | No live execution record. |

A screenshot/snapshot can support visible or accessible UI facts at capture time. It cannot establish that the original test command ran, its assertions passed, teardown completed, or the application persisted the expected state. A typecheck or test discovery also cannot establish runtime behavior.

## MCP safe-use rules

1. Confirm the target, account, and permitted actions before interacting; stay within approved test scope.
2. Use least privilege and synthetic records; avoid destructive actions unless the environment explicitly permits them.
3. Never send secrets, tokens, cookies, PII, payment data, or raw sensitive logs to MCP or artifacts.
4. Label observations `DOM-OBSERVED` and execution outcomes `RUN-PASSED`/`RUN-FAILED` only from actual run evidence; preserve unknowns.
5. Review generated locators/actions against requirements and DOM evidence before committing; keep sanitized provenance and cleanup status.
