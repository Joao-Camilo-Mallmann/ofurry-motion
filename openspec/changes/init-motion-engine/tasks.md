## 1. Project Initialization & Dependencies

- [x] 1.1 Configure package.json with Remotion, TypeScript, React, Zod, and Montserrat font dependencies
- [x] 1.2 Setup TypeScript configuration (tsconfig.json) and Remotion configuration (remotion.config.ts)

## 2. Theme & Motion Physics Foundation

- [x] 2.1 Implement OFurryTheme (colors, Montserrat typography, 16:9 layout constants) in `src/theme/ofurry.ts`
- [x] 2.2 Implement motion physics utilities (spring helpers, sinusoidal ambient drift, live-draw interpolation) in `src/theme/motion.ts`

## 3. Visual Primitives Implementation

- [x] 3.1 Implement `TextReveal` primitive with stagger fade/glide and minimal text layout in `src/primitives/TextReveal.tsx`
- [x] 3.2 Implement `Icon` primitive with scale entrance, accent ring, and ambient floating in `src/primitives/Icon.tsx`
- [x] 3.3 Implement `AnimatedNumber` primitive with fast interpolation and badge styling in `src/primitives/AnimatedNumber.tsx`
- [x] 3.4 Implement `ConnectedNodes` primitive with live SVG line drawing (`strokeDashoffset`) in `src/primitives/ConnectedNodes.tsx`
- [x] 3.5 Implement `DynamicChart` and `ParticleField` primitives for visual trends and background atmosphere in `src/primitives/`

## 4. Director Schema & Prompt System

- [x] 4.1 Define Zod schemas and TypeScript types for `SceneSpec`, Layouts, and Choreography in `src/director/schema.ts`
- [x] 4.2 Build the LLM Director system prompt with 2-tier creativity rules and few-shot examples in `src/director/prompt.ts`
- [x] 4.3 Implement validator and fallback handler for `SceneSpec` in `src/director/validator.ts`

## 5. Composition Pipeline & Preview

- [x] 5.1 Implement `SceneComposer` to render visual elements based on `SceneSpec` in `src/composition/SceneComposer.tsx`
- [x] 5.2 Implement `Root.tsx` and sample sequence script (`example/sample-script.ts`) for Remotion Studio preview
- [x] 5.3 Implement Remotion entry point (`src/index.ts`) and verify preview and render integration
