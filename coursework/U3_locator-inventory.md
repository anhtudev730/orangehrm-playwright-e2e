# U3 — Locator inventory

No live page, accessibility tree, or sanitized DOM snapshot was supplied. Proposed roles/names below are `NEEDS-EVIDENCE`; they must not be described as observed facts. Existing source selectors are identified separately as static code inspection.

| Feature | User intent | Locator proposal | Scope | Evidence | Uniqueness guard | Fallback/decision |
|---|---|---|---|---|---|---|
| Employee search | Enter employee name | `getByRole('textbox', { name: /employee name/i })` | Search form | `UNKNOWN` | Count 1 before fill | Existing PIM uses `.oxd-input-group`; inspect label association first. |
| Add employee | Open create form | `getByRole('button', { name: 'Add', exact: true })` | Employee list page | `NEEDS-EVIDENCE` | Count 1 | Existing Elements locator; verify name and uniqueness on target. |
| Search result | Select employee suggestion | `getByRole('option', { name: exact employee name })` | Autocomplete/listbox | `NEEDS-EVIDENCE` | Count 1; do not select `.first()` | Existing `.first()` is a positional ambiguity risk. |
| Employee row | Identify exact record | `getByRole('row').filter({ has: getByRole('cell', { name: exactId }) })` | Table | `UNKNOWN` | Expect exactly 1 row | Current flow has no captured employee ID; inspect table roles/cells. |
| Department | Verify chosen department | Exact cell or labeled field locator | Row/form | `UNKNOWN` | Scoped exact value | Must confirm application exposes department and its accessible name. |
| Edit/Delete action | Open employee action | Named button scoped to exact row | Row | `NEEDS-EVIDENCE` | Exact role/name count 1 | Source now proposes `Delete` within exact row; inspect accessible name and uniqueness before accepting. |
| Create dialog | Save or cancel | Named dialog, then exact Save/Cancel buttons | Dialog | `UNKNOWN` | Dialog and button count 1 | No dialog state inspection recorded. |

Accessibility findings: `UNKNOWN` for missing names/labels because no target evidence was inspected. Source locators in `PimElements` are factories at Elements layer, but currently expose only Add/form fields/Save/rows and do not cover the full exercise inventory.
