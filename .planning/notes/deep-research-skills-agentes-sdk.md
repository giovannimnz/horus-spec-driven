---
title: "Deep Research — Otimização de Skills, Agentes, SDK e Validação Visual"
date: 2026-06-05
context: "gsd-explore session on horus-spec-driven optimization"
vault_ref: "[[20-PROJETOS/21-PROJETOS-ATIVOS/horus-spec-driven/21.06-Deep-Research-Skills-Agentes-SDK]]"
---

# Deep Research: Otimização de Skills, Agentes, SDK

## Contexto

Pesquisa completa do ecossistema atual (316 skills, 3 submódulos, 5 runtimes) para identificar gaps e oportunidades de "chumbar" ferramentas-chave (chrome-devtools, Playwright, documentação, vault) no fluxo HSD.

## Descobertas Principais

### 1. Documentação não é first-class no HSD

Três skills MADURAS estão fora do fluxo HSD:
- `md-doc` — scraper web para Obsidian (standalone)
- `md-repo` — ingest de repositórios para Obsidian (standalone)
- `api-docs-modernization` — 35 pitfalls documentados, Scalar API docs (standalone)

Nenhuma está mapeada nos subcomandos `hsd-dev maintain`. O `maintain` mapeia `docs-update` (gsd-core) mas não estas três.

### 2. Validação visual não é "chumbada"

O stack existe mas é fragmentado:
- `chrome-devtools-mcp-raw-websocket-bypass` — bypass, não integração
- `webapp-visual-validation` — pipeline chromium+CDP+mmx
- `mmx-image-describe` — visão
- 3 skills Playwright project-specific (atius, aionui, arco-modal)

Falta:
- Skill `playwright-testing` genérica
- Subcomando `visual` no `hsd-qa validate`
- Pipeline automático: screenshot → CDP → mmx → validação

### 3. Vault não é automático

A regra "consultar Obsidian primeiro" existe via triggers (`brain`, `obsidian-doc-mandatory`) mas não é hook obrigatório nas fases HSD. Falta validação de que a documentação do vault está atualizada após cada fase.

### 4. Caveman não é integrado

Compressão funciona mas não é ativada automaticamente por tipo de fase ou modelo.

## Recomendações Prioritárias

1. **Criar `playwright-testing` skill genérica** (ALTA)
2. **Mapear `api-docs-modernization` → `hsd-dev maintain api-docs`** (ALTA)
3. **Mapear `md-doc` + `md-repo` → `hsd-dev maintain ingest`** (ALTA)
4. **Criar `chrome-devtools-visual-audit` skill** (ALTA)
5. **Adicionar subcomando `visual` ao `hsd-qa validate`** (MÉDIA)
6. **Hook obrigatório de vault antes/depois de cada fase** (MÉDIA)

## Skills a Criar

| # | Nome | Prioridade |
|---|------|-----------|
| 1 | `playwright-testing` | ALTA |
| 2 | `chrome-devtools-visual-audit` | ALTA |
| 3 | `hsd-vault-hook` | MÉDIA |
| 4 | `caveman-auto` | MÉDIA |
| 5 | `skill-dependency-graph` | BAIXA |
| 6 | `rag-external` | BAIXA |

## Subcomandos Propostos

### hsd-dev: 7 → 9 subcomandos
- `api-docs` → api-docs-modernization
- `ingest` → md-doc + md-repo

### hsd-qa: 3 → 4 subcomandos
- `visual` → chrome-devtools-visual-audit + webapp-visual-validation + playwright-testing

### hsd-pm: 5 subcomandos (sem mudança, com hook de vault)

## Vault Reference

Nota completa: `20-PROJETOS/21-PROJETOS-ATIVOS/horus-spec-driven/21.06-Deep-Research-Skills-Agentes-SDK.md`
