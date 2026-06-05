---
name: hsd-back-context
description: "⚙️ Backend: context — Constrói a lógica — debug, manutenção, contexto"
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
    tags: ["hsd", "back", "unified", "pt"]
    category: "back"
    subcommands: ["ns-context"]
---

# ⚙️ hsd-back-context 
_i18n: pt_


**Role:** Backend  
**Verb:** context  
**Maps from:** 1 upstream commands  
**Description:** Constrói a lógica — debug, manutenção, contexto

**Idioma:** Português (Brasil)

---

## Quick Example

```
/hsd-back-context
```

---

## Subcommands

| Subcommand | Description |
|---|--|
| `ns-context` | codebase intelligence | map graphify docs learnings |

---

## Usage
```
/hsd-back-context <subcommand> [args]
```

---

## Runtime Notes

<horus_sdk_adapter runtime="hermes">

**horus-sdk-adapter** handles all internal operations.

`node ~/.hermes/skills/hsd/horus-sdk-adapter/index.cjs <verb> [args] --cwd .`

---

*Horus Spec Driven v3.0.0 — Português (Brasil)*
