---
name: hsd-pm-track
description: "📋 Project Manager: track — Gerencia COMO será construído — planejar, executar, acompanhar, entregar"
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
    tags: ["hsd", "pm", "unified", "pt"]
    category: "pm"
    subcommands: ["progress", "workstreams", "thread", "phase", "workspace", "stats", "graphify", "ns-project", "ns-workflow", "ns-manage"]
---

# 📋 hsd-pm-track 
_i18n: pt_


**Role:** Project Manager  
**Verb:** track  
**Maps from:** 10 upstream commands  
**Description:** Gerencia COMO será construído — planejar, executar, acompanhar, entregar

**Idioma:** Português (Brasil)

---

## Quick Example

```
/hsd-pm-track progress
```

---

## Subcommands

| Subcommand | Description |
|---|--|
| `progress` | Check progress, advance workflow, or dispatch freeform intent — the unified GSD situational command |
| `workstreams` | Manage parallel workstreams — list, create, switch, status, progress, complete, and resume |
| `thread` | Manage persistent context threads for cross-session work |
| `phase` | CRUD for phases in ROADMAP.md — add, insert, remove, or edit phases |
| `workspace` | Manage GSD workspaces — create, list, or remove isolated workspace environments |
| `stats` | Display project statistics — phases, plans, requirements, git metrics, and timeline |
| `graphify` | Build, query, and inspect the project knowledge graph in .planning/graphs/ |
| `ns-project` | project lifecycle | milestones audits summary |
| `ns-workflow` | workflow | discuss plan execute verify phase progress |
| `ns-manage` | config workspace | workstreams thread update ship inbox |

---

## Usage
```
/hsd-pm-track <subcommand> [args]
```

---

## Runtime Notes

<horus_sdk_adapter runtime="hermes">

**horus-sdk-adapter** handles all internal operations.

`node ~/.hermes/skills/hsd/horus-sdk-adapter/index.cjs <verb> [args] --cwd .`

---

*Horus Spec Driven v3.0.0 — Português (Brasil)*
