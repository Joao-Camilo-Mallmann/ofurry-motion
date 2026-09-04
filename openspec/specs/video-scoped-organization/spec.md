# video-scoped-organization Specification

## Purpose
Defines isolated, self-contained project folders for each YouTube video containing scripts, modular scene files, and rendered assets.

## Requirements

### Requirement: Standard Video Directory Structure
The system SHALL organize each video project inside `videos/<video-name>/`, containing only `roteiro.md`, a modular `scenes/` folder, and an `out/` directory for exported renders.

#### Scenario: Video project folder initialization
- **WHEN** a new video project is created
- **THEN** it is placed in `videos/<video-name>/` containing `roteiro.md` for voiceover script and a `scenes/` directory for scene files.

### Requirement: Granular Scene Modularity
The system SHALL store scene definitions as individual TypeScript files inside `videos/<video-name>/scenes/` along with an `index.ts` manifest aggregating the scenes into a typed `VideoPackage`.

#### Scenario: Registering multiple scenes in order
- **WHEN** scenes are created or edited in `videos/<video-name>/scenes/`
- **THEN** each scene resides in its own numbered file (e.g. `01-promessa.ts`) and `index.ts` exports the ordered array of scenes and metadata.
