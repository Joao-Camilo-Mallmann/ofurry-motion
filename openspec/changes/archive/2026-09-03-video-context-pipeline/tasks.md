## 1. Directory Structure & Video Registry Infrastructure

- [x] 1.1 Create `videos/` base structure and define `VideoPackage` and `SceneModule` types in `src/videos/types.ts`
- [x] 1.2 Implement `src/videos/registry.ts` to aggregate all video packages and provide lookup utilities
- [x] 1.3 Refactor `src/Root.tsx` to automatically mount full sequences and standalone Alpha compositions dynamically from `videoRegistry`

## 2. COE Reference Migration

- [x] 2.1 Create `videos/coe/roteiro.md` consolidating the voiceover script and narrative markers for COE
- [x] 2.2 Migrate existing COE scenes and bespoke compositions into modular files under `videos/coe/scenes/` with an `index.ts` manifest
- [x] 2.3 Register `coe` in `src/videos/registry.ts` and verify Remotion Studio discovers all compositions

## 3. Video-Scoped CLI Render Pipeline

- [x] 3.1 Update `scripts/render-scenes.ts` to support `--video=<id>` targeting `videos/<id>/out/`, with `--scene=<id>` and `--format=prores|webm|mp4`
- [x] 3.2 Add `render:video` script in `package.json`
- [x] 3.3 Test rendering a COE scene to verify proper file output in `videos/coe/out/`

## 4. Agent Directives & Repository Cleanup

- [x] 4.1 Update `AGENTS.md` and `director-orchestrator` skill to formalize the phrase-in-video context workflow
- [x] 4.2 Clean up redundant legacy files in `example/` and run `bun run build` to ensure zero type errors
