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

  // Ambient layer: gentle breathing (zero frozen frame)
  const ambient = getAmbientDrift(frame, {
    amplitudeY: 2.0,
    amplitudeRotate: 0.2,
    periodFrames: 65,
  });

  // Primary: Entry container spring
  const entryProgress = getSpringProgress(frame, fps, delay, MotionPresets.snappy);
  const containerScale = interpolate(entryProgress, [0, 1], [0.75, 1]);
  const containerOpacity = interpolate(entryProgress, [0, 0.5, 1], [0, 0.95, 1]);

  // Number counting interpolation (fast quartic ease-out for rapid roll + crisp snap)
  const countProgress = interpolate(
    frame,
    [delay, delay + durationInFrames],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: (t) => 1 - Math.pow(1 - t, 4),
    }
  );

  const currentNumber = startValue + (value - startValue) * countProgress;
  const formattedNumber = currentNumber.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  const isHero = variant === 'hero';
  const isCard = variant === 'card';
  const isBadge = variant === 'badge';

  const glowOpacity = getGlowPulse(frame, 40, 0.4, 0.85);

  const numberFontSize = isHero
    ? OFurryTheme.typography.sizes.numberHero
    : isCard
    ? OFurryTheme.typography.sizes.numberCard
    : OFurryTheme.typography.sizes.numberBadge;

  const symbolFontSize = isHero ? 72 : isCard ? 48 : 28;

  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isBadge ? '6px 18px' : '0px',
        backgroundColor: isBadge ? OFurryTheme.colors.accentOrangeAlpha(0.12) : 'transparent',
        borderRadius: isBadge ? '4px' : '0px',
        border: isBadge ? `1px solid ${OFurryTheme.colors.accentOrangeAlpha(0.4)}` : 'none',
        boxShadow: isBadge ? OFurryTheme.effects.glowOrange : undefined,
        transform: `translateY(${ambient.translateY}px) scale(${containerScale * ambient.scale})`,
        opacity: containerOpacity,
        fontFamily: OFurryTheme.typography.families.tech,
        ...style,
      }}
    >
      {/* Top Technical Micro-Label */}
      {label && (
        <span
          style={{
            fontFamily: OFurryTheme.typography.families.tech,
            fontSize: isHero ? '20px' : '14px',
            fontWeight: OFurryTheme.typography.weights.bold,
            color: OFurryTheme.colors.secondary,
            textTransform: 'uppercase',
            letterSpacing: OFurryTheme.typography.letterSpacing.widest,
            marginBottom: isHero ? '12px' : '6px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{ color: highlightColor, opacity: 0.8 }}>//</span>
          {label}
        </span>
      )}

      {/* Main Monumental Counter Display */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'center',
          gap: '6px',
        }}
      >
        {prefix && (
          <span
            style={{
              fontFamily: OFurryTheme.typography.families.tech,
              fontSize: `${symbolFontSize}px`,
              fontWeight: OFurryTheme.typography.weights.bold,
              color: highlightColor,
              textShadow: `0 0 24px ${OFurryTheme.colors.accentOrangeAlpha(glowOpacity)}`,
            }}
          >
            {prefix}
          </span>
        )}

        <span
          style={{
            fontFamily: OFurryTheme.typography.families.tech,
            fontSize: `${numberFontSize}px`,
            fontWeight: OFurryTheme.typography.weights.black,
            color: OFurryTheme.colors.primary,
            lineHeight: OFurryTheme.typography.lineHeights.none,
            letterSpacing: OFurryTheme.typography.letterSpacing.tight,
            textShadow: isHero ? `0 0 35px ${OFurryTheme.colors.accentOrangeAlpha(0.4)}` : 'none',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {formattedNumber}
        </span>

        {suffix && (
          <span
            style={{
              fontFamily: OFurryTheme.typography.families.tech,
              fontSize: `${symbolFontSize}px`,
              fontWeight: OFurryTheme.typography.weights.extraBold,
              color: highlightColor,
              textShadow: `0 0 24px ${OFurryTheme.colors.accentOrangeAlpha(glowOpacity)}`,
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

