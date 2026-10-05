---
name: 12_SYNC
description: "Sync engine: realtime vs async decision tree, offline queues, webhooks reliability, background jobs."
---

## L1

- Emit sync strategy and reliability contracts.

## L2 (Realtime + offline + webhook reliability)

- Pick mode by need: realtime vs polling vs webhooks vs batch.
- If offline is required: define queue + retry + idempotency.
- Webhooks: verify signatures, idempotency keys, retry/backoff, DLQ, and replay tooling.

## L3 (resources)

- `resources/webhooks.md`
- `resources/offline-queue.md`
- Contracts: `contracts/sync-strategy.schema.json`, `contracts/webhook-reliability.schema.json`

