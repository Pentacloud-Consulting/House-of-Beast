---
name: 20_OBSERVE
description: "Observability engine: OTel, RUM, synthetics, SLOs, PII scrubbing, incident loops."
---

## L1

- Emit observability plan and SLO contracts.

## L2 (Module 15 alignment: OpenTelemetry + RUM + Sentry)

- **Distributed tracing**: OpenTelemetry trace context propagation (trace_id across services/queues/db).
- **RUM**: measure CWV from real users; segment by device type, geography, connection speed, browser.
- **Synthetic**: scheduled checks (1–5 minutes) from multiple regions; alert before users report.
- **Errors**: Sentry default; scrub PII before sending; group, alert, and regressions-only paging.

## L3

- Contracts: `contracts/observability.schema.json`, `contracts/rum.schema.json`, `contracts/error-monitoring.schema.json`

