#!/usr/bin/env node
'use strict';

/**
 * build-unified-skills.cjs v4 — 4 SKILL.md (dev, pm, qa, config) + i18n
 *
 * Cada skill contém tabelas de roteamento inteligente: $ARGUMENTS[0] → subcomando
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const WORDLIST_PATH = path.join(ROOT, 'modules', 'unified-wordlist.json');
const OUT_DIR = path.join(ROOT, 'unified-skills');
const CONFIG_PATH = path.join(ROOT, 'horus-spec-driven.json');
const LOCALES_DIR = path.join(ROOT, 'locales');

const wordlist = JSON.parse(fs.readFileSync(WORDLIST_PATH, 'utf8'));

function getLocale() {
  const ci = process.argv.indexOf('--locale');
  if (ci !== -1 && process.argv[ci + 1]) return process.argv[ci + 1];
  try {
    const c = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
    return (c.locale && c.locale.code) || 'en';
  } catch (e) { return 'en'; }
}

const localeCode = getLocale();
let localeData;
try {
  localeData = JSON.parse(fs.readFileSync(path.join(LOCALES_DIR, localeCode + '.json'), 'utf8'));
} catch (e) {
  localeData = JSON.parse(fs.readFileSync(path.join(LOCALES_DIR, 'en.json'), 'utf8'));
}

const T = (key) => localeData.config[key] || key;

const ROLE = {
  dev: { name: 'Developer', icon: '⚡', desc: 'Discover, define, plan, build, debug, maintain — the full dev cycle' },
  pm:  { name: 'Project Manager', icon: '📋', desc: 'New projects, track progress, ship releases, manage config' },
  qa:  { name: 'QA', icon: '✅', desc: 'Validate, audit, review — quality at every stage' },
};

// ─── Subcommand routing tables ─────────────────────────────────────────────

const SUBS = {
  'hsd-dev': [
    { cmd: 'discover', maps: 'explore, spike, sketch, capture, ns-ideate, map-codebase, ns-context',
      desc: 'Discovery & codebase mapping — explore, prototype, research' },
    { cmd: 'define', maps: 'discuss-phase, spec-phase, mvp-phase',
      desc: 'Define scope, context, and requirements' },
    { cmd: 'plan', maps: 'plan-phase, ultraplan-phase, ai-integration-phase',
      desc: 'Create detailed phase plans' },
    { cmd: 'build', maps: 'execute-phase, autonomous, quick, fast',
      desc: 'Execute plans and build features' },
    { cmd: 'debug', maps: 'debug, forensics',
      desc: 'Systematic debugging and post-mortem forensics' },
    { cmd: 'maintain', maps: 'docs-update, extract-learnings, ingest-docs, import, cleanup',
      desc: 'Documentation, learnings, cleanup, and import' },
    { cmd: 'ui', maps: 'ui-phase, ui-review',
      desc: 'UI design contracts and visual review' },
  ],
  'hsd-pm': [
    { cmd: 'new', maps: 'new-project, new-milestone',
      desc: 'Create new project or milestone' },
    { cmd: 'track', maps: 'progress, workstreams, thread, phase, workspace, graphify, stats, ns-project, ns-workflow, ns-manage',
      desc: 'Track progress, workstreams, and project metrics' },
    { cmd: 'ship', maps: 'ship, pr-branch, complete-milestone, milestone-summary, undo, update',
      desc: 'Release, deploy, complete milestones, and rollback' },
    { cmd: 'config', maps: 'config, settings, profile-user',
      desc: 'Configure models, settings, and developer profiles' },
    { cmd: 'manage', maps: 'manager, surface, pause-work, resume-work, help, inbox',
      desc: 'Dashboard, pause/resume, and triage inbox' },
  ],
  'hsd-qa': [
    { cmd: 'validate', maps: 'validate-phase, verify-work, health, add-tests',
      desc: 'Validate phases, verify implementations, and health checks' },
    { cmd: 'audit', maps: 'audit-fix, audit-milestone, audit-uat',
      desc: 'Audit milestones, UAT gaps, and fix pipelines' },
    { cmd: 'review', maps: 'code-review, eval-review, review, review-backlog, plan-review-convergence, ns-review, secure-phase',
      desc: 'Code review, peer review, security review, and backlog review' },
  ],
};

const PLATFORM_BADGES = {
  'hsd-dev': '\n  ⚡ Hermes  ✅ Claude  ✅ Codex  ✅ Gemini  ✅ Copilot',
  'hsd-pm':  '\n  📋 Hermes  ✅ Claude  ✅ Codex  ✅ Gemini  ✅ Copilot',
  'hsd-qa':  '\n  ✅ Hermes  ✅ Claude  ✅ Codex  ✅ Gemini  ✅ Copilot',
};

function buildRoleSkill(unifiedName) {
  const role = unifiedName.replace(/^hsd-/, '');
  const info = ROLE[role] || { name: role.toUpperCase(), icon: '📌', desc: '' };
  const subs = SUBS[unifiedName] || [];
  const badges = PLATFORM_BADGES[unifiedName] || '';

  let subTable = '';
  for (const s of subs) {
    subTable += `| \`${s.cmd}\` | ${s.maps} | ${s.desc} |\n`;
  }

  const example = subs.length > 0 ? `/${unifiedName} ${subs[0].cmd}` : `/${unifiedName}`;

  return `---
name: ${unifiedName}
description: "${info.icon} ${info.name}: ${info.desc}"
version: "4.0.0"
author: "Horus Spec Driven"
license: "MIT"
locale: "${localeCode}"
platforms:
  - hermes
  - claude-code
  - codex
  - gemini
  - copilot
metadata:
  hermes:
    tags: ["hsd", "${role}", "${localeCode}"]
    category: "${role}"
    subcommands: [${subs.map(s => `"${s.cmd}"`).join(', ')}]
---

# ${info.icon} ${unifiedName}

**Role:** ${info.name}  
**Subcommands:** ${subs.length}
${badges}

> ${info.desc}

---

## Usage

\`\`\`
/${unifiedName} <subcommand> [args]
\`\`\`

\`$ARGUMENTS[0]\` ${localeCode === 'pt' ? 'seleciona o subcomando' : 'selects the subcommand'}.

---

## Subcommands

| Subcommand | Maps from | Description |
|---|---|---|
${subTable}

---

## Examples

\`\`\`
/${example}
\`\`\`

---

## Runtime Notes

<horus_sdk_adapter runtime="hermes">

${localeCode === 'pt' ? 'Este skill usa o **horus-sdk-adapter** para operações internas (state, config, roadmap, graphify).' : 'This skill uses **horus-sdk-adapter** for internal operations (state, config, roadmap, graphify).'}

\`node ~/.hermes/skills/hsd/horus-sdk-adapter/index.cjs <verb> [args] --cwd .\`

${localeCode === 'pt' ? '**Idioma:**' : '**Language:**'} ${localeData.locale.name} (${localeCode})

</horus_sdk_adapter>

---

*Horus Spec Driven v4.0 — ${localeData.locale.name}*
`;
}

function buildConfigSkill() {
  const pt = localeCode === 'pt';
  return `---
name: hsd-config
description: "⚙️ ${pt ? 'Configuração do HSD' : 'HSD Configuration'} — ${pt ? 'idioma, modelos e preferências' : 'language, models, and preferences'}"
version: "4.0.0"
author: "Horus Spec Driven"
license: "MIT"
locale: "${localeCode}"
platforms:
  - hermes
metadata:
  hermes:
    tags: ["hsd", "config", "${localeCode}"]
    category: "config"
---

# ⚙️ hsd-config

**${pt ? 'Idioma atual' : 'Current language'}:** ${localeData.locale.name} (${localeCode})

---

## ${pt ? 'Idioma' : 'Language'}

\`\`\`
/hsd-config language <code>
# pt = Português, en = English
\`\`\`

${pt ? 'Ao alterar o idioma, os skills são reconstruídos automaticamente.' : 'Skills are rebuilt automatically on language change.'}

---

${pt ? '*Horus Spec Driven v4.0*' : '*Horus Spec Driven v4.0*'}
`;
}

// ─── Main ─────────────────────────────────────────────────────────────────

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

let total = 0;

for (const name of ['hsd-dev', 'hsd-pm', 'hsd-qa']) {
  const d = path.join(OUT_DIR, name);
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
  fs.writeFileSync(path.join(d, 'SKILL.md'), buildRoleSkill(name), 'utf8');
  total++;
}

const cd = path.join(OUT_DIR, 'hsd-config');
if (!fs.existsSync(cd)) fs.mkdirSync(cd, { recursive: true });
fs.writeFileSync(path.join(cd, 'SKILL.md'), buildConfigSkill(), 'utf8');
total++;

console.log(`Generated ${total} unified SKILL.md files (locale: ${localeData.locale.name}) → ${OUT_DIR}/`);
