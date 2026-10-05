---
name: 16_PERFORM
description: "Performance engine: Core Web Vitals, caching layers, edge strategy, bundle budgets, rendering decisions."
---

## L1

- Emit performance budgets and CWV target contracts.

## L2 (Module 09 alignment: CWV + caching + advanced APIs)

- CWV targets: LCP < 2.5s, INP < 200ms, CLS < 0.1.
- LCP path: identify LCP element; preload LCP image; never lazy-load LCP; use CDN + AVIF/WebP.
- INP path: reduce long tasks; split bundles; move CPU work to Web Workers when >5ms.
- CLS path: reserve space; preload fonts; avoid FOUT-induced shifts.
- Caching rules: HTML revalidate (ETag), static assets cache-forever with hashing, vary headers, TTL strategy.
- Speculation Rules API: preload/prerender likely navigations for instant feel (opt-in).

## L3 (resources/templates)

- `resources/cwv.md`
- `resources/caching.md`
- `resources/speculation-rules.md`
- `templates/lighthouse-budgets.json`
- Contracts: `contracts/cwv-budget.schema.json`, `contracts/caching.schema.json`, `contracts/speculation-rules.schema.json`

