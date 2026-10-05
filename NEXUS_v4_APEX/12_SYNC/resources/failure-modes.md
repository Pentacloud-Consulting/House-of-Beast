## Failure Modes — 12_SYNC

## Symptom: Output is vague or non-contractual
[conf: DEFINITIVE]
- Cause: engine emitted prose-only without a typed artifact
- Fix: ensure 12_SYNC emits `contracts/sync-strategy.schema.json` and `contracts/webhook-reliability.schema.json` artifacts

## Symptom: Webhook double-processing
[conf: DEFINITIVE]
- Cause: missing idempotency
- Fix: enforce idempotency key + persistence; dedupe at handler
