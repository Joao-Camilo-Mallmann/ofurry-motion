import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { SceneSpec, VisualElement } from '../director/schema';
import { OFurryTheme } from '../theme/ofurry';
import {
  TextReveal,
  Icon,
  AnimatedNumber,
  ConnectedNodes,
  DynamicChart,
  ParticleField,
} from '../primitives';
import { MotionPresets, getSpringProgress } from '../theme/motion';

export interface SceneComposerProps {
  scene: SceneSpec;
  transparent?: boolean;
}

/**
 * Animated Technical Connector Line Bridge (ADR-004 Law 7)
 */
const ConnectorBridge: React.FC<{
  type?: 'connector-line' | 'overlap' | 'color-trail' | 'none-justified';
  orientation?: 'horizontal' | 'vertical' | 'orthogonal';
  delay?: number;
  length?: number;
}> = ({ type = 'connector-line', orientation = 'horizontal', delay = 4, length = 120 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (type === 'none-justified' || type === 'overlap') return null;

  const progress = getSpringProgress(frame, fps, delay, MotionPresets.snappy);
  const opacity = interpolate(progress, [0, 0.4, 1], [0, 0.8, 1]);

  if (type === 'color-trail') {
    return (
      <div
        style={{
          width: orientation === 'horizontal' ? length : 3,
          height: orientation === 'vertical' ? length : 3,
          background: `linear-gradient(${orientation === 'horizontal' ? '90deg' : '180deg'}, ${OFurryTheme.colors.accentOrange}, transparent)`,
          opacity,
          transform: `scale(${progress})`,
        }}
      />
    );
  }

  // connector-line with terminal crosshairs/dots
  if (orientation === 'horizontal') {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          width: length,
          opacity,
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: OFurryTheme.colors.accentOrange,
            boxShadow: OFurryTheme.effects.glowOrange,
          }}
        />
        <div
          style={{
            flex: 1,
            height: 2,
            backgroundColor: OFurryTheme.colors.borderLight,
            transform: `scaleX(${progress})`,
            transformOrigin: 'left',
          }}
        />
        <div
          style={{
            width: 4,
            height: 4,
            backgroundColor: OFurryTheme.colors.primary,
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        height: length,
        opacity,
      }}
    >
      <div
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: OFurryTheme.colors.accentOrange,
          boxShadow: OFurryTheme.effects.glowOrange,
        }}
      />
      <div
        style={{
          flex: 1,
          width: 2,
          backgroundColor: OFurryTheme.colors.borderLight,
          transform: `scaleY(${progress})`,
          transformOrigin: 'top',
        }}
      />
      <div
        style={{
          width: 4,
          height: 4,
          backgroundColor: OFurryTheme.colors.primary,
        }}
      />
    </div>
  );
};

export const SceneComposer: React.FC<SceneComposerProps> = ({
  scene,
  transparent = true,
}) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  // Choreography entry calculation with safe defaults
  const { entryDirection = 'bottom-up', ambientMotion = 'gentle-float' } = scene.choreography ?? {};

  // Punch & Hold entry curve: fast snappy initial spring, then firm hold
  const entrySpring = getSpringProgress(frame, fps, 0, MotionPresets.snappy);
  const opacity = interpolate(entrySpring, [0, 0.35, 1], [0, 0.95, 1]);

  let entryTranslateX = 0;
  let entryTranslateY = 0;

  if (entryDirection === 'bottom-up') {
    entryTranslateY = interpolate(entrySpring, [0, 1], [60, 0]);
  } else if (entryDirection === 'left-glide') {
    entryTranslateX = interpolate(entrySpring, [0, 1], [-80, 0]);
  } else if (entryDirection === 'diagonal-flow') {
    entryTranslateX = interpolate(entrySpring, [0, 1], [-50, 0]);
    entryTranslateY = interpolate(entrySpring, [0, 1], [50, 0]);
  }

  // Determine dominant base size for relative scale calculations (ADR-004 Law 8)
  const hasDominantNumber = scene.elements.some((e) => e.type === 'number');
  const baseReferenceSize = hasDominantNumber
    ? OFurryTheme.typography.sizes.numberHero
    : OFurryTheme.typography.sizes.hero;

  // Render individual visual element
  const renderElement = (el: VisualElement, index: number) => {
    switch (el.type) {
      case 'text':
        return (
          <TextReveal
            key={el.id || `el-${index}`}
            text={el.text}
            subtitle={el.subtitle}
            variant={el.variant}
            highlightWords={el.highlightWords}
            font={el.font}
            align={el.align}
            delay={el.delay}
            glow={el.glow}
            revealMode={el.revealMode}
            strikethroughDelay={el.strikethroughDelay}
          />
        );

      case 'icon':
        return (
          <Icon
            key={el.id || `el-${index}`}
            name={el.name}
            size={el.size}
            sizeRatio={el.sizeRatio}
            baseReferenceSize={baseReferenceSize}
            color={el.color}
            accentColor={el.accentColor}
            delay={el.delay}
            showRing={el.showRing}
            showGlow={el.showGlow}
          />
        );

      case 'number':
        return (
          <AnimatedNumber
            key={el.id || `el-${index}`}
            value={el.value}
            startValue={el.startValue}
            prefix={el.prefix}
            suffix={el.suffix}
            label={el.label}
            decimals={el.decimals}
            durationInFrames={el.durationInFrames}
            delay={el.delay}
            variant={el.variant}
          />
        );

      case 'nodes':
        return (
          <ConnectedNodes
            key={el.id || `el-${index}`}
            nodes={el.nodes}
            connections={el.connections}
            delay={el.delay}
            drawDuration={el.drawDuration}
            width={el.width}
            height={el.height}
          />
        );

      case 'chart':
        return (
          <DynamicChart
            key={el.id || `el-${index}`}
            data={el.data}
            type={el.chartType}
            delay={el.delay}
            drawDuration={el.drawDuration}
            width={el.width}
            height={el.height}
            showGrid={el.showGrid}
            highlightLast={el.highlightLast}
          />
        );

      default:
        return null;
    }
  };

  // Render layout container according to the 6 ADR-004 Silhouettes + Legacy aliases
  const renderLayoutContent = () => {
    const { layout = 'monumental-hero', elements } = scene;

    switch (layout) {
      // -------------------------------------------------------------
      // ADR-006: 1. MONUMENTAL PUNCH & HERO (1-3 words, pure alpha, mask reveal)
      // -------------------------------------------------------------
      case 'monumental-punch':
      case 'monumental-hero':
      case 'centered-hero':
      case 'freeform': {
        const primary = elements[0];
        const secondaries = elements.slice(1);
        const hasOverlap = secondaries.some(
          (s) => s.anchorTo?.bridge === 'overlap' || s.anchorTo?.point === 'stamp-corner'
        );

        return (
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: hasOverlap ? '0px' : '32px',
              width: '100%',
              textAlign: 'center',
            }}
          >
            {primary && renderElement(primary, 0)}
            {secondaries.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '24px',
                  marginTop: hasOverlap ? '-30px' : '0px',
                  zIndex: 2,
                }}
              >
                {secondaries.map((sec, idx) => (
                  <React.Fragment key={idx}>
                    {sec.anchorTo?.bridge === 'connector-line' && (
                      <ConnectorBridge
                        type="connector-line"
                        orientation="vertical"
                        length={40}
                        delay={sec.delay || 4}
                      />
                    )}
                    {renderElement(sec, idx + 1)}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        );
      }

      // -------------------------------------------------------------
      // ADR-006: STRIKE REDACTION (Word A struck through -> Word B truth revealed)
      // -------------------------------------------------------------
      case 'strike-redaction': {
        const primary = elements[0];
        const secondary = elements[1];

        return (
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '24px',
              width: '100%',
              textAlign: 'center',
            }}
          >
            {primary && (
              primary.type === 'text' ? (
                <TextReveal
                  {...primary}
                  revealMode="strikethrough"
                  strikethroughDelay={primary.delay ? primary.delay + 20 : 20}
                />
              ) : (
                renderElement(primary, 0)
              )
            )}
            {secondary && (
              <div style={{ marginTop: '8px' }}>
                {secondary.type === 'text' ? (
                  <TextReveal {...secondary} delay={(secondary.delay ?? 0) + 24} />
                ) : (
                  renderElement(secondary, 1)
                )}
              </div>
            )}
          </div>
        );
      }

      // -------------------------------------------------------------
      // 2. HORIZONTAL SPLIT / BINARY TENSION (Clean polar compare)
      // -------------------------------------------------------------
      case 'binary-tension':
      case 'horizontal-split':
      case 'split-left':
      case 'split-right':
      case 'dual-compare': {
        const isSplitRight = layout === 'split-right';
        const leftElements = isSplitRight
          ? elements.filter((e) => e.type !== 'text')
          : elements.filter((e) => e.type === 'text');
        const rightElements = isSplitRight
          ? elements.filter((e) => e.type === 'text')
          : elements.filter((e) => e.type !== 'text');

        return (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1px 1fr',
              gap: '50px',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Left Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {(leftElements.length > 0 ? leftElements : [elements[0]]).map(renderElement)}
            </div>

            {/* Technical Center Divider */}
            <div
              style={{
                position: 'relative',
                height: '380px',
                width: '1px',
                backgroundColor: OFurryTheme.colors.border,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: OFurryTheme.colors.accentOrange,
                  boxShadow: OFurryTheme.effects.glowOrange,
                }}
              />
            </div>

            {/* Right Column */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '28px',
              }}
            >
              {(rightElements.length > 0 ? rightElements : elements.slice(1)).map(renderElement)}
            </div>
          </div>
        );
      }

      // -------------------------------------------------------------
      // 3. STACKED STEPS (Vertical progression hierarchy)
      // -------------------------------------------------------------
      case 'stacked-steps':
      case 'bottom-heavy': {
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              gap: '24px',
              width: '90%',
              maxWidth: '1400px',
              margin: '0 auto',
            }}
          >
            {elements.map((el, i) => (
              <React.Fragment key={i}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '24px',
                    width: '100%',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '36px',
                      height: '36px',
                      backgroundColor: i === 0 ? OFurryTheme.colors.accentOrange : OFurryTheme.colors.surfaceElevated,
                      color: i === 0 ? '#000000' : OFurryTheme.colors.primary,
                      fontFamily: OFurryTheme.typography.families.tech,
                      fontWeight: OFurryTheme.typography.weights.bold,
                      fontSize: '18px',
                      border: `1px solid ${OFurryTheme.colors.borderLight}`,
                    }}
                  >
                    {i + 1}
                  </div>
                  <div style={{ flex: 1 }}>{renderElement(el, i)}</div>
                </div>
                {i < elements.length - 1 && (
                  <div style={{ paddingLeft: '17px' }}>
                    <ConnectorBridge
                      type="connector-line"
                      orientation="vertical"
                      length={24}
                      delay={el.delay || 4}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        );
      }

      // -------------------------------------------------------------
      // 4. BLUEPRINT GRIFO / FORENSIC CALLOUT (Document clause with neon highlight & leader)
      // -------------------------------------------------------------
      case 'forensic-callout':
      case 'blueprint-grifo': {
        const textElements = elements.filter((e) => e.type === 'text');
        const secondaryElements = elements.filter((e) => e.type !== 'text');

        return (
          <div
            style={{
              position: 'relative',
              width: '100%',
              padding: '40px 60px',
              borderLeft: `4px solid ${OFurryTheme.colors.accentOrange}`,
              backgroundColor: 'rgba(255, 153, 0, 0.03)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '60px',
            }}
          >
            <div style={{ flex: 1.4, display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div
                style={{
                  fontFamily: OFurryTheme.typography.families.tech,
                  fontSize: '14px',
                  color: OFurryTheme.colors.accentOrange,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                }}
              >
                REGULAMENTO // CLÁUSULA OFICIAL
              </div>
              {textElements.map(renderElement)}
            </div>

            {secondaryElements.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '30px',
                }}
              >
                <ConnectorBridge
                  type="connector-line"
                  orientation="horizontal"
                  length={80}
                  delay={6}
                />
                {secondaryElements.map(renderElement)}
              </div>
            )}
          </div>
        );
      }

      // -------------------------------------------------------------
      // 5. HUD RADIAL (Central core with orbiting radial graph)
      // -------------------------------------------------------------
      case 'hud-radial':
      case 'radial-network': {
        const textElements = elements.filter((e) => e.type === 'text');
        const networkElements = elements.filter((e) => e.type !== 'text');

        return (
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '24px',
              width: '100%',
            }}
          >
            {/* Orbit rings background (Alpha friendly) */}
            <div
              style={{
                position: 'absolute',
                width: '650px',
                height: '650px',
                borderRadius: '50%',
                border: `1px dashed ${OFurryTheme.colors.accentOrangeAlpha(0.25)}`,
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                width: '900px',
                height: '900px',
                borderRadius: '50%',
                border: `1px solid ${OFurryTheme.colors.whiteAlpha(0.06)}`,
                pointerEvents: 'none',
              }}
            />

            {textElements.map(renderElement)}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                zIndex: 2,
              }}
            >
              {networkElements.map(renderElement)}
            </div>
          </div>
        );
      }

      // -------------------------------------------------------------
      // 6. SPLIT AUTHORITY / METRIC AUTHORITY (Colossal counter crossing boundary)
      // -------------------------------------------------------------
      case 'metric-authority':
      case 'split-authority': {
        const numberElement = elements.find((e) => e.type === 'number') || elements[0];
        const otherElements = elements.filter((e) => e !== numberElement);

        return (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.4fr 1fr',
              gap: '60px',
              width: '100%',
              alignItems: 'center',
            }}
          >
            {/* Monumental Counter Column */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                borderRight: `2px solid ${OFurryTheme.colors.border}`,
                paddingRight: '40px',
              }}
            >
              {renderElement(numberElement, 0)}
            </div>

            {/* Attached Context Elements Column */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '24px',
              }}
            >
              {otherElements.map(renderElement)}
            </div>
          </div>
        );
      }

      default: {
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '36px',
              width: '100%',
            }}
          >
            {elements.map(renderElement)}
          </div>
        );
      }
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        backgroundColor: transparent ? 'transparent' : OFurryTheme.colors.background,
        overflow: 'hidden',
      }}
    >
      {/* Background Tech Framing Atmosphere */}
      <ParticleField
        showGrid={true}
        showCorners={true}
        showCrosshairs={true}
        transparent={transparent}
        speed={ambientMotion === 'grid-drift' ? 1.5 : 0.8}
      />

      {/* Main Content Area in Safe Bounds */}
      <div
        style={{
          position: 'absolute',
          top: OFurryTheme.layout.safeArea.top,
          bottom: OFurryTheme.layout.safeArea.bottom,
          left: OFurryTheme.layout.safeArea.left,
          right: OFurryTheme.layout.safeArea.right,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `translate3d(${entryTranslateX}px, ${entryTranslateY}px, 0)`,
          opacity,
        }}
      >
        {renderLayoutContent()}
      </div>
    </div>
  );
};
