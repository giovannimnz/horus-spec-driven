'use strict';

/**
 * Shared helpers for content + frontmatter converters
 *
 * Ported from gsd-core/bin/install.js (giovannimnz) and reimplemented in
 * plain Node.js. No Claude/Codex assumptions — all functions are pure.
 *
 * Sources of port:
 *   - gsd-core/bin/install.js:extractFrontmatterAndBody, extractFrontmatterField,
 *     yamlQuote, neutralizeAgentReferences
 *   - gsd-core/scripts/fix-slash-commands.cjs:transformContentToHyphen
 */

// ─── frontmatter parsing ──────────────────────────────────────────────────

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

function extractFrontmatterAndBody(content) {
  const m = content.match(FRONTMATTER_RE);
  if (!m) return { frontmatter: null, body: content };
  return { frontmatter: m[1], body: m[2] };
}

function extractFrontmatterField(frontmatter, field) {
  if (!frontmatter) return null;
  // Match `field: value` (scalar) at top level (no leading whitespace).
  const re = new RegExp(`^${field}:\\s*(.*?)$`, 'm');
  const m = frontmatter.match(re);
  if (!m) return null;
  let v = m[1].trim();
  // Strip surrounding quotes (single, double)
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    v = v.slice(1, -1);
  }
  return v;
}

function extractMultilineField(frontmatter, field) {
  if (!frontmatter) return null;
  // Match `field:\n  - item1\n  - item2` (YAML list)
  const re = new RegExp(`^${field}:\\s*\\n((?:[ \\t]+-\\s+.+\\n?)*)`, 'm');
  const m = frontmatter.match(re);
  if (!m) return null;
  return m[1].split('\n')
    .map(l => l.match(/^\s+-\s+(.+)$/))
    .filter(Boolean)
    .map(m => m[1].trim());
}

// ─── yaml quoting ─────────────────────────────────────────────────────────

function yamlQuote(value) {
  if (value === null || value === undefined) return '""';
  let s = String(value);
  // If the string contains chars that YAML interprets (': ', '#', quotes, newlines,
  // leading/trailing whitespace, or starts with flow indicators), wrap in double quotes
  const needsQuoting = /[:#\n\r"']/.test(s) ||
                       s.startsWith(' ') || s.endsWith(' ') ||
                       /^[&*!|>%@`]/.test(s) ||
                       s === '' ||
                       s === 'true' || s === 'false' || s === 'null' ||
                       /^-?\d+(\.\d+)?$/.test(s);
  if (!needsQuoting) return s;
  // Escape backslashes and double quotes
  s = s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  return `"${s}"`;
}

// ─── colon→hyphen transform (gsd:foo → gsd-foo) ──────────────────────────

/**
 * Rewrite `gsd:<cmd>` and `/gsd:<cmd>` references to hyphen form.
 * Used by every runtime that registers slash commands under hyphen form
 * (Claude, Hermes, Qwen — issue #2808 in gsd-core).
 *
 * `cmdNames` is the list of upstream command names WITHOUT the `gsd-` prefix
 * (e.g. ['new-project', 'plan-phase', ...]). When null/empty, falls back to
 * matching any `gsd:[a-z-]+` pattern.
 */
function transformContentToHyphen(content, cmdNames) {
  if (!content) return content;
  if (cmdNames && cmdNames.length > 0) {
    // Build alternation regex from longest-first to avoid partial matches
    const sorted = [...cmdNames].sort((a, b) => b.length - a.length);
    const escaped = sorted.map(n => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const re = new RegExp(`\\bgsd:(${escaped.join('|')})\\b`, 'g');
    return content.replace(re, 'gsd-$1');
  }
  // Fallback: match any gsd:[a-z-]+ pattern
  return content.replace(/\bgsd:([a-z][a-z0-9-]+)\b/g, 'gsd-$1');
}

// ─── subagent_type neutralization ─────────────────────────────────────────

/**
 * Replace `subagent_type: gsd-foo` (in workflow body) with a runtime-neutral
 * directive. The actual delegation happens via the runtime's primitive
 * (Task tool / delegate_task / agent invoke).
 *
 * Replaces both `subagent_type: gsd-foo` (yaml) and `subagent_type="gsd-foo"`
 * (js/shell) forms.
 */
function neutralizeAgentReferences(content, agentFile) {
  if (!content) return content;
  // subagent_type: gsd-foo → @<agentFile>#gsd-foo
  let c = content.replace(/subagent_type:\s*['"]?gsd-([a-z0-9-]+)['"]?/g,
                          `@${agentFile || 'agents/gsd-$1.md'}#gsd-$1`);
  // subagent_type='gsd-foo' / "gsd-foo" → same
  c = c.replace(/subagent_type\s*[=:]\s*['"]gsd-([a-z0-9-]+)['"]/g,
                `@${agentFile || 'agents/gsd-$1.md'}#gsd-$1`);
  return c;
}

// ─── exports ──────────────────────────────────────────────────────────────

module.exports = {
  extractFrontmatterAndBody,
  extractFrontmatterField,
  extractMultilineField,
  yamlQuote,
  transformContentToHyphen,
  neutralizeAgentReferences,
};
