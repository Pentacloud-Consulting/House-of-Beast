## Failure Modes — 20_OBSERVE

## Symptom: Output is vague or non-contractual
[conf: DEFINITIVE]
- Cause: engine emitted prose-only without a typed artifact
- Fix: ensure 20_OBSERVE emits `contracts/observability.schema.json`, `contracts/rum.schema.json`, `contracts/error-monitoring.schema.json` artifacts
