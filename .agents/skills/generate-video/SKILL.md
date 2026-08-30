---
name: generate-video
description: Standardized workflow to generate motion design video scenes for the OFurry YouTube channel, direct scenes from narrated scripts using /motion-design principles, preview in Remotion Studio, and render transparent Alpha mini-videos.
license: MIT
metadata:
  author: OFurry Motion Lab
  version: "1.0.0"
---

# 🎬 OFurry Video Motion Generation Skill

Standardized production pipeline to transform narrated video script excerpts into high-impact, transparent editorial motion graphics animations for the **OFurry** YouTube channel.

---

## 🧭 When to Apply

Use this skill when:
- Converting script narration / voiceover into animated motion scenes (`SceneSpec`).
- Directing animations with professional motion design principles (timing, springs, choreography).
- Previewing animations live in the **Remotion Studio**.
- Exporting transparent Alpha Channel mini-videos (**ProRes 4444** or **WebM**) ready for video editor timelines (Adobe Premiere Pro, DaVinci Resolve, CapCut).

---

## ⚡ Core Integration Rules

### 1. Always apply `/motion-design`
Every scene must be grounded in the motion design principles from `/motion-design`:
- **Three Pillars**:
  1. **Emotional Intent**: What should the viewer feel? (Alert/Urgency, Optimism/Growth, Tech Authority).
  2. **Visual Narrative**: Micro-story structure (Punch Setup → Solid Hold → Micro-Drift Resolution).
  3. **Motion Craft**: Damped springs, spatial hierarchy, and zero linear spatial movement.
- **Three Motion Layers**:
  1. **Primary Layer**: Main hero text / monumental counter / chart curve.
  2. **Secondary Layer**: Neon highlight badge, Lucide icon shockwave ring, accent markers.
  3. **Ambient Layer**: Tech framing L-corners, precision crosshairs, and subtle sinusoidal drift (±2px).

### 2. Always use `/explore-openspec` (OpenSpec Explore) for Planning
When exploring new video ideas, structuring long scripts into scenes, or deciding on visual metaphors:
- Use `/explore-openspec` (`openspec-explore`) to brainstorm the narrative structure, compare visual archetypes, and validate key visual anchors before generating or implementing scene code.

---

## 🏆 The 6 Golden Rules of OFurry Motion Design

| # | Rule | Directive |
|---|---|---|
| 🎯 | **1. Minimal Text (2-4 Words)** | **NEVER** put full sentences or paragraphs on screen. Extraia apenas 2 a 4 palavras-chave de âncora ou métricas numéricas. A voz conta a história; a tela entrega o gancho visual de autoridade. |
| 📏 | **2. Monumental Scale** | Hero titles occupy **70%–90%** of screen width (120px–150px font size). Numbers range from **180px to 220px**. Command instant attention in the first 3 seconds. |
| 🎨 | **3. Typography by Role** | • `archivo` (`Archivo Black`) ou `bebas` (`Bebas Neue`): Ganchos de impacto e títulos hero<br>• `syne` (`Syne`): Títulos conceituais e editoriais modernos<br>• `space-grotesk` (`Space Grotesk`): Métricas, números, moedas e dados técnicos<br>• `jakarta` (`Plus Jakarta Sans`): Subtítulos de apoio e labels limpos |
| 🖼️ | **4. Anti-"AI Template" Aesthetics** | Fundo Preto (#000000) com contraste extremo, Tarjas Sólidas Neon Laranja (`#FF9900`) com texto preto (`#000000`), miras técnicas (`crosshairs`) e cantos `L-corners`. **Proibido** nuvens de blur genéricas e caixas arredondadas flutuantes. |
| 🎬 | **5. Native Alpha Channel** | Renderização com fundo transparente real em **ProRes 4444 (`.mov`)** ou **WebM**. Permite sobreposição direta na timeline do Premiere/DaVinci sem chroma key. |
| ⚡ | **6. Punch & Hold Physics** | **Entrada (0-15 frames):** Entrada enérgica com spring amortecido (*Punch*).<br>**Retenção (15-final):** Congelamento sólido para leitura perfeita (*Hold*).<br>**Micro-Drift:** Oscilação senoidal contínua (±2px) para manter a cena viva. |

---

## 🛠️ Step-by-Step Production Workflow

```
   ┌─────────────────────────────────────────────────────────────┐
   │ 1. Brainstorm & Narrative Discovery (/explore-openspec)     │
   │    Extract emotional hooks & visual metaphors from script   │
   └──────────────────────────────┬──────────────────────────────┘
                                  │
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │ 2. Apply Motion Principles (/motion-design)                 │
   │    Define 3 layers, personality (Energetic/Punch & Hold)     │
   └──────────────────────────────┬──────────────────────────────┘
                                  │
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │ 3. Author SceneSpec JSON (Follow 6 Golden Rules)            │
   │    Create/Update scene in example/ or src/compositions      │
   └──────────────────────────────┬──────────────────────────────┘
                                  │
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │ 4. Preview & Visual Scrubbing                               │
   │    • Remotion Studio (http://localhost:3000)                │
   └──────────────────────────────┬──────────────────────────────┘
                                  │
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │ 5. Alpha Export & Batch Rendering                           │
   │    Export ProRes 4444 (.mov) or WebM into out/scenes/       │
   └─────────────────────────────────────────────────────────────┘
```

---

## 🖥️ Commands to Preview

### Launch Remotion Studio (Interactive Timeline Scrubbing)
Opens Remotion Studio on `http://localhost:3000` with live hot-reload:
```bash
bun run studio
```

---

## 🎥 Rendering and Exporting Commands

### Export all scenes with Alpha Channel (ProRes 4444 `.mov` - Recommended):
```bash
bun run render:scenes
```
> Outputs transparent `.mov` files to `out/scenes/` (e.g. `COE-Cena-1-cena-01-alerta-coe.mov`).

### Export all scenes in WebM with Alpha (Lightweight):
```bash
bun run render:scenes:webm
```

### Render a specific scene individually (~2 seconds):
```bash
# Render scene by index (e.g. scene 1)
bun run render:scene -- --id=1

# Render specific scene by ID in ProRes
bun run render:scene -- --id=cena-01-alerta-coe --format=prores
```

### Export full unified MP4 video:
```bash
bun run render:coe
# or
bun run render:full
```

---

## 📝 SceneSpec Reference Schema

Each scene in `example/*.ts` or director outputs follows this structure:

```typescript
import { SceneSpec } from '../src/director/schema';

export const scene: SceneSpec = {
  id: 'cena-01-alerta-coe',
  durationInFrames: 120, // 4s at 30fps
  layout: 'centered-hero', // 'centered-hero' | 'split-left' | 'split-right' | 'radial-network' | 'bottom-heavy' | 'dual-compare'
  choreography: {
    entryDirection: 'bottom-up',
    drawSpeed: 'snappy',
    ambientMotion: 'pulse-glow',
  },
  artDirection: {
    mood: 'aggressive-alert',
    visualMetaphor: 'Alerta de produto empurrado com tarja de perigo',
  },
  elements: [
    {
      type: 'text',
      text: 'CUIDADO COM O COE',
      subtitle: 'O produto mais empurrado do mercado financeiro',
      variant: 'hero',
      highlightWords: ['COE'], // Solid neon orange highlight block (#FF9900)
      font: 'archivo', // 'archivo' | 'bebas' | 'syne' | 'jakarta'
      glow: true,
    },
    {
      type: 'icon',
      name: 'ShieldAlert',
      size: 110,
      showRing: true,
    },
  ],
};
```

---

## 🧱 Available Visual Primitives

| Primitive | Key Properties | Best Use Case |
|---|---|---|
| **`TextReveal`** | `text` (2-4 words), `subtitle`, `variant` ('hero'\|'title'\|'badge'), `highlightWords`, `font` ('archivo'\|'bebas'\|'syne'\|'jakarta'), `glow` | Hero hooks, bold keyword callouts with solid neon badges |
| **`AnimatedNumber`** | `value`, `startValue`, `prefix` ('R$ ', '+'), `suffix` ('%', 'M'), `label`, `variant` ('hero'\|'card'\|'badge') | Monumental data points (180-220px) with tabular `Space Grotesk` |
| **`Icon`** | `name` (Lucide), `size` (72-120px), `showRing`, `accentColor` | Vector line-art with expanding laser ring |
| **`ConnectedNodes`** | `nodes`, `connections`, `width` (920px), `drawDuration` | Tech network graph connecting players, systems, or flows |
| **`DynamicChart`** | `data`, `chartType` ('line'\|'bar'), `highlightLast`, `showGrid` | Dynamic animated trend line or bar charts |
| **`ParticleField` / TechFrame** | `showGrid`, `showCorners`, `showCrosshairs`, `transparent` | Editorial framing guides and precision crosshairs |

---

## 🤖 Prompt Template for AI Generation

When generating scene specifications or prompting AI models for OFurry animations, use this standardized template:

```
[AÇÃO/CONTEXTO CENTRAL DA FALA DO ROTEIRO]
Minimalist 2D editorial motion graphics animation for the OFurry YouTube channel.
Applying /motion-design principles:
- 3 Pillars: Emotional Intent, Visual Narrative, Motion Craft
- 3 Motion Layers: Primary (monumental typography/counter), Secondary (neon badge, shockwave ring), Ambient (tech frame, crosshairs, micro-drift)
- Palette: Absolute Black background (#000000), Pure White flat line art (#FFFFFF), Neon Orange accents (#FF9900 / #FFB800)
- 6 Golden Rules:
  1. Minimal Text (2-4 anchor words only)
  2. Monumental Scale (70-90% width, 120-150px text)
  3. Typography by Role (Archivo Black / Bebas Neue / Syne / Space Grotesk / Jakarta)
  4. Editorial Aesthetics (Solid neon orange highlight badge, L-corners, crosshairs)
  5. Native Alpha Channel Transparency (ProRes 4444 / WebM)
  6. Punch & Hold Physics (Snappy spring entry frames 0-15, solid reading hold, subtle sinusoidal micro-drift)
- Format: JSON SceneSpec
```
