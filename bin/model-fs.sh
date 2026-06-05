#!/usr/bin/env bash
# model-fs — Model Fast Switch
# Alterna entre o modelo atual e o último usado
set -euo pipefail

CFG="$HOME/GitHub/horus-spec-driven/horus-spec-driven.json"

if [ ! -f "$CFG" ]; then
  echo "{\"error\": \"config not found: $CFG\"}"
  exit 1
fi

CURRENT=$(python3 -c "import json; print(json.load(open('$CFG'))['model_fs']['current_model'])")
LAST=$(python3 -c "import json; print(json.load(open('$CFG'))['model_fs']['last_model'])")

if [ -z "$CURRENT" ] || [ -z "$LAST" ]; then
  echo "{\"error\": \"model_fs state not initialized\"}"
  exit 1
fi

# Swap
python3 -c "
import json
cfg = json.load(open('$CFG'))
cfg['model_fs']['current_model'] = '$LAST'
cfg['model_fs']['last_model'] = '$CURRENT'
json.dump(cfg, open('$CFG', 'w'), indent=2)
"

# Apply to Hermes
hermes config set model.default "$LAST" 2>/dev/null || true

echo "{\"switched\": true, \"from\": \"$CURRENT\", \"to\": \"$LAST\"}"
