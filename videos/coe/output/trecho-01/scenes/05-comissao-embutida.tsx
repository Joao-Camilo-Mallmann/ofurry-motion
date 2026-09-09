import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { OFurryTheme } from '../../../../../src/theme/ofurry';
import { MotionPresets, getSpringProgress, getAmbientDrift } from '../../../../../src/theme/motion';
import { BespokeScene } from '../../../../../src/videos/types';

export const ComissaoEmbutidaComponent: React.FC<{ transparent?: boolean }> = ({ transparent = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Ambient micro-drift (anti-wobble: amplitudeRotate: 0)
  const ambient = getAmbientDrift(frame, {
    amplitudeY: 0.7,
    amplitudeX: 0.35,
    amplitudeRotate: 0,
    periodFrames: 90,
  });

  // Entrance 1: Palavra Hero COMISSÃO em Space Grotesk monumental (frames 0-20)
  const heroSpring = getSpringProgress(frame, fps, 0, MotionPresets.snappy);
  const heroScale = interpolate(heroSpring, [0, 1], [0.88, 1]);
  const heroOpacity = interpolate(heroSpring, [0, 0.4, 1], [0, 1, 1]);

  // Entrance 2: Carimbo sólido neon "ENTRA NA CONTA" (frames 12-30)
  const stampSpring = getSpringProgress(frame, fps, 12, MotionPresets.snappy);
  const stampY = interpolate(stampSpring, [0, 1], [35, 0]);
  const stampOpacity = interpolate(stampSpring, [0, 0.3, 1], [0, 1, 1]);

  // Linha líder técnica conectada à margem (frames 22-45)
  const leadLineProgress = interpolate(frame, [22, 45], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const leadLineWidth = interpolate(leadLineProgress, [0, 1], [0, 520]);

  // Micro-pulsação contínua ao longo de toda a timeline (anti-freeze)
  const pulseMetric = 1 + Math.sin((frame / 28) * Math.PI) * 0.015;
  const dotPulse = 0.5 + Math.sin((frame / 15) * Math.PI) * 0.5;

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
            textAlign: 'center',
          }}
        >
          {/* TOP TAG */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 36,
              opacity: heroOpacity,
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
              REMUNERAÇÃO ESTRUTURADA // PEDÁGIO INVISÍVEL
            </span>
          </div>

          {/* MONUMENTAL METRIC AUTHORITY */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              opacity: heroOpacity,
              transform: `scale(${heroScale * pulseMetric})`,
            }}
          >
            <span
              style={{
                fontFamily: OFurryTheme.typography.families.tech,
                fontSize: 135,
                fontWeight: 900,
                letterSpacing: '-3px',
                color: OFurryTheme.colors.primary,
                lineHeight: 0.95,
                textTransform: 'uppercase',
              }}
            >
              COMISSÃO
            </span>
          </div>

          {/* SOLID NEON ORANGE STAMP: ENTRA NA CONTA */}
          <div
            style={{
              marginTop: 20,
              opacity: stampOpacity,
              transform: `translateY(${stampY}px)`,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              backgroundColor: OFurryTheme.colors.highlightSolid,
              color: OFurryTheme.colors.highlightText,
              padding: '12px 36px',
              fontWeight: 900,
              letterSpacing: '3px',
              fontSize: 26,
              fontFamily: OFurryTheme.typography.families.hero,
              textTransform: 'uppercase',
              boxShadow: '0 8px 30px rgba(255, 153, 0, 0.35)',
            }}
          >
            <span>ENTRA NA CONTA</span>
          </div>

          {/* ANCHORED CONNECTOR & DEDUCTION TAKEAWAY */}
          <div
            style={{
              marginTop: 40,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <div
              style={{
                width: leadLineWidth,
                maxWidth: '65%',
                height: 1,
                backgroundColor: OFurryTheme.colors.borderLight,
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: -3,
                  width: 7,
                  height: 7,
                  backgroundColor: OFurryTheme.colors.highlightSolid,
                  borderRadius: '50%',
                  opacity: dotPulse,
                }}
              />
            </div>

            <span
              style={{
                marginTop: 20,
                opacity: interpolate(frame, [30, 52], [0, 0.85]),
                fontFamily: OFurryTheme.typography.families.tech,
                fontSize: 15,
                color: OFurryTheme.colors.secondary,
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              O BANCO NÃO TRABALHA DE GRAÇA. VOCÊ PAGA PELA ESTRUTURA.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const comissaoEmbutidaScene: BespokeScene = {
  id: 'comissao-embutida',
  name: 'Comissão Embutida (Metric Authority)',
  durationInFrames: 105, // 3.5 segundos cravados a 30fps
  component: ComissaoEmbutidaComponent,
};
