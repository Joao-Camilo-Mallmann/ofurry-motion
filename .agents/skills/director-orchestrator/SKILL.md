---
name: director-orchestrator
description: Directs and orchestrates editorial motion graphics production for OFurry by breaking raw narration phrase-by-phrase, judging complexity, presenting scan-friendly prose plans, and ensuring clean anti-dashboard aesthetic on native alpha.
license: MIT
metadata:
  author: OFurry Motion Lab
  version: "1.1.0"
---

# 🎬 Diretor Orquestrador Skill (ADR-005 Editorial Engine)

Skill oficial de **Direção Criativa e Orquestração Editorial** para produção de mini-vídeos em Motion Design com canal Alpha transparente para o canal do YouTube **OFurry**.

---

## 🧭 When to Apply

Use esta skill quando:
- Receber um roteiro bruto de narração/locução para transformar em motion graphics.
- Decompor blocos de narração em mini-cenas granulares (frase a frase, de 3 a 5 segundos cada).
- Julgar dinamicamente a complexidade de cada mini-cena (resolução direta vs delegação a subagente).
- Gerar e submeter o **Checkpoint Editorial em Prosa Escaneável** para validação do usuário antes de codificar.
- Coordenar a alternância obrigatória entre as 6 silhuetas geométricas (ADR-004) e impor a estética *Clean Editorial* (sem containers/cards cinzas de dashboard, 2 a 4 palavras monumentais flutuando no canal Alpha nativo).
- Supervisionar a criação de `SceneSpec` ou componentes bespoke em Remotion e a exportação em lote com transparência real.

---

## ⚡ Core Integration Directives

### 1. Always Incorporate `/motion-design`
Every scene must be grounded in the motion design principles from `/motion-design`:
- **Three Pillars**:
  1. **Emotional Intent**: Define target emotion (Alert/Urgency, Optimism/Growth, Tech Authority, Revelation, Critical Warning) before writing code.
  2. **Visual Narrative**: Micro-story structure (Setup/punch entry → Action/reading hold → Resolution/continuous micro-drift).
  3. **Motion Craft**: Damped springs (`snappy`, `smooth-draw`), spatial hierarchy, and zero linear spatial movement.
- **Three Motion Layers**:
  1. **Primary Layer**: Main hero text (`110px-150px`) / monumental counter (`180px-220px`) / chart curve.
  2. **Secondary Layer**: Neon highlight badge (`#FF9900` with `#000000` text), Lucide icon expanding ring, technical leader lines.
  3. **Ambient Layer**: Tech framing L-corners, precision crosshairs, and subtle sinusoidal drift (±2px).

---

## ⚡ Core Operational Directives (ADR-001 - ADR-005)

### 1. Decomposição Granular Frase a Frase (3s a 5s)
- **Uma frase = Uma mini-cena:** Nunca agrupe múltiplas frases ou parágrafos inteiros em uma única cena estática.
- Cada cena deve ter entre **90 e 150 frames** (3.0s a 5.0s a 30fps).
- O dinamismo da edição é garantido pela rápida alternância de estímulos visuais alinhados à locução.

### 2. Julgamento Dinâmico de Complexidade & Delegação
Para cada cena decomposta:
- **Resolução Direta (Orquestrador):** Ganchos de texto monumental (`monumental-hero`), números colossais com ícone (`split-authority`) ou grifos diretos (`blueprint-grifo`). O Orquestrador gera a cena diretamente sem disparar subagente.
- **Delegação a Subagente Especializado:** Físicas cinéticas não-triviais (colisões de teto com faíscas, splits vetoriais dinâmicos, clusters de nós interligados `hud-radial`, fluxos complexos em SVG). O Orquestrador define a silhueta, métricas e restrições e aciona o subagente.

### 3. Checkpoint Human-Readable Obrigatório (Plano em Prosa)
**NUNCA** apresente JSON cru ou código Remotion longo no checkpoint inicial. Apresente o plano editorial estruturado em prosa escaneável:

```markdown
### 🎬 Plano Editorial do Bloco: [Nome do Bloco]

- **Cena 01 (3.5s / 105 frames)**: "[Trecho exato da narração]"
  - *Metáfora Cinética*: [Descrição física visceral da animação em 1 frase]
  - *Silhueta*: `[monumental-hero | horizontal-split | stacked-steps | blueprint-grifo | hud-radial | split-authority]`
  - *Palavras em Tela*: `[2 a 4 palavras em caixa alta]`
  - *Origem*: [Direta | Subagente Especializado]

- **Cena 02 (3.0s / 90 frames)**: "[Trecho exato da narração]"
  - *Metáfora Cinética*: [Descrição física visceral da animação em 1 frase]
  - *Silhueta*: `[...]`
  - *Palavras em Tela*: `[...]`
  - *Origem*: [Direta | Subagente Especializado]
```

### 4. Padrão Estético Clean Editorial (Anti-SaaS Dashboard)
- **Zero Cards Cinzas/Containers:** Elementos visuais, tipografia monumental e vetores flutuam soltos sobre o canal Alpha real.
- **Limite de 2 a 4 Palavras:** Tipografia monumental (110px a 150px) em `Archivo Black`, `Bebas Neue` ou `Syne`.
- **Metáforas Físicas Diretas:** Em vez de "cards com tópicos", use impacto mecânico (fatiamento de bloco, colisão no teto, queima/derretimento pela inflação).

---

## 🏆 The 10 Golden Rules of OFurry Motion Design (ADR-002 + ADR-004 + ADR-005)

| # | Rule | Directive |
|---|---|---|
| 🎯 | **1. Minimal Text (2-4 Words)** | **NEVER** put full sentences or paragraphs on screen. Extraia apenas 2 a 4 palavras-chave de âncora ou métricas numéricas. A voz conta a história; a tela entrega o gancho visual de autoridade. |
| 📏 | **2. Monumental Scale** | Hero titles occupy **70%–90%** of screen width (110px–150px font size). Numbers range from **180px to 220px**. Command instant attention in the first 3 seconds. |
| 🎨 | **3. Typography by Role** | • `archivo` (`Archivo Black`) ou `bebas` (`Bebas Neue`): Ganchos de impacto e títulos hero<br>• `syne` (`Syne`): Títulos conceituais e editoriais modernos<br>• `space-grotesk` (`Space Grotesk`): Métricas, números, moedas e dados técnicos<br>• `jakarta` (`Plus Jakarta Sans`): Subtítulos de apoio e labels limpos |
| 🖼️ | **4. Anti-"AI Template" / Anti-Dashboard** | Fundo Preto (#000000) com transparência Alpha real, Tarjas Sólidas Neon Laranja (`#FF9900`) com texto preto (`#000000`), miras técnicas (`crosshairs`) e cantos `L-corners`. **Proibido** nuvens de blur genéricas e caixas/cards cinzas opacos. |
| 🎬 | **5. Native Alpha Channel** | Renderização com fundo transparente real em **ProRes 4444 (`.mov`)** ou **WebM**. Permite sobreposição direta na timeline do Premiere/DaVinci sem chroma key. |
| ⚡ | **6. Punch & Hold Physics** | **Entrada (0-15 frames):** Entrada enérgica com spring amortecido (*Punch*).<br>**Retenção (15-final):** Congelamento sólido para leitura perfeita (*Hold*).<br>**Micro-Drift:** Oscilação senoidal contínua (±2px) para manter a cena viva. |
| ⚓ | **7. Anchored Composition (Zero Orphans)** | Nenhum elemento secundário flutua solto. Todo elemento filho deve declarar `anchorTo` apontando para o elemento primário, amarrado por uma ponte de composição (`connector-line`, `overlap`, `color-trail`, `none-justified`). |
| 📐 | **8. Relative Scaling (`sizeRatio`)** | Ícones e elementos secundários derivam seu tamanho do elemento dominante (55%-75% da altura de texto hero, 35%-45% de números hero). |
| 🏛️ | **9. 6 Layout Silhouettes Rotation** | Cenas consecutivas nunca repetem a mesma silhueta. Alterne entre `monumental-hero`, `horizontal-split`, `stacked-steps`, `blueprint-grifo`, `hud-radial` e `split-authority`. |
| 💥 | **10. Dramatic Kinetic Metaphors** | Transforme a tensão da fala em movimento físico real (fatiamento a laser, colisão violenta contra teto de rentabilidade, split de barras, corrosão inflacionária). |

---

## 🏛️ Catalog of 6 Layout Silhouettes

1. **`monumental-hero`**: Massive centered title (70-90% width) with tightly attached badge and overlapping icon lockup.
2. **`horizontal-split`**: 50/50 or 60/40 comparative divide with vertical center technical divider and bridging connector line.
3. **`stacked-steps`**: Vertical progression hierarchy with step indicator badges and vertical leader lines.
4. **`blueprint-grifo`**: Technical document simulation with neon orange highlighter block and orthogonal leader callout.
5. **`hud-radial`**: Central anchor core with concentric orbital laser rings and interconnected peripheral nodes.
6. **`split-authority`**: Asymmetric 70/30 division where a colossal 200px counter breaches the division line into the context panel.

---

## 🔄 Workflow de 5 Passos do Diretor Orquestrador

```
   ┌─────────────────────────────────────────────────────────────┐
   │ STEP 1: Decomposição da Fala & Metáforas Viscerais          │
   │ • Quebrar áudio bruto frase a frase (3-5s por mini-cena)    │
   │ • Atribuir silhuetas rotativas e metáforas físicas          │
   └──────────────────────────────┬──────────────────────────────┘
                                  │
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │ STEP 2: Julgamento de Delegação vs Resolução Direta         │
   │ • Identificar cenas simples (diretas) e complexas (subagente)│
   └──────────────────────────────┬──────────────────────────────┘
                                  │
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │ STEP 3: Checkpoint Editorial em Prosa (Validação Humana)    │
   │ • Submeter plano escaneável em prosa ao usuário             │
   │ • Ajustar conforme feedback antes de qualquer código        │
   └──────────────────────────────┬──────────────────────────────┘
                                  │
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │ STEP 4: Geração Remotion & Preview no Studio                │
   │ • Criar SceneSpec / componentes bespoke com Alpha nativo    │
   │ • Validar compilação TypeScript com bun run build           │
   │ • Conferir no Remotion Studio (bun run studio)              │
   └──────────────────────────────┬──────────────────────────────┘
                                  │
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │ STEP 5: Exportação em Canal Alpha (Batch Render)            │
   │ • Renderizar mini-vídeos transparentes (ProRes 4444 / WebM) │
   │ • Salvar em out/scenes/ para timeline do editor             │
   └─────────────────────────────────────────────────────────────┘
```

---

## 🖥️ Comandos de Execução Rápida

- **Remotion Studio**: `bun run studio`
- **Renderizar Todas as Cenas em WebM Alpha**: `bun run render:scenes:webm`
- **Renderizar Todas as Cenas em ProRes 4444 Alpha**: `bun run render:scenes`
- **Renderizar Cena Única**: `bun run render:scene -- --id=<nome-ou-numero>`
- **Renderizar Sequência Unificada**: `bun run render:bloco3:webm` / `bun run render:bloco3`
- **Verificar Tipos TypeScript**: `bun run build`
