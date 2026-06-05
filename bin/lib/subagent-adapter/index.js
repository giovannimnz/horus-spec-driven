'use strict';

/**
 * Subagent adapter — maps gsd-core's `subagent_type: gsd-X` references
 * to each runtime's native delegation primitive.
 *
 * Why this exists:
 *   gsd-core workflows (commands/gsd/*.md) reference 33 subagents
 *   (gsd-executor, gsd-planner, gsd-roadmapper, gsd-debugger, etc.)
 *   via `Agent(prompt=..., subagent_type="gsd-X")` (Claude Code) or
 *   `delegate_task(subagent_type="gsd-X", ...)` (Codex). Those strings
 *   are Claude/Codex-native and DON'T exist as subagent_type values in
 *   Hermes, Gemini, or Copilot.
 *
 * What this does:
 *   Pre-processes workflow body at install time, rewriting those calls
 *   to a runtime-neutral form. The actual delegation happens at runtime
 *   via the runtime's primitive:
 *     - Claude: Task tool with subagent_type (passthrough-ish, but neutralized)
 *     - Codex:  delegate_task(goal=, toolsets=[...])
 *     - Hermes: delegate_task(goal=, toolsets=[...]) (same primitive, different naming)
 *     - Copilot: invoke custom agent by .github/agents/X.agent.md reference
 *     - Gemini: inline execution (no subagent registry)
 *
 * Output form (neutral, runtime-agnostic):
 *   <subagent name="gsd-executor" goal="..." tools="Read,Write,Bash" />
 *   <subagent name="gsd-planner"  goal="..." />
 *
 * This is XML-ish so the agent can pattern-match it and dispatch via
 * whatever primitive its runtime provides.
 */

const { neutralizeAgentReferences } = require('../content-converters/shared.js');

// ─── form 1: Claude-style Agent(prompt=..., subagent_type="gsd-X") ───────
const CLAUDE_AGENT_RE = /Agent\s*\(\s*prompt\s*=\s*["']([^"']+)["']\s*,\s*subagent_type\s*=\s*["']gsd-([a-z0-9-]+)["']/g;

// ─── form 2: Codex-style delegate_task(subagent_type="gsd-X", ...) ───────
const CODEX_DELEGATE_RE = /delegate_task\s*\(\s*subagent_type\s*=\s*["']gsd-([a-z0-9-]+)["']\s*,\s*goal\s*=\s*["']([^"']+)["']/g;

const SUBAGENT_TOOL_MAP = {
  // Map gsd-core agent name → typical toolset (best-effort; agent definitions
  // may override)
  'gsd-executor': 'Read,Write,Edit,Bash,Grep,Glob',
  'gsd-planner': 'Read,Write,Edit,Grep,Glob',
  'gsd-roadmapper': 'Read,Write,Edit,Grep,Glob',
  'gsd-debugger': 'Read,Write,Edit,Bash,Grep,Glob',
  'gsd-verifier': 'Read,Write,Edit,Bash,Grep,Glob',
  'gsd-code-reviewer': 'Read,Grep,Glob',
  'gsd-plan-checker': 'Read,Write,Edit,Grep,Glob',
  'gsd-codebase-mapper': 'Read,Grep,Glob',
  'gsd-project-researcher': 'WebSearch,WebFetch,Read,Write',
  'gsd-phase-researcher': 'WebSearch,WebFetch,Read,Write',
  'gsd-research-synthesizer': 'Read,Write',
};

/**
 * Convert Claude Agent(...) calls to neutral <subagent> form.
 */
function neutralizeClaudeAgentCalls(content) {
  return content.replace(CLAUDE_AGENT_RE, (_m, goal, agent) => {
    const tools = SUBAGENT_TOOL_MAP[agent] || 'Read,Write,Edit,Bash,Grep,Glob';
    return `<subagent name="gsd-${agent}" goal="${escapeAttr(goal)}" tools="${tools}" />`;
  });
}

/**
 * Convert Codex delegate_task(...) calls to neutral <subagent> form.
 */
function neutralizeCodexDelegateCalls(content) {
  return content.replace(CODEX_DELEGATE_RE, (_m, agent, goal) => {
    const tools = SUBAGENT_TOOL_MAP[agent] || 'Read,Write,Edit,Bash,Grep,Glob';
    return `<subagent name="gsd-${agent}" goal="${escapeAttr(goal)}" tools="${tools}" />`;
  });
}

function escapeAttr(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, ' ');
}

/**
 * Apply all subagent neutralizations to content.
 */
function neutralizeAll(content) {
  let c = content || '';
  c = neutralizeClaudeAgentCalls(c);
  c = neutralizeCodexDelegateCalls(c);
  c = neutralizeAgentReferences(c, '@agents/gsd-$1.md#gsd-$1');
  // Neutralize the <available_agent_types> block — list of gsd- subagents
  // that the orchestrator can spawn. Replace with a generic directive
  // since each runtime has different subagent primitives.
  c = neutralizeAvailableAgentTypes(c);
  return c;
}

/**
 * Rewrite `<available_agent_types>` blocks. The gsd-core upstream lists
 * 33 subagents (e.g. gsd-executor, gsd-planner) that the orchestrator
 * can spawn. In horus-spec-driven, these are the rebadged shd- shq- shp- skills
 * that ship as SKILL.md files. The orchestrator should use the runtime's
 * native delegation primitive (Task tool, delegate_task, etc.) to invoke
 * them.
 */
function neutralizeAvailableAgentTypes(content) {
  if (!content) return content;
  // Pattern: <available_agent_types> ... - shd-X — description ... </available_agent_types>
  // Replace each bullet with a uniform reference
  return content.replace(
    /<available_agent_types>[\s\S]*?<\/available_agent_types>/g,
    `<available_skills>
Spec-Horus rebadged skills (shd-*, shq-*, shp-*) are available. Invoke via
your runtime's native delegation primitive (e.g. Task tool, delegate_task).
Each skill ships as a SKILL.md file at the location configured by horus-spec-driven.
</available_skills>`
  );
}

module.exports = {
  neutralizeAll,
  neutralizeClaudeAgentCalls,
  neutralizeCodexDelegateCalls,
  SUBAGENT_TOOL_MAP,
};
