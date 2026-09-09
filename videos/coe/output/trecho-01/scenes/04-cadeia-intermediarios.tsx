import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { OFurryTheme } from '../../../../../src/theme/ofurry';
import { MotionPresets, getSpringProgress, getAmbientDrift } from '../../../../../src/theme/motion';
import { BespokeScene } from '../../../../../src/videos/types';

export const CadeiaIntermediariosComponent: React.FC<{ transparent?: boolean }> = ({ transparent = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Ambient micro-drift (anti-wobble: amplitudeRotate: 0)
  const ambient = getAmbientDrift(frame, {
    amplitudeY: 0.6,
    amplitudeX: 0.3,
    amplitudeRotate: 0,
    periodFrames: 90,
  });

  // Step 1: Banco Estruturador entrance (frames 0-25)
  const step1Spring = getSpringProgress(frame, fps, 0, MotionPresets.snappy);
  const step1X = interpolate(step1Spring, [0, 1], [-80, 0]);
  const step1Opacity = interpolate(step1Spring, [0, 0.4, 1], [0, 1, 1]);

  // Conector vertical desenhado (frames 22-42)
  const connectorProgress = interpolate(frame, [22, 42], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const connectorHeight = interpolate(connectorProgress, [0, 1], [0, 90]);

  // Step 2: Distribuidor entrance (frames 30-55)
  const step2Spring = getSpringProgress(frame, fps, 28, MotionPresets.snappy);
  const step2X = interpolate(step2Spring, [0, 1], [80, 0]);
  const step2Opacity = interpolate(step2Spring, [0, 0.4, 1], [0, 1, 1]);

  // Laser flow contínuo pelo conector (anti-freeze)
  const laserFlow = (frame * 6) % 120;
  const pulseText = 1 + Math.sin((frame / 25) * Math.PI) * 0.01;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: transparent ? 'transparent' : OFurryTheme.colors.background,
        position: 'relative',
        overflow: 'hidden',
        fontFamily: OFurryTheme.typography.families.body,
        color: OFurryTheme.colors.primary,
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          transform: `translate3d(${ambient.translateX}px, ${ambient.translateY}px, 0)`,
          position: 'relative',
        }}
      >
        {/* SAFE AREA WRAPPER */}
        <div
          style={{
            position: 'absolute',
            top: OFurryTheme.layout.safeArea.top,
            bottom: OFurryTheme.layout.safeArea.bottom,
            left: OFurryTheme.layout.safeArea.left,
            right: OFurryTheme.layout.safeArea.right,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* HEADER TAG */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 40,
              opacity: step1Opacity,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                backgroundColor: OFurryTheme.colors.highlightSolid,
                borderRadius: 2,
              }}
            />
            <span
              style={{
                fontFamily: OFurryTheme.typography.families.tech,
                fontSize: OFurryTheme.typography.sizes.microLabel,
                fontWeight: 700,
                letterSpacing: OFurryTheme.typography.letterSpacing.widest,
                color: OFurryTheme.colors.secondary,
                textTransform: 'uppercase',
              }}
            >
              CADEIA DE INTERMEDIAÇÃO // DUPLO PEDÁGIO
            </span>
          </div>

          {/* STACKED CONTAINER (ZERO CARDS CINZAS - ELEMENTOS MONUMENTAIS DIRETOS) */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              maxWidth: 1200,
            }}
          >
            {/* STEP 1: ESTRUTURADOR (BANCO) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                width: '100%',
                opacity: step1Opacity,
                transform: `translateX(${step1X}px) scale(${pulseText})`,
                borderBottom: `1px solid ${OFurryTheme.colors.borderLight}`,
                paddingBottom: 20,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 24 }}>
                <span
                  style={{
                    fontFamily: OFurryTheme.typography.families.tech,
                    fontSize: 28,
                    fontWeight: 800,
                    color: OFurryTheme.colors.highlightSolid,
                  }}
                >
                  01
                </span>
                <span
                  style={{
                    fontFamily: OFurryTheme.typography.families.conceptual,
                    fontSize: 96,
                    fontWeight: 900,
                    letterSpacing: '-2px',
                    textTransform: 'uppercase',
                    color: OFurryTheme.colors.primary,
                  }}
                >
                  ESTRUTURADOR
                </span>
              </div>

              <div
                style={{
                  backgroundColor: OFurryTheme.colors.highlightSolid,
                  color: OFurryTheme.colors.highlightText,
                  fontFamily: OFurryTheme.typography.families.hero,
                  fontSize: 18,
                  fontWeight: 900,
                  letterSpacing: '2px',
                  padding: '8px 20px',
                  textTransform: 'uppercase',
                }}
              >
                BANCO EMISSOR
              </div>
            </div>

            {/* CONECTOR VERTICAL TÉCNICO ORTOGONAL */}
            <div
              style={{
                width: 2,
                height: connectorHeight,
                backgroundColor: OFurryTheme.colors.borderLight,
                position: 'relative',
                margin: '8px 0',
                overflow: 'hidden',
              }}
            >
              {/* Laser pulsando verticalmente */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: laserFlow - 30,
                  height: 30,
                  backgroundColor: OFurryTheme.colors.highlightSolid,
                  boxShadow: '0 0 10px #FF9900',
                }}
              />
            </div>

            {/* STEP 2: DISTRIBUIDOR (CORRETORA / ASSESSOR) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                width: '100%',
                opacity: step2Opacity,
                transform: `translateX(${step2X}px) scale(${pulseText})`,
                borderBottom: `1px solid ${OFurryTheme.colors.borderLight}`,
                paddingBottom: 20,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 24 }}>
                <span
                  style={{
                    fontFamily: OFurryTheme.typography.families.tech,
                    fontSize: 28,
                    fontWeight: 800,
                    color: OFurryTheme.colors.highlightSolid,
                  }}
                >
                  02
                </span>
                <span
                  style={{
                    fontFamily: OFurryTheme.typography.families.conceptual,
                    fontSize: 96,
                    fontWeight: 900,
                    letterSpacing: '-2px',
                    textTransform: 'uppercase',
                    color: OFurryTheme.colors.primary,
                  }}
                >
                  DISTRIBUIDOR
                </span>
              </div>

              <div
                style={{
                  backgroundColor: 'transparent',
                  border: `1px solid ${OFurryTheme.colors.highlightSolid}`,
                  color: OFurryTheme.colors.highlightSolid,
                  fontFamily: OFurryTheme.typography.families.tech,
                  fontSize: 16,
                  fontWeight: 800,
                  letterSpacing: '2px',
                  padding: '8px 20px',
                  textTransform: 'uppercase',
                }}
              >
                CORRETORA // VENDA
              </div>
            </div>
          </div>

          {/* FOOTER TAKEAWAY */}
          <div
            style={{
              marginTop: 48,
              opacity: interpolate(frame, [45, 65], [0, 0.85]),
              fontFamily: OFurryTheme.typography.families.tech,
              fontSize: 15,
              color: OFurryTheme.colors.secondary,
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            QUEM CRIA E QUEM VENDE SÃO REMUNERADOS ANTES
          </div>
        </div>
      </div>
    </div>
  );
};

export const cadeiaIntermediariosScene: BespokeScene = {
  id: 'cadeia-intermediarios',
  name: 'Cadeia de Intermediários (Stacked Steps)',
  durationInFrames: 135, // 4.5 segundos cravados a 30fps
  component: CadeiaIntermediariosComponent,
};
