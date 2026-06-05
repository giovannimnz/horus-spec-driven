'use strict';

/**
 * GitHub Copilot frontmatter converter
 *
 * Ported from gsd-core/bin/install.js:convertClaudeCommandToCopilotSkill.
 *
 * Output frontmatter (Copilot-specific):
 *   ---
 *   name: <skillName>
 *   description: "<description>"      (always quoted, see #2876)
 *   argument-hint: "<hint>"           (optional)
 *   agent: <agent>                    (optional)
 *   allowed-tools: tool1, tool2, ...  (comma-separated string, NOT YAML list)
 *   ---
 *
 * The comma-separated allowed-tools is required by gh-copilot's frontmatter
 * loader. YAML list form is rejected.
 */

const { extractFrontmatterAndBody, extractFrontmatterField, yamlQuote } = require('../content-converters/shared.js');

function convertClaudeCommandToCopilotSkill(content, skillName, isGlobal = false) {
  const { frontmatter, body } = extractFrontmatterAndBody(content);
  if (!frontmatter) return content;

  const description = extractFrontmatterField(frontmatter, 'description') || '';
  const argumentHint = extractFrontmatterField(frontmatter, 'argument-hint');
  const agent = extractFrontmatterField(frontmatter, 'agent');

  // Extract allowed-tools YAML list → comma-separated string
  const toolsMatch = frontmatter.match(/^allowed-tools:\s*\n((?:\s+-\s+.+\n?)*)/m);
  let toolsLine = '';
  if (toolsMatch) {
    const tools = toolsMatch[1].match(/^\s+-\s+(.+)/gm);
    if (tools) {
      toolsLine = tools.map(t => t.replace(/^\s+-\s+/, '').trim()).join(', ');
    }
  }

  let fm = `---\nname: ${yamlQuote(skillName)}\ndescription: ${yamlQuote(description)}\n`;
  if (argumentHint) fm += `argument-hint: ${yamlQuote(argumentHint)}\n`;
  if (agent) fm += `agent: ${agent}\n`;
  if (toolsLine) fm += `allowed-tools: ${toolsLine}\n`;
  fm += '---';

  return `${fm}\n${body}`;
}

module.exports = { convertClaudeCommandToCopilotSkill };
