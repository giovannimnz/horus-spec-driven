---
name: hsd-pm
description: "📋 Project Manager: New projects, track progress, ship releases, manage config"
version: "4.0.0"
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
    tags: ["hsd", "pm", "pt"]
    category: "pm"
    subcommands: ["new", "track", "ship", "config", "manage"]
---

# 📋 hsd-pm

**Role:** Project Manager  
**Subcommands:** 5

  📋 Hermes  ✅ Claude  ✅ Codex  ✅ Gemini  ✅ Copilot

> New projects, track progress, ship releases, manage config

---

## Usage

```
/hsd-pm <subcommand> [args]
```

`$ARGUMENTS[0]` seleciona o subcomando.

---

## Subcommands

| Subcommand | Maps from | Description |
|---|---|---|
| `new` | new-project, new-milestone | Create new project or milestone |
| `track` | progress, workstreams, thread, phase, workspace, graphify, stats, ns-project, ns-workflow, ns-manage | Track progress, workstreams, and project metrics |
| `ship` | ship, pr-branch, complete-milestone, milestone-summary, undo, update | Release, deploy, complete milestones, and rollback |
| `config` | config, settings, profile-user | Configure models, settings, and developer profiles |
| `manage` | manager, surface, pause-work, resume-work, help, inbox | Dashboard, pause/resume, and triage inbox |


---

## Examples

```
//hsd-pm new
```

---

## Runtime Notes

<horus_sdk_adapter runtime="hermes">

Este skill usa o **horus-sdk-adapter** para operações internas (state, config, roadmap, graphify).

`node ~/.hermes/skills/hsd/horus-sdk-adapter/index.cjs <verb> [args] --cwd .`

**Idioma:** Português (Brasil) (pt)

</horus_sdk_adapter>

---

*Horus Spec Driven v4.0 — Português (Brasil)*
