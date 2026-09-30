# U5 — Synchronization rationale

## State model

`empty form → validating → submitting → created/indexed → found in active list → archived/deleted`.

For this OrangeHRM repo, employee creation currently transitions to a Personal Details heading; search waits for a suggestion and then a visible row; delete waits for zero matching rows. These are web-first assertions, with exact-one suggestion/row guards and dialog-scoped confirmation. The proposed accessible names and dialog role still need live DOM verification. There is no confirmed archive state in the repository: it performs delete, so it does not satisfy an archive contract.

| Trigger action | Expected state | Selected signal | Why | Rejected option | Evidence |
|---|---|---|---|---|---|
| Save employee | Details page for new employee | Heading visibility assertion | User-visible destination state | Fixed sleep | Static code only; no run (`UNKNOWN`) |
| Search | Unique employee appears | Exact matching row count/visibility | Confirms indexed UI state and identity | Arbitrary sleep or first matching row | Needs DOM proof for ID cell |
| Delete confirmation | Employee absent from active list | Zero matching rows | Confirms resulting active-list state | Toast alone | Static code only; no run |

`waitForTimeout` was not found in the reviewed flows. That alone does not establish stability. Positional selection was removed from the reviewed source and exact-one guards were added. New accessible button-name proposals still need DOM verification. No multi-run distribution is available. Run matrix: `0 executed / 0 pass / 0 fail / 0 blocked`; stability conclusion `UNKNOWN`.

## Cleanup

Existing specs put best-effort cleanup in `finally`, using generated exact names. Data prefix was changed to `E2E-PMLM-`. Cleanup now captures per-action `CLEANUP-PASSED`/`CLEANUP-FAILED` outcomes without logging secrets; the capstone attaches a sanitized JSON cleanup record. No records were created in this implementation, so runtime cleanup outcome remains `UNKNOWN`.
