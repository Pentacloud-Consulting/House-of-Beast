## Failure Modes — 19_SHIP

## Symptom: Output is vague or non-contractual
[conf: DEFINITIVE]
- Cause: engine emitted prose-only without a typed artifact
- Fix: ensure 19_SHIP emits `contracts/cicd.schema.json` and `contracts/deploy.schema.json` artifacts
