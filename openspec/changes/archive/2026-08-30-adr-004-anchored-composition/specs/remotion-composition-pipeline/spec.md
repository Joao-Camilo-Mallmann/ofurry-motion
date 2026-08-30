## MODIFIED Requirements

### Requirement: Remotion Root and SceneComposer Orchestration
The system SHALL provide a Remotion `Root` component and a `SceneComposer` that receives an array of `SceneSpec` items, sequences them along the video timeline, and renders the corresponding primitives using anchored layout containers, relative scaling, and composition bridge connectors.

#### Scenario: Rendering sequenced scenes in timeline
- **WHEN** `Root` receives a list of scenes
- **THEN** it registers a composition sequenced at 30 fps, transitioning smoothly between each scene sequence with punch & hold physics.

#### Scenario: Rendering anchored elements with composition bridges
- **WHEN** `SceneComposer` renders a scene containing secondary primitives anchored to a dominant element with a `connector-line` or `overlap` bridge
- **THEN** it renders the elements with declared spatial proximity, animated stroke connector lines, and proportional sizing without empty dead space.

#### Scenario: Rendering distinct layout silhouettes
- **WHEN** `SceneComposer` encounters any of the 6 layout silhouettes (`monumental-hero`, `horizontal-split`, `stacked-steps`, `blueprint-grifo`, `hud-radial`, `split-authority`)
- **THEN** it dynamically mounts the corresponding visual layout architecture.
