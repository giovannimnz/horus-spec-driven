'use strict';

/**
 * Hermes frontmatter converter — preserva YAML original, adiciona campos Hermes
 *
 * Ao contrário dos outros conversores que reescrevem o frontmatter do zero,
 * o Hermes mantém o YAML original e só adiciona campos específicos se ausentes.
 */

const { extractFrontmatterAndBody } = require('../content-converters/shared.js');

function convertToHermesSkill(content, skillName, cmdNames, pkgVersion) {
  const { frontmatter, body } = extractFrontmatterAndBody(content);
  if (!frontmatter) return content;

  // Keep original frontmatter, just ensure Hermes-required fields exist
  let fm = frontmatter;

  // Ensure name: matches the rebadged skill name
  if (!fm.match(/^name:/m)) {
    fm = `name: ${skillName}\n` + fm;
  }

  // Ensure version: exists (Hermes SKILL.md spec requires it)
  if (!fm.match(/^version:/m)) {
    fm = fm.replace(/^name:.*\n/, (m) => `${m}version: "${pkgVersion}"\n`);
  }

  // Rebuild: keep everything between --- delimiters
  return `---\n${fm.trim()}\n---\n\n${body}`;
}

module.exports = { convertToHermesSkill };
