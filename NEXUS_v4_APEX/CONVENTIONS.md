## NEXUS APEX v4.0 — Conventions

### 1) Naming and boundaries

- **Engine directory**: `NN_NAME` (e.g., `03_PALETTE`) or `0X_NAME` for META (`0A_ANTISLOP`)
- **No cross-engine internal file references** (PATH-05). Engines may only:
  - invoke other engines by name via `00_CORE` routing, or
  - reference shared exemplars in `_style-reference/`

### 2) Confidence tiering

Every non-trivial rule carries confidence:

- **DEFINITIVE**: proven stable, should almost always be applied
- **RECOMMENDED**: strongly suggested, but context-dependent
- **EXPERIMENTAL**: opt-in, not yet broadly validated

### 3) Progressive disclosure (token efficiency)

- **L1**: small and always loaded
- **L2**: standard operating instruction body (bounded)
- **L3**: resources/examples only when explicitly invoked

### 4) Contract-first artifacts

Each engine must declare:

- Inputs (contracts it consumes)
- Outputs (contracts it emits)
- Exports (helpers it provides)

All contracts are JSON-schema validated by `00_CORE` before downstream engines run.

### 5) “Invoke” language rule

Engine-to-engine interactions use **invoke language**:

- ✅ “invoke `03_PALETTE`”
- ❌ “read / follow / execute `03_PALETTE`”

This keeps boundaries crisp and prevents file-coupling.

### 6) Customization layer (innovation #25)

- Per-engine `customize.yaml` declares overridable surface + locked fields
- Project overrides live in `nexus.custom/` with 4-layer merge:
  1. install-base
  2. user-base
  3. team-override
  4. user-override
- Supports `persistent-facts` (including `file:` entries) and engine-local hooks:
  - `activation-steps-prepend`
  - `activation-steps-append`
  - `on-complete`

### 7) HERMES self-improvement (innovation #15)

- Propose-only via **unified diff** inside narrow edit boundaries
- Must halt for approval (STEP-04)
- Approval UI supports **Approve / Edit / Skip / Reject / Discuss**
- Every proposal includes:
  - `scope: minor|moderate|major`
  - optional `blocking: true`
  - `OLD/NEW/Rationale` display block
- Every applied proposal is tracked for effectiveness across subsequent sessions

### 8) Tier policy (anti-bloat)

- Tier 1: core (always on)
- Tier 2: recommended (interactive enable)
- Tier 3: specialized (manual enable)

### 9) Plugins vs Patterns vs Conflicts

- **Plugin wrappers (Bucket A)**: installable tools optional; NEXUS adapts via `0P_PLUGINS` + fallbacks
- **Pattern absorptions (Bucket B)**: ideas implemented natively inside NEXUS
- **Conflict-avoid (Bucket C)**: competing orchestrators are not adopted (e.g., BMAD Layer 1)

