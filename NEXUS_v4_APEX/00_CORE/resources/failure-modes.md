## Failure Modes — 00_CORE

## Symptom: Output is vague or non-contractual
[conf: DEFINITIVE]
- Cause: engine emitted prose-only without a typed artifact
- Fix: ensure 00_CORE emits contracts/execution-plan.schema.json shaped output

## Symptom: Wrong engine set picked (too big or missing a critical engine)
[conf: RECOMMENDED]
- Cause: routing matrix too sparse or intent class misread
- Fix: consult `resources/routing-matrix.md` and pick minimum set; if security/perf/seo is involved, include `15_SECURE`/`16_PERFORM`/`21_SEO` as required

## Symptom: Contract chain has missing producers
[conf: DEFINITIVE]
- Cause: an engine consumes a contract that no engine emits
- Fix: run `node scripts/contract-chain.mjs` and correct `_genome.yaml` outputs/inputs (missing producers must fail)

## Symptom: Orphan contracts accumulate
[conf: RECOMMENDED]
- Cause: engines emit artifacts nobody consumes (waste + drift)
- Fix: allow as WARN, but periodically refactor: either add a consumer or stop emitting the artifact
