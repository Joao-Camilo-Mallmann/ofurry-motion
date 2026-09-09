import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { OFurryTheme } from '../../../../../src/theme/ofurry';
import { MotionPresets, getSpringProgress, getAmbientDrift } from '../../../../../src/theme/motion';
import { BespokeScene } from '../../../../../src/videos/types';

export const TetoCallSpreadComponent: React.FC<{ transparent?: boolean }> = ({ transparent = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Ambient micro-drift (anti-wobble: amplitudeRotate: 0)
  const ambient = getAmbientDrift(frame, {
    amplitudeY: 0.7,
    amplitudeX: 0.3,
    amplitudeRotate: 0,
    periodFrames: 90,
  });

  // Phase 1: Illusion text entrance (frames 0-25)
  const illusionProgress = getSpringProgress(frame, fps, 0, MotionPresets.snappy);
  const illusionOpacity = interpolate(illusionProgress, [0, 1], [0, 1]);

  // Phase 2: STRIKE REDACTION CUT (Guillotine cut at frame 28)
  const cutFrame = 28;
  const cutProgress = interpolate(frame, [cutFrame, cutFrame + 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Strike line expansion width (0% to 100%)
  const strikeWidth = interpolate(cutProgress, [0, 1], [0, 720]);

  // Real Term "CALL SPREAD" stamp entrance (frames 36-55)
  const stampProgress = getSpringProgress(frame, fps, 34, MotionPresets.snappy);
  const stampScale = interpolate(stampProgress, [0, 1], [1.25, 1]);
  const stampOpacity = interpolate(stampProgress, [0, 0.4, 1], [0, 1, 1]);

  // Phase 3: Binary Tension Split entrance (frames 50-85)
  const splitProgress = getSpringProgress(frame, fps, 50, MotionPresets.smooth);
  const splitY = interpolate(splitProgress, [0, 1], [50, 0]);
  const splitOpacity = interpolate(splitProgress, [0, 0.5, 1], [0, 1, 1]);

  // Shock pulse at cut frame
  const shockRing = interpolate(frame, [cutFrame + 5, cutFrame + 22], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

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
      {/* Micro-Push Drift */}
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
          {/* TOP SECTION: STRIKE REDACTION MECHANIC */}
          <div style={{ position: 'relative', height: 180 }}>
            {/* 1. Initial False Promise (Gets sliced) */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                opacity: frame < cutFrame + 8 ? illusionOpacity : Math.max(0, 1 - (frame - (cutFrame + 8)) * 0.15),
                transform: `scale(${interpolate(illusionProgress, [0, 1], [0.95, 1])})`,
                transformOrigin: 'left center',
              }}
            >
              <span
                style={{
                  fontFamily: OFurryTheme.typography.families.tech,
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#888888',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: 8,
                }}
              >
                PROMESSA COMERCIAL:
              </span>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <span
                  style={{
                    fontFamily: OFurryTheme.typography.families.hero,
                    fontSize: 75,
                    fontWeight: 900,
                    color: '#666666',
                    letterSpacing: '-1px',
                    textTransform: 'uppercase',
                  }}
                >
                  RETORNO TOTAL DA ALTA
                </span>
                {/* Horizontal Redaction Blade */}
                {frame >= cutFrame && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: 0,
                      width: strikeWidth,
                      height: 10,
                      backgroundColor: OFurryTheme.colors.highlightSolid,
                      transform: 'translateY(-50%)',
                      boxShadow: '0 0 20px rgba(255, 153, 0, 0.8)',
                    }}
                  />
                )}
              </div>
            </div>

            {/* 2. Brutal Reality Stamp (CALL SPREAD) */}
            {frame >= cutFrame + 6 && (
              <div
                style={{
                  position: 'absolute',
                  top: 10,
                  left: 0,
                  opacity: stampOpacity,
                  transform: `scale(${stampScale})`,
                  transformOrigin: 'left center',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
                  <div
                    style={{
                      backgroundColor: OFurryTheme.colors.highlightSolid,
                      color: OFurryTheme.colors.highlightText,
                      fontFamily: OFurryTheme.typography.families.tech,
                      fontSize: 14,
                      fontWeight: 900,
                      padding: '4px 12px',
                      letterSpacing: '2px',
                      borderRadius: 2,
                    }}
                  >
                    REGRA CONTRATUAL
                  </div>
                  <span
                    style={{
                      fontFamily: OFurryTheme.typography.families.tech,
                      fontSize: 14,
                      fontWeight: 700,
                      color: OFurryTheme.colors.highlightSolid,
                      letterSpacing: '2px',
                    }}
                  >
                    LIMITADOR REAL DE GANHO
                  </span>
                </div>

                <h1
                  style={{
                    margin: 0,
                    padding: 0,
                    fontFamily: OFurryTheme.typography.families.hero,
                    fontSize: 120,
                    fontWeight: 900,
                    lineHeight: 1.0,
                    letterSpacing: OFurryTheme.typography.letterSpacing.tight,
                    color: OFurryTheme.colors.primary,
                    textTransform: 'uppercase',
                  }}
                >
                  CALL SPREAD
                </h1>
              </div>
            )}
          </div>

          {/* CENTER SECTION: BINARY TENSION SPLIT (50 / 50 FORENSIC COMPARISON) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'stretch',
              justifyContent: 'space-between',
              borderTop: '2px solid #222222',
              borderBottom: '2px solid #222222',
              padding: '40px 0',
              opacity: splitOpacity,
              transform: `translate3d(0, ${splitY}px, 0)`,
            }}
          >
            {/* LEFT HALF: O ATIVO REAL NO MERCADO */}
            <div
              style={{
                width: '46%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                paddingLeft: 20,
              }}
            >
              <div
                style={{
                  fontFamily: OFurryTheme.typography.families.tech,
                  fontSize: 16,
                  fontWeight: 700,
                  letterSpacing: '2px',
                  color: '#777777',
                  marginBottom: 12,
                  textTransform: 'uppercase',
                }}
              >
                1. O QUE A AÇÃO SUBIU NO PERÍODO
              </div>
              <div
                style={{
                  fontFamily: OFurryTheme.typography.families.tech,
                  fontSize: 120,
                  fontWeight: 900,
                  lineHeight: 0.9,
                  letterSpacing: OFurryTheme.typography.letterSpacing.tight,
                  color: '#FFFFFF',
                  marginBottom: 16,
                }}
              >
                +54.8%
              </div>
              <div
                style={{
                  fontFamily: OFurryTheme.typography.families.body,
                  fontSize: 16,
                  fontWeight: 600,
                  color: '#666666',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                VALORIZAÇÃO REAL DO ATIVO DE REFERÊNCIA
              </div>
            </div>

            {/* VERTICAL DIVIDER HAIRLINE */}
            <div
              style={{
                width: 2,
                backgroundColor: '#282828',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: '#000000',
                  padding: '10px 4px',
                  fontFamily: OFurryTheme.typography.families.tech,
                  fontSize: 13,
                  fontWeight: 900,
                  color: '#666666',
                }}
              >
                VS
              </div>
            </div>

            {/* RIGHT HALF: O RETORNO QUE O INVESTIDOR RECEBE NO COE */}
            <div
              style={{
                width: '46%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                paddingLeft: 40,
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    backgroundColor: OFurryTheme.colors.highlightSolid,
                    color: OFurryTheme.colors.highlightText,
                    fontFamily: OFurryTheme.typography.families.hero,
                    fontSize: 14,
                    fontWeight: 900,
                    padding: '4px 12px',
                    letterSpacing: '1px',
                    borderRadius: 2,
                    textTransform: 'uppercase',
                  }}
                >
                  ⚠️ TETO CONTRATUAL
                </div>
                <span
                  style={{
                    fontFamily: OFurryTheme.typography.families.tech,
                    fontSize: 16,
                    fontWeight: 700,
                    letterSpacing: '2px',
                    color: OFurryTheme.colors.highlightSolid,
                    textTransform: 'uppercase',
                  }}
                >
                  2. O SEU GANHO NO COE
                </span>
              </div>

              {/* Locked Maximum Return */}
              <div
                style={{
                  fontFamily: OFurryTheme.typography.families.tech,
                  fontSize: 120,
                  fontWeight: 900,
                  lineHeight: 0.9,
                  letterSpacing: OFurryTheme.typography.letterSpacing.tight,
                  color: OFurryTheme.colors.highlightSolid,
                  marginBottom: 16,
                  textShadow: '0 0 30px rgba(255, 153, 0, 0.4)',
                }}
              >
                +12.0%
              </div>

              {/* Redaction Reveal Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                  backgroundColor: '#161616',
                  border: '1px solid rgba(255, 153, 0, 0.4)',
                  padding: '8px 16px',
                  borderRadius: 2,
                }}
              >
                <span
                  style={{
                    fontFamily: OFurryTheme.typography.families.tech,
                    fontSize: 15,
                    fontWeight: 800,
                    color: '#FFAE33',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                  }}
                >
                  42.8% DE GANHO NÃO REPASSADO
                </span>
              </div>
            </div>
          </div>

          {/* FOOTER BAR: FORENSIC TAKEAWAY */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 16,
              opacity: interpolate(frame, [60, 90], [0, 0.85]),
            }}
          >
            <span
              style={{
                fontFamily: OFurryTheme.typography.families.tech,
                fontSize: 14,
                color: '#777777',
                letterSpacing: '2px',
              }}
            >
              MECANISMO DE OPÇÕES // O BANCO FICA COM O EXCEDENTE
            </span>
            <span
              style={{
                fontFamily: OFurryTheme.typography.families.tech,
                fontSize: 14,
                color: OFurryTheme.colors.highlightSolid,
                fontWeight: 800,
                letterSpacing: '2px',
              }}
            >
              O ATIVO DECOLA. SEU LUCRO FICA PRESO NO TETO.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const tetoCallSpreadScene: BespokeScene = {
  id: 'teto-call-spread',
  name: 'Call Spread (Strike Redaction)',
  durationInFrames: 240, // 8.0 segundos cravados a 30fps
  component: TetoCallSpreadComponent,
};
