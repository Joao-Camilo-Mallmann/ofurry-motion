# director-orchestration Specification

## Purpose
Directs and orchestrates editorial motion graphics production for OFurry by decomposing raw audio narration phrase-by-phrase, judging complexity, presenting scan-friendly prose plans, and ensuring clean anti-dashboard aesthetic on native alpha.

## Requirements

### Requirement: Granular Phrase-by-Phrase Scene Decomposition
The Diretor Orquestrador SHALL decompose raw voiceover narration into fine-grained mini-scenes, allocating exactly one phrase or short unit of meaning per mini-scene.

#### Scenario: Multi-sentence script breakdown
- **WHEN** raw script text containing multiple sentences is provided
- **THEN** the system breaks the narration into distinct mini-scenes of 3 to 5 seconds each without grouping multiple sentences into a single scene.

### Requirement: Dynamic Resolution and Delegation Decision
The Diretor Orquestrador SHALL dynamically decide per mini-scene whether to resolve directly or delegate to a specialized subagent based on visual and kinetic complexity.

#### Scenario: Simple direct resolution
- **WHEN** a mini-scene presents a single straightforward data point, icon, or hook
- **THEN** the Orquestrador assigns a canonical silhouette and visual metaphor directly without subagent overhead.

#### Scenario: Complex kinetic delegation
- **WHEN** a mini-scene demands non-trivial kinetic physics, specialized multi-step counters, or custom SVG animations
- **THEN** the Orquestrador delegates the scene design to a specialized subagent while retaining control over block-wide rhythm and silhouette non-repetition.

### Requirement: Human-Readable Prose Plan Checkpoint
The Diretor Orquestrador SHALL generate and present a unified, scan-friendly human-readable plan in short prose before producing any technical `SceneSpec` JSON or rendering code.

#### Scenario: Presentation of plan before technical generation
- **WHEN** all mini-scenes in a block are planned
- **THEN** the system outputs a concise plan containing the spoken phrase, visual metaphor (1 sentence), layout silhouette, and origin (direct vs delegated) for explicit human approval.
