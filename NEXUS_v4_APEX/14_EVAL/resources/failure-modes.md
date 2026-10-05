## Failure Modes — 14_EVAL

## Symptom: Output is vague or non-contractual
[conf: DEFINITIVE]
- Cause: engine emitted prose-only without a typed artifact
- Fix: ensure 14_EVAL emits `contracts/eval-plan.schema.json` and `contracts/golden-set.schema.json` artifacts
