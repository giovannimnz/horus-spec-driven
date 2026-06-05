---
name: hsd-dev
description: "⚡ Developer: Discover, define, plan, build, debug, maintain — the full dev cycle"
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
    tags: ["hsd", "dev", "pt"]
    category: "dev"
    subcommands: ["discover", "define", "plan", "build", "debug", "maintain", "ui"]
---

# ⚡ hsd-dev

**Role:** Developer  
**Subcommands:** 7

  ⚡ Hermes  ✅ Claude  ✅ Codex  ✅ Gemini  ✅ Copilot

> Discover, define, plan, build, debug, maintain — the full dev cycle

---

## Usage

```
/hsd-dev <subcommand> [args]
```

`$ARGUMENTS[0]` seleciona o subcomando.

---

## Subcommands

| Subcommand | Maps from | Description |
|---|---|---|
| `discover` | explore, spike, sketch, capture, ns-ideate, map-codebase, ns-context | Discovery & codebase mapping — explore, prototype, research |
| `define` | discuss-phase, spec-phase, mvp-phase | Define scope, context, and requirements |
| `plan` | plan-phase, ultraplan-phase, ai-integration-phase | Create detailed phase plans |
| `build` | execute-phase, autonomous, quick, fast | Execute plans and build features |
| `debug` | debug, forensics | Systematic debugging and post-mortem forensics |
| `maintain` | docs-update, extract-learnings, ingest-docs, import, cleanup | Documentation, learnings, cleanup, and import |
| `ui` | ui-phase, ui-review | UI design contracts and visual review |


---

## Examples

```
//hsd-dev discover
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
