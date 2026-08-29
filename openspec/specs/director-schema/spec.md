# director-schema Specification

## Purpose
TBD - created by archiving change init-motion-engine. Update Purpose after archive.
## Requirements
### Requirement: Structured SceneSpec Zod Schema
The system SHALL define a Zod schema and TypeScript types for `SceneSpec`, validating layout types, choreography parameters, art direction metadata, and visual element props.

#### Scenario: Validating a correct SceneSpec JSON
- **WHEN** a valid JSON object matching the `SceneSpec` structure is parsed with Zod
- **THEN** it returns a validated, typed `SceneSpec` object.

#### Scenario: Handling invalid LLM output with fallback
- **WHEN** an invalid or malformed JSON object is parsed
- **THEN** the validator catches the error and returns a safe fallback `SceneSpec` containing a centered `TextReveal` and `Icon`.

### Requirement: LLM Director Prompt Specification with Two Freedom Tiers
The system SHALL provide a system prompt definition for the LLM Director containing the brand rules, Montserrat guidelines, minimal text rule (2-4 words max), diverse layout archetypes, and explicit permission to create outside-the-box visual metaphors and freeform layer arrangements.

#### Scenario: Interpreting metaphorical script text
- **WHEN** the Director prompt receives a metaphorical script sentence (e.g. "inflation melts capital")
- **THEN** the prompt guides the LLM to output visual metaphors (e.g. descending chart with disintegrating particles) rather than plain text slides.

#### Scenario: Honoring user visual override directives
- **WHEN** the script includes a custom user prompt directive `{ prompt: "..." }`
- **THEN** the Director prioritizes the custom visual direction for that specific scene.

