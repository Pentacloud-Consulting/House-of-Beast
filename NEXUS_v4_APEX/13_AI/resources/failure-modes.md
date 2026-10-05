## Failure Modes — 13_AI

## Symptom: Output is vague or non-contractual
[conf: DEFINITIVE]
- Cause: engine emitted prose-only without a typed artifact
- Fix: ensure 13_AI emits `contracts/tool-contracts.schema.json` and `contracts/rag-plan.schema.json` artifacts
