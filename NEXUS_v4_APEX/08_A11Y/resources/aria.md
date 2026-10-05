## ARIA architecture (Module 07)

- First rule: prefer native HTML elements over ARIA roles.
- Required patterns:
  - Modal dialog (role + labeling + focus trap)
  - Tabs
  - Menu / menuitem
  - Combobox
  - Tooltip
  - Live region (`aria-live="polite"`) for status
- Loading: `aria-busy="true"` on loading containers.

