'use strict';

/**
 * Runtime artifact layout — kind-driven install
 *
 * Ported from gsd-core/src/runtime-artifact-layout.cts (TypeScript source
 * of truth, hand-written in bin/lib/runtime-artifact-layout.cjs at build time).
 *
 * The "layout" for a runtime describes:
 *   - What artifact kinds to install (commands, agents, skills)
 *   - Where each kind lives (destSubpath under the runtime's config dir)
 *   - What filename prefix to apply (e.g. 'gsd-' for Claude, '' for Hermes)
 *   - What content + frontmatter converter to run
 *
 * This module exposes:
 *   - RUNTIME_LAYOUTS: { runtime: { kind: ArtifactKind, ... } }
 *   - getRuntimeLayout(runtime, mode): returns the resolved layout
 *
 * Modes:
 *   - 'global': install to runtime's home (e.g. ~/.claude/, ~/.hermes/)
 *   - 'local':  install to project's per-CLI dir (e.g. ./.claude/, ./.codex/)
 */

const path = require('path');

// Converters
const { convertHermesMarkdown } = require('./content-converters/hermes.js');
const { convertCodexMarkdown } = require('./content-converters/codex.js');
const { convertCopilotContent } = require('./content-converters/copilot.js');
const { convertClaudeMarkdown } = require('./content-converters/claude.js');
const { convertGeminiMarkdown } = require('./content-converters/gemini.js');

const { convertClaudeCommandToClaudeSkill } = require('./frontmatter-converters/claude.js');
const { convertClaudeCommandToHermesSkill } = require('./frontmatter-converters/hermes.js');
const { convertClaudeCommandToCodexSkill } = require('./frontmatter-converters/codex.js');
const { convertClaudeCommandToCopilotSkill } = require('./frontmatter-converters/copilot.js');
const { convertClaudeCommandToGeminiCommand } = require('./frontmatter-converters/gemini.js');

const { neutralizeAll } = require('./subagent-adapter/index.js');

// ─── LAYOUTS ──────────────────────────────────────────────────────────────

/**
 * Each runtime+mode has a `kinds` array. Each kind has:
 *   - kind: 'commands' | 'agents' | 'skills'
 *   - destSubpath: relative to configDir
 *   - prefix: filename prefix ('' for Hermes nested; 'gsd-' for Claude flat)
 *   - contentConverter: (cmdNames) => (content) => content
 *   - frontmatterConverter: (skillName, cmdNames, pkgVersion) => (content) => content
 *   - format: 'markdown' | 'toml' (file extension decision)
 *
 * Conventions:
 *   - Claude global uses SKILLS (prefix 'gsd-', one dir per skill with SKILL.md)
 *   - Claude local uses COMMANDS (flat files, namespace 'commands/hsd/')
 *   - Hermes uses SKILLS NESTED under skills/hsd/ (prefix '', one dir per skill)
 *   - Codex uses SKILLS flat (prefix 'gsd-', one dir per skill)
 *   - Gemini uses COMMANDS (flat files, namespace 'commands/hsd/', TOML format)
 *   - Copilot uses SKILLS flat (prefix 'gsd-', one dir per skill)
 */

function makeCmdNames(wordlist) {
  // wordlist: Map<oldName, newName> where oldName = 'gsd-foo'
  // return: ['foo', 'bar', ...]  (cmd names without gsd- prefix)
  return Array.from(wordlist.keys()).map(n => n.replace(/^gsd-/, ''));
}

const RUNTIME_LAYOUTS = {
  // ─── HERMES ─────────────────────────────────────────────────────────────
  hermes: {
    global: {
      kinds: [
        {
          kind: 'skills',
          destSubpath: 'skills/hsd',
          prefix: '',
          format: 'markdown',
          contentConverter: (cmdNames) => (content) =>
            convertHermesMarkdown(neutralizeAll(content), cmdNames),
          frontmatterConverter: (cmdNames, pkgVersion) => (content, skillName) =>
            convertClaudeCommandToHermesSkill(content, skillName, cmdNames, pkgVersion),
        },
        {
          kind: 'agents',
          destSubpath: 'agents',
          prefix: '',
          format: 'markdown',
          contentConverter: (cmdNames) => (content) =>
            convertHermesMarkdown(neutralizeAll(content), cmdNames),
        },
      ],
    },
  },

  // ─── CLAUDE CODE ────────────────────────────────────────────────────────
  // Global: ~/.claude/skills/<shd-foo>/SKILL.md  (prefix='', rebadged stem)
  // Local:  .claude/commands/hsd/<shd-foo>.md + .claude/agents/<shd-foo>.md
  //
  // Why prefix='' for skills: the slash command the user types comes from
  // the frontmatter `name:` field, NOT the filename. Filename is purely
  // cosmetic / filesystem discoverability. Using prefix='' and the
  // rebadged stem (shd-foo) gives a clean rebadged namespace everywhere
  // (matching gsd-core's behavior of reading the name from frontmatter).
  claude: {
    global: {
      kinds: [
        {
          kind: 'skills',
          destSubpath: 'skills',
          prefix: '',
          format: 'markdown',
          contentConverter: (cmdNames) => (content) =>
            convertClaudeMarkdown(neutralizeAll(content), cmdNames),
          frontmatterConverter: (cmdNames) => (content, skillName) =>
            convertClaudeCommandToClaudeSkill(content, skillName, 'claude', cmdNames),
        },
      ],
    },
    local: {
      kinds: [
        {
          kind: 'commands',
          destSubpath: 'commands/hsd',
          prefix: '',
          format: 'markdown',
          contentConverter: (cmdNames) => (content) =>
            convertClaudeMarkdown(neutralizeAll(content), cmdNames),
        },
        {
          kind: 'agents',
          destSubpath: 'agents',
          prefix: '',
          format: 'markdown',
          contentConverter: (cmdNames) => (content) =>
            convertClaudeMarkdown(neutralizeAll(content), cmdNames),
        },
      ],
    },
  },

  // ─── CODEX ──────────────────────────────────────────────────────────────
  codex: {
    global: {
      kinds: [
        {
          kind: 'skills',
          destSubpath: 'skills',
          prefix: '',
          format: 'markdown',
          contentConverter: (cmdNames) => (content) =>
            convertCodexMarkdown(neutralizeAll(content)),
          frontmatterConverter: (cmdNames) => (content, skillName) =>
            convertClaudeCommandToCodexSkill(content, skillName),
        },
      ],
    },
    local: {
      kinds: [
        {
          kind: 'skills',
          destSubpath: 'skills',
          prefix: '',
          format: 'markdown',
          contentConverter: (cmdNames) => (content) =>
            convertCodexMarkdown(neutralizeAll(content)),
          frontmatterConverter: (cmdNames) => (content, skillName) =>
            convertClaudeCommandToCodexSkill(content, skillName),
        },
      ],
    },
  },

  // ─── GEMINI ─────────────────────────────────────────────────────────────
  // Commands: ~/.gemini/commands/hsd/<shd-foo>.toml
  // The "hsd" in commands/hsd/ is the namespace — kept for gsd-core compat.
  gemini: {
    global: {
      kinds: [
        {
          kind: 'commands',
          destSubpath: 'commands/hsd',
          prefix: '',
          format: 'toml',
          contentConverter: (cmdNames) => (content) =>
            convertGeminiMarkdown(neutralizeAll(content), cmdNames),
          frontmatterConverter: (cmdNames) => (content, skillName) =>
            convertClaudeCommandToGeminiCommand(content, skillName),
        },
      ],
    },
  },

  // ─── COPILOT ────────────────────────────────────────────────────────────
  copilot: {
    global: {
      kinds: [
        {
          kind: 'skills',
          destSubpath: 'skills',
          prefix: '',
          format: 'markdown',
          contentConverter: (cmdNames) => (content) =>
            convertCopilotContent(neutralizeAll(content), true),
          frontmatterConverter: (cmdNames) => (content, skillName) =>
            convertClaudeCommandToCopilotSkill(content, skillName, true),
        },
      ],
    },
    local: {
      kinds: [
        {
          kind: 'skills',
          destSubpath: 'skills',
          prefix: '',
          format: 'markdown',
          contentConverter: (cmdNames) => (content) =>
            convertCopilotContent(neutralizeAll(content), false),
          frontmatterConverter: (cmdNames) => (content, skillName) =>
            convertClaudeCommandToCopilotSkill(content, skillName, false),
        },
      ],
    },
  },
};

function getRuntimeLayout(runtime, mode = 'global') {
  const r = RUNTIME_LAYOUTS[runtime];
  if (!r) throw new Error(`Unknown runtime: ${runtime}`);
  const layout = r[mode];
  if (!layout) throw new Error(`Runtime ${runtime} does not support mode '${mode}'`);
  return layout;
}

function listRuntimes() {
  return Object.keys(RUNTIME_LAYOUTS);
}

module.exports = {
  RUNTIME_LAYOUTS,
  getRuntimeLayout,
  listRuntimes,
  makeCmdNames,
};
