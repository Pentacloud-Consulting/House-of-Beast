## Failure Modes — 11_DATA

## Symptom: Output is vague or non-contractual
[conf: DEFINITIVE]
- Cause: engine emitted prose-only without a typed artifact
- Fix: ensure 11_DATA emits `contracts/data-model.schema.json`, `contracts/indexing.schema.json`, and `contracts/scaling.schema.json` artifacts

## Symptom: N+1 queries in production
[conf: DEFINITIVE]
- Cause: ORM relation fetching not batched/eager loaded
- Fix: enforce eager loading + DataLoader; add dev query analysis gate
