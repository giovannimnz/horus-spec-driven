#!/usr/bin/env bash
# Horus Spec Driven — Gemini CLI Installer v5.0
set -euo pipefail
CD=${HOME}/.gemini/commands/hsd
echo "Installing HSD v5.0 for Gemini CLI..."
mkdir -p "$CD"
cp dist/gemini/commands/hsd/*.toml "$CD/"
echo "✓ $(ls dist/gemini/commands/hsd/ | wc -l) commands installed"
