## ADDED Requirements

### Requirement: Remotion Root and SceneComposer Orchestration
The system SHALL provide a Remotion `Root` component and a `SceneComposer` that receives an array of `SceneSpec` items, sequences them along the video timeline, and renders the corresponding primitives.

#### Scenario: Rendering sequenced scenes in timeline
- **WHEN** `Root` receives a list of 3 scenes with durations of 90, 120, and 90 frames
- **THEN** it registers a composition with total duration of 300 frames at 30 fps, transitioning smoothly between each scene sequence.

### Requirement: Local Preview and Render Support
The system SHALL support previewing the animation in Remotion Studio and rendering to MP4 via Remotion CLI scripts.

#### Scenario: Running Remotion Studio preview
- **WHEN** developer runs `npm run studio` or `npx remotion studio`
- **THEN** Remotion Studio launches with hot-reload and visual timeline controls for all scenes.

#### Scenario: Exporting MP4 video
- **WHEN** developer runs `npm run render` or `npx remotion render`
- **THEN** Remotion invokes Chrome Headless and exports a 1920x1080 MP4 video to the `out/` directory.
