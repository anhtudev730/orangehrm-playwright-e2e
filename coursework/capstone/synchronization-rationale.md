# Capstone synchronization rationale

See `../U5_synchronization-rationale.md`. Current code uses Playwright web-first assertions for post-create, search, and removal states, with exact-one row/suggestion guards and no positional selectors or fixed sleeps in the reviewed source. The new accessible names/dialog role still need live DOM verification. Archive state and audit-event contract are `UNKNOWN`; no assertion is fabricated. No repeated run matrix exists.
