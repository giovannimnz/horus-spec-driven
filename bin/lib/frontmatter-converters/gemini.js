'use strict';

/**
 * Gemini CLI frontmatter converter (markdown → TOML)
 *
 * Ported from gsd-core upstream logic + extended for spec-horus.
 *
 * Gemini commands are TOML, not markdown. Schema:
 *   [command]
 *   name = "<name>"
 *   description = "<description>"
 *   prompt = """
 *   <body content>
 *   """
 *
 * Reference: gemini-cli/packages/cli/src/commands/extensions/examples/custom-commands/commands/fs/grep-code.toml
 *
 * The body is wrapped in triple-quoted TOML strings. Backslashes and
 * triple-quote sequences in the body are escaped.
 */

const { extractFrontmatterAndBody, extractFrontmatterField } = require('../content-converters/shared.js');

function tomlEscape(s) {
  if (!s) return '';
  return String(s)
    .replace(/\\/g, '\\\\')
    .replace(/"""/g, '\\"\\"\\"')
    .replace(/\r/g, '');
}

function tomlQuote(s) {
  if (s === null || s === undefined) return '""';
  let v = String(s);
  // TOML basic strings: escape backslashes and double quotes
  v = v.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  // Collapse newlines into literal \n
  v = v.replace(/\n/g, '\\n').replace(/\r/g, '');
  return `"${v}"`;
}

function convertClaudeCommandToGeminiCommand(content, skillName) {
  const { frontmatter, body } = extractFrontmatterAndBody(content);
  const description = extractFrontmatterField(frontmatter, 'description') || `Run GSD workflow ${skillName}.`;

  // Body becomes the prompt. Use multi-line basic string (triple-quote).
  const promptBody = tomlEscape(body.trim());

  return `[command]
name = ${tomlQuote(skillName)}
description = ${tomlQuote(description)}
prompt = """
${promptBody}
"""
`;
}

module.exports = { convertClaudeCommandToGeminiCommand, tomlEscape, tomlQuote };
