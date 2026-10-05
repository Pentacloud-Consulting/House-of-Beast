---
name: 13_AI
description: "AI engine: RAG/agents/tool contracts, safety constraints, cost routing interfaces."
---

## L1

- Emit AI integration contracts (tools, prompts, eval hooks).

## L2

- Define tool contracts (input/output schemas) and safety notes.
- Define RAG plan: sources, chunking strategy, retrieval approach, and guardrails.
- Ensure eval hooks exist by invoking `14_EVAL`.

## L3

- Contracts: `contracts/tool-contracts.schema.json`, `contracts/rag-plan.schema.json`

