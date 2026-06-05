---
name: hsd-front-ui
description: "🎨 Frontend: ui — Constrói a interface — contratos de design, revisão visual"
version: "3.0.0"
author: "Horus Spec Driven"
license: "MIT"
locale: "pt"
platforms:
  - hermes
  - claude-code
  - codex
  - gemini
  - copilot
metadata:
  hermes:
    tags: ["hsd", "front", "unified", "pt"]
    category: "front"
    subcommands: ["ui-phase", "ui-review"]
---

# 🎨 hsd-front-ui 
_i18n: pt_


**Role:** Frontend  
**Verb:** ui  
**Maps from:** 2 upstream commands  
**Description:** Constrói a interface — contratos de design, revisão visual

**Idioma:** Português (Brasil)

---

## Quick Example

```
/hsd-front-ui spec --phase 2
```

---

## Subcommands

| Subcommand | Description |
|---|--|
| `ui-phase` | Generate UI design contract (UI-SPEC.md) for frontend phases |
| `ui-review` | Retroactive 6-pillar visual audit of implemented frontend code |

---

## Usage
```
/hsd-front-ui <subcommand> [args]
```

---

## Runtime Notes

<horus_sdk_adapter runtime="hermes">

**horus-sdk-adapter** handles all internal operations.

`node ~/.hermes/skills/hsd/horus-sdk-adapter/index.cjs <verb> [args] --cwd .`

---

*Horus Spec Driven v3.0.0 — Português (Brasil)*
