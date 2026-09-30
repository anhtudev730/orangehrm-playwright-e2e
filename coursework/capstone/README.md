# Capstone — employee lifecycle (partial OrangeHRM adaptation)

## Scope and prerequisites

The supplied capstone expects employee create/search/archive/audit behavior on PortalLite or an approved application. This repository is an OrangeHRM adapter. The current source flow can create, find, and delete a uniquely named employee; no archive or audit contract is verified, so those requirements remain open. Do not present delete as archive.

Prerequisites: use an explicitly approved synthetic environment/account configured with `BASE_URL`, `E2E_USERNAME`, and `E2E_PASSWORD`. Do not use production or the public demo for destructive/data-creating tests without authorization.

Sanitized command: `npm run test:single -- tests/orangehrm/capstone.spec.ts`

The spec contains three business-level `test.step()` sections. Generated employee names begin `E2E-PMLM-`; cleanup is attempted in `finally` and its result is attached as `cleanup-record.json`. Runtime cleanup still must be confirmed in a real run. Locator semantics/unique row matching still need hardening and DOM evidence.

## Requirement status

| Required behavior | Status |
|---|---|
| Secret/environment sign-in | Implemented in shared authenticated fixture; live validation `UNKNOWN`. |
| Create uniquely named employee | Implemented in capstone spec. |
| Search employee | Implemented; current selection/row locators have positional risk. |
| Confirmed archive and active-search absence | `UNKNOWN` / not implemented; current adapter deletes. |
| Audit event | `UNKNOWN`; no approved audit contract present. |
| Cleanup-safe teardown | `PARTIAL`; best-effort `finally` cleanup exists; run result absent. |
| Three business steps | Implemented in capstone spec. |

See sibling artifacts for locator inventory, synchronization, AI review, and evidence records. No live execution is claimed.
