## OpenTelemetry instrumentation notes (Next.js)

- Propagate trace context across:
  - server actions and route handlers
  - fetch calls (server → downstream services)
  - queue/worker boundaries (inject/extract)
  - DB calls (include trace_id in logs)
- Standardize IDs:
  - `trace_id`, `span_id` in structured logs
  - correlate errors (Sentry) with trace_id when possible

