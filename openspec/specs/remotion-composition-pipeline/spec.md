# remotion-composition-pipeline Specification

## Purpose
Defines the Remotion composition architecture, studio previewing, and render pipelines (full video and standalone scene mini-videos with transparent alpha channel).

## Requirements

### Requirement: Remotion Root and SceneComposer Orchestration
The system SHALL provide a Remotion `Root` component and a `SceneComposer` that receives an array of `SceneSpec` items, sequences them along the video timeline, and renders the corresponding primitives.

#### Scenario: Rendering sequenced scenes in timeline
- **WHEN** `Root` receives a list of 3 scenes with durations of 90, 120, and 90 frames
- **THEN** it registers a composition with total duration of 300 frames at 30 fps, transitioning smoothly between each scene sequence.

### Requirement: Local Preview and Render Support
The system SHALL support previewing animations in Remotion Studio, rendering full video compositions, and batch rendering individual scenes as standalone video files with transparent alpha channels (`.mov` ProRes 4444 and `.webm`) or MP4 via Bun scripts.

#### Scenario: Running Remotion Studio preview
- **WHEN** developer runs `bun run studio`
- **THEN** Remotion Studio launches with hot-reload and visual timeline controls for all full sequences and standalone scene compositions.

#### Scenario: Exporting full MP4 video
- **WHEN** developer runs `bun run render:coe` or `bun run render:sample`
- **THEN** Remotion invokes Chrome Headless and exports a 1920x1080 MP4 video to the `out/` directory.

#### Scenario: Exporting standalone scene mini-videos with Alpha channel
- **WHEN** developer runs `bun run render:scenes` or `bun run render:scene`
- **THEN** Remotion renders each scene as an independent video file with alpha transparency to `out/scenes/` using ProRes 4444 (`.mov`) or WebM.


