# dynamic-script-context Specification

## ADDED Requirements

### Requirement: On-Demand Narrative Context Extraction
The system SHALL read `roteiro.md` directly on demand whenever an excerpt is provided, evaluating the surrounding context (immediate preceding and following narration) to extract tone, contrast, and visual metaphors.

#### Scenario: User requests a scene for a phrase
- **WHEN** user provides a phrase or excerpt within a video context
- **THEN** the agent inspects `videos/<video-name>/roteiro.md`, locates the phrase, and extracts narrative context before and after the excerpt without creating an intermediate context file.

### Requirement: Context-Aware Visual Metaphor Selection
The system SHALL select typographic archetypes, color accents, and kinetic metaphors based on the dramatic tension identified from the script's surrounding lines.

#### Scenario: Detecting contrast and tension
- **WHEN** the surrounding script contrasts a bank promise with hidden fees
- **THEN** the system applies a redaction strike or metric authority silhouette rather than a generic text block.
