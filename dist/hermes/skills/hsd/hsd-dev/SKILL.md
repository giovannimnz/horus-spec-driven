---
name: hsd-dev
description: "⚡ Desenvolvedor: Ciclo completo de desenvolvimento"
version: "5.0.0"
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
    agent: "hsd-dev-agent"
    subcommands: ["discover", "define", "plan", "build", "debug", "maintain", "ui"]
---

# ⚡ /hsd-dev

**Papel:** Desenvolvedor  |  **Subcomandos:** 7

> Ciclo completo de desenvolvimento

---

## Exemplo Rápido

```
//hsd-dev discover
```

---

## Subcomandos

| Subcommand | Mapeia de (gsd-core) | Função |
|---|---|---|
| `discover` | explore, spike, sketch, capture, ns-ideate, map-codebase, ns-context | Agrupa operações de discovery |
| `define` | discuss-phase, spec-phase, mvp-phase | Agrupa operações de scope |
| `plan` | plan-phase, ultraplan-phase, ai-integration-phase | Agrupa operações de planning |
| `build` | execute-phase, autonomous, quick, fast | Agrupa operações de execution |
| `debug` | debug, forensics | Agrupa operações de debugging |
| `maintain` | docs-update, extract-learnings, ingest-docs, import, cleanup | Agrupa operações de maintenance |
| `ui` | ui-phase, ui-review | Agrupa operações de design |


---

## Agente Especializado

Este comando ativa automaticamente o agente `hsd-dev-agent`.

**Ferramentas:** read_file, write_file, terminal, search_files, delegate_task

---

## Uso

```
/hsd-dev <subcommand> [args]
```

`$ARGUMENTS[0]` seleciona o subcomando.

---

<horus_sdk_adapter runtime="hermes">
**horus-sdk-adapter** gerencia todas as operações internas.
`node ~/.hermes/skills/hsd/horus-sdk-adapter/index.cjs <verb> [args] --cwd .`
</horus_sdk_adapter>

---

*Horus Spec Driven v5.0 — dist/dev*
