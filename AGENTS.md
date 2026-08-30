# OFurry Motion Engine - Agent Guidelines

## 🎬 Project Mission
This project (`ofurry-motion`) is a programmatic Editorial Motion Design engine for the **OFurry** YouTube channel, built with **Remotion**, **React**, **TypeScript**, and **Bun**. It generates transparent Alpha Channel mini-videos (ProRes 4444 and WebM) to be overlaid on real video footage in Premiere Pro, DaVinci Resolve, or CapCut.

---

## ⚡ Mandatory Directives for AI Agents

### 1. Always Incorporate `/motion-design`
Whenever designing, writing, animating, or reviewing motion scenes and Remotion code:
- **Three Pillars**:
  1. *Emotional Intent*: Define the target emotion (Urgency/Alert, Tech Authority, Optimism/Growth) before writing code.
  2. *Visual Narrative*: Follow Setup (punch entry) → Action (reading hold) → Resolution (continuous micro-drift).
  3. *Motion Craft*: Use damped springs (`snappy`, `smooth-draw`), never linear spatial motion, and maintain continuous subtle sinusoidal drift (±2px).
- **Three Motion Layers**:
  - *Primary*: Monumental typography (`120px-150px`) or hero counter (`180px-220px`).
  - *Secondary*: Solid neon orange highlight badges (`#FF9900` with `#000000` text), icon expanding laser rings.
  - *Ambient*: Tech framing brackets (`L-corners`), precision crosshairs, and alpha grid.

### 2. Always Use `/explore-openspec` (OpenSpec Explore) for Planning & Brainstorming
When exploring new video scripts, structuring multi-scene narration, or discovering visual metaphors:
- Use `/explore-openspec` (`openspec-explore`) to brainstorm the narrative structure, compare visual archetypes, and validate key visual anchors before generating or implementing scene code.

---

## 🏆 The 10 Golden Rules of the OFurry Engine (ADR-002 + ADR-004)

1. **Minimal Text (2-4 Words)**: Never display full sentences or paragraphs. Extract only 2 to 4 anchor keywords or metrics. Voice tells the story; screen provides visual authority.
2. **Monumental Scale**: Hero titles occupy 70%-90% screen width (120px-150px). Numbers reach 180px-220px.
3. **Typography by Role**:
   - `archivo` (`Archivo Black`) or `bebas` (`Bebas Neue`): Hero hook titles.
   - `syne` (`Syne`): Conceptual modern editorial titles.
   - `space-grotesk` (`Space Grotesk`): Metrics, numbers, currencies, technical data.
   - `jakarta` (`Plus Jakarta Sans`): Clean subtitles and labels.
4. **Anti-"AI Template" Aesthetics**: High contrast solid black (#000000), solid neon orange blocks (#FF9900) with pure black text (#000000), precision crosshairs, and zero generic floating blur blobs.
5. **Native Alpha Channel**: Transparent background output in ProRes 4444 (`.mov`) or WebM.
6. **Punch & Hold Physics**: Snappy damped spring entry (frames 0-15), solid hold for effortless reading, and continuous subtle micro-drift (±2px).
7. **Anchored Composition (Zero Orphans)**: Every secondary element (icon, metric, label) must declare `anchorTo` and `compositionBridge` (`connector-line`, `overlap`, `color-trail`, `none-justified`) tied to the dominant anchor element.
8. **Relative Proportional Scaling (`sizeRatio`)**: Icons scale relative to the dominant anchor (55%-75% of text hero height; 35%-45% of number hero height).
9. **6 Geometrically Distinct Silhouettes**: Prevent repetition across scenes by rotating between `monumental-hero`, `horizontal-split`, `stacked-steps`, `blueprint-grifo`, `hud-radial`, and `split-authority`.
10. **Dramatic Kinetic Metaphors**: Translate narrative tension into physical motion (ceiling collisions, split flows, highlighter callouts, asset decay) rather than static slides.

---

## 🔄 Human-in-the-Loop Production Workflow (5 Steps)

1. **Concept & Kinetic Metaphor**: Extract narrative tension and identify physical motion metaphors.
2. **Draft & Snapshot Preview**: Author `SceneSpec` JSON and preview in Remotion Studio.
3. **User Validation Checkpoint**: Present composition layout, anchors, and keyword hooks for approval.
4. **Rapid Refine**: Fine-tune typography, spacing, or timing based on feedback.
5. **Final Alpha Render**: Batch export transparent ProRes 4444 (`.mov`) or WebM mini-videos.

---

## 🚀 Quick Execution Commands

- **Launch Remotion Studio**: `bun run studio` (Opens at `http://localhost:3000`)
- **Render All Scenes with Alpha (ProRes 4444)**: `bun run render:scenes`
- **Render All Scenes with Alpha (WebM)**: `bun run render:scenes:webm`
- **Render Single Scene Quickly**: `bun run render:scene -- --id=<scene-id>`
- **Render Unified Full Video**: `bun run render:coe` / `bun run render:full`
- **Check TypeScript Types**: `bun run build`
