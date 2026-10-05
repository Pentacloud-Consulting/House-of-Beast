## Session Manifest — <timestamp>

### Request
<user request>

### Maturity heat-map (0–10)
<auto-scored from score-maturity.mjs>

### Engines (ordered) + modes
<engine list from router + mode-selection>

### Contract Chain DAG
```mermaid
graph TD
  %% populated from contract-chain.mjs edges
```

### Estimated token cost
<auto-estimate>

### Quality gates that will run
- validate-contracts (strict)
- node --test
- plugin-health (if enabled)

