'use strict';

/**
 * Codex CLI frontmatter converter
 *
 * Ported from gsd-core/bin/install.js:convertClaudeCommandToCodexSkill +
 * getCodexSkillAdapterHeader.
 *
 * Output frontmatter (Codex-specific):
 *   ---
 *   name: <skillName>
 *   description: "<description>"
 *   metadata:
 *     short-description: "<first 180 chars>"
 *   ---
 *
 * Followed by an "adapter header" explaining Codex-specific usage.
 *
 * NOT a slash command — Codex invocations are by path. The adapter header
 * tells the Codex agent where to find the skill.
 */

const { extractFrontmatterAndBody, extractFrontmatterField, yamlQuote } = require('../content-converters/shared.js');

function getCodexSkillAdapterHeader(skillName) {
  return `<!-- codex-skill-adapter
name: ${skillName}
loader: Codex CLI
invocation: Run \`codex\` and reference this skill by path:
  ~/.codex/skills/${skillName}/SKILL.md
  or invoke the agent loop with this skill attached.
-->`;
}

function toSingleLine(s) {
  return String(s || '').replace(/\s+/g, ' ').trim();
}

function convertClaudeCommandToCodexSkill(content, skillName) {
  // 1. Apply Codex content converter (paths, /clear, $ARGUMENTS, etc.)
  // Note: the caller (install.js) must pre-apply convertCodexMarkdown.
  const { frontmatter, body } = extractFrontmatterAndBody(content);
  let description = `Run GSD workflow ${skillName}.`;
  if (frontmatter) {
    const maybe = extractFrontmatterField(frontmatter, 'description');
    if (maybe) description = maybe;
  }
  description = toSingleLine(description);
  const shortDescription = description.length > 180
    ? `${description.slice(0, 177)}...`
    : description;
  const adapter = getCodexSkillAdapterHeader(skillName);

  return `---\nname: ${yamlQuote(skillName)}\ndescription: ${yamlQuote(description)}\nmetadata:\n  short-description: ${yamlQuote(shortDescription)}\n---\n\n${adapter}\n\n${body.trimStart()}`;
}

module.exports = { convertClaudeCommandToCodexSkill, getCodexSkillAdapterHeader };
