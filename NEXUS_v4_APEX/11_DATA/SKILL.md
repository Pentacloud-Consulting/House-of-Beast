---
name: 11_DATA
description: "Data engine: schema design, indexing strategy, N+1 mitigation, scaling, pools, migrations."
---

## L1

- Emit data model and indexing plan contracts.

## L2 (Module 13 alignment: 3NF + indexing + N+1 + scaling)

- Normalize to **3NF** by default; denormalize only with documented reason.
- Indexing rules: index every FK; index WHERE/ORDER/GROUP columns; composite index order matters; partial indexes for active rows; audit unused indexes.
- N+1 prevention: eager load relations when needed; DataLoader for GraphQL resolvers; dev query analysis to detect N+1.
- Scaling patterns: vertical scale → read replicas → avoid sharding until necessary; use read replicas for analytics.
- Connection pooling: PgBouncer (Postgres). Formula: \((cores \\times 2) + effective\\_spindle\\_count\).

## L3 (resources)

- `resources/indexing.md`
- `resources/nplus1.md`
- `resources/scaling.md`
- Contracts: `contracts/data-model.schema.json`, `contracts/indexing.schema.json`, `contracts/scaling.schema.json`

