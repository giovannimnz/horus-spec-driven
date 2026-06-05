#!/usr/bin/env bash
# Horus Spec Driven — Codex CLI Installer v5.0
set -euo pipefail
PD=${HOME}/.codex/prompts
echo "Installing HSD v5.0 for Codex CLI..."
mkdir -p "$PD"
cp dist/codex/prompts/*.md "$PD/"
echo "✓ $(ls dist/codex/prompts/ | wc -l) prompts installed"
