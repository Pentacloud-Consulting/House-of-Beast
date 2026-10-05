## _style-reference/

This folder contains **exemplar rulebooks and templates** that engines may reference safely.

### Why it exists

- Prevents cross-engine coupling: engines can reference shared exemplars here without reaching into other engines’ internal files.
- Improves output quality: even weaker models can follow concrete examples.

### How engines use it

Engines may reference files here using `file:_style-reference/<name>` as a persistent fact or as an explicit exemplar to load on demand.

