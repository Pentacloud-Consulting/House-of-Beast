## Failure Modes — 05_MOTION

## Symptom: Output is vague or non-contractual
[conf: DEFINITIVE]
- Cause: engine emitted prose-only without a typed artifact
- Fix: ensure 05_MOTION emits `contracts/motion-tokens.schema.json`, `contracts/reduced-motion.schema.json`, and `contracts/view-transitions.schema.json` artifacts

## Symptom: Motion ignores reduced-motion preference
[conf: DEFINITIVE]
- Cause: no `prefers-reduced-motion` override
- Fix: provide opacity-only alternatives and set duration tokens to 0ms under reduce
