## NEXUS APEX v4.0

NEXUS APEX v4.0 is a **contract-first web architecture skill engine** (Next.js 15 default) that routes intent through modular engines and emits **typed, schema-validated artifacts** at every step.

### Commands (recommended)

Run these from `NEXUS_v4_APEX/`.

```bash
# full quality gate (strict validator + tests + final validate)
npm run gate

# run tests only
npm test

# strict contract validation only
npm run validate:contracts

# inference / heuristic pass (Pass 2; also runs inside final-validate)
npm run validate:contracts:inference

# token budget audit (engine-level)
npm run tokens:audit

# local engine/plugin overlay helpers (writes `.nexus/*.yaml`)
npm run engine:install -- 18_TEST
npm run engine:uninstall -- 18_TEST
npm run engine:deps -- 90_MEMORY
# or: node scripts/engine-deps.mjs --engine 90_MEMORY
npm run engine:describe -- 18_TEST
npm run plugin:install -- caveman

# session planning: emits `.nexus/.nexus-session.md`
node scripts/plan-session.mjs "Build me a landing page"

# contract DAG + helpers
node scripts/contract-chain.mjs
node scripts/deps.mjs
node scripts/orphans.mjs

# maturity + complexity scoring
node scripts/score-maturity.mjs
node scripts/score-complexity.mjs "Add auth + payments"

# validate bundle (what gate runs at the end)
node scripts/final-validate.mjs
```

### What you get

- **META layer** that wraps everything:
  - `00_CORE`: orchestration + routing + contract validation + tier loading
  - `0A_ANTISLOP`: preventive guardrails (anti-slop, safety, standards)
  - `0H_HERMES`: self-improvement loop with explicit approval + audit trail
  - `0P_PLUGINS`: optional plugin wrappers with graceful fallbacks
- **Domain engines** from UX/IA → tokens/design system → UI/a11y → API/data → security/performance/test → ship/observe → SEO/GEO
- **Project Memory** (`90_MEMORY`): persistent project context and short logs (compression) with conflict-safe writes

### Non-goals (to prevent framework conflict)

- NEXUS does **not** embed competing orchestrator frameworks.
- In particular, NEXUS does **not adopt BMAD Layer 1** (persona orchestration, workflow menus/codes, module marketplace).
- NEXUS **does absorb BMAD Layer 2 infrastructure patterns** (validation rules, customization/overrides, review patterns) as NEXUS-native behavior. Attribution lives only in `CHANGELOG.md` → “Pattern provenance”.

### Structure

All engines live under `NEXUS_v4_APEX/` as sibling to `NEXUS_v3_FINAL/`.

```
NEXUS_v4_APEX/
  00_CORE/
  0A_ANTISLOP/
  0H_HERMES/
  0P_PLUGINS/
  01_FORGE/ ... 22_GEO/
  90_MEMORY/ 91_PORTFOLIO/ 92_FREELANCE/ 93_MOBILE/
  scripts/
  tests/
  _style-reference/
  nexus.custom/
```

