---
name: hsd-po-inbox
description: "🎯 Product Owner: inbox — Define O QUE será construído — descoberta, escopo, requisitos"
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
    tags: ["hsd", "po", "unified", "pt"]
    category: "po"
    subcommands: ["inbox"]
---

# 🎯 hsd-po-inbox 
_i18n: pt_


**Role:** Product Owner  
**Verb:** inbox  
**Maps from:** 1 upstream commands  
**Description:** Define O QUE será construído — descoberta, escopo, requisitos

**Idioma:** Português (Brasil)

---

## Quick Example

```
/hsd-po-inbox
```

---

## Subcommands

| Subcommand | Description |
|---|--|
| `inbox` | Triage and review open GitHub issues and PRs against project templates and contribution guidelines. |

---

## Usage
```
/hsd-po-inbox <subcommand> [args]
```

---

## Runtime Notes

<horus_sdk_adapter runtime="hermes">

**horus-sdk-adapter** handles all internal operations.

`node ~/.hermes/skills/hsd/horus-sdk-adapter/index.cjs <verb> [args] --cwd .`

---

*Horus Spec Driven v3.0.0 — Português (Brasil)*
