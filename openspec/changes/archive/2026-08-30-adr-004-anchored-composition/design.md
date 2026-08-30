## Context

The OFurry Remotion motion engine produces transparent Alpha Channel motion graphics mini-videos for financial/documentary YouTube content. Prior iterations established foundational primitives (ADR-001/002) and 6 Golden Rules (minimal text, monumental scale, editorial fonts, neon badges, alpha channel, punch & hold physics).

However, multi-element scenes frequently exhibited unanchored, floating visual primitives without relative scale constraints, causing generic "AI template" aesthetics. Furthermore, the video generation workflow lacked an explicit review step between creative drafting and final rendering.

## Goals / Non-Goals

**Goals:**
- Implement anchored spatial relationships (`anchorTo`, `compositionBridge`) ensuring no secondary primitive is placed as an ungrounded orphan.
- Establish relative sizing (`sizeRatio`) derived from the dominant element (55%-75% of text hero height, 35%-45% of number hero height).
- Catalog 6 geometrically distinct layout silhouettes (`monumental-hero`, `horizontal-split`, `stacked-steps`, `blueprint-grifo`, `hud-radial`, `split-authority`) and prevent consecutive repetition.
- Codify the ADR-004 architecture document.
- Standardize the `generate-video` skill with a 5-step human-in-the-loop workflow: Concept/Draft → Previews/Snapshots → User Review → Refine → Final Alpha Render.

**Non-Goals:**
- Replacing existing primitives (`TextReveal`, `Icon`, `AnimatedNumber`, `ConnectedNodes`, `DynamicChart`).
- Modifying codec configurations or basic Remotion video parameters (1080p, 30fps).

## Decisions

### Decision 1: Relational Graph via `anchorTo` and `compositionBridge`
Instead of positioning primitives independently via flat coordinates, secondary elements must declare an anchor target (`targetId`), an anchor point (`cap-height-right`, `baseline-left`, `stamp-corner`, `leader-line`), and a visual bridge type (`connector-line`, `overlap`, `color-trail`, `none-justified`).

*Rationale:* Prevents "text + floating emoji" looks and forces intentional graphic design hierarchy.
*Alternatives Considered:* Pure CSS Grid templates (rejected: inflexible for diverse aspect ratios and typography length variations).

### Decision 2: 6 Geometrically Distinct Silhouettes with Sequence Validation
The layout engine supports 6 contrasting silhouettes:
1. `monumental-hero`: Heavy central anchor with tight badge/stamp lockup.
2. `horizontal-split`: Left-to-right flow or side-by-side contrast with center divider.
3. `stacked-steps`: Vertical hierarchical progression with connectors.
4. `blueprint-grifo`: Technical document layout with highlighted neon excerpts and leader callouts.
5. `hud-radial`: Center-outward radial network with laser ring lines.
6. `split-authority`: Asymmetrical 70/30 division with cross-boundary elements.

The Director engine and validator enforce non-consecutive silhouette variation across scene sequences.

### Decision 3: Human-in-the-Loop Review Skill Cycle
The `/generate-video` skill formalizes a mandatory validation checkpoint:
1. **Analyze & Conceive**: AI extracts dramatic tension and conceives kinetic metaphors.
2. **Draft & Preview**: AI writes SceneSpec and exports frame snapshots / launches Studio.
3. **User Validation**: AI presents the visual direction and gathers user feedback.
4. **Refine**: Quick adjustments to typography, layout, or copy if requested.
5. **Render Final**: Batch render in ProRes 4444 (Alpha) or WebM.

## Risks / Trade-offs

- **[Risk] Schema Validation Rejections on Invalid LLM Generation** → *Mitigation*: Fallback validator safely assigns default `anchorTo` and `sizeRatio` if an LLM misses the target reference.
- **[Risk] Sizing Calculation Complexity in React** → *Mitigation*: Pre-computed relative scale multiplier based on dominant primitive's variant token (`sizes.hero = 136px`, `sizes.numberHero = 200px`).
