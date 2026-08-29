# 🎬 Motion para o Canal do OFurry (`ofurry-motion`)

Motor de geração programática de **Motion Design Editorial** para o canal **OFurry** no YouTube, desenvolvido em **Remotion**, **React** e **TypeScript**, otimizado para execução com **Bun**.

Transforma trechos de roteiro de vídeo narrado em animações de alto impacto, prontas para sobreposição direta sobre filmagens reais e B-rolls em editores como **Adobe Premiere Pro**, **DaVinci Resolve** e **CapCut** através de **canal Alpha (transparência real em ProRes 4444 e WebM)**.

---

## 🚀 Como Gerar Animações de Motion para o Canal OFurry

O fluxo de trabalho foi projetado para ser rápido, modular e focado em mini-vídeos independentes por cena/fala.

```
                  ┌────────────────────────┐
                  │ 1. Trecho de Fala do   │
                  │        Roteiro         │
                  └───────────┬────────────┘
                              │
                              ▼
                  ┌────────────────────────┐
                  │ 2. Diretor IA gera     │
                  │    JSON SceneSpec      │
                  │ (6 Regras de Ouro)     │
                  └───────────┬────────────┘
                              │
                              ▼
                  ┌────────────────────────┐
                  │ 3. Preview no Studio   │
                  │  (bun run studio)      │
                  └───────────┬────────────┘
                              │
                              ▼
                  ┌────────────────────────┐
                  │ 4. Exportação com      │
                  │    Alpha (ProRes/WebM) │
                  │ (bun run render:scenes)│
                  └───────────┬────────────┘
                              │
                              ▼
                  ┌────────────────────────┐
                  │ 5. Arrastar para a     │
                  │    timeline do Editor  │
                  │ (Premiere / DaVinci)   │
                  └────────────────────────┘
```

---

### 📋 Passo a Passo

### 1. Definir a Cena (`SceneSpec`)
Crie ou edite um arquivo de roteiro (como `example/coe-script.ts`). Cada cena representa um gancho visual de uma fala específica:

```typescript
import { SceneSpec } from '../src/director/schema';

export const minhasCenas: SceneSpec[] = [
  {
    id: 'cena-01-alerta',
    durationInFrames: 120, // 4 segundos a 30fps
    layout: 'centered-hero',
    choreography: {
      entryDirection: 'bottom-up',
      drawSpeed: 'snappy',
      ambientMotion: 'pulse-glow',
    },
    elements: [
      {
        type: 'text',
        text: 'CUIDADO COM O COE',
        subtitle: 'O produto mais empurrado do mercado financeiro',
        variant: 'hero',
        highlightWords: ['COE'], // Ganha tarja sólida neon laranja (#FF9900)
        font: 'archivo',
        glow: true,
      },
      {
        type: 'icon',
        name: 'ShieldAlert',
        size: 110,
        showRing: true,
      },
    ],
  },
];
```

---

### 2. As 6 Regras de Ouro do Diretor de Motion Design

Ao criar ou instruir uma IA a gerar cenas, siga estritamente estas diretrizes editoriais:

| # | Regra | Diretriz |
|---|---|---|
| 🎯 | **1. Texto Mínimo (2-4 Palavras)** | **NUNCA** coloque parágrafos inteiros. Extraia apenas 2 a 4 palavras-chave de âncora ou métricas numéricas. A voz já narra a história; a tela traz autoridade visual. |
| 📏 | **2. Escala Monumental** | Títulos Hero de 120px–150px (ocupando 70-90% da tela) e números de 180px–220px. Elementos gigantes dominam os primeiros 3 segundos. |
| 🎨 | **3. Tipografia por Função** | • `Archivo Black` / `Bebas Neue` para títulos de impacto<br>• `Syne` para títulos conceituais modernos<br>• `Space Grotesk` para números, métricas e dados técnicos<br>• `Plus Jakarta Sans` para subtítulos e labels limpos |
| 🖼️ | **4. Anti-"Cara de IA"** | Tarjas sólidas neon (`#FF9900` com texto `#000000`), cantos de enquadramento técnico (L-corners), miras de precisão e zero constelações de bolinhas genéricas. |
| 🎬 | **5. Fundo Transparente (Canal Alpha)** | Exportação nativa em **ProRes 4444 (`.mov`)** ou **WebM** para sobrepor direto sobre filmagens reais sem necessidade de chroma-key. |
| ⚡ | **6. Física Punch & Hold** | Entrada ultra-rápida e amortecida (frames 0-15), retenção firme para leitura (Hold) e micro-drift senoidal contínuo (±2px) contra sensação de tela congelada. |

---

### 3. Visualizar no Remotion Studio

Abra o estúdio visual interativo com hot-reload:

```bash
bun run studio
```

O estúdio abrirá no navegador (`http://localhost:3000`), permitindo navegar pela timeline, inspecionar cada cena individualmente (`COE-Cena-1`, etc.) e verificar o alinhamento com canal Alpha transparente.

---

### 4. Exportar os Mini-Vídeos por Cena

Escolha o formato ideal para seu fluxo de edição:

#### 🎥 Exportar todas as cenas com Alpha (ProRes 4444 `.mov` - Recomendado para Premiere & DaVinci):
```bash
bun run render:scenes
```
> Gera arquivos `.mov` com canal Alpha na pasta `out/scenes/` (ex: `COE-Cena-1-cena-01-alerta-coe.mov`).

#### 🌐 Exportar todas as cenas em WebM com Alpha (Mais leve):
```bash
bun run render:scenes:webm
```

#### ⚡ Renderizar apenas uma cena específica (em ~2 segundos):
```bash
# Renderizar apenas a cena 1
bun run render:scene -- --id=1

# Renderizar cena por ID em ProRes
bun run render:scene -- --id=cena-01-alerta-coe --format=prores
```

#### 🎞️ Exportar vídeo completo unificado em MP4:
```bash
bun run render:coe
# ou
bun run render:full
```

---

## 🧱 Catálogo de Primitivas Visuais (`src/primitives/`)

| Primitiva | Props Principais | Exemplo de Uso |
|---|---|---|
| **`TextReveal`** | `text`, `subtitle`, `variant` ('hero'\|'title'\|'badge'), `highlightWords`, `font` ('archivo'\|'syne'\|'bebas'\|'jakarta') | Palavras de âncora com tarja sólida neon e stagger |
| **`AnimatedNumber`** | `value`, `startValue`, `prefix` ('R$ '), `suffix` ('%'), `label`, `variant` ('hero'\|'card'\|'badge') | Contadores gigantes (180-220px) em `Space Grotesk` monospaced |
| **`Icon`** | `name` (Lucide), `size` (72-120px), `showRing`, `accentColor` | Linha artística com anel de choque e drop-shadow neon |
| **`ConnectedNodes`** | `nodes`, `connections`, `width` (920px), `drawDuration` | Malha de conexão entre agentes, intermediários e bancos |
| **`DynamicChart`** | `data`, `type` ('line'\|'bar'), `highlightLast`, `showGrid` | Gráfico de linha/barra com traçado ao vivo em 80% da tela |
| **`ParticleField`** | `showGrid`, `showCorners`, `showCrosshairs`, `transparent` | Framing técnico editorial com miras e cantos de precisão |

---

## 📁 Estrutura do Projeto

```
ofurry-motion/
├── src/
│   ├── composition/
│   │   └── SceneComposer.tsx     # Orquestrador de cenas com suporte a Alpha
│   ├── director/
│   │   ├── schema.ts             # Schemas Zod e tipos TypeScript
│   │   ├── prompt.ts             # System prompt do Diretor IA
│   │   └── validator.ts          # Validação e fallback automático
│   ├── primitives/
│   │   ├── TextReveal.tsx        # Tipografia monumental + tarjas sólidas
│   │   ├── AnimatedNumber.tsx    # Contadores em Space Grotesk tabular
│   │   ├── Icon.tsx              # Ícones com anel laser e alpha
│   │   ├── ConnectedNodes.tsx    # Malha SVG ampliada (80% tela)
│   │   ├── DynamicChart.tsx      # Gráficos dinâmicos de tendência
│   │   ├── ParticleField.tsx     # Miras técnicas e framing editorial
│   │   └── index.ts              # Exportação central de primitivas
│   ├── theme/
│   │   ├── ofurry.ts             # Multi-famílias, tokens monumentais e alpha
│   │   └── motion.ts             # Física de springs, micro-drift e drawing
│   ├── Root.tsx                  # Fontes locais e composições com Alpha
│   └── index.ts                  # Entrypoint Remotion
├── scripts/
│   └── render-scenes.ts          # Script orquestrador de exportação em lote
├── example/
│   ├── coe-script.ts             # Roteiro real do canal (Vídeo do COE)
│   └── sample-script.ts          # Roteiro de demonstração
├── docs/                         # ADRs e documentação técnica
├── openspec/                     # Especificações OpenSpec
└── package.json
```

---

## 🛠️ Resumo de Comandos Bun

| Comando Bun | Finalidade |
|---|---|
| `bun run studio` | Abre o Remotion Studio interativo |
| `bun run render:scenes` | Exporta todas as cenas em **ProRes 4444 com Alpha** (`.mov`) |
| `bun run render:scenes:webm` | Exporta todas as cenas em **WebM com Alpha** (`.webm`) |
| `bun run render:scene -- --id=X` | Exporta rapidamente uma cena específica |
| `bun run render:coe` | Renderiza a sequência completa do vídeo do COE (`.mp4`) |
| `bun run build` | Checa integridade de tipos com TypeScript (`tsc --noEmit`) |