'use strict';

/**
 * Claude Code frontmatter converter (also used by Hermes + Qwen upstream).
 *
 * Ported from gsd-core/bin/install.js:convertClaudeCommandToClaudeSkill.
 *
 * Output frontmatter:
 *   ---
 *   name: <skillName>
 *   description: "<description>"
 *   argument-hint: "<hint>"      (optional)
 *   agent: <agent>               (optional)
 *   allowed-tools:               (YAML multiline list, optional)
 *     - Tool1
 *     - Tool2
 *   ---
 *
 * Hermes-specific addition: when `runtime === 'hermes'`, also emit
 *   version: "<pkg-version>"     (Hermes spec requires this field)
 *
 * Body: rebrand gsd→shd/shq/shp applied (passed in pre-rebadged).
 */

const { extractFrontmatterAndBody, extractFrontmatterField, yamlQuote } = require('../content-converters/shared.js');

function convertClaudeCommandToClaudeSkill(content, skillName, runtime = null, cmdNames = null, pkgVersion = '0.0.0') {
  const { frontmatter, body } = extractFrontmatterAndBody(content);
  if (!frontmatter) return content;

  const description = extractFrontmatterField(frontmatter, 'description') || '';
  const argumentHint = extractFrontmatterField(frontmatter, 'argument-hint');
  const agent = extractFrontmatterField(frontmatter, 'agent');

  // Preserve allowed-tools as YAML multiline list
  const toolsMatch = frontmatter.match(/^allowed-tools:\s*\n((?:\s+-\s+.+\n?)*)/m);
  let toolsBlock = '';
  if (toolsMatch) {
    toolsBlock = 'allowed-tools:\n' + toolsMatch[1];
    if (!toolsBlock.endsWith('\n')) toolsBlock += '\n';
  }

  // Build frontmatter
  let fm = `---\nname: ${yamlQuote(skillName)}\ndescription: ${yamlQuote(description)}\n`;
  // Hermes' SKILL.md spec lists `version` as required
  if (runtime === 'hermes') fm += `version: ${yamlQuote(pkgVersion)}\n`;
  if (argumentHint) fm += `argument-hint: ${yamlQuote(argumentHint)}\n`;
  if (agent) fm += `agent: ${agent}\n`;
  if (toolsBlock) fm += toolsBlock;
  fm += '---';

  return `${fm}\n${body}`;
}

module.exports = { convertClaudeCommandToClaudeSkill };
