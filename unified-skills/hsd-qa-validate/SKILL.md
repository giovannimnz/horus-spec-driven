---
name: hsd-qa-validate
description: "✅ QA: validate — Verifica tudo — validar, auditar, revisar"
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
    tags: ["hsd", "qa", "unified", "pt"]
    category: "qa"
    subcommands: ["validate-phase", "verify-work", "health", "add-tests", "plan-checker"]
---

# ✅ hsd-qa-validate 
_i18n: pt_


**Role:** QA  
**Verb:** validate  
**Maps from:** 5 upstream commands  
**Description:** Verifica tudo — validar, auditar, revisar

**Idioma:** Português (Brasil)

---

## Quick Example

```
/hsd-qa-validate phase 1
```

---

## Subcommands

| Subcommand | Description |
|---|--|
| `validate-phase` | Retroactively audit and fill Nyquist validation gaps for a completed phase |
| `verify-work` | Validate built features through conversational UAT |
| `health` | Diagnose planning directory health and optionally repair issues |
| `add-tests` | Generate tests for a completed phase based on UAT criteria and implementation |
| `plan-checker` | plan-checker |

---

## Usage
```
/hsd-qa-validate <subcommand> [args]
```

---

## Runtime Notes

<horus_sdk_adapter runtime="hermes">

**horus-sdk-adapter** handles all internal operations.

`node ~/.hermes/skills/hsd/horus-sdk-adapter/index.cjs <verb> [args] --cwd .`

---

*Horus Spec Driven v3.0.0 — Português (Brasil)*
