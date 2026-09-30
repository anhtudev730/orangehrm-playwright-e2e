# PMLM exercise mapping and completion estimate

## Assessment snapshot

**Estimated completion: 55% overall** (source implementation about 70%; live-run/DOM evidence and environment-specific acceptance about 25%). This is a deliverable-based estimate, not a score or a claim that tests passed. Existing code supplies the Playwright/TypeScript setup, Elements → Pages → Steps → Specs boundaries, environment-based sign-in, several OrangeHRM workflows, PMLM-001, strict locator guards, confirmation scoping, and cleanup outcome attachments. The missing approved live environment, DOM inspection, repeated incident runs, and confirmed archive/audit lifecycle prevent completion.

The assignment's stated target is PortalLite and references AC-AUTH/EMP/AUD contracts. This repository targets the OrangeHRM demo. No course content, acceptance-criteria definitions, approved account, or fresh DOM/live-run evidence was available during this review. Accordingly, app-specific names, archive behavior, audit events, and live outcomes remain `UNKNOWN` or `NEEDS-EVIDENCE` below. Static inspection is labeled `REQ-CONFIRMED` only for repository/assignment facts.

| Unit | Estimate | Current state |
|---|---:|---|
| U1 lifecycle/MCP | 70% | Lifecycle, ownership/isolation, evidence boundary, and five safe-use rules documented; target inspection absent. |
| U2 first live run | 65% | Inventory and PMLM-001 source complete; live execution record absent. |
| U3 locator inventory | 45% | Locator inventory and source factories documented; accessibility/role/name evidence absent. |
| U4 hardening | 75% | Policy, risk register, and >8 positional locator refactors; DOM validation/run absent. |
| U5 synchronization | 65% | State model, no-sleep rationale, strict guards, and cleanup record implemented; repeat-run matrix absent. |
| U6 AI review | 75% | Bounded prompt, line decisions, substantive findings, code review, and provenance written; live validation absent. |
| U7 incident | 35% | Triage, reproduction matrix, manifest, and patch direction written; original artifacts and three actual runs absent. |
| Capstone | 40% | Artifacts and create/find/remove spec implemented; required archive/audit and live evidence absent. |

## Repository mapping

- `tests/` maps to `tests/specs`; current project uses `tests/orangehrm/*.spec.ts`.
- `tests/orangehrm/support/` maps to `tests/fixtures` and `tests/support` for data/cleanup.
- `src/sites/orangehrm/elements`, `pages`, and `steps` match the exercise layers.
- `src/fixtures` owns per-test Playwright fixtures and authentication setup.
- `src/core` owns shared page/step/reporting behavior.
- Evidence and exercise writeups live under `coursework/`.

## Validation boundary

No live test was run as part of this implementation, and no environment credentials were read or emitted. A typecheck or test discovery alone would not establish `RUN-PASSED`. To complete live evidence, use only an explicitly approved synthetic OrangeHRM environment/account, record a sanitized command and artifacts, and confirm cleanup. The shared public demo is not assumed authorized for creating or deleting records.

See the U1–U7 notes and `capstone/` for per-requirement status and next evidence needed.
