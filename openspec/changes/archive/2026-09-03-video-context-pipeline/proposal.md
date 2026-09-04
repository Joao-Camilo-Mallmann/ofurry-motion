## Why

Currently, scenes and scripts are scattered across `example/`, `src/composition/scenes/`, and hardcoded inside `src/Root.tsx` with hundreds of lines of manual composition definitions. There is no isolated, repeatable workspace per YouTube video. Furthermore, when generating an animation for a specific narration phrase, the agent lacks a systematic way to inspect the full script to understand what came before and after to ensure narrative coherence. 

Establishing video-scoped workspaces (`videos/<video-name>/`) with on-demand script contextualization and automated Remotion registration solves this scaling bottleneck, allowing continuous creation of new videos and scenes without modifying `Root.tsx` or deleting old work.

## What Changes

- **Video-Scoped Project Structure**: Introduce `videos/<video-name>/` containing `roteiro.md` (full narration/script), `scenes/` (modular files `01-*.ts`, `02-*.tsx`, and `index.ts`), and `out/` for exported media.
- **Dynamic On-Demand Script Contextualization**: Eliminate intermediate summary files; whenever a phrase is requested, the agent dynamically parses `roteiro.md`, inspecting surrounding narrative context (before and after) to determine tone, contrast, and physical visual metaphors.
- **Automated Remotion Composition Discovery**: Replace manual imports and compositions in `src/Root.tsx` with a video registry system that automatically registers full video sequences and standalone Alpha channel mini-scenes with video prefixes in Remotion Studio.
- **Video-Scoped Rendering CLI**: Enhance the render pipeline to support per-video batch and single-scene rendering (`bun run render:video <video> [--scene=XX] [--format=prores|webm]`) outputting directly to `videos/<video-name>/out/`.
- **Migration of Existing Assets**: Migrate the existing COE scripts and scenes into `videos/coe/` as the canonical reference implementation, retiring the loose `example/` files.

## Capabilities

### New Capabilities
- `video-scoped-organization`: Folder-based isolation (`videos/<video-name>/`) housing `roteiro.md`, granular scene files in `scenes/`, and isolated render outputs in `out/`.
- `dynamic-script-context`: On-demand parsing of `roteiro.md` by the agent to derive emotional intent, narrative progression, and kinetic metaphors from surrounding script context.

### Modified Capabilities
- `remotion-composition-pipeline`: Automatically registers video sequences and transparent alpha scene compositions from `videos/` in Remotion Studio, and adds video-targeted CLI rendering commands exporting to `videos/<video>/out/`.
- `interactive-generation-workflow`: Streamlines the generation cycle to accept phrase excerpts within a video context, directly generating modular scene files with an immediate visual summary and render command.

## Impact

- **Affected Code**: `src/Root.tsx` (drastically simplified), `scripts/render-scenes.ts` (extended with video-scoped options), `package.json` (new script commands), `src/videos/registry.ts` (new registry bridge).
- **Filesystem**: Introduction of `videos/` root directory, migration of `example/` and `src/composition/scenes/` into `videos/coe/`.
- **Dependencies**: No external npm packages required; relies on native Bun, TypeScript, and Remotion bundler/renderer.
