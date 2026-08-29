## ADDED Requirements

### Requirement: Centralized OFurry Visual Theme
The system SHALL define a central theme object with the exact OFurry color palette, Montserrat typography configuration, and video layout constants (16:9 aspect ratio, 1920x1080 resolution, 30 fps default).

#### Scenario: Accessing theme colors and typography
- **WHEN** any component references `OFurryTheme`
- **THEN** it receives background `#000000`, primary white `#FFFFFF`, accent orange `#FF9900`, accent yellow `#FFB800`, dark gray `#1E1E1E`, and Montserrat font configuration.

### Requirement: Smooth Continuous Motion Physics
The system SHALL provide helper functions and custom hooks for smooth motion curves, spring calculations with high damping (no harsh stops), and continuous ambient micro-movement (senoidal breathing / drift) to prevent static frames.

#### Scenario: Calculating ambient float animation
- **WHEN** an element is rendered at frame `F`
- **THEN** the ambient helper returns a smooth sinusoidal vertical offset between `-3px` and `+3px` and a rotation drift between `-0.5deg` and `+0.5deg`.

#### Scenario: Calculating entry spring animation
- **WHEN** an element enters between frame `0` and frame `15`
- **THEN** the spring helper applies a damped spring curve with no sharp bounce, settling smoothly into resting scale `1.0`.
