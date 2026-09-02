# interactive-generation-workflow Specification

## MODIFIED Requirements

### Requirement: Standardized Human-in-the-Loop Generation Workflow
The system SHALL provide a standardized human-in-the-loop workflow within the `director-orchestrator` and `generate-video` skills, ensuring phrase-by-phrase decomposition and human-readable plan validation before any `SceneSpec` JSON generation or Alpha rendering.

#### Scenario: Step 1 & 2 - Creative Conception and Preview Setup
- **WHEN** user provides a script excerpt and target timing
- **THEN** the Diretor Orquestrador decomposes the narration phrase by phrase into mini-scenes, assigns silhouettes and kinetic metaphors, and decides direct resolution or subagent delegation.

#### Scenario: Step 3 - User Validation Checkpoint
- **WHEN** the mini-scene plan is structured
- **THEN** the agent halts for user feedback, presenting a scan-friendly prose plan with spoken phrases, metaphors, silhouettes, and origins for approval before generating technical code.

#### Scenario: Step 4 & 5 - Rapid Refinement and Final Alpha Export
- **WHEN** user approves the human-readable plan
- **THEN** the agent generates `SceneSpec` / bespoke motion components and executes final batch rendering of transparent Alpha Channel mini-videos in ProRes 4444 (`.mov`) or WebM.
