#!/usr/bin/env bash
# Horus Spec Driven — GitHub Copilot Installer v5.0
set -euo pipefail
PD=${PWD}/.github/prompts
echo "Installing HSD v5.0 for GitHub Copilot..."
mkdir -p "$PD"
cp dist/copilot/prompts/*.md "$PD/"
echo "✓ $(ls dist/copilot/prompts/ | wc -l) prompts installed"
