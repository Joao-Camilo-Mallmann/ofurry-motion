---
name: generate-video
description: Standardized workflow to generate motion design video scenes for the OFurry YouTube channel, direct scenes from narrated scripts using /motion-design principles, preview in Remotion Studio, and render transparent Alpha mini-videos.
license: MIT
metadata:
  author: OFurry Motion Lab
  version: "1.2.0"
---

# 🎬 OFurry Video Motion Generation Skill (ADR-004 Anchored Edition)

Standardized human-in-the-loop production pipeline to transform narrated video script excerpts into high-impact, transparent editorial motion graphics animations for the **OFurry** YouTube channel.

---

## 🧭 When to Apply

Use this skill when:
- Converting script narration / voiceover into animated motion scenes (`SceneSpec`).
- Directing animations with professional motion design principles (timing, springs, choreography).
- Brainstorming dramatic kinetic metaphors and layout silhouettes across multi-scene sequences.
- Previewing animations live in the **Remotion Studio** or validating frame snapshots.
- Exporting transparent Alpha Channel mini-videos (**ProRes 4444** or **WebM**) ready for video editor timelines (Adobe Premiere Pro, DaVinci Resolve, CapCut).

---

## ⚡ Core Integration Directives

### 1. Always Incorporate `/motion-design`
Every scene must be grounded in the motion design principles from `/motion-design`:
- **Three Pillars**:
  1. **Emotional Intent**: Define target emotion (Alert/Urgency, Optimism/Growth, Tech Authority, Revelation).
  2. **Visual Narrative**: Micro-story structure (Punch Setup → Solid Hold → Micro-Drift Resolution).
  3. **Motion Craft**: Damped springs (`snappy`, `smooth-draw`), spatial hierarchy, and zero linear spatial movement.
- **Three Motion Layers**:
  1. **Primary Layer**: Main hero text / monumental counter / chart curve.
  2. **Secondary Layer**: Neon highlight badge (`#FF9900`), Lucide icon expanding ring, technical leader lines.
  3. **Ambient Layer**: Tech framing L-corners, precision crosshairs, and subtle sinusoidal drift (±2px).

### 2. Always Use `/explore-openspec` for Planning
When exploring new video ideas, structuring long scripts into scenes, or deciding on visual metaphors:
- Use `/explore-openspec` (`openspec-explore`) to brainstorm the narrative structure, compare visual archetypes, and validate key visual anchors before generating scene code.

---

## 🏆 The 10 Golden Rules of OFurry Motion Design

| # | Rule | Directive |
|---|---|---|
| 🎯 | **1. Minimal Text (2-4 Words)** | **NEVER** put full sentences or paragraphs on screen. Extraia apenas 2 a 4 palavras-chave de âncora ou métricas numéricas. A voz conta a história; a tela entrega o gancho visual de autoridade. |
| 📏 | **2. Monumental Scale** | Hero titles occupy **70%–90%** of screen width (120px–150px font size). Numbers range from **180px to 220px**. Command instant attention in the first 3 seconds. |
| 🎨 | **3. Typography by Role** | • `archivo` (`Archivo Black`) ou `bebas` (`Bebas Neue`): Ganchos de impacto e títulos hero<br>• `syne` (`Syne`): Títulos conceituais e editoriais modernos<br>• `space-grotesk` (`Space Grotesk`): Métricas, números, moedas e dados técnicos<br>• `jakarta` (`Plus Jakarta Sans`): Subtítulos de apoio e labels limpos |
| 🖼️ | **4. Anti-"AI Template" Aesthetics** | Fundo Preto (#000000) com transparência Alpha real, Tarjas Sólidas Neon Laranja (`#FF9900`) com texto preto (`#000000`), miras técnicas (`crosshairs`) e cantos `L-corners`. **Proibido** nuvens de blur genéricas e caixas arredondadas flutuantes. |
| 🎬 | **5. Native Alpha Channel** | Renderização com fundo transparente real em **ProRes 4444 (`.mov`)** ou **WebM**. Permite sobreposição direta na timeline do Premiere/DaVinci sem chroma key. |
| ⚡ | **6. Punch & Hold Physics** | **Entrada (0-15 frames):** Entrada enérgica com spring amortecido (*Punch*).<br>**Retenção (15-final):** Congelamento sólido para leitura perfeita (*Hold*).<br>**Micro-Drift:** Oscilação senoidal contínua (±2px) para manter a cena viva. |
| ⚓ | **7. Anchored Composition (Zero Orphans)** | Nenhum elemento secundário flutua solto. Todo elemento filho deve declarar `anchorTo` apontando para o elemento primário, amarrado por uma ponte de composição (`connector-line`, `overlap`, `color-trail`, `none-justified`). |
| 📐 | **8. Relative Scaling (`sizeRatio`)** | Ícones e elementos secundários derivam seu tamanho do elemento dominante (55%-75% da altura de texto hero, 35%-45% de números hero). |
| 🏛️ | **9. 6 Layout Silhouettes Rotation** | Cenas consecutivas nunca repetem a mesma silhueta. Alterne entre `monumental-hero`, `horizontal-split`, `stacked-steps`, `blueprint-grifo`, `hud-radial` e `split-authority`. |
| 💥 | **10. Dramatic Kinetic Metaphors** | Transforme a tensão da fala em movimento físico real (colisão contra teto de rentabilidade, quebra de fluxo, grifo de contrato). |

---

## 🔄 The 5-Step Human-in-the-Loop Workflow

```
   ┌─────────────────────────────────────────────────────────────┐
   │ STEP 1: Concept & Kinetic Metaphor                          │
   │ • Extract emotional intent and 2-4 anchor keywords          │
   │ • Conceive outside-the-box physical metaphor                │
   │ • Choose distinct silhouette (rotate from previous scene)   │
   └──────────────────────────────┬──────────────────────────────┘
                                  │
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │ STEP 2: Draft SceneSpec & Preview Setup                     │
   │ • Write SceneSpec with anchorTo, sizeRatio, and bridges     │
   │ • Register scene in Root.tsx for Remotion Studio            │
   └──────────────────────────────┬──────────────────────────────┘
                                  │
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │ STEP 3: User Validation Checkpoint (Mandatory)              │
   │ • Present layout silhouette, metaphor, and anchor hierarchy │
   │ • Solicit user confirmation or adjustments                  │
   └──────────────────────────────┬──────────────────────────────┘
                                  │
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │ STEP 4: Rapid Refine (If Needed)                            │
   │ • Fine-tune wording, font selection, or timing delays       │
   └──────────────────────────────┬──────────────────────────────┘
                                  │
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │ STEP 5: Final Alpha Render & Export                         │
   │ • Render transparent mini-videos in ProRes 4444 / WebM      │
   │ • Output saved to out/scenes/ ready for NLE overlay         │
   └─────────────────────────────────────────────────────────────┘
```

---

## 🏛️ Catalog of 6 Layout Silhouettes

1. **`monumental-hero`**: Massive centered title (70-90% width) with tightly attached badge and overlapping icon lockup.
2. **`horizontal-split`**: 50/50 or 60/40 comparative divide with vertical center technical divider and bridging connector line.
3. **`stacked-steps`**: Vertical progression hierarchy with step indicator badges and vertical leader lines.
4. **`blueprint-grifo`**: Technical document simulation with neon orange highlighter block and orthogonal leader callout.
5. **`hud-radial`**: Central anchor core with concentric orbital laser rings and interconnected peripheral nodes.
6. **`split-authority`**: Asymmetric 70/30 division where a colossal 200px counter breaches the division line into the context panel.

---

## 🖥️ Commands for Studio & Rendering

### Launch Remotion Studio (Interactive Timeline Scrubbing):
```bash
bun run studio
```

### Export All Scenes with Alpha Channel (ProRes 4444 `.mov` - Recommended):
```bash
bun run render:scenes
```

### Export All Scenes in WebM with Alpha:
```bash
bun run render:scenes:webm
```

### Render a Specific Scene Individually:
```bash
# By Scene Index
bun run render:scene -- --id=1

# By Custom ID
bun run render:scene -- --id=cena-01-alerta-coe --format=prores
```

### Export Full Unified MP4 Video:
```bash
bun run render:full
```

---

## 📝 Complete Anchored SceneSpec Example

```typescript
import { SceneSpec } from '../src/director/schema';

export const scene: SceneSpec = {
  id: 'cena-01-alerta-coe',
  durationInFrames: 120, // 4s at 30fps
  layout: 'monumental-hero',
  choreography: {
    entryDirection: 'bottom-up',
    drawSpeed: 'snappy',
    ambientMotion: 'pulse-glow',
  },
  artDirection: {
    mood: 'aggressive-alert',
    visualMetaphor: 'Gancho monumental com selo de alerta em sobreposição direta',
  },
  elements: [
    {
      id: 'hero-hook',
      type: 'text',
      text: 'CUIDADO COM O COE',
      subtitle: 'O produto mais empurrado do mercado financeiro',
      variant: 'hero',
      highlightWords: ['COE'],
      font: 'archivo',
      glow: true,
    },
    {
      id: 'alert-stamp',
      type: 'icon',
      name: 'ShieldAlert',
      size: 105,
      sizeRatio: 0.65,
      delay: 4,
      showRing: true,
      anchorTo: {
        targetId: 'hero-hook',
        point: 'cap-height-right',
        bridge: 'overlap',
      },
    },
  ],
};
```
