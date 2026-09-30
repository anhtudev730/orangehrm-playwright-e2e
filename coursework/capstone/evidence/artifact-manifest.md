# Capstone artifact manifest

| Artifact | Run | Path | Redaction | Supports | Does not prove |
|---|---|---|---|---|---|
| Source spec | Not run | `tests/orangehrm/capstone.spec.ts` | No secrets/data | Scenario intent and configured business steps | Runtime success, archive, cleanup success |
| Cleanup record | Not generated | `cleanup-record.json` (test attachment) | Designed to include synthetic test ID and status only | Intended cleanup outcome per action when the scenario runs | Any result before execution |
| Run report/trace/screenshot | None | Unavailable | N/A | Nothing; no run | Any UI state or assertion result |
