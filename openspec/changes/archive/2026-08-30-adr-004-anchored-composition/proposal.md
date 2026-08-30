## Why

Visual validation of initial rendered scenes revealed that visual primitives were being placed independently without declared spatial hierarchy, leading to generic "AI-template" looks (floating undersized icons, dead empty space, and repetitive layout silhouettes). Additionally, the video creation workflow lacked a structured human-in-the-loop validation step where the creative director conceives outside-the-box kinetic metaphors, exports preview snapshots, solicits user review, and only renders the final alpha video after approval.

## What Changes

- **ADR-004 Formalization**: Adopt anchored composition rules (Laws 7-10) eliminating orphaned elements and enforcing relative scale proportions (`sizeRatio`).
- **6-Silhouette Anti-Repetitive Catalog**: Expand the layout system with 6 geometrically distinct silhouettes (`monumental-hero`, `horizontal-split`, `stacked-steps`, `blueprint-grifo`, `hud-radial`, `split-authority`) and enforce non-consecutive silhouette variation.
- **Composition Bridges**: Support explicit connectors (`connector-line`, `overlap`, `color-trail`, `none-justified`) between dominant and secondary primitives.
- **Interactive Production Skill Workflow**: Update `generate-video` workflow with a 5-step human-in-the-loop cycle: Creative Concept → Preview Snapshots → User Review Checkpoint → Rapid Iteration → Final Alpha Render.

## Capabilities

### New Capabilities
- `interactive-generation-workflow`: Standardized 5-step human-in-the-loop video generation workflow (Drafting outside-the-box metaphors, generating preview snapshots, validating with the user, refining, and final Alpha rendering).

### Modified Capabilities
- `director-schema`: Extends `SceneSpec` with `anchorTo`, `compositionBridge`, relative scale (`sizeRatio`), expanded 6-silhouette `layout` catalog, and Zod validation preventing unanchored multi-element scenes.
- `remotion-composition-pipeline`: Enhances `SceneComposer` to render anchored relationships, overlap math, technical leader lines, and multi-silhouette arrangements.

## Impact

- `src/director/schema.ts`: Schema extensions and validation rules.
- `src/director/prompt.ts`: Updated Director system prompt with kinetic metaphor thinking and 6-silhouette catalog.
- `src/composition/SceneComposer.tsx`: Layout container upgrades and connector rendering.
- `src/primitives/Icon.tsx` & visual primitives: Support relative sizing and anchor positioning.
- `.agent/skills/generate-video/SKILL.md`: Standardized human-in-the-loop review workflow.
- `docs/ADR/ADR-004-composicao-ancorada-e-ritmo.md`: Architectural decision record document.
