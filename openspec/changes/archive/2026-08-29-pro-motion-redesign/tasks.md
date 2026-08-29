## 1. Typography & Theme Foundation

- [x] 1.1 Install motion design font packages (`@fontsource/archivo-black`, `@fontsource/bebas-neue`, `@fontsource/syne`, `@fontsource/space-grotesk`, `@fontsource/plus-jakarta-sans`) via Bun
- [x] 1.2 Update `src/theme/ofurry.ts` with multi-family font configuration, monumental scale tokens (120-150px titles, 180-220px numbers), and transparent background mode

## 2. Visual Primitives Redesign (Anti-"Cara de IA")

- [x] 2.1 Refactor `TextReveal.tsx` with display fonts (`Archivo Black` / `Syne`), monumental scaling, and high-contrast solid neon highlight blocks
- [x] 2.2 Refactor `AnimatedNumber.tsx` with `Space Grotesk` tabular numbers, monumental hero scale (180-220px), and technical monospaced badge styling
- [x] 2.3 Refactor `Icon.tsx` with increased visual presence, refined laser glow ring, and transparent alpha compatibility
- [x] 2.4 Refactor `ConnectedNodes.tsx` and `DynamicChart.tsx` with expanded 80% screen width, bold strokes, and technical editorial guides
- [x] 2.5 Refactor `ParticleField.tsx` to replace generic dot clouds with clean technical framing markers (corner brackets, crosshairs, and alpha-transparent grid)

## 3. Composition Pipeline & Transparent Alpha Support

- [x] 3.1 Update `SceneComposer.tsx` to support transparent alpha overlays, punch-and-hold entry curves, and monumental layout spacing
- [x] 3.2 Update `Root.tsx` to load all font families and configure transparent overlay compositions for standalone scenes
- [x] 3.3 Update `example/coe-script.ts` with monumental typography directives and editorial layout enhancements

## 4. Mini-Video Batch Export & Bun Tooling

- [x] 4.1 Create batch scene export script `scripts/render-scenes.ts` to render each scene individually into `out/scenes/` with ProRes 4444 (`.mov`), WebM, or MP4
- [x] 4.2 Configure `package.json` with `render:scenes`, `render:scene`, and alpha export scripts, verifying test render output
