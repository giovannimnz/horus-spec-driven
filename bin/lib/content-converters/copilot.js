'use strict';

/**
 * GitHub Copilot content converter
 *
 * Adapts gsd-core upstream markdown for GitHub Copilot.
 *
 * Ported from gsd-core/bin/install.js:convertClaudeToCopilotContent +
 * convertClaudeToCopilotContent and the agent tool name mapping.
 *
 * Specific transformations:
 *   - `~/.claude/`, `$HOME/.claude/` → `.github/` (local) or `~/.copilot/` (global)
 *   - bare `.claude/` → `.github/`
 *   - `gsd:foo` → `gsd-foo` (Copilot uses hyphen)
 *   - `AGENTS.md` → `copilot-instructions.md` (Copilot's project instructions file)
 *   - `Claude Code` → `GitHub Copilot` (branding)
 *   - `CLAUDE.md` → `copilot-instructions.md`
 *   - subagent_type: gsd-X → @.github/agents/gsd-X.agent.md#gsd-X
 *
 * Tool name mapping (also applied in body where text references tools):
 *   Read      → read
 *   Write     → edit
 *   Edit      → edit
 *   Bash      → execute
 *   Grep      → search
 *   Glob      → search
 *   Task      → agent
 *   WebSearch → web
 *   WebFetch  → web
 *   TodoWrite → todo
 *   AskUserQuestion → ask_user
 *   SlashCommand → skill
 *
 * (Copilot only applies this in the frontmatter, but we apply it in body
 * text references too, since Copilot's body format expects lowercase
 * tool names.)
 */

const { transformContentToHyphen, neutralizeAgentReferences } = require('./shared.js');

const COPILOT_TOOL_MAP = {
  Read: 'read', Write: 'edit', Edit: 'edit', Bash: 'execute',
  Grep: 'search', Glob: 'search', Task: 'agent',
  WebSearch: 'web', WebFetch: 'web',
  TodoWrite: 'todo', AskUserQuestion: 'ask_user', SlashCommand: 'skill',
};

function convertCopilotContent(content, isGlobal = false) {
  if (!content) return content;
  let c = content;

  // Branding
  c = c.replace(/CLAUDE\.md/g, 'copilot-instructions.md');
  c = c.replace(/\bClaude Code\b/g, 'GitHub Copilot');

  // Path rewrites: VENDOR paths first
  c = c.replace(/@?~\/\.claude\/gsd-core\/workflows\//g, '.github/skills/');
  c = c.replace(/@?\$HOME\/\.claude\/gsd-core\/workflows\//g, '.github/skills/');
  c = c.replace(/@?~\/\.claude\/gsd-core\/references\//g, '.github/skills/');
  c = c.replace(/@?\$HOME\/\.claude\/gsd-core\/references\//g, '.github/skills/');
  c = c.replace(/@?~\/\.claude\/gsd-core\/templates\//g, '.github/skills/');
  c = c.replace(/@?\$HOME\/\.claude\/gsd-core\/templates\//g, '.github/skills/');
  // Then runtime config paths (global vs local)
  if (isGlobal) {
    c = c.replace(/\$HOME\/\.claude(\/|\b)/g, '$HOME/.copilot$1');
    c = c.replace(/~\/\.claude(\/|\b)/g, '~/.copilot$1');
  } else {
    c = c.replace(/\$HOME\/\.claude\//g, '.github/');
    c = c.replace(/~\/\.claude\//g, '.github/');
    c = c.replace(/\$HOME\/\.claude\b/g, '.github');
    c = c.replace(/~\/\.claude\b/g, '.github');
  }
  c = c.replace(/\.\/\.claude\//g, './.github/');
  c = c.replace(/(?<![\w$.\/~])\.claude\//g, '.github/');

  // Colon → hyphen
  c = transformContentToHyphen(c, null);

  // Tool name mapping in body (conservative: only inside backticks to avoid
  // matching random prose like "Read the docs")
  c = c.replace(/`\b(Read|Write|Edit|Bash|Grep|Glob|Task|WebSearch|WebFetch|TodoWrite|AskUserQuestion|SlashCommand)\b`/g,
                (m, tool) => '`' + COPILOT_TOOL_MAP[tool] + '`');

  // Subagent neutralization
  c = neutralizeAgentReferences(c, '.github/agents/gsd-$1.agent.md');

  return c;
}

module.exports = { convertCopilotContent, COPILOT_TOOL_MAP };
