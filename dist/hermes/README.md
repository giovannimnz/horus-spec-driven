# Horus Spec Driven — Hermes Agent

**Package:** dist/hermes/
**Version:** 5.0.0
**Commands:** 4 (/hsd-pm, /hsd-dev, /hsd-qa, /hsd-config)
**Format:** SKILL.md (nested)
**Install to:** ~/.hermes/skills/hsd/

## Slash Commands

| Comando | Subcomandos |
|---|---|
| `/hsd-pm` | new, track, ship, config, manage |
| `/hsd-dev` | discover, define, plan, build, debug, maintain, ui |
| `/hsd-qa` | validate, audit, review |
| `/hsd-config` | language, compression, agents |

## Agentes

| Agente | Ferramentas |
|---|---|
| hsd-pm-agent | read, write, terminal, search, delegate |
| hsd-dev-agent | read, write, terminal, search, delegate |
| hsd-qa-agent | read, write, terminal, search, delegate |

## Adapter

horus-sdk-hermes incluído — 31 verbos, graphifyy.py (Python code-aware scanning).

`node ~/.hermes/skills/hsd/horus-sdk-hermes/index.cjs <verb> [args] --cwd .`
## Install

```bash
chmod +x dist/hermes/install.sh
./dist/hermes/install.sh
```

---

*Horus Spec Driven v5.0 — Hermes Agent*
