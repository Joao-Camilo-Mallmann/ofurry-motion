## Context

The OFurry Motion Engine currently lacks video-level project boundaries. Scripts and scene definitions reside loosely in `example/` and `src/composition/scenes/`, while `src/Root.tsx` contains 480+ lines hardcoding every scene and composition individually. When generating new motion scenes from voiceover narration, the AI assistant needs full visibility into the video's script to understand what occurred before and after a requested phrase, maintaining visual tone and narrative momentum without creating clutter or redundant files.

## Goals / Non-Goals

**Goals:**
- Provide a standardized, isolated folder structure for every YouTube video project under `videos/<video-name>/`.
- Keep the video folder clean: only `roteiro.md` (full script), `scenes/` (modular scene files + `index.ts`), and `out/` (rendered assets).
- Allow the AI assistant to read `roteiro.md` directly on-demand to extract narrative context (before/after surrounding lines) when generating a scene.
- Automate Remotion composition registration so `src/Root.tsx` dynamically mounts all videos and scenes without manual code changes.
- Provide a video-scoped rendering CLI (`bun run render:video <video> [--scene=XX] [--format=webm|prores]`) that saves outputs directly to `videos/<video>/out/`.
- Migrate existing COE scenes to `videos/coe/` and clean up `src/Root.tsx`.

**Non-Goals:**
- Creating intermediate summary or context files (`context.md`, `summary.json`). The agent will dynamically contextualize from `roteiro.md` on every generation request.
- Replacing existing visual primitives (`MonumentalPunch`, `MaskReveal`, `SceneComposer`) or changing the core OFurry design rules.

## Decisions

### 1. Structure of `videos/<video-name>/`
Each video is a self-contained unit:
```text
videos/
  └── <video-name>/
       ├── roteiro.md         # Full narration and script text
       ├── scenes/            # Individual scene definitions
       │    ├── 01-nome.ts    # Exports a SceneSpec (or React Bespoke component)
       │    ├── 02-nome.ts
       │    └── index.ts      # Exports VideoPackage (id, title, scenes array)
       └── out/               # Target directory for rendered .mov / .webm
```
*Rationale*: Modular scene files prevent file bloat, allow easy refactoring of single scenes, and support both declarative `SceneSpec` and custom React/Remotion bespoke components side-by-side.

### 2. Remotion Discovery via Video Registry (`src/videos/registry.ts`)
`src/videos/registry.ts` will aggregate and export all registered `VideoPackage` entries:
```typescript
export interface VideoPackage {
  id: string;
  title: string;
  fps?: number;
  width?: number;
  height?: number;
  scenes: SceneSpec[];
}
```
`src/Root.tsx` iterates over `registeredVideos` to generate:
- `[video-id] Full Sequence`: continuous sequence of all scenes.
- `[video-id] Cena XX - <scene-id>`: individual composition with native transparent Alpha channel.

*Rationale*: Guarantees 100% deterministic TypeScript type-checking and bundling compatibility with Remotion's Webpack bundler, while keeping `Root.tsx` minimal and untouched when adding new scenes.

### 3. Video-Scoped Render CLI
Update `scripts/render-scenes.ts` to accept `--video=<slug>`, resolve the output directory to `videos/<slug>/out/`, and support `--scene=<id>` and `--format=prores|webm|mp4`. Add `render:video` npm script in `package.json`.

*Rationale*: Keeps render artifacts organized alongside the video project rather than dumping them into a shared flat folder.

## Risks / Trade-offs

- **[Risk]** Adding a new video requires importing it in `src/videos/registry.ts`.
  → **Mitigation**: The AI assistant automatically registers new videos in `src/videos/registry.ts` upon creation. A validation helper will warn if a video folder exists without being registered.
- **[Risk]** Moving COE scenes could break existing render commands.
  → **Mitigation**: Retain backwards-compatible composition aliases or npm scripts pointing to the migrated COE video package.
