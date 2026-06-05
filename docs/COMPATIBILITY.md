# HSD v4 — CLI Compatibility Matrix

**67 upstream commands → 3 roles + config = 4 slash commands.**

---

## Slash Commands

| Comando | Subcomandos | Hermes | Claude | Codex | Gemini | Copilot |
|---|---|---|---|---|---|---|
| `/hsd-dev` | discover, define, plan, build, debug, maintain, ui | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/hsd-pm` | new, track, ship, config, manage | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/hsd-qa` | validate, audit, review | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/hsd-config` | language | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |

---

## /hsd-dev — Developer

| Subcomando | Maps from (gsd-core) | Compatibilidade |
|---|---|---|
| `discover` | explore, spike, sketch, capture, ns-ideate, map-codebase, ns-context | ✅ Todos |
| `define` | discuss-phase, spec-phase, mvp-phase | ✅ Todos |
| `plan` | plan-phase, ultraplan-phase, ai-integration-phase | ✅ Todos |
| `build` | execute-phase, autonomous, quick, fast | ✅ Todos |
| `debug` | debug, forensics | ✅ Todos |
| `maintain` | docs-update, extract-learnings, ingest-docs, import, cleanup | ✅ Todos |
| `ui` | ui-phase, ui-review | ✅ Todos |

## /hsd-pm — Project Manager

| Subcomando | Maps from | Compatibilidade |
|---|---|---|
| `new` | new-project, new-milestone | ✅ Todos |
| `track` | progress, workstreams, thread, phase, workspace, graphify, stats | ✅ Todos |
| `ship` | ship, pr-branch, complete-milestone, milestone-summary, undo, update | ✅ Todos |
| `config` | config, settings, profile-user | ✅ Todos |
| `manage` | manager, surface, pause-work, resume-work, help, inbox | ✅ Todos |

## /hsd-qa — Quality

| Subcomando | Maps from | Compatibilidade |
|---|---|---|
| `validate` | validate-phase, verify-work, health, add-tests | ✅ Todos |
| `audit` | audit-fix, audit-milestone, audit-uat | ✅ Todos |
| `review` | code-review, eval-review, review, review-backlog, plan-review-convergence, secure-phase | ✅ Todos |

---

## Funcionalidades Avançadas

| Funcionalidade | Hermes | Claude | Codex | Gemini | Copilot |
|---|---|---|---|---|---|
| **horus-sdk-adapter** | ✅ Nativo | ❌ | ❌ | ❌ | ❌ |
| **graphify (Python)** | ✅ Nativo | ❌ | ❌ | ❌ | ❌ |
| **graphify (File)** | ✅ Fallback | ⬜ | ⬜ | ⬜ | ❌ |
| **Content converter** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Frontmatter converter** | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## Roteamento Inteligente

Cada slash command recebe `$ARGUMENTS[0]` como subcomando e roteia para o skill correspondente:

```
/hsd-dev discover "auth system"
  → $ARGUMENTS[0] = "discover"
  → Skill: hsd-dev → Subcomando: discover
  → Executa: explore + spike + map-codebase no contexto do projeto
```

---

*Horus Spec Driven v4.0 — 2026-06-05*
