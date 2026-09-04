# remotion-composition-pipeline Specification Delta

## MODIFIED Requirements

### Requirement: Remotion Root and SceneComposer Orchestration
The system SHALL provide a Remotion `Root` component that dynamically iterates over registered video packages from `src/videos/registry.ts`, registering full-sequence compositions and individual standalone scene compositions with native transparent Alpha channels without requiring manual changes to `Root.tsx`.

#### Scenario: Rendering sequenced scenes from registered video package
- **WHEN** `Root` mounts registered video packages
- **THEN** it registers a full sequence composition for each video at 30 fps, prefixing composition IDs with `[<video-id>] Full Sequence`.

#### Scenario: Registering standalone scene mini-videos with Alpha channel
- **WHEN** `Root` iterates over scenes in a video package
- **THEN** it registers each scene as an independent composition with `transparent: true` and name `[<video-id>] Cena <XX> - <scene-id>`.

#### Scenario: Rendering anchored elements with composition bridges
- **WHEN** `SceneComposer` renders a scene containing secondary primitives anchored to a dominant element with a `connector-line` or `overlap` bridge
- **THEN** it renders the elements with declared spatial proximity, animated stroke connector lines, and proportional sizing without empty dead space.

#### Scenario: Rendering distinct layout silhouettes
- **WHEN** `SceneComposer` encounters any of the 6 layout silhouettes (`monumental-hero`, `horizontal-split`, `stacked-steps`, `blueprint-grifo`, `hud-radial`, `split-authority`)
- **THEN** it dynamically mounts the corresponding visual layout architecture.

### Requirement: Local Preview and Render Support
The system SHALL support previewing animations in Remotion Studio, rendering full video compositions, and video-scoped rendering of scenes directly into `videos/<video>/out/` via Bun CLI commands.

#### Scenario: Running Remotion Studio preview
- **WHEN** developer runs `bun run studio`
- **THEN** Remotion Studio launches displaying compositions organized by video package with hot-reload and visual timeline controls.

#### Scenario: Exporting video-scoped scenes with Alpha channel
- **WHEN** developer runs `bun run render:video <video-id> [--scene=<id>] [--format=prores|webm]`
- **THEN** Remotion renders the requested scene(s) with transparent alpha directly into `videos/<video-id>/out/`.

#### Scenario: Exporting legacy or full video composition
- **WHEN** developer runs `bun run render:video <video-id> --full`
- **THEN** Remotion invokes Chrome Headless and exports the full video composition to `videos/<video-id>/out/full.mp4`.
