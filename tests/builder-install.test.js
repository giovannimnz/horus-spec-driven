const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { repoRoot, runNode, runBuilder } = require('./helpers/run-cli');

const root = repoRoot();

test('wordlist bootstrap creates modules/unified-wordlist.json', () => {
  const result = runNode([path.join(root, 'bin', 'install.js'), 'wordlist']);
  assert.equal(result.code, 0, result.stderr || result.stdout);
  assert.equal(fs.existsSync(path.join(root, 'modules', 'unified-wordlist.json')), true);
  assert.equal(fs.existsSync(path.join(root, 'modules', 'rebrand-wordlist.json')), true);
});

test('builder all generates dist for 5 runtimes after wordlist bootstrap', () => {
  const result = runBuilder(['--all']);
  assert.equal(result.code, 0, result.stderr || result.stdout);
  assert.equal(fs.existsSync(path.join(root, 'dist', 'hermes', 'install.sh')), true);
  assert.equal(fs.existsSync(path.join(root, 'dist', 'claude', 'install.sh')), true);
  assert.equal(fs.existsSync(path.join(root, 'dist', 'codex', 'install.sh')), true);
  assert.equal(fs.existsSync(path.join(root, 'dist', 'gemini', 'install.sh')), true);
  assert.equal(fs.existsSync(path.join(root, 'dist', 'copilot', 'install.sh')), true);
});

test('builder hermes generates expected files', () => {
  const result = runBuilder(['--runtime=hermes']);
  assert.equal(result.code, 0, result.stderr || result.stdout);
  assert.equal(fs.existsSync(path.join(root, 'dist', 'hermes', 'README.md')), true);
  assert.equal(fs.existsSync(path.join(root, 'dist', 'hermes', 'install.sh')), true);
  assert.equal(fs.existsSync(path.join(root, 'dist', 'hermes', 'adapter', 'index.cjs')), true);
  assert.equal(fs.existsSync(path.join(root, 'dist', 'hermes', 'agents', 'hsd-dev-agent.md')), true);
});

test('install detect lists supported runtimes on this host', () => {
  const result = runNode([path.join(root, 'bin', 'install.js'), 'detect']);
  assert.equal(result.code, 0, result.stderr || result.stdout);
  assert.match(result.stdout, /hermes/);
  assert.match(result.stdout, /claude/);
  assert.match(result.stdout, /codex/);
  assert.match(result.stdout, /gemini/);
  assert.match(result.stdout, /copilot/);
});

