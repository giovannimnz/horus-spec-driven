---
name: hsd-pm
description: "📋 Gerente de Projeto: Gestão de projetos e releases"
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
    tags: ["hsd", "pm", "pt"]
    category: "pm"
    agent: "hsd-pm-agent"
    subcommands: ["new", "track", "ship", "config", "manage"]
---

# 📋 /hsd-pm

**Papel:** Gerente de Projeto  |  **Subcomandos:** 5

> Gestão de projetos e releases

## 🚀 Detecção Automática

Se não houver .planning/ no diretório atual, este comando automaticamente:
1. Executa map-codebase para mapear o código existente
2. Cria a estrutura .planning/ completa
3. Inicia o primeiro milestone e fase
4. Prossegue com o subcomando solicitado

---

## Exemplo Rápido

```
//hsd-pm new
```

---

## Subcomandos

| Subcommand | Mapeia de (gsd-core) | Função |
|---|---|---|
| `new` | new-project, new-milestone | Agrupa operações de creation |
| `track` | progress, workstreams, thread, phase, workspace, graphify, stats, ns-project, ns-workflow, ns-manage | Agrupa operações de tracking |
| `ship` | ship, pr-branch, complete-milestone, milestone-summary, undo, update | Agrupa operações de release |
| `config` | config, settings, profile-user | Agrupa operações de configuration |
| `manage` | manager, surface, pause-work, resume-work, help, inbox | Agrupa operações de management |


---

## Agente Especializado

Este comando ativa automaticamente o agente `hsd-pm-agent`.

**Ferramentas:** read_file, write_file, terminal, search_files, delegate_task

---

## Uso

```
/hsd-pm <subcommand> [args]
```

`$ARGUMENTS[0]` seleciona o subcomando.

---

<horus_sdk_adapter runtime="hermes">
**horus-sdk-adapter** gerencia todas as operações internas.
`node ~/.hermes/skills/hsd/horus-sdk-adapter/index.cjs <verb> [args] --cwd .`
</horus_sdk_adapter>

---

*Horus Spec Driven v5.0 — dist/pm*
