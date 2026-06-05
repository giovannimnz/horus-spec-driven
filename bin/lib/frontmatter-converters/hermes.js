'use strict';

/**
 * Frontmatter converter for Hermes (reuses Claude converter + adds version)
 *
 * Hermes SKILL.md format is identical to Claude Code's, EXCEPT Hermes
 * requires a `version:` field in the frontmatter (per
 * hermes-research/tools/skills_tool.py MAX_NAME_LENGTH etc.).
 *
 * Implementation: thin wrapper around convertClaudeCommandToClaudeSkill
 * with runtime='hermes' so the version field is added.
 */

const { convertClaudeCommandToClaudeSkill } = require('./claude.js');

function convertClaudeCommandToHermesSkill(content, skillName, cmdNames, pkgVersion) {
  return convertClaudeCommandToClaudeSkill(content, skillName, 'hermes', cmdNames, pkgVersion);
}

module.exports = { convertClaudeCommandToHermesSkill };
