# 🎬 OFurry Motion Engine (`ofurry-motion`)

Programmatic **Editorial Motion Design Engine** for the **OFurry** YouTube channel, built with **Remotion**, **React**, and **TypeScript**, optimized for ultra-fast execution with **Bun**.

Transforms narrated video script excerpts into high-impact animations ready to be overlaid directly on real footage and B-rolls in video editors such as **Adobe Premiere Pro**, **DaVinci Resolve**, and **CapCut** using **native Alpha Channel transparency (ProRes 4444 and WebM)**.

---

## 🚀 How to Generate Motion Animations for the OFurry Channel

The workflow is designed to be fast, modular, and focused on independent mini-videos per scene/narration line.

```
                  ┌────────────────────────┐
                  │  1. Script Narration   │
                  │        Excerpt         │
                  └───────────┬────────────┘
                              │
                              ▼
                  ┌────────────────────────┐
                  │ 2. AI Director outputs │
                  │    SceneSpec JSON      │
                  │  (6 Golden Rules)      │
                  └───────────┬────────────┘
                              │
                              ▼
                  ┌────────────────────────┐
                  │ 3. Preview in Studio   │
                  │   (bun run studio)     │
                  └───────────┬────────────┘
                              │
                              ▼
                  ┌────────────────────────┐
                  │ 4. Alpha Export        │
                  │   (ProRes 4444 / WebM) │
                  │(bun run render:scenes) │
                  └───────────┬────────────┘
                              │
                              ▼
                  ┌────────────────────────┐
                  │ 5. Drag into Video     │
                  │    Editor Timeline     │
                  │ (Premiere / DaVinci)   │
                  └────────────────────────┘
```

---

### 📋 Step-by-Step Guide

### 1. Define the Scene (`SceneSpec`)
Create or edit a script file (e.g., `example/coe-script.ts`). Each scene represents an anchor visual hook for a specific narration point:

```typescript
import { SceneSpec } from '../src/director/schema';

export const myScenes: SceneSpec[] = [
  {
    id: 'scene-01-alert',
    durationInFrames: 120, // 4 seconds at 30fps
    layout: 'centered-hero',
    choreography: {
      entryDirection: 'bottom-up',
      drawSpeed: 'snappy',
      ambientMotion: 'pulse-glow',
    },
    elements: [
      {
        type: 'text',
        text: 'BEWARE OF COE',
        subtitle: 'The most pushed product in the financial market',
        variant: 'hero',
        highlightWords: ['COE'], // Solid neon orange highlight block (#FF9900)
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

### 2. The 6 Golden Rules of the Motion Design Director

When authoring or prompting an AI to generate scenes, strictly adhere to these editorial guidelines:

| # | Rule | Directive |
|---|---|---|
| 🎯 | **1. Minimal Text (2-4 Words)** | **NEVER** put full paragraphs on screen. Extract only 2 to 4 anchor keywords or numerical metrics. The voice delivers the story; the screen provides visual authority. |
| 📏 | **2. Monumental Scale** | Hero titles at 120px–150px (occupying 70-90% width) and numbers at 180px–220px. Massive elements command attention in the first 3 seconds. |
| 🎨 | **3. Typography by Role** | • `Archivo Black` / `Bebas Neue` for high-impact hook titles<br>• `Syne` for modern conceptual titles<br>• `Space Grotesk` for numbers, metrics, and technical data<br>• `Plus Jakarta Sans` for clean subtitles and labels |
| 🖼️ | **4. Anti-"AI Template" Aesthetics** | High-contrast solid neon blocks (`#FF9900` with `#000000` text), technical framing L-corners, precision crosshairs, and zero generic floating blur clouds. |
| 🎬 | **5. True Alpha Channel** | Native transparent background rendering in **ProRes 4444 (`.mov`)** or **WebM** for seamless drag-and-drop overlay onto live footage without chroma keying. |
| ⚡ | **6. Punch & Hold Physics** | Snappy damped spring entry (frames 0-15), solid hold for effortless reading, and continuous subtle sinusoidal micro-drift (±2px) to prevent frozen frames. |

---

### 3. Preview in Remotion Studio

Launch the interactive visual studio with hot-reload:

```bash
bun run studio
```

The studio opens in your browser (`http://localhost:3000`), allowing you to scrub the timeline, inspect individual scene compositions (`COE-Cena-1`, etc.), and verify transparency overlays in real time.

---

### 4. Export Mini-Videos per Scene

Choose the format tailored for your post-production workflow:

#### 🎥 Export all scenes with Alpha (ProRes 4444 `.mov` - Recommended for Premiere & DaVinci):
```bash
bun run render:scenes
```
> Outputs `.mov` files with Alpha channel to `out/scenes/` (e.g., `COE-Cena-1-cena-01-alerta-coe.mov`).

#### 🌐 Export all scenes in WebM with Alpha (Lightweight):
```bash
bun run render:scenes:webm
```

#### ⚡ Render a specific scene individually (~2s):
```bash
# Render scene index 1
bun run render:scene -- --id=1

# Render specific scene ID in ProRes 4444
bun run render:scene -- --id=cena-01-alerta-coe --format=prores
```

#### 🎞️ Export unified full-length video in MP4:
```bash
bun run render:coe
# or
bun run render:full
```

---

## 🧱 Visual Primitives Catalog (`src/primitives/`)

| Primitive | Key Props | Example Usage |
|---|---|---|
| **`TextReveal`** | `text`, `subtitle`, `variant` ('hero'\|'title'\|'badge'), `highlightWords`, `font` ('archivo'\|'syne'\|'bebas'\|'jakarta') | Anchor keywords with solid neon blocks and staggered entry |
| **`AnimatedNumber`** | `value`, `startValue`, `prefix` ('$ '), `suffix` ('%'), `label`, `variant` ('hero'\|'card'\|'badge') | Monumental counters (180-220px) with `Space Grotesk` tabular alignment |
| **`Icon`** | `name` (Lucide), `size` (72-120px), `showRing`, `accentColor` | Flat vector line-art with expanding laser ring and neon drop shadow |
| **`ConnectedNodes`** | `nodes`, `connections`, `width` (920px), `drawDuration` | Tech network graph connecting brokers, banks, and users |
| **`DynamicChart`** | `data`, `type` ('line'\|'bar'), `highlightLast`, `showGrid` | Dynamic live-drawn line/bar trend curves across 80% screen width |
| **`ParticleField`** | `showGrid`, `showCorners`, `showCrosshairs`, `transparent` | Clean editorial framing guides, corner brackets, and alpha grid |

---

## 📁 Project Structure

```
ofurry-motion/
├── src/
│   ├── composition/
│   │   └── SceneComposer.tsx     # Scene layout orchestrator with Alpha support
│   ├── director/
│   │   ├── schema.ts             # Zod Schemas & TypeScript types
│   │   ├── prompt.ts             # AI Director system prompt
│   │   └── validator.ts          # Validation & safe fallbacks
│   ├── primitives/
│   │   ├── TextReveal.tsx        # Monumental typography + solid badges
│   │   ├── AnimatedNumber.tsx    # Tabular monospaced counters
│   │   ├── Icon.tsx              # Vector icons with laser ring & alpha
│   │   ├── ConnectedNodes.tsx    # Expanded SVG network (80% width)
│   │   ├── DynamicChart.tsx      # Dynamic trend charts
│   │   ├── ParticleField.tsx     # Technical crosshairs & framing guides
│   │   └── index.ts              # Central primitives export
│   ├── theme/
│   │   ├── ofurry.ts             # Multi-family fonts, monumental tokens & alpha
│   │   └── motion.ts             # Spring physics, micro-drift & live drawing
│   ├── Root.tsx                  # Local fonts & alpha compositions
│   └── index.ts                  # Remotion entrypoint
├── scripts/
│   └── render-scenes.ts          # Batch scene export orchestrator
├── example/
│   ├── coe-script.ts             # Production channel script (COE Video)
│   └── sample-script.ts          # Demo script
├── docs/                         # ADRs and technical documentation
├── openspec/                     # OpenSpec change artifacts & specifications
└── package.json
```

---

## 🛠️ Bun Commands Reference

| Bun Command | Description |
|---|---|
| `bun run studio` | Launches interactive Remotion Studio |
| `bun run render:scenes` | Exports all scenes in **ProRes 4444 with Alpha** (`.mov`) |
| `bun run render:scenes:webm` | Exports all scenes in **WebM with Alpha** (`.webm`) |
| `bun run render:scene -- --id=X` | Quickly renders a single specific scene |
| `bun run render:coe` | Renders the complete unified COE video sequence (`.mp4`) |
| `bun run build` | Verifies TypeScript type integrity (`tsc --noEmit`) |