## Failure Modes — 08_A11Y

## Symptom: Output is vague or non-contractual
[conf: DEFINITIVE]
- Cause: engine emitted prose-only without a typed artifact
- Fix: ensure 08_A11Y emits `contracts/a11y-checklist.schema.json`, `contracts/focus-management.schema.json`, and `contracts/aria-patterns.schema.json` artifacts

## Symptom: Focus ring removed or keyboard users trapped
[conf: DEFINITIVE]
- Cause: `outline: none` without replacement; overlays without focus trap
- Fix: design `:focus-visible` ring; implement overlay focus trap using `inert` and return-focus
