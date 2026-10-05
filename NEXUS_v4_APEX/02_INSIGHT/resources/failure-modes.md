## Failure Modes — 02_INSIGHT

## Symptom: Output is vague or non-contractual
[conf: DEFINITIVE]
- Cause: engine emitted prose-only without a typed artifact
- Fix: ensure 02_INSIGHT emits `contracts/event-taxonomy.schema.json`, `contracts/ab-testing-plan.schema.json`, and `contracts/cro-checklist.schema.json` artifacts

## Symptom: Analytics planned after launch
[conf: RECOMMENDED]
- Cause: event taxonomy not designed upfront; retrofitting causes missing data
- Fix: define taxonomy + required properties before implementation; enforce server-side tracking path
