#!/usr/bin/env bash
# Horus Spec Driven — Claude Code Installer v5.0
set -euo pipefail
SD=${HOME}/.claude/skills
echo "Installing HSD v5.0 for Claude Code..."
mkdir -p "$SD"
cp dist/claude/skills/*.md "$SD/"
echo "✓ $(ls dist/claude/skills/ | wc -l) skills installed"
