import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { OFurryTheme } from '../../../src/theme/ofurry';
import { MotionPresets, getSpringProgress, getAmbientDrift } from '../../../src/theme/motion';
import { BespokeScene } from '../../../src/videos/types';

export const AltaDiretaComponent: React.FC<{ transparent?: boolean }> = ({ transparent = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Ambient micro-drift (anti-wobble: amplitudeRotate: 0)
  const ambient = getAmbientDrift(frame, {
    amplitudeY: 0.8,
    amplitudeX: 0.4,
    amplitudeRotate: 0,
    periodFrames: 90,
  });

  // Entrance spring for Monumental Hero (frames 0-20)
  const heroSpring = getSpringProgress(frame, fps, 0, MotionPresets.snappy);
  const heroY = interpolate(heroSpring, [0, 1], [110, 0]);
  const heroOpacity = interpolate(heroSpring, [0, 0.4, 1], [0, 1, 1]);

  // Entrance spring for neon badge (frames 10-30)
  const badgeSpring = getSpringProgress(frame, fps, 10, MotionPresets.snappy);
  const badgeScale = interpolate(badgeSpring, [0, 1], [0.8, 1]);
  const badgeOpacity = interpolate(badgeSpring, [0, 0.5, 1], [0, 1, 1]);

  // Metric spring (frames 20-55)
  const metricSpring = getSpringProgress(frame, fps, 20, MotionPresets.snappy);
  const metricVal = interpolate(metricSpring, [0, 1], [0, 54.8]);

  // Ticker belt continuous slide (0 frozen frames)
  const tickerOffset = (frame * 1.5) % 800;

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
      {/* Micro-Push Subtle Ambient Drift */}
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
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {/* TOP CONTEXT TAG */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              opacity: badgeOpacity,
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
                color: OFurryTheme.colors.highlightSolid,
                textTransform: 'uppercase',
              }}
            >
              INVESTIMENTO DIRETO // SEM AMARRAS
            </span>
            <div
              style={{
                width: 8,
                height: 8,
                backgroundColor: OFurryTheme.colors.highlightSolid,
                borderRadius: 2,
              }}
            />
          </div>

          {/* CENTER STACK: MONUMENTAL TYPOGRAPHY & COLOSSAL METRIC */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 20,
              width: '100%',
            }}
          >
            {/* Monumental Hero Title with Mask Reveal */}
            <div style={{ overflow: 'hidden', height: 160 }}>
              <h1
                style={{
                  margin: 0,
                  padding: 0,
                  fontFamily: OFurryTheme.typography.families.hero,
                  fontSize: 145,
                  fontWeight: 900,
                  lineHeight: 1.0,
                  letterSpacing: OFurryTheme.typography.letterSpacing.tight,
                  color: OFurryTheme.colors.primary,
                  transform: `translate3d(0, ${heroY}px, 0)`,
                  opacity: heroOpacity,
                  textTransform: 'uppercase',
                  textShadow: '0 10px 40px rgba(0,0,0,0.8)',
                }}
              >
                AÇÃO DIRETA
              </h1>
            </div>

            {/* Solid Neon Highlight Punch Badge */}
            <div
              style={{
                backgroundColor: OFurryTheme.colors.highlightSolid,
                padding: '12px 36px',
                borderRadius: 3,
                transform: `scale(${badgeScale})`,
                opacity: badgeOpacity,
                boxShadow: OFurryTheme.effects.solidBadgeShadow,
              }}
            >
              <span
                style={{
                  fontFamily: OFurryTheme.typography.families.hero,
                  fontSize: 28,
                  fontWeight: 900,
                  color: OFurryTheme.colors.highlightText,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                }}
              >
                100% DO GANHO É SEU
              </span>
            </div>

            {/* Colossal Center Percentage */}
            <div
              style={{
                fontFamily: OFurryTheme.typography.families.tech,
                fontSize: 210,
                fontWeight: 900,
                lineHeight: 0.85,
                letterSpacing: OFurryTheme.typography.letterSpacing.tight,
                color: OFurryTheme.colors.primary,
                marginTop: 10,
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <span style={{ color: OFurryTheme.colors.highlightSolid }}>▲</span>
              <span>+{metricVal.toFixed(1)}%</span>
            </div>

            <div
              style={{
                fontFamily: OFurryTheme.typography.families.body,
                fontSize: 20,
                fontWeight: 600,
                color: OFurryTheme.colors.secondary,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                opacity: interpolate(metricSpring, [0.4, 1], [0, 0.9]),
              }}
            >
              ALTA INTEGRAL REPASSADA À SUA CONTA
            </div>
          </div>

          {/* FOOTER TICKER STRIP (Kinetic Velocity Indicator, Zero Frozen Frames) */}
          <div
            style={{
              width: '100%',
              maxWidth: 1200,
              borderTop: '1px solid #282828',
              borderBottom: '1px solid #282828',
              padding: '14px 0',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              opacity: interpolate(frame, [25, 45], [0, 0.85]),
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                gap: 48,
                transform: `translateX(-${tickerOffset}px)`,
                fontFamily: OFurryTheme.typography.families.tech,
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: '2px',
                color: '#888888',
                textTransform: 'uppercase',
              }}
            >
              <span>▲ SEM TETO DE RENTABILIDADE</span>
              <span style={{ color: OFurryTheme.colors.highlightSolid }}>•</span>
              <span>▲ VALORIZAÇÃO PURA DE MERCADO</span>
              <span style={{ color: OFurryTheme.colors.highlightSolid }}>•</span>
              <span>▲ SEM DERIVATIVOS EMBUTIDOS</span>
              <span style={{ color: OFurryTheme.colors.highlightSolid }}>•</span>
              <span>▲ CUSTÓDIA DIRETA EM SEU NOME</span>
              <span style={{ color: OFurryTheme.colors.highlightSolid }}>•</span>
              <span>▲ SEM TETO DE RENTABILIDADE</span>
              <span style={{ color: OFurryTheme.colors.highlightSolid }}>•</span>
              <span>▲ VALORIZAÇÃO PURA DE MERCADO</span>
              <span style={{ color: OFurryTheme.colors.highlightSolid }}>•</span>
              <span>▲ SEM DERIVATIVOS EMBUTIDOS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const altaDiretaScene: BespokeScene = {
  id: 'alta-direta',
  name: 'Ação Direta (Alta Monumental)',
  durationInFrames: 210, // 7.0 segundos cravados a 30fps
  component: AltaDiretaComponent,
};
