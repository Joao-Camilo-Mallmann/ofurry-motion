# interactive-generation-workflow Specification

## Purpose
Standardized human-in-the-loop workflow for on-demand script analysis, modular scene generation, Remotion previewing, and Alpha rendering within video-scoped workspaces.

## Requirements

### Requirement: Standardized Human-in-the-Loop Generation Workflow
The system SHALL provide a video-contextualized generation workflow where the user provides a phrase/excerpt, the agent analyzes surrounding context from `videos/<video>/roteiro.md`, creates the modular scene file in `videos/<video>/scenes/`, updates the video index, and provides an immediate visual summary along with preview and render commands.

#### Scenario: Step 1 & 2 - Script Ingestion and Context Extraction
- **WHEN** user requests a scene for a phrase within a video context
- **THEN** the agent reads `videos/<video>/roteiro.md`, determines narrative tension from preceding and succeeding context, extracts 1-3 punch words, and assigns the layout silhouette and kinetic metaphor.

#### Scenario: Step 3 - Modular Scene Generation
- **WHEN** visual direction is established
- **THEN** the agent writes the scene to `videos/<video>/scenes/<XX>-<name>.ts` (or `.tsx`), registers it in `videos/<video>/scenes/index.ts`, and presents an immediate concise visual summary with the exact render command.

#### Scenario: Step 4 - Alpha Render and Preview
- **WHEN** developer initiates preview or render
- **THEN** developer runs Remotion Studio or executes `bun run render:video <video> --scene=<XX> --format=webm|prores`, writing transparent output to `videos/<video>/out/`.
