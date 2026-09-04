# OFurry Motion Engine - Agent Guidelines

## 🎬 Project Mission
This project (`ofurry-motion`) is a programmatic Editorial Motion Design engine for the **OFurry** YouTube channel, built with **Remotion**, **React**, **TypeScript**, and **Bun**. It generates transparent Alpha Channel mini-videos (ProRes 4444 and WebM) to be overlaid on real video footage in Premiere Pro, DaVinci Resolve, or CapCut.

---

## ⚡ Mandatory Directives for AI Agents

### 1. Act as the Diretor Orquestrador (`/director-orchestrator` & ADR-005)
Whenever processing script narration or building motion scenes:
- **Phrase-by-Phrase Granularity**: Decompose raw audio narration into fine-grained mini-scenes (1 phrase per scene, 3s to 5s / 90-150 frames). Never lump multiple sentences into a static scene.
- **Dynamic Complexity Judgment**: Decide whether each scene is resolved directly (text hooks, simple metrics) or delegated to a specialized subagent (complex physics, multi-step counters, SVG flows).
- **Human-Readable Prose Checkpoint**: Present a scan-friendly prose plan (narration excerpt, visceral physical metaphor, layout silhouette, origin) for user validation before writing technical code or JSON.
- **Clean Editorial Standard (Anti-SaaS Dashboard)**: Zero grey background cards, zero container boxes, 2 to 4 monumental anchor words flutuando directly over native Alpha.

### 2. Always Incorporate `/motion-design`
Whenever designing, writing, animating, or reviewing motion scenes and Remotion code:
- **Three Pillars**:
  1. *Emotional Intent*: Define the target emotion (Urgency/Alert, Tech Authority, Optimism/Growth, Critical Warning) before writing code.
  2. *Visual Narrative*: Follow Setup (punch entry) → Action (reading hold) → Resolution (continuous micro-drift).
  3. *Motion Craft*: Use damped springs (`snappy`, `smooth-draw`), never linear spatial motion, and eliminate floaty angular wobble (`amplitudeRotate: 0`).
- **Three Motion Layers**:
  - *Primary*: Monumental typography (`130px-160px`) or hero counter (`200px-240px`).
  - *Secondary*: Solid neon orange highlight badges (`#FF9900` with `#000000` text), kinetic redaction/strike lines.
  - *Ambient*: Pristine Alpha channel (opt-in technical markers only when forensic).

### 3. Always Incorporate `/no-ai-slop` (Mandatory Anti-Slop Filter)
Whenever distilling script narration into on-screen text, headlines, and kinetic metaphors:
- **Zero Throat-Clearing & Faux-Insights**: Cut "O que ninguém te conta:", "A verdade sobre...", "Entendendo o mercado:". Go straight to the brutal fact.
- **Concrete Over Abstract**: Prefer hard numbers, blunt nouns, and direct active verbs ("TAXA 2.5%", "85% PRESO", "ZERO RETORNO").
- **Zero Formatting Slop**: BANNED decorative sci-fi tags ("SYS.SCAN // 03:00", "REGULAMENTO // CLÁUSULA").
- **Motion Portability Test**: Reject widgets and cards that could fit generic templates. Every element must physically manifest the specific script mechanism.
- **Strict 1-to-3 Words Limit**: Extract strictly 1 to 3 punch keywords per scene.

### 4. Always Use `/explore-openspec` (OpenSpec Explore) for Planning & Brainstorming
When exploring new video scripts, structuring multi-scene narration, or discovering visual metaphors:
- Use `/explore-openspec` (`openspec-explore`) to brainstorm the narrative structure, compare visual archetypes, and validate key visual anchors before generating or implementing scene code.

### 5. Video-Scoped Organization & On-Demand Script Context (`videos/<video>/`)
Every video project is an isolated, self-contained workspace inside `videos/<video-name>/`:
```text
videos/<video-name>/
  ├── roteiro.md         # Full script narration with narrative markers
  ├── scenes/            # Modular scene files (01-*.ts, 02-*.tsx) + index.ts
  └── out/               # Exported media (.webm / .mov / full.mp4)
```
- **Dynamic On-Demand Script Contextualization**: When generating an animation for a specific narration phrase, read `videos/<video-name>/roteiro.md` on-demand to locate the phrase and inspect the surrounding narrative context (what comes immediately before and after). Do not create redundant intermediate summary files. Use this context to determine dramatic tension, contrast, and physical visual metaphors.
- **Modular Scene Generation**: Write each scene into `videos/<video-name>/scenes/<XX>-<name>.ts` (or `.tsx`) and aggregate it in `videos/<video-name>/scenes/index.ts`.
- **Automatic Remotion Discovery**: All registered videos in `src/videos/registry.ts` automatically mount in Remotion Studio as `<video-id>-Full-Sequence` and `<video-id>-Cena-<XX>-<scene-id>`.

---

## 🏆 The 10 Golden Rules of the OFurry Engine (ADR-002 + ADR-004 + ADR-005 + ADR-006)

1. **Strategic Punch Text (1-3 Words)**: Never display full sentences, paragraphs, or explanatory subtitles. Filter all text through `/no-ai-slop`.
2. **Monumental Scale**: Hero titles occupy 70%-90% screen width (130px-160px). Numbers reach 200px-240px.
3. **Typography by Role**:
   - `archivo` (`Archivo Black`) or `bebas` (`Bebas Neue`): Hero hook titles.
   - `syne` (`Syne`): Conceptual modern editorial titles.
   - `space-grotesk` (`Space Grotesk`): Metrics, numbers, currencies, technical data.
   - `jakarta` (`Plus Jakarta Sans`): Micro-labels de alta precisão (14px).
4. **Anti-"AI Slop" / Zero Cards**: High contrast solid black (#000000), solid neon orange blocks (#FF9900) with pure black text (#000000), zero grey background cards (`rgba(20,20,20,...)`), zero container boxes, zero generic blur clouds, zero default grids.
5. **Native Alpha Channel**: Transparent background output in ProRes 4444 (`.mov`) or WebM.
6. **Impact & Lock Physics (Anti-Wobble)**: Mask Reveal from baseline or snappy spring entry (frames 0-12), solid lock hold for effortless reading, zero rotational wobble.
7. **Anchored Composition (Zero Orphans)**: Every secondary element must declare `anchorTo` and `compositionBridge` (`connector-line`, `overlap`, `color-trail`, `none-justified`) tied to the dominant anchor element.
8. **Relative Proportional Scaling (`sizeRatio`)**: Secondary elements derive size from the dominant anchor (55%-75% of text hero height; 35%-45% of number hero height).
9. **5 Strategic Typographic Archetypes**: Continuous rotation between `monumental-punch`, `metric-authority`, `strike-redaction`, `binary-tension`, and `forensic-callout`.
10. **Dramatic Kinetic Metaphors**: Translate narrative tension into direct physical kinematics (strikethrough redaction slicing false promises, ceiling collisions with sparks, split flows, asset decay, and explosive pulse locks).

---

## 🔄 Human-in-the-Loop Production Workflow (5 Steps)

1. **Granular Breakdown & Kinetic Metaphors**: Decompose script phrase by phrase (3-5s per mini-scene), reading `videos/<video>/roteiro.md` to extract narrative tension and identify physical motion metaphors.
2. **Dynamic Complexity Judgment**: Decide direct resolution vs subagent delegation.
3. **Prose Validation Checkpoint**: Present human-readable scan-friendly plan to user for approval.
4. **Modular Authoring & Studio Preview**: Write scene file in `videos/<video>/scenes/`, update `index.ts`, and preview in Remotion Studio (`bun run studio`).
5. **Final Alpha Render**: Export transparent ProRes 4444 (`.mov`) or WebM mini-videos into `videos/<video>/out/` via `bun run render:video <video> --scene=<XX> --format=webm|prores`.

---

## 🚀 Quick Execution Commands

- **Launch Remotion Studio**: `bun run studio` (Opens at `http://localhost:3000`)
- **Render Video Scenes (WebM Alpha)**: `bun run render:video <video-id> --format=webm`
- **Render Video Scenes (ProRes 4444 Alpha)**: `bun run render:video <video-id> --format=prores`
- **Render Single Scene Quickly**: `bun run render:video <video-id> --scene=<id-ou-numero> --format=webm`
- **Render Full Unified Video**: `bun run render:video <video-id> --full`
- **Check TypeScript Types**: `bun run build`
