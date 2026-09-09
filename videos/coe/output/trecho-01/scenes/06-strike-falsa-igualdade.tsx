import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { OFurryTheme } from '../../../../../src/theme/ofurry';
import { MotionPresets, getSpringProgress, getAmbientDrift } from '../../../../../src/theme/motion';
import { BespokeScene } from '../../../../../src/videos/types';

export const StrikeFalsaIgualdadeComponent: React.FC<{ transparent?: boolean }> = ({ transparent = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Ambient micro-drift (anti-wobble: amplitudeRotate: 0)
  const ambient = getAmbientDrift(frame, {
    amplitudeY: 0.7,
    amplitudeX: 0.35,
    amplitudeRotate: 0,
    periodFrames: 90,
  });

  // Phase 1: Entrada do texto ingênuo "MESMO GANHO" (frames 0-20)
  const falseTextSpring = getSpringProgress(frame, fps, 0, MotionPresets.snappy);
  const falseTextY = interpolate(falseTextSpring, [0, 1], [60, 0]);
  const falseTextOpacity = interpolate(falseTextSpring, [0, 0.4, 1], [0, 1, 1]);

  // Phase 2: STRIKE REDACTION CUT (Guilhotina a laser no frame 24)
  const cutFrame = 24;
  const cutProgress = interpolate(frame, [cutFrame, cutFrame + 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const strikeWidth = interpolate(cutProgress, [0, 1], [0, 850]);

  // Phase 3: Estampa ILUSÃO (frames 30-50)
  const stampSpring = getSpringProgress(frame, fps, 28, MotionPresets.snappy);
  const stampScale = interpolate(stampSpring, [0, 1], [1.3, 1]);
  const stampOpacity = interpolate(stampSpring, [0, 0.3, 1], [0, 1, 1]);

  // Shock pulse no momento do corte
  const shockProgress = interpolate(frame, [cutFrame + 2, cutFrame + 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shockScale = interpolate(shockProgress, [0, 1], [0.8, 1.4]);
  const shockOpacity = interpolate(shockProgress, [0, 0.3, 1], [0.8, 0.5, 0]);

  // Micro-pulsação contínua (anti-freeze)
  const pulseLoop = 1 + Math.sin((frame / 26) * Math.PI) * 0.012;

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
          {/* CONTEXT BADGE */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 36,
              opacity: falseTextOpacity,
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
              FALSA PREMISSA // ARMADILHA COGNITIVA
            </span>
          </div>

          {/* PALAVRA ALVO DO STRIKE REDACTION */}
          <div
            style={{
              position: 'relative',
              display: 'inline-block',
              transform: `scale(${pulseLoop})`,
            }}
          >
            {/* Texto Promessa */}
            <h1
              style={{
                margin: 0,
                padding: '0 20px',
                fontFamily: OFurryTheme.typography.families.condensed,
                fontSize: 160,
                lineHeight: 0.9,
                letterSpacing: '4px',
                textTransform: 'uppercase',
                color: frame >= cutFrame + 8 ? '#666666' : OFurryTheme.colors.primary,
                opacity: falseTextOpacity,
                transform: `translateY(${falseTextY}px)`,
                transition: 'color 0.2s ease',
              }}
            >
              MESMO GANHO?
            </h1>

            {/* BARRA DE CORTE (STRIKE LINE GUILHOTINA) */}
            <div
              style={{
                position: 'absolute',
                top: '52%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: strikeWidth,
                height: 8,
                backgroundColor: OFurryTheme.colors.highlightSolid,
                boxShadow: '0 0 25px rgba(255, 153, 0, 0.8)',
                zIndex: 2,
              }}
            />

            {/* Shockwave ring no momento do corte */}
            {frame >= cutFrame && frame <= cutFrame + 18 && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) scale(${shockScale})`,
                  width: 500,
                  height: 120,
                  border: `2px solid ${OFurryTheme.colors.highlightSolid}`,
                  opacity: shockOpacity,
                  pointerEvents: 'none',
                }}
              />
            )}
          </div>

          {/* REALITY STAMP: ILUSÃO */}
          <div
            style={{
              marginTop: 28,
              opacity: stampOpacity,
              transform: `scale(${stampScale})`,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 16,
              backgroundColor: OFurryTheme.colors.highlightSolid,
              color: OFurryTheme.colors.highlightText,
              padding: '14px 44px',
              fontWeight: 900,
              letterSpacing: '4px',
              fontSize: 32,
              fontFamily: OFurryTheme.typography.families.hero,
              textTransform: 'uppercase',
              boxShadow: '0 10px 40px rgba(255, 153, 0, 0.4)',
            }}
          >
            <span>ILUSÃO</span>
          </div>

          {/* FOOTER TAKEAWAY */}
          <div
            style={{
              marginTop: 44,
              opacity: interpolate(frame, [38, 58], [0, 0.85]),
              fontFamily: OFurryTheme.typography.families.tech,
              fontSize: 15,
              color: OFurryTheme.colors.secondary,
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            O ATIVO SOBE 100%. VOCÊ NUNCA LEVA 100%.
          </div>
        </div>
      </div>
    </div>
  );
};

export const strikeFalsaIgualdadeScene: BespokeScene = {
  id: 'strike-falsa-igualdade',
  name: 'Falsa Igualdade (Strike Redaction)',
  durationInFrames: 120, // 4.0 segundos cravados a 30fps
  component: StrikeFalsaIgualdadeComponent,
};
