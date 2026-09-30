# Capstone review checklist

- [x] PMLM-generated employee names use the required `E2E-PMLM-` prefix.
- [x] Sign-in reads credentials from environment, not source.
- [x] Cleanup is in `finally` and exact generated employee name is targeted.
- [x] Three business-level steps are present.
- [ ] Verify target/account is explicitly approved.
- [ ] Inspect and record DOM/accessibility evidence for every locator.
- [ ] Replace positional selection with evidence-backed exact scoped locators.
- [ ] Implement archive only if the approved app exposes the required contract; assert active absence.
- [ ] Verify audit event only if environment exposes AC-AUD-01.
- [ ] Run focused scenario and record actual outcome/artifacts/cleanup.
