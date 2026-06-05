'use strict';

/**
 * Codex CLI content converter
 *
 * Adapts gsd-core upstream markdown for OpenAI Codex CLI.
 *
 * Ported from gsd-core/bin/install.js:convertClaudeToCodexMarkdown +
 * convertSlashCommandsToCodexSkillMentions.
 *
 * Specific transformations:
 *   - `$ARGUMENTS` → `{{GSD_ARGS}}` (Codex template syntax)
 *   - `/clear` references removed (Codex has no `/clear`)
 *   - `~/.claude/`, `$HOME/.claude/`, `./.claude/` → `~/.codex/`/etc.
 *   - `.claudeignore` → `.codexignore`
 *   - `subagent_type: gsd-X` → `@agents/gsd-X.md#gsd-X`
 *   - `AGENTS.md` references in subagent_type context → `AGENTS.md` (Codex uses this)
 *   - `Claude Code` → `Codex CLI` (branding)
 *   - `CLAUDE.md` → `AGENTS.md` (Codex project instructions file)
 *
 * NOT touched:
 *   - `gsd-tools.cjs` (binary name)
 *   - `${HERMES_SKILL_DIR}` (Hermes-only)
 */

const { neutralizeAgentReferences } = require('./shared.js');

/**
 * Convert `/gsd:<cmd>` references to `/.codex/<cmd>` skill mentions
 * (Codex invocations reference skills by their directory path).
 */
function convertSlashCommandsToCodexSkillMentions(content) {
  if (!content) return content;
  // /gsd:<cmd> → ~/.codex/skills/gsd-<cmd>/SKILL.md
  return content.replace(/\/gsd:([a-z0-9-]+)/g,
                         '~/.codex/skills/gsd-$1/SKILL.md');
}

function convertCodexMarkdown(content) {
  if (!content) return content;
  let c = content;

  // Branding
  c = c.replace(/CLAUDE\.md/g, 'AGENTS.md');
  c = c.replace(/\bClaude Code\b/g, 'Codex CLI');

  // Slash command → skill mention (Codex doesn't have /gsd: prefix)
  c = convertSlashCommandsToCodexSkillMentions(c);

  // $ARGUMENTS → Codex template
  c = c.replace(/\$ARGUMENTS\b/g, '{{GSD_ARGS}}');

  // /clear removal (Codex has no /clear)
  c = c.replace(/`\/clear`\s*,?\s*then:?\s*\n?/gi, '');
  c = c.replace(/\/clear\s*,?\s*then:?\s*\n?/gi, '');
  c = c.replace(/^\s*`?\/clear`?\s*$/gm, '');

  // Path rewrites: VENDOR paths (upstream gsd-core install location)
  c = c.replace(/@?~\/\.claude\/gsd-core\/workflows\//g, '~/.codex/skills/');
  c = c.replace(/@?\$HOME\/\.claude\/gsd-core\/workflows\//g, '$HOME/.codex/skills/');
  c = c.replace(/@?~\/\.claude\/gsd-core\/references\//g, '~/.codex/skills/');
  c = c.replace(/@?\$HOME\/\.claude\/gsd-core\/references\//g, '$HOME/.codex/skills/');
  c = c.replace(/@?~\/\.claude\/gsd-core\/templates\//g, '~/.codex/skills/');
  c = c.replace(/@?\$HOME\/\.claude\/gsd-core\/templates\//g, '$HOME/.codex/skills/');
  // Then runtime config paths
  c = c.replace(/\$HOME\/\.claude\//g, '$HOME/.codex/');
  c = c.replace(/~\/\.claude\//g, '~/.codex/');
  c = c.replace(/\.\/\.claude\//g, './.codex/');
  c = c.replace(/\$HOME\/\.claude\b/g, '$HOME/.codex');
  c = c.replace(/~\/\.claude\b/g, '~/.codex');
  c = c.replace(/(?<![\w$.\/~])\.claude\//g, '.codex/');

  // .claudeignore → .codexignore
  c = c.replace(/\.claudeignore\b/g, '.codexignore');

  // Subagent neutralization
  c = neutralizeAgentReferences(c, 'AGENTS.md');

  return c;
}

module.exports = { convertCodexMarkdown, convertSlashCommandsToCodexSkillMentions };
