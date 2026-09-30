# U4 — Locator risk register

Static source review only. No original 12-selector legacy exercise pack or DOM/accessibility snapshots were provided, so priority below applies to selectors observed in this repository.

| Selector/pattern | Priority | Reason | Action/status |
|---|---|---|---|
| `.oxd-input-group` then text filter | P1 | Generated implementation class and broad group scope may change or match multiple groups. | `NEEDS-EVIDENCE`: prefer verified label/role or a named form scope. |
| `getByRole('option', { name: regex }).first()` | P0 | A duplicate suggestion silently selects by render order. | Remove positional selection; require one exact matching option before click. |
| `employeeRows().filter({ hasText: name }).first()` | P0 | Broad text match plus `.first()` can hide duplicate/misidentified employee rows. | Require exact employee ID/cell when DOM confirms table contract; assert count 1. |
| `.oxd-icon-button`.last() | P0 | Positional action can trigger the wrong row action. | `NEEDS-EVIDENCE`: inspect action names/attributes and scope to unique row. |
| `getByRole('button', { name: 'Save', exact: true })` | P1 | Page-wide duplicate Save buttons can cause strictness failure or wrong scope. | Scope to observed create form/dialog, then assert one. |
| `input[type=password]` | P2 | Stable input type but not user-facing name/label. | Prefer verified label or accessible role/name if present. |
| `getByRole('row')` | P3 | Semantic base is appropriate but needs specific row filtering. | Keep as factory; require unique row guard. |
| Directory placeholder `.first()` | P0 | Positional choice hides duplicate search inputs. | Removed; locator is now strict and the suggestion must be unique. |
| Admin password input `.nth(0)` / `.nth(1)` | P1 | Depends on DOM order and can fill the wrong credential field. | Replaced by password inputs scoped to Password/Confirm Password groups. |
| Admin/Leave broad row `.first()` | P0 | Could operate on a different user's/request's row when text collides. | Removed; exact-one row assertions added before actions. |
| Leave approve/cancel icon `.first()` / `.last()` | P0 | Positional icon action may trigger a different row command. | Replaced with named row action proposals; accessible names require DOM verification. |
| Leave toast `.first()` | P2 | First matching transient/heading text depends on render order. | Removed; success text is asserted without position. |

The policy in `../LOCATOR_POLICY.md` gives locator priority, test ID ownership, exception workflow, and PR checks. More than eight positional locator patterns were removed from PIM, Admin, Directory, and Leave; exact-one autocomplete/row guards, named action proposals, and confirmation-dialog scoping were added. Those role/name proposals and remaining CSS group/card scopes still need DOM-backed verification. The supplied legacy 12-selector file was not present, so this register covers actual repository selectors instead. No targeted live run was performed; result is `UNKNOWN`, not `RUN-PASSED`.
