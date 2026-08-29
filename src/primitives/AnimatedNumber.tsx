import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { OFurryTheme } from '../theme/ofurry';
import { MotionPresets, getAmbientDrift, getSpringProgress, getGlowPulse } from '../theme/motion';

export interface AnimatedNumberProps {
  value: number;
  startValue?: number;
  prefix?: string;
  suffix?: string;
  label?: string;
  decimals?: number;
  durationInFrames?: number;
  delay?: number;
  variant?: 'hero' | 'badge' | 'card';
  highlightColor?: string;
  style?: React.CSSProperties;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  startValue = 0,
  prefix = '',
  suffix = '',
  label,
  decimals = 0,
  durationInFrames = 25,
  delay = 0,
  variant = 'hero',
  highlightColor = OFurryTheme.colors.accentOrange,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Ambient layer: gentle breathing
  const ambient = getAmbientDrift(frame, {
    amplitudeY: 2.0,
    amplitudeRotate: 0.3,
    periodFrames: 65,
  });

  // Primary: Entry container spring
  const entryProgress = getSpringProgress(frame, fps, delay, MotionPresets.snappy);
  const containerScale = interpolate(entryProgress, [0, 1], [0.7, 1]);
  const containerOpacity = interpolate(entryProgress, [0, 0.5, 1], [0, 0.9, 1]);

  // Number counting interpolation (fast exponential ease-out)
  const countProgress = interpolate(
    frame,
    [delay, delay + durationInFrames],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: (t) => 1 - Math.pow(1 - t, 4), // Quartic ease-out for rapid roll + precise stop
    }
  );

  const currentNumber = startValue + (value - startValue) * countProgress;
  const formattedNumber = currentNumber.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  const isHero = variant === 'hero';
  const isCard = variant === 'card';

  const glowOpacity = getGlowPulse(frame, 40, 0.3, 0.7);

  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isCard ? '24px 36px' : isHero ? '16px 28px' : '10px 20px',
        backgroundColor: isCard ? OFurryTheme.colors.surfaceElevated : 'transparent',
        borderRadius: isCard ? '20px' : '12px',
        border: isCard ? `1px solid ${OFurryTheme.colors.borderLight}` : 'none',
        boxShadow: isCard ? OFurryTheme.effects.cardGlow : undefined,
        transform: `translateY(${ambient.translateY}px) scale(${containerScale * ambient.scale})`,
        opacity: containerOpacity,
        fontFamily: OFurryTheme.typography.fontFamily,
        ...style,
      }}
    >
      {/* Top / Label */}
      {label && (
        <span
          style={{
            fontSize: isHero ? '20px' : '15px',
            fontWeight: OFurryTheme.typography.weights.semiBold,
            color: OFurryTheme.colors.secondary,
            textTransform: 'uppercase',
            letterSpacing: OFurryTheme.typography.letterSpacing.widest,
            marginBottom: '8px',
          }}
        >
          {label}
        </span>
      )}

      {/* Main Counter Display */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '4px',
        }}
      >
        {prefix && (
          <span
            style={{
              fontSize: isHero ? `${OFurryTheme.typography.sizes.title}px` : '32px',
              fontWeight: OFurryTheme.typography.weights.bold,
              color: highlightColor,
              textShadow: `0 0 20px ${OFurryTheme.colors.accentOrangeAlpha(glowOpacity)}`,
            }}
          >
            {prefix}
          </span>
        )}

        <span
          style={{
            fontSize: isHero
              ? `${OFurryTheme.typography.sizes.numberHero}px`
              : isCard
              ? `${OFurryTheme.typography.sizes.title}px`
              : `${OFurryTheme.typography.sizes.subtitle}px`,
            fontWeight: OFurryTheme.typography.weights.black,
            color: OFurryTheme.colors.primary,
            lineHeight: 1,
            letterSpacing: OFurryTheme.typography.letterSpacing.tight,
            textShadow: isHero ? `0 0 30px ${OFurryTheme.colors.accentOrangeAlpha(0.35)}` : 'none',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {formattedNumber}
        </span>

        {suffix && (
          <span
            style={{
              fontSize: isHero ? `${OFurryTheme.typography.sizes.title}px` : '32px',
              fontWeight: OFurryTheme.typography.weights.extraBold,
              color: highlightColor,
              textShadow: `0 0 20px ${OFurryTheme.colors.accentOrangeAlpha(glowOpacity)}`,
              marginLeft: '4px',
            }}
          >
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
};
