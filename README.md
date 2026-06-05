<div align="center">

```
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   ██╗  ██╗ ██████╗ ██████╗ ██╗   ██╗███████╗                ║
║   ██║  ██║██╔═══██╗██╔══██╗██║   ██║██╔════╝                ║
║   ███████║██║   ██║██████╔╝██║   ██║███████╗                ║
║   ██╔══██║██║   ██║██╔══██╗██║   ██║╚════██║                ║
║   ██║  ██║╚██████╔╝██║  ██║╚██████╔╝███████║                ║
║   ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝                ║
║                                                              ║
║   ███████╗██████╗ ███████╗ ██████╗                           ║
║   ██╔════╝██╔══██╗██╔════╝██╔════╝                           ║
║   ███████╗██████╔╝█████╗  ██║                                ║
║   ╚════██║██╔═══╝ ██╔══╝  ██║                                ║
║   ███████║██║     ███████╗╚██████╗                           ║
║   ╚══════╝╚═╝     ╚══════╝ ╚═════╝                           ║
║                                                              ║
║   ██████╗ ██████╗ ██╗██╗   ██╗███████╗███╗   ██╗            ║
║   ██╔══██╗██╔══██╗██║██║   ██║██╔════╝████╗  ██║            ║
║   ██║  ██║██████╔╝██║██║   ██║█████╗  ██╔██╗ ██║            ║
║   ██║  ██║██╔══██╗██║╚██╗ ██╔╝██╔══╝  ██║╚██╗██║            ║
║   ██████╔╝██║  ██║██║ ╚████╔╝ ███████╗██║ ╚████║            ║
║   ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝            ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

### Spec-Driven Development for Every CLI

**67 commands → 17 unified. 5 roles. 5 platforms. Zero friction.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Hermes](https://img.shields.io/badge/Hermes-Agent-7c3aed)](https://github.com/NousResearch/hermes-agent)
[![Claude](https://img.shields.io/badge/Claude-Code-2563eb)](https://claude.ai)
[![Codex](https://img.shields.io/badge/OpenAI-Codex-059669)](https://github.com/openai/codex)
[![Gemini](https://img.shields.io/badge/Google-Gemini-ea580c)](https://deepmind.google/technologies/gemini/)
[![Copilot](https://img.shields.io/badge/GitHub-Copilot-dc2626)](https://github.com/features/copilot)

</div>

---

## What is Horus Spec Driven?

**HSD** wraps [open-gsd/gsd-core](https://github.com/open-gsd/gsd-core) — the GSD (Get Shit Done) framework — and adapts it for **every AI coding assistant**. Instead of 67 Claude-only slash commands, you get **17 role-based unified commands** that work natively on **Hermes Agent, Claude Code, OpenAI Codex, Google Gemini CLI, and GitHub Copilot**.

```
gsd-core (67 commands, Claude-only)
         │
         ▼
  ┌──────────────────────────────────┐
  │  Horus Spec Driven               │
  │  ┌────────────────────────────┐   │
  │  │ Rebrand engine (157 rules) │   │
  │  │ Content converters (5)     │   │
  │  │ Frontmatter converters (5) │   │
  │  │ Subagent neutralization    │   │
  │  │ horus-sdk-adapter (31 api) │   │
  │  └────────────────────────────┘   │
  └──────────────────────────────────┘
         │
         ▼
  17 unified commands × 5 runtimes
```

### Why "Spec Driven"?

Every phase starts with a specification — `ROADMAP.md` → `REQUIREMENTS.md` → `CONTEXT.md` → `PLAN.md` → execution. The code is the last step, not the first. Specs drive everything.

---

## Slash Commands

###    PO — Product Owner
> *Define WHAT gets built*

| Command | Subcommands | Maps from (original gsd-core) |
|---|---|---|
| `/hsd-po-discover` | explore, spike, sketch, map, capture | `explore`, `spike`, `sketch`, `capture`, `ns-ideate`, `map-codebase` |
| `/hsd-po-new` | project, milestone | `new-project`, `new-milestone` |
| `/hsd-po-define` | discuss, spec, mvp | `discuss-phase`, `spec-phase`, `mvp-phase` |
| `/hsd-po-inbox` | — | `inbox` |

###    PM — Project Manager
> *Manage HOW it gets built*

| Command | Subcommands | Maps from |
|---|---|---|
| `/hsd-pm-plan` | phase, ultra, ai | `plan-phase`, `ultraplan-phase`, `ai-integration-phase` |
| `/hsd-pm-exec` | run, auto, quick, fast | `execute-phase`, `autonomous`, `quick`, `fast` |
| `/hsd-pm-track` | progress, streams, graph, stats, phase, workspace | `progress`, `workstreams`, `graphify`, `stats`, `phase`, `workspace`, `thread`, `ns-*` |
| `/hsd-pm-config` | set, get, model, profile | `config`, `settings`, `profile-user` |
| `/hsd-pm-ship` | release, complete, summary, rollback, update | `ship`, `pr-branch`, `complete-milestone`, `milestone-summary`, `undo`, `update` |
| `/hsd-pm-manage` | dashboard, pause, resume, toggle, help | `manager`, `surface`, `pause-work`, `resume-work`, `help` |

###    FRONT — Frontend
> *Build the UI*

| Command | Subcommands | Maps from |
|---|---|---|
| `/hsd-front-ui` | spec, review | `ui-phase`, `ui-review` |

###    BACK — Backend
> *Build the logic & infrastructure*

| Command | Subcommands | Maps from |
|---|---|---|
| `/hsd-back-debug` | trace, forensics | `debug`, `forensics` |
| `/hsd-back-maintain` | docs, learn, ingest, import, clean | `docs-update`, `extract-learnings`, `ingest-docs`, `import`, `cleanup` |
| `/hsd-back-context` | — | `ns-context` |

###    QA — Quality
> *Verify everything*

| Command | Subcommands | Maps from |
|---|---|---|
| `/hsd-qa-validate` | phase, verify, health, tests | `validate-phase`, `verify-work`, `health`, `add-tests` |
| `/hsd-qa-audit` | fix, milestone, uat | `audit-fix`, `audit-milestone`, `audit-uat` |
| `/hsd-qa-review` | code, peer, backlog, security, convergence | `code-review`, `eval-review`, `review`, `review-backlog`, `plan-review-convergence`, `ns-review`, `secure-phase` |

---

## Platform Support

| Platform | Status | Install Path | Notes |
|---|---|---|---|
| **Hermes Agent** |   Complete | `~/.hermes/skills/hsd/` | 18 skills (17 + adapter). Content converter + frontmatter converter + horus-sdk-adapter. Full graphify (Python + file-based). |
| **Claude Code** |   Complete | `~/.claude/skills/` | Content + frontmatter converters. Subagent neutralization. |
| **OpenAI Codex** |   Complete | `~/.codex/prompts/` | Content converter (template vars, slash→skill). Frontmatter converter. |
| **Google Gemini** |   Complete | `~/.gemini/commands/hsd/` | Content converter (TOML format). Frontmatter converter. |
| **GitHub Copilot** |   Disabled | `.github/prompts/` | Content converter. Disabled by default — enable in `spec-horus.json`. |

### Coming Soon

| Platform | Status |
|---|---|
| **Amazon Q Developer** |   Planned |
| **JetBrains AI** |   Planned |
| **Cursor** |   Planned |

---

## Architecture

```
horus-spec-driven/
├── bin/
│   ├── install.js                    Pipeline: pull → wordlist → unified → install
│   ├── rebrand.js                    Wordlist builder (157 rules, 67→17 mapping)
│   ├── build-unified-skills.cjs      Generates 17 SKILL.md from vendor
│   ├── sync.js                       Sync shortcut (skip vendor pull)
│   └── lib/
│       ├── horus-sdk-adapter/        Reimplementation of gsd-tools.cjs (31 verbs)
│       │   ├── index.cjs             CLI dispatch
│       │   ├── state.cjs             State management (16 subcommands)
│       │   ├── config.cjs            Config get/set (6 subcommands)
│       │   ├── graphify.cjs          Knowledge graph (JS fallback)
│       │   ├── graphifyy.py          Code-aware scanner (Python, 460 LOC)
│       │   └── ...                   13 modules total
│       ├── content-converters/       5 runtime-specific converters
│       ├── frontmatter-converters/   5 runtime-specific converters
│       ├── subagent-adapter/         Agent() call neutralization
│       ├── layout.js                 Kind-driven install layout
│       └── runtime-paths.js          Runtime home resolution
├── unified-skills/                   17 generated SKILL.md
├── runtimes/                         Per-platform layout specs
├── docs/                             Architecture, rebrand, mapping docs
├── vendor/                           gsd-core (gitignored, pulled on install)
└── ecosystem.daily-sync.cron.json    PM2 daily sync at 08:00 UTC
```

---

## horus-sdk-adapter

The `gsd-tools.cjs` (1722 lines, 60+ subcommands) is Claude Code-only — it uses `Agent()`, `Skill()`, and `gsd-sdk` which don't exist in Hermes.

**horus-sdk-adapter** is a complete reimplementation using Hermes-native tools: `delegate_task`, `skill_view`, `read_file`, `write_file`, `terminal`, `memory`.

### Implemented Verbs (31)

```
state        init        state-snapshot    summary-extract
config-get   config-set  commit            frontmatter.get
frontmatter.set  roadmap  phase            validate
workstream   scaffold    milestone         requirements
progress     resolve-model  generate-slug  current-timestamp
list-todos   gap-analysis  learnings       prompt-budget
update-context  verify-path-exists  skill-manifest
graphify     agent-skills  websearch
```

### What Runs Where

| Feature | Hermes | Claude | Codex | Gemini | Copilot |
|---|---|---|---|---|---|
| horus-sdk-adapter |   Native | — | — | — | — |
| graphify (Python) |   Native | — | — | — | — |
| graphify (File) |   Fallback | — | — | — | — |
| agent-skills |   skill_view() | Agent() | delegate | — | — |
| websearch |   web_search() | Brave API | — | — | — |
| Content converter |   |   |   |   |   |
| Frontmatter converter |   |   |   |   |   |
| Subagent adapter |   |   |   |   |   |

---

## Quick Start

### Install

```bash
git clone https://github.com/giovannimnz/horus-spec-driven.git
cd horus-spec-driven

# Install for all detected runtimes
node bin/install.js install --all --global

# Or for a specific runtime
node bin/install.js install --runtime=hermes --global
node bin/install.js install --runtime=claude --global
```

### Verify

```bash
node bin/install.js detect
# → hermes claude codex gemini
```

### Daily Sync

```bash
# Manual
node bin/install.js sync --all --global

# Auto (PM2)
pm2 start ecosystem.daily-sync.cron.json
pm2 save
```

### Graphify (Code-Aware Knowledge Graph)

```bash
# Build graph (Python code analysis + .planning/ artifacts)
/hsd-pm-track graph build

# Query
/hsd-pm-track graph query "auth module"

# Status
/hsd-pm-track graph status

# Diff
/hsd-pm-track graph diff
```

---

## Requirements

| Dependency | Required? | Notes |
|---|---|---|
| Node.js ≥ 22 |   Required | Core engine |
| Python 3.8+ |   Recommended | For code-aware graphify (auto-installs if missing) |
| Git |   Required | For vendor pull |
| PM2 |   Optional | For daily sync cron |

---

## Documentation

| Doc | Description |
|---|---|
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | Full system architecture |
| [REBRAND.md](docs/REBRAND.md) | Rebrand engine & wordlist |
| [RUNTIMES.md](docs/RUNTIMES.md) | Per-platform layout specs |
| [CONVERTERS.md](docs/CONVERTERS.md) | Content & frontmatter converters |
| [HORUS-SDK-MAPPING.md](docs/HORUS-SDK-MAPPING.md) | gsd-tools → horus-sdk mapping |
| [UNIFIED-COMMANDS.yaml](docs/UNIFIED-COMMANDS.yaml) | 67→17 mapping spec |

---

## Rebrand Rules

Every `gsd-*` reference in skills is rewritten during install. The wordlist has 157 rules:

| Original | Rewritten | Context |
|---|---|---|
| `gsd-new-project` | `hsd-po-new` | PO command |
| `gsd-execute-phase` | `hsd-pm-exec` | PM command |
| `gsd-validate-phase` | `hsd-qa-validate` | QA command |
| `CLAUDE.md` | `HERMES.md` | Branding |
| `~/.claude/` | `~/.hermes/` | Paths |
| `gsd-core` | `hsd-core` | Project name |
| `get-shit-done` | `horus-spec-driven` | Brand name |
| `Agent(subagent_type="gsd-X")` | Neutral `<subagent>` form | Subagent adapter |
| `skills/gsd/` | `skills/hsd/` | Namespace |

---

## Project Identity

- **Name:** Horus Spec Driven
- **Acronym:** HSD
- **Repo:** [giovannimnz/horus-spec-driven](https://github.com/giovannimnz/horus-spec-driven)
- **Upstream:** [open-gsd/gsd-core](https://github.com/open-gsd/gsd-core) (MIT)
- **License:** MIT
- **Version:** 3.0.0

<div align="center">

```
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   Specs drive. Roles guide. Code follows.                    ║
║                                                              ║
║   /hsd-po-discover → /hsd-po-define → /hsd-pm-plan           ║
║   → /hsd-pm-exec → /hsd-qa-validate → /hsd-pm-ship           ║
║                                                              ║
║   That's the Horus way.                                      ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

</div>
