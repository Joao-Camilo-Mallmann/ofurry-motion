## MODIFIED Requirements

### Requirement: Centralized OFurry Visual Theme
The system SHALL define a central theme object with the exact OFurry color palette, multi-family typography configuration (`Archivo Black`, `Bebas Neue`, `Syne`, `Space Grotesk`, `Plus Jakarta Sans`, `Montserrat`), monumental scale sizing (hero titles up to 150px, hero numbers up to 220px), transparent alpha tokens, and video layout constants (16:9 aspect ratio, 1920x1080 resolution, 30 fps default).

#### Scenario: Accessing theme colors and typography
- **WHEN** any component references `OFurryTheme`
- **THEN** it receives background `#000000` or `transparent`, primary white `#FFFFFF`, accent orange `#FF9900`, accent yellow `#FFB800`, dark gray `#1E1E1E`, and multi-family font configuration for display, tech/mono, and body text.

#### Scenario: Accessing monumental scale typography tokens
- **WHEN** a hero title or counter accesses `OFurryTheme.typography.sizes`
- **THEN** it receives `hero` (120px–150px) and `numberHero` (180px–220px) tokens with tight leading and letter spacing tailored for high-impact motion graphics.

## ADDED Requirements

### Requirement: Alpha Channel and Transparent Background Theme Mode
The system SHALL support transparent background tokens and alpha blending properties across all theme layers to enable direct video overlay compositions.

#### Scenario: Rendering in transparent overlay mode
- **WHEN** a scene or composition specifies transparent background mode
- **THEN** `OFurryTheme.colors.background` evaluates to `transparent` and decorative layers avoid solid opaque fills.
