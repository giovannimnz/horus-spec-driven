<div align="center">

```
╔══════════════════════════════════════════════════════════════╗
║   HORUS SPEC DRIVEN — v4.0                                     ║
║   67 commands → 3 roles + config. 4 slash commands.          ║
╚══════════════════════════════════════════════════════════════╝
```

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![en](https://img.shields.io/badge/lang-en-blue)](README-en.md)
[![pt](https://img.shields.io/badge/lang-pt-green)](README.md)

</div>

---

## Slash Commands

### ⚡ /hsd-dev — Developer (7 subcommands)

| Subcommand | Maps from (gsd-core) |
|---|---|
| `discover` | explore, spike, sketch, capture, ns-ideate, map-codebase, ns-context |
| `define` | discuss-phase, spec-phase, mvp-phase |
| `plan` | plan-phase, ultraplan-phase, ai-integration-phase |
| `build` | execute-phase, autonomous, quick, fast |
| `debug` | debug, forensics |
| `maintain` | docs-update, extract-learnings, ingest-docs, import, cleanup |
| `ui` | ui-phase, ui-review |

### 📋 /hsd-pm — Project Manager (5 subcommands)

| Subcommand | Maps from |
|---|---|
| `new` | new-project, new-milestone |
| `track` | progress, workstreams, thread, phase, workspace, graphify, stats |
| `ship` | ship, pr-branch, complete-milestone, milestone-summary, undo, update |
| `config` | config, settings, profile-user |
| `manage` | manager, surface, pause-work, resume-work, help, inbox |

### ✅ /hsd-qa — Quality (3 subcommands)

| Subcommand | Maps from |
|---|---|
| `validate` | validate-phase, verify-work, health, add-tests |
| `audit` | audit-fix, audit-milestone, audit-uat |
| `review` | code-review, eval-review, review, review-backlog, plan-review-convergence, secure-phase |

### ⚙️ /hsd-config — System

`/hsd-config language pt` — Portuguese  
`/hsd-config language en` — English

---

## Install

```bash
git clone --recurse-submodules https://github.com/giovannimnz/horus-spec-driven.git
cd horus-spec-driven
node bin/install.js install --runtime=hermes --global
```

---

**v4.0 — 4 commands, 5 platforms, 67 skills unified.**
