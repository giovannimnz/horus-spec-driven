---
name: hsd-qa
description: "✅ QA: Validate, audit, review — quality at every stage"
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
    tags: ["hsd", "qa", "pt"]
    category: "qa"
    subcommands: ["validate", "audit", "review"]
---

# ✅ hsd-qa

**Role:** QA  
**Subcommands:** 3

  ✅ Hermes  ✅ Claude  ✅ Codex  ✅ Gemini  ✅ Copilot

> Validate, audit, review — quality at every stage

---

## Usage

```
/hsd-qa <subcommand> [args]
```

`$ARGUMENTS[0]` seleciona o subcomando.

---

## Subcommands

| Subcommand | Maps from | Description |
|---|---|---|
| `validate` | validate-phase, verify-work, health, add-tests | Validate phases, verify implementations, and health checks |
| `audit` | audit-fix, audit-milestone, audit-uat | Audit milestones, UAT gaps, and fix pipelines |
| `review` | code-review, eval-review, review, review-backlog, plan-review-convergence, ns-review, secure-phase | Code review, peer review, security review, and backlog review |


---

## Examples

```
//hsd-qa validate
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
