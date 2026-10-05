## Subagent Doctrine (Diversity-of-thought)

### Rule

Do not ask a single model to roleplay multiple reviewer perspectives.

### Required pattern

If multiple orthogonal reviews are needed, invoke distinct subagents in parallel:

- `adversarial-reviewer`
- `edge-case-hunter`
- `editorial-prose-reviewer`
- `editorial-structure-reviewer`

Each subagent has its own token budget and produces a single-purpose artifact.

