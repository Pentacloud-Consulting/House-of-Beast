## Anti-Patterns — 00_CORE

## ⛔ Cross-engine file reach
[conf: DEFINITIVE]
Bad: referencing ../OtherEngine/templates/...
Fix: invoke the engine or move exemplar into _style-reference/

## ⛔ “One engine to rule them all”
[conf: DEFINITIVE]
Bad: dumping all concerns into `00_CORE` output prose.
Fix: route to domain engines; `00_CORE` orchestrates and emits the manifest + execution plan only.

## ⛔ Ignoring mode-selection
[conf: RECOMMENDED]
Bad: always using apex mode “to be safe”.
Fix: use `resources/complexity-scoring.md` + `resources/mode-selection.md`.
