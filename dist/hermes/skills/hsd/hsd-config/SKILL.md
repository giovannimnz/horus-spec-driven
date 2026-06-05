---
name: hsd-config
description: "⚙️ Configuração do HSD — idioma, compressão, subagentes"
version: "5.0.0"
author: "Horus Spec Driven"
license: "MIT"
locale: "pt"
platforms:
  - hermes
metadata:
  hermes:
    tags: ["hsd", "config", "pt"]
    category: "config"
---

# ⚙️ /hsd-config

## Idioma

```
/hsd-config language pt      → Português
/hsd-config language en      → English
```

**Atual:** Português (Brasil) (pt)

---

## Compressão de Fala

| Nível | Nome | Descrição |
|---|---|---|
| `lite` | Lite | Redução leve, mantém fluidez |
| `full` | Full | Compressão padrão, ~75% de redução |
| `ultra` | Ultra | Compressão máxima, estilo telegráfico |

```
/hsd-config compression lite
/hsd-config compression full
/hsd-config compression ultra
```

---

## Subagentes (Cavecrew)

| Atalho | Agente | Função |
|---|---|---|
| `investigator` | cavecrew-investigator | Localiza código (output comprimido) |
| `builder` | cavecrew-builder | Edita 1-2 arquivos (output comprimido) |
| `reviewer` | cavecrew-reviewer | Revisa diffs (output comprimido) |

```
/hsd-config agents investigator
/hsd-config agents builder
/hsd-config agents reviewer
/hsd-config agents off
```

---

*Horus Spec Driven v5.0 — dist/hermes*
