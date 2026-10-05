---
name: 14_EVAL
description: "Evaluation engine: golden sets, eval harness, hallucination checks, regression tracking."
---

## L1

- Emit eval plan and golden set schema contracts.

## L2

- Define golden sets (minimum 3 cases) and regression policy.
- Include LLM-as-judge policy and hallucination checks.
- Ensure evals can run per cost tier (lite/pro/apex).

## L3

- Contracts: `contracts/eval-plan.schema.json`, `contracts/golden-set.schema.json`

