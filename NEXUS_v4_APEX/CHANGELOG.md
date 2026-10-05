## CHANGELOG — NEXUS APEX v4.0

### Implementation notes (latest)

- Pass 2 inference validation (`scripts/validate-contracts-inference.mjs`, `--strict` in `final-validate`), `00_CORE/graph/cgr-adapter.mjs` (native graph.mjs fallback), `0H_HERMES/contracts/baseline-improvements.yaml` (≥30 R7 patterns), and CLI helpers: `engine-install` / `engine-uninstall` / `engine-deps` / `engine-describe` / `plugin-install` under `scripts/`.
- Added Phase 6–7 orchestration tooling:
  - `scripts/contract-chain.mjs` (emit→consume DAG, missing-producer failure, orphan warnings)
  - `scripts/plan-session.mjs` emits `.nexus/.nexus-session.md` including maturity + complexity + Mermaid DAG
  - `scripts/deps.mjs` + `scripts/orphans.mjs` helpers
- Added “final validate” bundle (`scripts/final-validate.mjs`) and wired it into `scripts/nexus-gate.mjs`.
- Added plan-required tests:
  - validator rule catalog presence (`00_CORE/resources/validator-rules.md`)
  - round-trip validation fixture + test (innovation #27)
  - subagent doctrine no-roleplay test (innovation #21)

### Pattern provenance (sources and attributions)

NEXUS APEX v4.0 synthesizes proven patterns from reference repos. NEXUS is **not** a fork of these projects; it implements NEXUS-native capabilities inspired by them.

#### Bucket A — Plugin wrappers (optional installs; NEXUS provides native fallback)

- **`JuliusBrussee/caveman`**: short, compressible memory logs; used via `0P_PLUGINS` adapter with a native-lite fallback.
- **`tirth8205/code-review-graph`**: code blast-radius analysis; used via `0P_PLUGINS` adapter with a native-lite fallback.
- **`arpitnath/claude-capsule-kit`**: lifecycle hooks and session/memory patterns; used via `0P_PLUGINS` adapter with a native-lite fallback.

#### Bucket B — Pattern absorptions (implemented natively in NEXUS)

- **`nousresearch/hermes-agent`**: diff-based, auditable self-improvement loop pattern.
- **`chenglou/pretext`**: measurement and typography rigor (principle absorption).
- **`gsd-build/get-shit-done`**: staged execution with verification and backlog/threads patterns.

#### BMAD-METHOD split (explicit)

- **BMAD Layer 2 (absorbed as infrastructure patterns)**: validator rule catalog and deterministic validator implementation patterns; customization/overrides semantics; checkpoint-preview concern-ordered review; advanced elicitation methods; shard/index doc utilities; reviewer subagent patterns. These are implemented as NEXUS-native capabilities (innovation #25/#26/#27 enhancements).
- **BMAD Layer 1 (not adopted)**: persona-driven orchestrator workflows, agent-menu codes, module marketplace, Party Mode orchestration. This layer is explicitly out of scope to avoid orchestrator-slot conflict.

