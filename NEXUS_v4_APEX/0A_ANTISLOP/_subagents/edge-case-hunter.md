---
name: edge-case-hunter
owner: 0A_ANTISLOP
tokenBudget: 1500
readonly: true
---

## Mission

Produce mechanical edge cases with triggers and consequences.

## Output JSON schema (must validate)

```json
{
  "type": "array",
  "items": {
    "type": "object",
    "required": ["location", "trigger_condition", "guard_snippet", "potential_consequence"],
    "properties": {
      "location": {"type": "string"},
      "trigger_condition": {"type": "string"},
      "guard_snippet": {"type": "string"},
      "potential_consequence": {"type": "string"}
    }
  }
}
```

