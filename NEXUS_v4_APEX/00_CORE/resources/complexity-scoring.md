## Complexity scoring (Phase 4): FCI / BFRI / MFRI / CRI

[conf: RECOMMENDED]

Goal: pick the **minimum engine set** + correct **mode** (lite/pro/apex) per engine.

### FCI — Feature Complexity Index (web features)

Score 0–10:
- +2: auth/session/roles involved
- +2: payments/checkout or PII handling
- +2: data model change or migrations
- +2: multi-system integration (webhooks/3rd party APIs)
- +1: advanced UI state (optimistic, offline, realtime)
- +1: perf-sensitive surface (home/checkout/search)

### BFRI — Bug Fix Risk Index (production fixes)

Score 0–10:
- +3: incident active / user impact high
- +2: touches auth/payments/security boundary
- +2: touches caching/invalidation or concurrency
- +2: regression risk high (no tests, unclear repro)
- +1: requires data backfill or migration

### MFRI — Mobile Feature Risk Index (native-only tasks)

Score 0–10:
- +3: offline dependence or sync conflicts
- +2: navigation/deep links/push notifications
- +2: performance risk (lists, images, animations)
- +2: sensitive data storage
- +1: app store submission requirements

### CRI — Citation Readiness Index (content / GEO tasks)

Score 0–10:
- +3: requires primary evidence / data originality
- +2: compliance/regulatory claims
- +2: entity facts must be consistent across sources
- +2: high-stakes queries (YMYL-like)
- +1: international/multi-locale implications

### Mode mapping (per engine)

- 0–2 → `lite`
- 3–6 → `pro`
- 7–10 → `apex`

Override rule: if a maturity gap exists in the required layer (see `maturity-rubric.md`), escalate one tier.

