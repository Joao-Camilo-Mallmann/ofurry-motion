## ADDED Requirements

### Requirement: Atomic Visual Primitives Library
The system SHALL provide a library of composable visual primitives in Remotion: `TextReveal`, `Icon`, `AnimatedNumber`, `ConnectedNodes`, `DynamicChart`, and `ParticleField`.

#### Scenario: TextReveal with minimal text and stagger
- **WHEN** `TextReveal` receives a short keyword string (2-4 words)
- **THEN** it renders words using Montserrat Bold with smooth stagger fade and vertical glide, avoiding large paragraphs.

#### Scenario: Icon with multi-layer motion
- **WHEN** `Icon` is rendered
- **THEN** it renders flat white line-art with a scaling entry, an expanding secondary accent glow ring, and ambient floating motion.

#### Scenario: AnimatedNumber with fast counter and formatting
- **WHEN** `AnimatedNumber` receives a start value, end value, and format (currency, percentage, integer)
- **THEN** it smoothly interpolates the number with anticipation and formats the output according to the locale and prefix/suffix.

#### Scenario: ConnectedNodes with live SVG line drawing
- **WHEN** `ConnectedNodes` renders a list of connected node coordinates
- **THEN** it animates SVG connecting lines from 0% to 100% path length using `strokeDashoffset` with neon orange glow before pulsing the nodes.

#### Scenario: DynamicChart with live trend drawing
- **WHEN** `DynamicChart` receives data points
- **THEN** it draws the trend line dynamically over time and highlights key metrics with pulsing data points.

#### Scenario: ParticleField for continuous background life
- **WHEN** `ParticleField` is active in a scene
- **THEN** it animates floating background particles and subtle grid accents smoothly across all frames.
