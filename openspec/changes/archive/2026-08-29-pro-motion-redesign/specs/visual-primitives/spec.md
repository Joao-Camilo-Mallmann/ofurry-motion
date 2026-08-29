## MODIFIED Requirements

### Requirement: Atomic Visual Primitives Library
The system SHALL provide a library of composable visual primitives in Remotion: `TextReveal`, `Icon`, `AnimatedNumber`, `ConnectedNodes`, `DynamicChart`, and `ParticleField`, refactored with monumental scale, editorial graphic design elements (high-contrast solid highlight blocks/badges, technical crosshairs/guides), and native support for transparent backgrounds.

#### Scenario: TextReveal with minimal text and stagger
- **WHEN** `TextReveal` receives a short keyword string (2-4 words)
- **THEN** it renders words using display font families (`Archivo Black` / `Bebas Neue` / `Syne`) with monumental scale (80px–150px), punchy stagger motion, and solid orange highlight badges.

#### Scenario: Icon with multi-layer motion
- **WHEN** `Icon` is rendered
- **THEN** it renders flat white line-art with a bold scale entrance, expanding accent ring, and subtle ambient breathing without obstructing transparent background overlays.

#### Scenario: AnimatedNumber with fast counter and formatting
- **WHEN** `AnimatedNumber` receives a start value, end value, and format
- **THEN** it smoothly interpolates the number using `Space Grotesk` at monumental scale (140px–220px) with technical monospaced alignment and badge containers.

#### Scenario: ConnectedNodes with live SVG line drawing
- **WHEN** `ConnectedNodes` renders a list of connected node coordinates
- **THEN** it animates SVG connecting lines from 0% to 100% path length using `strokeDashoffset` across 80% screen width with crisp laser glow.

#### Scenario: DynamicChart with live trend drawing
- **WHEN** `DynamicChart` receives data points
- **THEN** it draws the trend line dynamically over time with expanded bounds and technical grid markers.

#### Scenario: ParticleField for continuous background life
- **WHEN** `ParticleField` is active in a scene
- **THEN** it renders subtle technical frame markers, crosshairs, and optional grid lines with complete alpha transparency when enabled for overlay export.
