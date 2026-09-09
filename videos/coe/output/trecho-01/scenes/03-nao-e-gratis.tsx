import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { OFurryTheme } from '../../../../../src/theme/ofurry';
import { MotionPresets, getSpringProgress, getAmbientDrift } from '../../../../../src/theme/motion';
import { BespokeScene } from '../../../../../src/videos/types';

export const NaoEGratisComponent: React.FC<{ transparent?: boolean }> = ({ transparent = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Ambient micro-drift (anti-wobble: amplitudeRotate: 0)
  const ambient = getAmbientDrift(frame, {
    amplitudeY: 0.8,
    amplitudeX: 0.4,
    amplitudeRotate: 0,
    periodFrames: 90,
  });

  // Entrance 1: Mask Reveal da linha de base para o Título Monumental (frames 0-22)
  const heroSpring = getSpringProgress(frame, fps, 0, MotionPresets.snappy);
  const heroY = interpolate(heroSpring, [0, 1], [130, 0]);
  const heroOpacity = interpolate(heroSpring, [0, 0.3, 1], [0, 1, 1]);

  // Entrance 2: Badge sólido neon laranja #FF9900 (frames 10-30)
  const badgeSpring = getSpringProgress(frame, fps, 10, MotionPresets.snappy);
  const badgeScale = interpolate(badgeSpring, [0, 1], [0.85, 1]);
  const badgeOpacity = interpolate(badgeSpring, [0, 0.4, 1], [0, 1, 1]);

  // Entrance 3: Hairline técnica de corte e ancoragem (frames 18-45)
  const lineProgress = interpolate(frame, [18, 42], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const lineWidth = interpolate(lineProgress, [0, 1], [0, 880]);

  // Fluidez contínua na timeline (anti-freeze)
  const pulseScale = 1 + Math.sin((frame / 30) * Math.PI) * 0.015;
  const shimmerPos = (frame * 12) % 1200;

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
      {/* Camada de Micro-Drift Ambiente */}
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
          {/* TOP CONTEXT PRECISION TAG */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 32,
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
                color: OFurryTheme.colors.secondary,
                textTransform: 'uppercase',
              }}
            >
              CUSTOS OPERACIONAIS // REGRA DE MERCADO
            </span>
          </div>

          {/* MONUMENTAL HERO: MASK REVEAL (OVERFLOW HIDDEN) */}
          <div
            style={{
              overflow: 'hidden',
              paddingBottom: 16,
              maxWidth: '92%',
            }}
          >
            <h1
              style={{
                margin: 0,
                padding: 0,
                fontFamily: OFurryTheme.typography.families.hero,
                fontSize: 140,
                lineHeight: 0.95,
                letterSpacing: '-3px',
                textTransform: 'uppercase',
                color: OFurryTheme.colors.primary,
                transform: `translateY(${heroY}px) scale(${pulseScale})`,
                opacity: heroOpacity,
                display: 'inline-block',
              }}
            >
              NÃO É GRÁTIS
            </h1>
          </div>

          {/* SOLID NEON ORANGE BADGE (ANTI-AI SLOP: #FF9900 COM TEXTO #000000) */}
          <div
            style={{
              marginTop: 24,
              opacity: badgeOpacity,
              transform: `scale(${badgeScale})`,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 14,
              backgroundColor: OFurryTheme.colors.highlightSolid,
              color: OFurryTheme.colors.highlightText,
              padding: '12px 32px',
              fontWeight: 900,
              letterSpacing: '3px',
              fontSize: 26,
              fontFamily: OFurryTheme.typography.families.hero,
              textTransform: 'uppercase',
              boxShadow: '0 8px 30px rgba(255, 153, 0, 0.35)',
            }}
          >
            <span>CUSTO EMBUTIDO</span>
          </div>

          {/* HAIRLINE TÉCNICA DE 1PX ANCORADA */}
          <div
            style={{
              marginTop: 40,
              width: lineWidth,
              maxWidth: '85%',
              height: 1,
              backgroundColor: OFurryTheme.colors.borderLight,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Shimmer de luz contínua na linha */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: shimmerPos - 200,
                width: 160,
                background: `linear-gradient(90deg, transparent, ${OFurryTheme.colors.highlightSolid}, transparent)`,
              }}
            />
          </div>

          {/* SUB-FOOTER TECHNICAL DATA */}
          <div
            style={{
              marginTop: 20,
              opacity: interpolate(frame, [30, 50], [0, 0.8]),
              fontFamily: OFurryTheme.typography.families.tech,
              fontSize: 15,
              color: OFurryTheme.colors.secondary,
              letterSpacing: '2px',
            }}
          >
            EXISTE REMUNERAÇÃO EM CADA ETAPA
          </div>
        </div>
      </div>
    </div>
  );
};

export const naoEGratisScene: BespokeScene = {
  id: 'nao-e-gratis',
  name: 'Não É Grátis (Monumental Punch)',
  durationInFrames: 105, // 3.5 segundos cravados a 30fps
  component: NaoEGratisComponent,
};
