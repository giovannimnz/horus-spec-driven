'use strict';

/**
 * Hermes content converter
 *
 * Adapts gsd-core upstream markdown for Hermes Agent (NousResearch).
 *
 * Ported from gsd-core/bin/install.cjs:case 'hermes' in _applyRuntimeRewrites.
 *
 * Specific transformations:
 *   - `CLAUDE.md` → `HERMES.md` (project instruction file name)
 *   - `Claude Code` → `Hermes Agent` (branding in body)
 *   - `~/.claude/`, `$HOME/.claude/` → `~/.hermes/`, `$HOME/.hermes/` (paths)
 *   - bare `.claude/` (residual) → `.hermes/`
 *   - `./.claude/` → `./.hermes/`
 *   - `gsd:<cmd>` → `gsd-<cmd>` (Hermes registers under hyphen form, #2808)
 *   - subagent_type: gsd-X → @agents/gsd-X.md#gsd-X (neutralized)
 *   - attribution line: `Built with GSD Core ...` → `Built with GSD Core ... (Hermes Agent edition)`
 *
 * NOT touched (known non-matches):
 *   - `gsd-tools.cjs` (binary name)
 *   - `gsd-tools query` (CLI invocation)
 *   - inline `!`shell`` (Hermes-specific, only valid in Hermes SKILL.md)
 *   - `${HERMES_SKILL_DIR}` template vars (only valid in Hermes)
 */

const { transformContentToHyphen, neutralizeAgentReferences } = require('./shared.js');

/**
 * @param {string} content  raw upstream markdown (frontmatter + body)
 * @param {string[]} cmdNames  list of gsd command names (without `gsd-` prefix)
 * @returns {string} converted markdown
 */
function convertHermesMarkdown(content, cmdNames) {
  if (!content) return content;
  let c = content;

  // Branding rewrites
  c = c.replace(/CLAUDE\.md/g, 'HERMES.md');
  c = c.replace(/\bClaude Code\b/g, 'Hermes Agent');

  // Vendor paths (rewrite BEFORE Claude→Hermes translation)
  c = c.replace(/@?~\/\.claude\/gsd-core\/workflows\//g, '~/.hermes/skills/hsd/');
  c = c.replace(/@?\$HOME\/\.claude\/gsd-core\/workflows\//g, '$HOME/.hermes/skills/hsd/');
  c = c.replace(/@?~\/\.claude\/gsd-core\/references\//g, '~/.hermes/skills/hsd/');
  c = c.replace(/@?\$HOME\/\.claude\/gsd-core\/references\//g, '$HOME/.hermes/skills/hsd/');
  c = c.replace(/@?~\/\.claude\/gsd-core\/templates\//g, '~/.hermes/skills/hsd/');
  c = c.replace(/@?\$HOME\/\.claude\/gsd-core\/templates\//g, '$HOME/.hermes/skills/hsd/');
  c = c.replace(/~\/\.claude\//g, '~/.hermes/');
  c = c.replace(/\$HOME\/\.claude\//g, '$HOME/.hermes/');
  c = c.replace(/\.\/\.claude\//g, './.hermes/');
  c = c.replace(/(?<![\w$.\/~])\.claude\//g, '.hermes/');
  c = c.replace(/~\/\.claude\b/g, '~/.hermes');
  c = c.replace(/\$HOME\/\.claude\b/g, '$HOME/.hermes');

  // Colon→hyphen
  c = transformContentToHyphen(c, cmdNames);

  // Subagent registry: neutralized
  c = neutralizeAgentReferences(c, 'agents/gsd-$1.md');

  // horus-sdk adapter: inject replacement section if this skill references
  // gsd-tools or its rebadged form (shd-tools, shq-tools, shp-tools)
  if (/\b[gs]hd-tools\b|\bg[-s]hd_tools\b/.test(c)) {
    c = injectHorusSdkAdapter(c, 'hermes');
  }

  return c;
}

/**
 * Inject a <horus_sdk_adapter> section at the top of the body for skills
 * that reference gsd-tools.cjs. Replaces ALL `gsd-tools <verb>` calls
 * with the Hermes-native equivalent.
 */
function injectHorusSdkAdapter(content, runtime) {
  const adapterNote = '\n<horus_sdk_adapter runtime="' + runtime + '">\n' +
    '**gsd-tools.cjs is replaced by the Hermes-native horus-sdk-adapter.**\n\n' +
    'All gsd-tools calls in this skill should be replaced with:\n' +
    '  `node ~/.hermes/skills/hsd/horus-sdk-adapter/index.cjs <verb> [args] --cwd .`\n\n' +
    'The adapter is installed at:\n' +
    '  ~/.hermes/skills/hsd/horus-sdk-adapter/\n\n' +
    'Supported verbs: state, init, state-snapshot, summary-extract, config-get,\n' +
    '  config-set, config-set-model-profile, config-new-project, commit,\n' +
    '  frontmatter.get, frontmatter.set, roadmap, phase, validate, workstream,\n' +
    '  scaffold, milestone, requirements, progress, resolve-model,\n' +
    '  generate-slug, current-timestamp, list-todos, gap-analysis, learnings,\n' +
    '  prompt-budget, update-context, verify-path-exists.\n\n' +
    'Output is JSON. Use --raw for single-value output.\n' +
    'Example: `gsd-tools state load --cwd .` -> `node ~/.hermes/skills/hsd/horus-sdk-adapter/index.cjs state load --cwd .`\n\n' +
    'Graphify uses graphifyy.py (Python code-aware) + file-based fallback.\n' +
    'Agent-skills uses skill_view(name=...) -- the Hermes-native skill loader.\n' +
    'Websearch uses web_search() -- Hermes built-in with 4 backends.\n' +
    '</horus_sdk_adapter>\n';
  // Inject after frontmatter (after first ---...--- block)
  const fmEnd = content.indexOf('\n---', 4);
  if (fmEnd !== -1) {
    return content.slice(0, fmEnd + 4) + adapterNote + content.slice(fmEnd + 4);
  }
  return adapterNote + '\n' + content;
}

module.exports = { convertHermesMarkdown };
