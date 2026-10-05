---
name: 90_MEMORY
description: "Project memory: persists nexus.project.yaml and short logs, manages seeds/todos/threads with conflict-safe writes."
---

## L1

- Load project context (including critical-implementation-rules) for every engine activation.
- Append-only logging; never silently overwrite memory.

## L2

- Use `nexus.project.yaml` as the human-edited source of truth (`90_MEMORY/contracts/project-state.schema.json`).
- For “short sentence” memory discipline, see **`resources/v3-memory-engine-reference.md`** (v3 lineage).
- Emit `session-log` + decision appendages through PostToolUse orchestration (deterministic shell: `node scripts/project-memory.mjs`).

## L3

- `resources/v3-memory-engine-reference.md` — concise memory item format and operations
- Templates: `templates/README.md`
