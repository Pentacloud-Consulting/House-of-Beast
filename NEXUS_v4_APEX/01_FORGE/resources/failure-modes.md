## Failure Modes — 01_FORGE

## Symptom: Output is vague or non-contractual
[conf: DEFINITIVE]
- Cause: engine emitted prose-only without a typed artifact
- Fix: ensure 01_FORGE emits `contracts/prd.schema.json`, `contracts/acceptance-criteria.schema.json`, `contracts/ia.schema.json`, and `contracts/nav-decision.schema.json` artifacts

## Symptom: Navigation is organized by internal company structure
[conf: RECOMMENDED]
- Cause: IA grouped by org chart instead of user mental models
- Fix: run card sorting + tree testing prompts; rebuild sitemap until “find X from home” passes

## Symptom: Forms designed only for happy path
[conf: RECOMMENDED]
- Cause: missing invalid/disabled/error/empty/loading states
- Fix: define state matrices at PRD time; block downstream component work until matrices exist
