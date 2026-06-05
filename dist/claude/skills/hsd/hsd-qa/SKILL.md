---
name: hsd-qa
description: "✅ QA: Validação, auditoria e revisão"
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
    tags: ["hsd", "qa", "pt"]
    category: "qa"
    agent: "hsd-qa-agent"
    subcommands: ["validate", "audit", "review"]
---

# ✅ /hsd-qa

**Papel:** QA  |  **Subcomandos:** 3

> Validação, auditoria e revisão

---

## Exemplo Rápido

```
//hsd-qa validate
```

---

## Subcomandos

| Subcommand | Mapeia de (gsd-core) | Função |
|---|---|---|
| `validate` | validate-phase, verify-work, health, add-tests | Agrupa operações de validation |
| `audit` | audit-fix, audit-milestone, audit-uat | Agrupa operações de audit |
| `review` | code-review, eval-review, review, review-backlog, plan-review-convergence, ns-review, secure-phase | Agrupa operações de review |


---

## Agente Especializado

Este comando ativa automaticamente o agente `hsd-qa-agent`.

**Ferramentas:** read_file, write_file, terminal, search_files, delegate_task

---

## Uso

```
/hsd-qa <subcommand> [args]
```

`$ARGUMENTS[0]` seleciona o subcomando.

---

<horus_sdk_adapter runtime="hermes">
**horus-sdk-adapter** gerencia todas as operações internas.
`node ~/.hermes/skills/hsd/horus-sdk-adapter/index.cjs <verb> [args] --cwd .`
</horus_sdk_adapter>

---

*Horus Spec Driven v5.0 — dist/qa*
