# Next.js App Router structure (exemplar)

```
app/
  layout.tsx
  page.tsx
  (marketing)/
  (app)/
  api/
components/
  ui/
lib/
styles/
```

Rules:

- Use `loading.tsx` and `error.tsx` per route group.
- Prefer server components by default; client components only when needed.

