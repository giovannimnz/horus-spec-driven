#!/usr/bin/env bash
# Horus Spec Driven — Hermes Agent Installer v5.0
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DIST_DIR="$SCRIPT_DIR"
HD="${HERMES_HOME:-$HOME/.hermes}/skills/hsd"
AD="${HERMES_HOME:-$HOME/.hermes}/agents"
echo "═══ Horus Spec Driven v5.0 — Hermes Agent ═══"
mkdir -p "$HD" "$AD"

# Skills (4 unified with $ARGUMENTS[0] routing)
cp -r "$DIST_DIR/skills/hsd/"* "$HD/"
echo "  ✓ Skills: $(ls "$DIST_DIR/skills/hsd/" | wc -l)"

# Agents (3 specialized agents)
cp "$DIST_DIR/agents/"*.md "$AD/" 2>/dev/null || true
echo "  ✓ Agents: $(ls "$DIST_DIR/agents/"*.md 2>/dev/null | wc -l)"

# horus-sdk-hermes (31 verbs, graphifyy.py)
mkdir -p "$HD/horus-sdk-hermes"
cp -r "$DIST_DIR/adapter/"* "$HD/horus-sdk-hermes/"
echo "  ✓ Adapter: $(ls "$DIST_DIR/adapter/" | wc -l) files"

echo ""
echo "✅ Done. Restart Hermes or run /reload_skills."
echo "   Skills: $HD"
echo "   Agents: $AD"
