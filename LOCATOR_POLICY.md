# Locator policy

## Priority

1. Use role and accessible name when the rendered accessibility tree confirms both.
2. Use an associated label or placeholder when observed and stable.
3. Use a documented `data-testid` hook when semantic identification is unavailable; the component owner maintains it.
4. Use a scoped CSS locator only when DOM evidence shows no stable semantic hook. Record the reason and owning page/component.

Locators belong in `src/sites/<site>/elements`; Pages own UI behavior, Steps own business flows, and Specs own scenario intent and assertions. Specs must not introduce ad hoc selectors when an Elements/Pages factory can express the intent.

## Strictness and evidence

- Scope repeated controls to a named dialog, form, row, or other verified component.
- Assert the expected count before acting when uniqueness is part of the requirement.
- Do not use `.first()`, `.last()`, `.nth()`, positional CSS, full XPath, generated classes, or `force: true` to hide ambiguity.
- An uninspected locator proposal is `NEEDS-EVIDENCE`, not a verified locator.
- Do not infer `RUN-PASSED` from typecheck, test discovery, screenshots, or MCP snapshots.

## Test IDs and exceptions

Use `data-testid` only when role/name/label cannot express the user intent. Keep IDs stable, descriptive, and owned by the UI component (for example `employee-search-submit`). Each exception must record the DOM limitation, scope, uniqueness check, owner, and removal/review condition in the locator inventory or PR.

## PR checklist

- [ ] Locator points to verified user intent and is scoped.
- [ ] Duplicate-match behavior is explicit; uniqueness is asserted where required.
- [ ] No positional selector, fixed sleep, force action, or unexplained timeout was introduced.
- [ ] Requirement/DOM basis and exception owner are documented.
- [ ] Live run evidence is labeled separately from static validation.
- [ ] Synthetic data uses the required prefix and teardown is reviewed.
- [ ] No credential, token, PII, or sensitive runtime output is committed.
