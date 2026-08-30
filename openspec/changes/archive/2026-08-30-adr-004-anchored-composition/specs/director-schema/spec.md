## MODIFIED Requirements

### Requirement: Structured SceneSpec Zod Schema
The system SHALL define a Zod schema and TypeScript types for `SceneSpec`, validating layout types across 6 distinct silhouettes, anchored relational positioning (`anchorTo`), composition bridges (`compositionBridge`), relative scale ratios (`sizeRatio`), choreography parameters, art direction metadata, and visual element props.

#### Scenario: Validating a correct SceneSpec JSON with anchored relationships
- **WHEN** a valid JSON object matching the `SceneSpec` structure with `anchorTo`, `compositionBridge`, and `sizeRatio` is parsed with Zod
- **THEN** it returns a validated, typed `SceneSpec` object.

#### Scenario: Enforcing anchor validation for multi-element scenes
- **WHEN** a `SceneSpec` contains 2 or more visual primitives and a secondary element lacks an `anchorTo` declaration
- **THEN** the schema validator catches the error or assigns a structured default anchor to prevent orphan elements.

#### Scenario: Handling invalid LLM output with fallback
- **WHEN** an invalid or malformed JSON object is parsed
- **THEN** the validator catches the error and returns a safe fallback `SceneSpec` containing a centered `TextReveal` and anchored `Icon`.

### Requirement: LLM Director Prompt Specification with Two Freedom Tiers
The system SHALL provide a system prompt definition for the LLM Director containing brand rules, minimal text rule (2-4 words max), 6-silhouette layout catalog, kinetic metaphor thinking guidelines, and explicit permission to create outside-the-box visual metaphors without repetitive template convergence.

#### Scenario: Interpreting metaphorical script text into kinetic metaphors
- **WHEN** the Director prompt receives a metaphorical script sentence (e.g. "inflation melts capital" or "ceiling on profit")
- **THEN** the prompt guides the LLM to output visual metaphors (e.g. descending chart with ceiling barrier line and disintegrating particles) rather than plain text slides.

#### Scenario: Enforcing non-consecutive layout silhouette variation
- **WHEN** generating a sequence of multi-scene narration
- **THEN** the Director alternates between the 6 layout silhouettes (`monumental-hero`, `horizontal-split`, `stacked-steps`, `blueprint-grifo`, `hud-radial`, `split-authority`) to prevent visual fatigue.

#### Scenario: Honoring user visual override directives
- **WHEN** the script includes a custom user prompt directive `{ prompt: "..." }`
- **THEN** the Director prioritizes the custom visual direction for that specific scene.
