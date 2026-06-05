'use strict';

/**
 * Gemini CLI content converter
 *
 * Adapts gsd-core upstream markdown for Google Gemini CLI.
 *
 * Specific transformations:
 *   - `~/.claude/`, `$HOME/.claude/`, `./.claude/` → `~/.gemini/`, etc.
 *   - `Claude Code` → `Gemini CLI` (branding)
 *   - `CLAUDE.md` → `GEMINI.md` (Gemini's project instructions file)
 *   - `subagent_type: gsd-X` → neutralized (Gemini has no subagent registry;
 *     workflows that spawn subagents must be inlined or skipped)
 *   - `gsd:foo` → `gsd-foo`
 *
 * NOT in scope: TOML conversion. The gsd-core upstream also doesn't convert
 * markdown to TOML; this converter outputs markdown that the caller
 * (frontmatter converter) must serialize to TOML.
 */

const { transformContentToHyphen, neutralizeAgentReferences } = require('./shared.js');

function convertGeminiMarkdown(content, cmdNames) {
  if (!content) return content;
  let c = content;

  // Branding
  c = c.replace(/CLAUDE\.md/g, 'GEMINI.md');
  c = c.replace(/\bClaude Code\b/g, 'Gemini CLI');

  // Path rewrites: VENDOR paths first
  c = c.replace(/@?~\/\.claude\/gsd-core\/workflows\//g, '~/.gemini/commands/gsd/');
  c = c.replace(/@?\$HOME\/\.claude\/gsd-core\/workflows\//g, '$HOME/.gemini/commands/gsd/');
  c = c.replace(/@?~\/\.claude\/gsd-core\/references\//g, '~/.gemini/commands/gsd/');
  c = c.replace(/@?\$HOME\/\.claude\/gsd-core\/references\//g, '$HOME/.gemini/commands/gsd/');
  c = c.replace(/@?~\/\.claude\/gsd-core\/templates\//g, '~/.gemini/commands/gsd/');
  c = c.replace(/@?\$HOME\/\.claude\/gsd-core\/templates\//g, '$HOME/.gemini/commands/gsd/');
  // Then runtime config paths
  c = c.replace(/\$HOME\/\.claude\//g, '$HOME/.gemini/');
  c = c.replace(/~\/\.claude\//g, '~/.gemini/');
  c = c.replace(/\.\/\.claude\//g, './.gemini/');
  c = c.replace(/\$HOME\/\.claude\b/g, '$HOME/.gemini');
  c = c.replace(/~\/\.claude\b/g, '~/.gemini');
  c = c.replace(/(?<![\w$.\/~])\.claude\//g, '.gemini/');

  // Colon→hyphen
  c = transformContentToHyphen(c, cmdNames);

  // Subagent neutralization (Gemini has no subagent registry)
  c = neutralizeAgentReferences(c, 'agents/gsd-$1.md');

  return c;
}

module.exports = { convertGeminiMarkdown };
