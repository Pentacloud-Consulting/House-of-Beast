## NEXUS APEX v4.0 — Engine Cheatsheet

### META (always loaded)

- **`00_CORE`**: routing, contract validation, tier loading, phase orchestration, verify-work UAT
- **`0A_ANTISLOP`**: guardrails, hard-blocks, lifecycle hooks, reviewer subagents
- **`0H_HERMES`**: diff-based improvement proposals + approval + audit + effectiveness tracking
- **`0P_PLUGINS`**: plugin adapters (caveman / code-review-graph / claude-capsule-kit) + native fallbacks

### MEMORY

- **`90_MEMORY`**: `nexus.project.yaml`, short logs (compressed), conflict-safe memory writes, seeds/threads

### INTELLIGENCE

- **`01_FORGE`**: JTBD, IA, navigation decisions, PRD/AC artifacts, progressive disclosure
- **`02_INSIGHT`**: analytics event taxonomy, CRO, experiments/A-B testing, privacy-first measurement

### DESIGN SYSTEM

- **`03_PALETTE`**: OKLCH palettes, harmony rules, elevation/shadows, gradients, data-viz colors
- **`04_TYPE`**: modular scale, fluid type, font pairing, loading/perf, readability/kerning
- **`05_MOTION`**: motion principles, View Transitions, choreography, reduced motion compliance

### INTERFACE

- **`06_LAYOUT`**: responsive layout zones, svh/lvh/dvh/cqw, foldables, print, high-DPI
- **`07_COMPONENTS`**: component anatomy, slot architecture, state trees, loading/error states
- **`08_A11Y`**: WCAG 2.2, keyboard/focus, ARIA patterns, live regions, a11y CI practices

### ENGINE (implementation)

- **`09_BUILD`**: Next.js 15 App Router/RSC, commerce, email, i18n, monorepo guidance
- **`10_API`**: REST/GraphQL/tRPC, versioning, error envelopes, auth integration patterns
- **`11_DATA`**: schema design, indexing, N+1 mitigation, scaling strategy, connection pools
- **`12_SYNC`**: realtime vs async decision tree, offline queues, webhooks, background jobs
- **`13_AI`**: RAG, agents, tool contracts, safety constraints, cost routing interfaces
- **`14_EVAL`**: golden sets, eval harnesses, LLM-as-judge, hallucination tests, regression tracking

### HARDENING

- **`15_SECURE`**: 11-layer security model, CSP, upload protocol, encryption, audit logs
- **`16_PERFORM`**: CWV (LCP/INP/CLS), caching layers, edge, bundle budgets, rendering strategy
- **`17_GOVERN`**: retention, DSAR, evidence debugging, compliance-as-code
- **`18_TEST`**: testing trophy, static analysis, visual regression, a11y tests, CI gates

### DELIVERY

- **`19_SHIP`**: CI/CD, blue-green/canary, IaC, secrets, rollback doctrine, feature flags
- **`20_OBSERVE`**: OTel, RUM, synthetics, SLOs, PII scrubbing, incident loops

### GROWTH

- **`21_SEO`**: crawlability, sitemaps, schema per page-type, pillar clusters, international SEO
- **`22_GEO`**: AI crawler strategy, citations, entity establishment, llms.txt, AEO patterns

### OPERATOR (legacy-native contexts; kept)

- **`91_PORTFOLIO`**, **`92_FREELANCE`**, **`93_MOBILE`**: carried from v3 (native-only contexts), re-expressed with contracts

