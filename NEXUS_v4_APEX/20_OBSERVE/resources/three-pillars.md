## The three pillars of observability (Module 15.2)

[conf: DEFINITIVE]

- **Logs**: discrete events; must be structured JSON; include correlation IDs.
- **Metrics**: aggregated numbers over time; enable alerting and SLOs.
- **Traces**: end-to-end request path; explain latency and failure chains.

Rule: if you can’t correlate logs↔traces↔errors, you don’t have observability.

