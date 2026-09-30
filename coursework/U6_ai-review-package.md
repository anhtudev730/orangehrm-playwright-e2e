# U6 — AI review package

## Bounded prompt (sanitized)

Goal: review/refactor the OrangeHRM employee search and delete flow against the course locator/synchronization requirements. Requirement references: `AC-EMP-01/02/03` are unavailable here and must be treated as `UNKNOWN`. The initial code review found positional autocomplete, row, and icon-button selectors; these have since been removed in source. Elements → Pages → Steps → Specs layers exist. No live DOM facts are verified. Return proposed diffs and a table labeling every assumption `NEEDS-EVIDENCE`; do not invent accessible names or archive/audit behavior. Prohibited: secrets, tokens, PII, production logs. Do not claim execution passed without a live run record.

## Draft review

| Draft line | Decision | Finding |
|---|---|---|
| `page.locator('.employee-form button').last().click()` | `REJECT` | CSS + positional selection is ambiguous and not evidence-backed. Scope to verified named form/dialog and uniquely named action. |
| `page.waitForTimeout(3000)` | `REJECT` | Fixed delay has no state/event contract and can be both slow and flaky. |
| `expect(page.getByText('Success')).toBeVisible()` | `CHANGE` | A generic toast may be duplicate/transient and does not prove the employee is persisted/searchable. Assert business state. |
| `page.getByText(employeeId).click({ force: true })` | `REJECT` | Text target is not a verified interactive control; force bypasses actionability and UI intent. |

## Human findings

1. Positional autocomplete option may select the wrong employee.
2. Broad row text plus `.first()` can pass against a duplicate or unrelated row.
3. Positional icon-button selection can choose a different action.
4. A toast does not establish persisted/searchable business state.
5. `force: true` bypasses visibility/actionability and can mask overlay or locator defects.
6. Current repository deletes employees; archive lifecycle is not demonstrated.
7. No live run or cleanup evidence is available, so these are static review findings only.

## Validation

Human review status: static review completed and code updated. Changes include PMLM-001, capstone create/find/remove, the `E2E-PMLM-` data prefix, dashboard URL assertion, exact-one option/row guards, named row action proposals, and dialog-scoped confirmation. No AI-generated locator was accepted. Typecheck passes; no live test execution is claimed. Sanitized provenance: this package was prepared from the supplied exercise and repository source; no secrets or user records were included.
