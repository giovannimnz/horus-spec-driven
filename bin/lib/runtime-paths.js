#!/usr/bin/env node
'use strict';

/**
 * spec-horus runtime paths registry
 *
 * v2.1: paths are now CONSUMED BY the layout driver (bin/lib/layout.js).
 * This module just provides raw path resolution; the layout decides where
 * each artifact kind goes.
 *
 * Each runtime's path config:
 *   - home(): absolute path to global config root (e.g. ~/.hermes/)
 *   - local(): relative path for per-project install (e.g. .claude/, .github/)
 *   - env: env var that overrides home (or null)
 *   - detect(): bool — is this runtime present on the host?
 *
 * Sources:
 *   - Hermes:  ~/.hermes/ (skills/, agents/) — confirmed via NousResearch/hermes-agent
 *   - Claude:  ~/.claude/ — confirmed via gsd-core install.js
 *   - Codex:   $CODEX_HOME or ~/.codex/
 *   - Gemini:  $GEMINI_CONFIG_DIR or ~/.gemini/
 *   - Copilot: per-project only — ./.github/ (no global home)
 */

const fs = require('fs');
const os = require('os');
const path = require('path');

function isWSL() {
  if (process.env.WSL_DISTRO_NAME) return true;
  try {
    const v = fs.readFileSync('/proc/version', 'utf8');
    return /microsoft|wsl/i.test(v);
  } catch (_) { return false; }
}

function expandHome(p) {
  if (p.startsWith('~/') || p === '~') {
    return path.join(os.homedir(), p.slice(1));
  }
  return p;
}

function resolveEnvOrHome(envName, defaultPath) {
  const fromEnv = process.env[envName];
  if (fromEnv && fromEnv.trim()) return expandHome(fromEnv);
  return expandHome(defaultPath);
}

const RUNTIMES = {
  hermes: {
    id: 'hermes',
    label: 'Hermes Agent',
    home: () => resolveEnvOrHome('HERMES_HOME', '~/.hermes'),
    local: null, // Hermes is global-only (skill_view works on global)
    env: 'HERMES_HOME',
    detect: () => fs.existsSync(path.join(os.homedir(), '.hermes', 'config.yaml')),
    modes: ['global'],
  },
  claude: {
    id: 'claude',
    label: 'Claude Code',
    home: () => resolveEnvOrHome('CLAUDE_CONFIG_DIR', '~/.claude'),
    local: '.claude',
    env: 'CLAUDE_CONFIG_DIR',
    detect: () => fs.existsSync(path.join(os.homedir(), '.claude')) ||
                  fs.existsSync(path.join(process.cwd(), '.claude')),
    modes: ['global', 'local'],
  },
  codex: {
    id: 'codex',
    label: 'OpenAI Codex CLI',
    home: () => resolveEnvOrHome('CODEX_HOME', '~/.codex'),
    local: '.codex',
    env: 'CODEX_HOME',
    detect: () => fs.existsSync(resolveEnvOrHome('CODEX_HOME', '~/.codex')) ||
                  fs.existsSync(path.join(process.cwd(), '.codex')),
    modes: ['global', 'local'],
  },
  gemini: {
    id: 'gemini',
    label: 'Gemini CLI',
    home: () => resolveEnvOrHome('GEMINI_CONFIG_DIR', '~/.gemini'),
    local: '.gemini',
    env: 'GEMINI_CONFIG_DIR',
    detect: () => fs.existsSync(resolveEnvOrHome('GEMINI_CONFIG_DIR', '~/.gemini')) ||
                  fs.existsSync(path.join(process.cwd(), '.gemini')),
    modes: ['global', 'local'],
  },
  copilot: {
    id: 'copilot',
    label: 'GitHub Copilot',
    home: null, // No global home
    local: '.github',
    env: null,
    detect: () => fs.existsSync(path.join(process.cwd(), '.github')),
    modes: ['local'],
  },
};

function getRuntime(id) {
  const r = RUNTIMES[id];
  if (!r) throw new Error(`Unknown runtime: ${id}. Valid: ${Object.keys(RUNTIMES).join(', ')}`);
  return r;
}

function detectAvailable() {
  return Object.keys(RUNTIMES).filter((id) => {
    try { return RUNTIMES[id].detect(); } catch (_) { return false; }
  });
}

function resolveBaseDir(id, mode) {
  const r = getRuntime(id);
  if (mode === 'local' && !r.local) {
    throw new Error(`Runtime ${id} does not support local install (no per-project convention)`);
  }
  if (mode === 'global' && !r.home) {
    throw new Error(`Runtime ${id} does not support global install (no global home)`);
  }
  if (mode === 'local') return path.join(process.cwd(), r.local);
  return r.home();
}

module.exports = { RUNTIMES, getRuntime, detectAvailable, resolveBaseDir, isWSL };
