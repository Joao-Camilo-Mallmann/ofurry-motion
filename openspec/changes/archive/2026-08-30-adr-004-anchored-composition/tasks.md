## 1. Documentation & ADR-004

- [x] 1.1 Create `docs/ADR/ADR-004-composicao-ancorada-e-ritmo.md` documenting Laws 7-10, 6 layout silhouettes, anchoring graph, and relative sizing.
- [x] 1.2 Update project guidelines (`AGENTS.md`) with ADR-004 directives.

## 2. Director Schema & Validation Enhancements

- [x] 2.1 Update `src/director/schema.ts` with `anchorTo`, `compositionBridge`, `sizeRatio`, and the 6 layout silhouette types.
- [x] 2.2 Update `src/director/validator.ts` to automatically validate anchors on multi-element scenes and assign sensible defaults on fallback.

## 3. Director Prompt with Kinetic Metaphors

- [x] 3.1 Update `src/director/prompt.ts` with instructions for translating narration into dramatic kinetic metaphors (ceiling barriers, split bars, contract excerpts).
- [x] 3.2 Add few-shot examples for all 6 layout silhouettes.

## 4. Remotion Layout Engine & Anchoring Primitives

- [x] 4.1 Update `src/composition/SceneComposer.tsx` to handle the 6 layout silhouettes and render bridge connectors (lines, overlaps).
- [x] 4.2 Update `src/primitives/Icon.tsx` to support relative scaling (`sizeRatio`) derived from hero typography or metric numbers.

## 5. Human-in-the-Loop Video Generation Skill

- [x] 5.1 Update `.agent/skills/generate-video/SKILL.md` with the 5-step interactive workflow (Concept → Snapshot Preview → User Validation Checkpoint → Refine → Final Alpha Render).

## 6. Verification & Sample Scene Update

- [x] 6.1 Run TypeScript typecheck (`bun run build`) to ensure zero type errors across all schemas and compositions.
- [x] 6.2 Validate Remotion Studio discovery and render sample anchored scene with Alpha Channel.
