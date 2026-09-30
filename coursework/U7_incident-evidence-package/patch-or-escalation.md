# Patch or escalation proposal

Keep archive-specific locator proposal `NEEDS-EVIDENCE`: inspect for a dialog role/name `Archive employee` and inspect the exact confirmation button name and uniqueness. The source now has a shared confirmation helper that scopes generic confirmations to a unique dialog; for this incident, pass the verified dialog name to that helper after observation. Then assert exact synthetic employee absence from active search. Do not infer successful archival from a toast.

Escalate as an automation locator defect only after a reproducible duplicate match is captured. Escalate as an accessibility finding only if observed controls lack distinguishable accessible names. Current repository action is employee deletion, not archive; changing product-flow semantics requires a confirmed application contract.
