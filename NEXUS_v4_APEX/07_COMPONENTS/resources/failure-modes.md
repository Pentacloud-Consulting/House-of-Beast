## Failure Modes — 07_COMPONENTS

## Symptom: Output is vague or non-contractual
[conf: DEFINITIVE]
- Cause: engine emitted prose-only without a typed artifact
- Fix: ensure 07_COMPONENTS emits `contracts/component-architecture.schema.json`, `contracts/state-model.schema.json`, and `contracts/state-matrices.schema.json` artifacts

## Symptom: Server state handled with useState + useEffect
[conf: DEFINITIVE]
- Cause: missing server-state doctrine
- Fix: use TanStack Query/SWR; enforce loading/error/empty states at the data layer
