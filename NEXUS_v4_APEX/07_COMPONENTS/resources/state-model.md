## State model (Module 05)

- Local state: component-only
- Lifted state: shared by siblings (nearest common parent)
- Context: theme/auth/locale/toasts
- Server state: **use TanStack Query/SWR**, not `useState + useEffect`

Rationale: caching, invalidation, background refetch, error/loading states, and race safety.

