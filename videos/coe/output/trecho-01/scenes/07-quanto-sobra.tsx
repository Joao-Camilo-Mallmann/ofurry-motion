import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { OFurryTheme } from '../../../../../src/theme/ofurry';
import { MotionPresets, getSpringProgress, getAmbientDrift } from '../../../../../src/theme/motion';
import { BespokeScene } from '../../../../../src/videos/types';

export const QuantoSobraComponent: React.FC<{ transparent?: boolean }> = ({ transparent = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Ambient micro-drift (anti-wobble: amplitudeRotate: 0)
  const ambient = getAmbientDrift(frame, {
    amplitudeY: 0.6,
    amplitudeX: 0.3,
    amplitudeRotate: 0,
    periodFrames: 90,
  });

  // Entrance 1: Pergunta Monumental no lado esquerdo (frames 0-22)
  const leftSpring = getSpringProgress(frame, fps, 0, MotionPresets.snappy);
  const leftX = interpolate(leftSpring, [0, 1], [-60, 0]);
  const leftOpacity = interpolate(leftSpring, [0, 0.4, 1], [0, 1, 1]);

  // Entrance 2: Hairline vertical divisória de 1px (frames 15-38)
  const dividerProgress = interpolate(frame, [15, 38], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const dividerHeight = interpolate(dividerProgress, [0, 1], [0, 480]);

  // Entrance 3: Métricas de autoridade no lado direito (frames 25-60)
  const rightSpring = getSpringProgress(frame, fps, 25, MotionPresets.snappy);
  const rightX = interpolate(rightSpring, [0, 1], [60, 0]);
  const rightOpacity = interpolate(rightSpring, [0, 0.4, 1], [0, 1, 1]);

  // Contadores animados dinâmicos
  const assetCounter = interpolate(frame, [28, 65], [0, 45.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const captureCounter = interpolate(frame, [38, 75], [0, 12.4], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Fluidez contínua na timeline (anti-freeze)
  const pulseLeft = 1 + Math.sin((frame / 28) * Math.PI) * 0.01;
  const pulseOrange = 1 + Math.sin((frame / 20) * Math.PI) * 0.02;
  const laserY = (frame * 8) % 520;

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
            justifyContent: 'space-between',
          }}
        >
          {/* TOP CONTEXT PRECISION TAG */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              opacity: leftOpacity,
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
              CAPTURA REAL // O FILTRO BRUTAL
            </span>
          </div>

          {/* MAIN ASYMMETRIC SPLIT (ZERO CARDS CINZAS - CLEAN EDITORIAL) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              flex: 1,
              padding: '20px 0',
            }}
          >
            {/* LADO ESQUERDO (58%): PERGUNTA MONUMENTAL HERO */}
            <div
              style={{
                width: '56%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                opacity: leftOpacity,
                transform: `translateX(${leftX}px) scale(${pulseLeft})`,
              }}
            >
              <h1
                style={{
                  margin: 0,
                  padding: 0,
                  fontFamily: OFurryTheme.typography.families.hero,
                  fontSize: 110,
                  lineHeight: 0.95,
                  letterSpacing: '-2px',
                  textTransform: 'uppercase',
                  color: OFurryTheme.colors.primary,
                }}
              >
                QUANTO SOBRA?
              </h1>

              {/* BADGE SÓLIDO NEON LARANJA */}
              <div
                style={{
                  marginTop: 24,
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: OFurryTheme.colors.highlightSolid,
                  color: OFurryTheme.colors.highlightText,
                  padding: '10px 28px',
                  fontWeight: 900,
                  letterSpacing: '2.5px',
                  fontSize: 22,
                  fontFamily: OFurryTheme.typography.families.hero,
                  textTransform: 'uppercase',
                }}
              >
                RETENÇÃO RESIDUAL
              </div>

              <p
                style={{
                  margin: '24px 0 0 0',
                  fontFamily: OFurryTheme.typography.families.tech,
                  fontSize: 16,
                  color: OFurryTheme.colors.secondary,
                  letterSpacing: '1.5px',
                  maxWidth: '85%',
                  lineHeight: 1.5,
                  textTransform: 'uppercase',
                }}
              >
                DEPOIS DE TODAS AS REGRAS, TETOS, CUSTOS E COMISSÕES
              </p>
            </div>

            {/* HAIRLINE DIVISÓRIA VERTICAL DE 1PX COM LASER TRACER */}
            <div
              style={{
                width: 1,
                height: dividerHeight,
                backgroundColor: OFurryTheme.colors.borderLight,
                position: 'relative',
                overflow: 'hidden',
                margin: '0 40px',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: laserY - 60,
                  left: -1,
                  width: 3,
                  height: 60,
                  backgroundColor: OFurryTheme.colors.highlightSolid,
                  boxShadow: '0 0 8px #FF9900',
                }}
              />
            </div>

            {/* LADO DIREITO (42%): MÉTRICA DE AUTORIDADE COMPARATIVA */}
            <div
              style={{
                width: '40%',
                display: 'flex',
                flexDirection: 'column',
                gap: 32,
                opacity: rightOpacity,
                transform: `translateX(${rightX}px)`,
              }}
            >
              {/* ITEM 1: ALTA DO ATIVO (MÉTRICA BRUTA) */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontFamily: OFurryTheme.typography.families.tech,
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: '2px',
                    color: OFurryTheme.colors.secondary,
                    textTransform: 'uppercase',
                    marginBottom: 6,
                  }}
                >
                  ALTA DO ATIVO // REFERÊNCIA
                </span>
                <span
                  style={{
                    fontFamily: OFurryTheme.typography.families.tech,
                    fontSize: 68,
                    fontWeight: 900,
                    letterSpacing: '-1px',
                    color: '#777777',
                    lineHeight: 1,
                  }}
                >
                  +{assetCounter.toFixed(1)}%
                </span>
              </div>

              {/* HAIRLINE HORIZONTAL DIVISÓRIA ENTRE MÉTRICAS */}
              <div
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: OFurryTheme.colors.borderLight,
                }}
              />

              {/* ITEM 2: SUA CAPTURA REAL (NEON HERO) */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontFamily: OFurryTheme.typography.families.tech,
                    fontSize: 14,
                    fontWeight: 800,
                    letterSpacing: '2px',
                    color: OFurryTheme.colors.highlightSolid,
                    textTransform: 'uppercase',
                    marginBottom: 6,
                  }}
                >
                  SUA CAPTURA REAL // NO BOLSO
                </span>
                <span
                  style={{
                    fontFamily: OFurryTheme.typography.families.tech,
                    fontSize: 82,
                    fontWeight: 900,
                    letterSpacing: '-2px',
                    color: OFurryTheme.colors.highlightSolid,
                    lineHeight: 1,
                    transform: `scale(${pulseOrange})`,
                    display: 'inline-block',
                    transformOrigin: 'left center',
                  }}
                >
                  +{captureCounter.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* FOOTER BAR */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 16,
              borderTop: `1px solid ${OFurryTheme.colors.borderLight}`,
              opacity: interpolate(frame, [45, 70], [0, 0.85]),
            }}
          >
            <span
              style={{
                fontFamily: OFurryTheme.typography.families.tech,
                fontSize: 14,
                color: OFurryTheme.colors.secondary,
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              MECANISMO DE RETENÇÃO // QUEM GANHA DE VERDADE É A ESTRUTURA
            </span>
            <span
              style={{
                fontFamily: OFurryTheme.typography.families.tech,
                fontSize: 14,
                color: OFurryTheme.colors.highlightSolid,
                fontWeight: 800,
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              VALORIZAÇÃO FILTRADA
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const quantoSobraScene: BespokeScene = {
  id: 'quanto-sobra',
  name: 'Quanto Sobra? (Split Authority)',
  durationInFrames: 135, // 4.5 segundos cravados a 30fps
  component: QuantoSobraComponent,
};
