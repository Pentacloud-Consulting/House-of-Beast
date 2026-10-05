## Mode selection (lite / pro / apex)

[conf: DEFINITIVE]

Inputs:
- Complexity score (FCI/BFRI/MFRI/CRI) from `complexity-scoring.md`
- Maturity gap (0–10) from `maturity-rubric.md`

Rules:

1. Base mode by complexity:
   - 0–2: `lite`
   - 3–6: `pro`
   - 7–10: `apex`

2. Escalate if maturity gap:
   - If a required layer score < 5/10, escalate one mode tier for engines in that layer.

3. De-escalate for trivial edits:
   - If intent class is `simple-fix` and change is localized to ≤2 files, skip engine routing (direct edit).

