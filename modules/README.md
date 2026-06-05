# Modules Index — Horus Spec Driven

Documentação dos submódulos em `modules/`. Cada submódulo é versionado via git e atualizado com `git submodule update --remote`.

---

## 1. gsd-core — GSD Framework

**Repositório:** [open-gsd/gsd-core](https://github.com/open-gsd/gsd-core)  
**Versão atual:** `v1.3.1-dev`  
**Local:** `modules/gsd-core/`

### Propósito

Framework GSD (Get Shit Done) upstream. Fornece 67 comandos slash, 33 agentes, workflows, templates e referências. O Horus Spec Driven envelopa este framework e o adapta para 5 runtimes.

### Comandos (67)

Veja a lista completa em: `modules/gsd-core/commands/gsd/`

| Categoria | Quantidade | Exemplos |
|---|---|---|
| Discovery | 8 | `explore`, `spike`, `sketch`, `capture`, `map-codebase`, `ns-ideate`, `ns-context`, `ingest-docs` |
| Project Lifecycle | 6 | `new-project`, `new-milestone`, `complete-milestone`, `milestone-summary`, `phase`, `help` |
| Phase Workflow | 6 | `discuss-phase`, `spec-phase`, `plan-phase`, `mvp-phase`, `execute-phase`, `ultraplan-phase` |
| AI Integration | 1 | `ai-integration-phase` |
| Management | 10 | `manager`, `progress`, `workstreams`, `thread`, `workspace`, `surface`, `stats`, `graphify`, `update`, `undo` |
| Config | 4 | `config`, `settings`, `profile-user`, `ns-manage` |
| Autonomous/Quick | 5 | `autonomous`, `quick`, `fast`, `pause-work`, `resume-work` |
| CI/CD | 2 | `pr-branch`, `ship` |
| QA/Verify | 12 | `validate-phase`, `verify-work`, `audit-fix`, `audit-milestone`, `audit-uat`, `code-review`, `eval-review`, `secure-phase`, `ui-review`, `plan-review-convergence`, `review`, `review-backlog` |
| Test/Health | 3 | `add-tests`, `health`, `forensics` |
| Docs/Cleanup | 4 | `docs-update`, `extract-learnings`, `cleanup`, `import` |
| UI | 2 | `ui-phase`, `ui-review` |
| Namespace | 4 | `ns-context`, `ns-ideate`, `ns-manage`, `ns-project`, `ns-review`, `ns-workflow` |

### Compatibilidade

| Runtime | Comandos | Agents | Workflows | Templates |
|---|---|---|---|---|
| **Hermes Agent** | 67 → 17 via HSD | 33 → neutralizado via subagent adapter | Convertidos via content converter | Adaptados |
| **Claude Code** | ✅ Nativo (67) | ✅ Nativo (Agent()) | ✅ Nativo | ✅ Nativo |
| **Codex CLI** | 67 → 17 via HSD | delegate | Adaptados | Adaptados |
| **Gemini CLI** | 67 → 17 via HSD | ❌ | Convertidos (TOML) | Adaptados |
| **GitHub Copilot** | 67 → 17 via HSD | ❌ | Convertidos | Adaptados |

### Links Úteis
- [📁 Source: commands/gsd/](modules/gsd-core/commands/gsd/)
- [📁 Source: agents/](modules/gsd-core/agents/)
- [📁 Source: gsd-core/ (workflows, templates, references)](modules/gsd-core/gsd-core/)
- [📄 AGENTS.md (project guidelines)](modules/gsd-core/AGENTS.md)
- [📄 Package](modules/gsd-core/package.json)

---

## 2. caveman — Comunicação Ultra-Comprimida

**Repositório:** [juliusbrussee/caveman](https://github.com/juliusbrussee/caveman)  
**Versão atual:** `main` (latest)  
**Local:** `modules/caveman/`

### Propósito

"Why use many token when few do trick." Modo de comunicação ultra-comprimida que corta ~75% do uso de tokens mantendo toda substância técnica. Suporta níveis de intensidade: lite, full (padrão), ultra, wenyan-lite, wenyan-full, wenyan-ultra.

### Skills (7)

| Skill | Arquivo | Descrição | Suporte |
|---|---|---|---|
| **caveman** | `skills/caveman/SKILL.md` | Modo de comunicação comprimida para respostas | Hermes, Claude, Codex, Gemini, Copilot |
| **caveman-compress** | `skills/caveman-compress/SKILL.md` | Comprime arquivos de memória (CLAUDE.md, todos) | Hermes, Claude |
| **caveman-commit** | `skills/caveman-commit/SKILL.md` | Gera mensagens de commit ultra-comprimidas | Hermes, Claude |
| **caveman-review** | `skills/caveman-review/SKILL.md` | Comentários de code review comprimidos | Hermes, Claude |
| **caveman-help** | `skills/caveman-help/SKILL.md` | Cartão de referência rápida de todos os modos | Hermes, Claude, Codex |
| **caveman-stats** | `skills/caveman-stats/SKILL.md` | Estatísticas de uso de tokens e economia estimada | Claude Code (hook nativo) |
| **cavecrew** | `skills/cavecrew/SKILL.md` | Guia de decisão para delegar a subagentes estilo caveman | Hermes, Claude |

### Agentes (3)

| Agente | Arquivo | Função |
|---|---|---|
| **cavecrew-investigator** | `agents/cavecrew-investigator.md` | Localiza código relevante (output comprimido) |
| **cavecrew-builder** | `agents/cavecrew-builder.md` | Edita 1-2 arquivos (output comprimido) |
| **cavecrew-reviewer** | `agents/cavecrew-reviewer.md` | Revisa diffs (output comprimido) |

### Compatibilidade por Skill

| Skill | Hermes | Claude Code | Codex | Gemini | Copilot | Notas |
|---|---|---|---|---|---|---|
| caveman | ✅ | ✅ | ✅ | ✅ | ✅ | Comunicação básica — funciona em todos |
| caveman-compress | ✅ | ✅ | ❌ | ❌ | ❌ | Precisa ler/escrever arquivos locais |
| caveman-commit | ✅ | ✅ | ❌ | ❌ | ❌ | Precisa de git |
| caveman-review | ✅ | ✅ | ❌ | ❌ | ❌ | Precisa ler diffs |
| caveman-help | ✅ | ✅ | ✅ | ❌ | ❌ | Referência estática |
| caveman-stats | ❌ | ✅ | ❌ | ❌ | ❌ | Depende de hook nativo do Claude Code |
| cavecrew | ✅ | ✅ | ❌ | ❌ | ❌ | Subagentes — Hermes usa delegate_task |

### Plugins Adicionais

- **OpenCode** — comandos em `src/plugins/opencode/commands/`
- **Rules** — regras de ativação em `src/rules/`

### Links Úteis
- [📄 README](modules/caveman/README.md)
- [📁 Source: skills/](modules/caveman/skills/)
- [📁 Source: agents/](modules/caveman/agents/)
- [📄 INSTALL.md](modules/caveman/INSTALL.md)
- [📄 CONTRIBUTING.md](modules/caveman/CONTRIBUTING.md)

---

## 3. impeccable — Design Language System

**Repositório:** [pbakaus/impeccable](https://github.com/pbakaus/impeccable)  
**Versão atual:** `cli-v2.3.2`  
**Local:** `modules/impeccable/`

### Propósito

"O vocabulário que você não sabia que precisava." 1 skill, 23 comandos, e anti-padrões curados para design frontend impecável.

### Skill

| Skill | Arquivo | Descrição |
|---|---|---|
| **impeccable** | `skill/SKILL.src.md` | Skill de design abrangente com 7 referências de domínio |

### Referências de Domínio (7)

| Referência | Arquivo | Cobre |
|---|---|---|
| typography | `skill/reference/typography.md` | Sistemas tipográficos, font pairing, escalas modulares, OpenType |
| color-and-contrast | `skill/reference/color-and-contrast.md` | OKLCH, neutros matizados, dark mode, acessibilidade |
| spatial-design | `skill/reference/spatial-design.md` | Sistemas de espaçamento, grids, hierarquia visual |
| motion-design | `skill/reference/motion-design.md` | Curvas de easing, staggering, reduced motion |
| interaction-design | `skill/reference/interaction-design.md` | Formulários, estados de foco, padrões de loading |
| responsive-design | `skill/reference/responsive-design.md` | Breakpoints, layouts adaptativos |
| ux-writing | `skill/reference/ux-writing.md` | Escrita de interface, tom de voz |

### Comandos (23)

Os comandos formam um vocabulário compartilhado de design: `polish`, `audit`, `critique`, `distill`, `animate`, `bolder`, `quieter`, e mais.

### Anti-Patterns

- 27 regras determinísticas (CLI + extensão de browser, sem LLM, sem API key)
- 12 regras de crítica via LLM

### Compatibilidade

| Runtime | Skill | Anti-Patterns | CLI |
|---|---|---|---|
| **Hermes Agent** | ✅ | ✅ (rule engine) | ✅ |
| **Claude Code** | ✅ | ✅ | ✅ |
| **Codex CLI** | ✅ | ⬜ | ❌ |
| **Gemini CLI** | ✅ | ❌ | ❌ |
| **GitHub Copilot** | ✅ | ❌ | ❌ |

### Links Úteis
- [🌐 Site oficial](https://impeccable.style)
- [📄 README](modules/impeccable/README.md)
- [📄 DESIGN.md](modules/impeccable/DESIGN.md)
- [📄 PRODUCT.md](modules/impeccable/PRODUCT.md)
- [📄 HARNESSES.md](modules/impeccable/HARNESSES.md)
- [📁 Source: skill/](modules/impeccable/skill/)

---

## 4. Compatibilidade Cruzada entre Módulos

Como os módulos se integram no Horus Spec Driven:

| Integração | Status | Descrição |
|---|---|---|
| **gsd-core + HSD** | ✅ Ativo | Wrapper principal — 67 comandos → 17 unificados |
| **caveman + HSD** | ⬜ Planejado | Comandos `/caveman-*` instalados como skills standalone |
| **impeccable + HSD** | ⬜ Planejado | Comando `/hsd-front-ui` usa referências do impeccable |
| **caveman + gsd-core** | ⬜ Planejado | Agentes gsd-core com output comprimido via cavecrew |
| **impeccable + gsd-core** | ⬜ Planejado | Anti-patterns do impeccable no `gsd-ui-review` |

---

## Como Atualizar os Submódulos

```bash
# Atualizar todos
git submodule update --init --remote --depth 1

# Atualizar um específico
git submodule update --init --remote --depth 1 modules/gsd-core

# Ver versão atual de cada
git submodule status
```

O sync diário (PM2) executa `git submodule update --remote` automaticamente às 08:00 UTC.

---

*Gerado de: modules/gsd-core/AGENTS.md, modules/caveman/README.md, modules/caveman/skills/*/SKILL.md, modules/impeccable/README.md*  
*Última verificação: 2026-06-05*
