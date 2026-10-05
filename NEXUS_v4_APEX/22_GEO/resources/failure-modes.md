## Failure Modes — 22_GEO

## Symptom: Output is vague or non-contractual
[conf: DEFINITIVE]
- Cause: engine emitted prose-only without a typed artifact
- Fix: ensure 22_GEO emits `contracts/ai-crawlers.schema.json`, `contracts/llms-txt.schema.json`, `contracts/entities.schema.json` artifacts
