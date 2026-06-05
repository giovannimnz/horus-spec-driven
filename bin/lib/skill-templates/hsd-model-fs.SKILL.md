---
name: model-fs
description: "🔄 Model Fast Switch — toggle between current and last used model"
version: "3.0.0"
author: "Horus Spec Driven"
license: "MIT"
platforms:
  - hermes
metadata:
  hermes:
    tags: ["hsd", "model", "switch"]
    category: "config"
---

# 🔄 model-fs — Model Fast Switch

Alterna entre o modelo atual e o último usado em um comando.

## Uso

```
/model-fs
```

## Funcionamento

1. Lê `horus-spec-driven.json` → `model_fs.current_model` e `model_fs.last_model`
2. Inverte os dois valores
3. Chama `hermes config set model.default <novo_modelo>`
4. Persiste o estado

## Exemplo

```
/model-fs
→ Switched: deepseek-v4-flash → deepseek-v4-pro
/model-fs
→ Switched: deepseek-v4-pro → deepseek-v4-flash
```

## Localização do Estado

`~/GitHub/horus-spec-driven/horus-spec-driven.json` → `model_fs`

## Runtime

<horus_sdk_adapter runtime="hermes">

Execute via script: `bash ~/GitHub/horus-spec-driven/bin/model-fs.sh`

Ou manualmente:
```bash
CFG=~/GitHub/horus-spec-driven/horus-spec-driven.json
CURRENT=$(python3 -c "import json;print(json.load(open('$CFG'))['model_fs']['current_model'])")
LAST=$(python3 -c "import json;print(json.load(open('$CFG'))['model_fs']['last_model'])")
python3 -c "import json;cfg=json.load(open('$CFG'));cfg['model_fs']['current_model']='$LAST';cfg['model_fs']['last_model']='$CURRENT';json.dump(cfg,open('$CFG','w'),indent=2)"
hermes config set model.default "$LAST"
echo "Switched: $CURRENT → $LAST"
```

</horus_sdk_adapter>

---

*Horus Spec Driven v3.0.0*
