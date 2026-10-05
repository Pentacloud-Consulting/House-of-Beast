## Routing Matrix (intent → engines)

[conf: RECOMMENDED]

Use the **minimum engine set** that safely fulfills the intent.

| User signal | Intent class | Engines (invoke order) | Default mode |
|---|---|---|---|
| “Build me a landing page” | feature | `01_FORGE`→`03_PALETTE`→`04_TYPE`→`06_LAYOUT`→`07_COMPONENTS`→`08_A11Y`→`05_MOTION`→`09_BUILD`→`16_PERFORM`→`21_SEO` | pro |
| “Set up my new project” | feature | `01_FORGE`→`09_BUILD`→`15_SECURE`→`18_TEST`→`19_SHIP`→`20_OBSERVE`→`90_MEMORY` | pro |
| “Add user auth” | feature | `01_FORGE`→`10_API`→`11_DATA`→`15_SECURE`→`09_BUILD`→`18_TEST` | pro |
| “Make it work offline” | feature | `12_SYNC`→`11_DATA`→`16_PERFORM`→`18_TEST` | pro |
| “My LCP is bad” | bug | `17_GOVERN`→`16_PERFORM`→`20_OBSERVE` | pro |
| “Audit our security” | audit | `15_SECURE`→`17_GOVERN`→`18_TEST` | apex |
| “Add analytics + CRO” | feature | `02_INSIGHT`→`10_API`→`09_BUILD`→`20_OBSERVE` | pro |
| “Improve color palette” | feature | `03_PALETTE`→`08_A11Y`→`07_COMPONENTS` | pro |
| “Portfolio / personal site” | feature | `91_PORTFOLIO`→`06_LAYOUT`→`08_A11Y`→`09_BUILD`→`21_SEO` | pro |
| “Freelance proposals / scope / pricing” | feature | `92_FREELANCE`→`01_FORGE`→`90_MEMORY` | pro |
| “Mobile native app (Expo/RN)” | feature | `93_MOBILE`→`18_TEST`→`19_SHIP`→`90_MEMORY` | pro |
| “Why am I not in AI Overviews?” | audit | `22_GEO`→`21_SEO`→`02_INSIGHT` | apex |
| “GEO / citations / llms.txt” | feature | `22_GEO`→`21_SEO`→`09_BUILD`→`90_MEMORY` | apex |
| “Refactor this file” | simple-fix | (none — direct edit) | — |
