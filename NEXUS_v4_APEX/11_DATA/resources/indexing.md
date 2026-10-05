## Indexing rules (Module 13)

- Index every foreign key
- Index columns used in WHERE/ORDER/GROUP with meaningful cardinality
- Composite indexes: most selective first; range columns later
- Partial indexes: e.g. `WHERE deleted_at IS NULL`
- Covering indexes to avoid heap lookups
- Audit unused indexes quarterly

