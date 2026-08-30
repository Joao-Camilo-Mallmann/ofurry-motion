import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { OFurryTheme } from '../theme/ofurry';
import { MotionPresets, getAmbientDrift, getSpringProgress, getStaggerDelay } from '../theme/motion';

export interface TextRevealProps {
  text: string;
  subtitle?: string;
  variant?: 'hero' | 'title' | 'subtitle' | 'badge';
  highlightWords?: string[];
  font?: 'archivo' | 'bebas' | 'syne' | 'space-grotesk' | 'jakarta' | 'montserrat';
  align?: 'center' | 'left' | 'right';
  delay?: number;
  glow?: boolean;
  style?: React.CSSProperties;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  subtitle,
  variant = 'title',
  highlightWords = [],
  font,
  align = 'center',
  delay = 0,
  glow = false,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Ambient layer: subtle continuous drift (zero frozen frame)
  const ambient = getAmbientDrift(frame, {
    amplitudeY: 2.0,
    amplitudeRotate: 0.2,
    periodFrames: 70,
  });

  const words = text.split(' ');
  const normalizedHighlights = highlightWords.map((w) => w.toLowerCase().trim());

  // Determine font family by prop or variant
  const selectedFontFamily = (() => {
    if (font === 'archivo') return OFurryTheme.typography.families.hero;
    if (font === 'bebas') return OFurryTheme.typography.families.condensed;
    if (font === 'syne') return OFurryTheme.typography.families.conceptual;
    if (font === 'space-grotesk') return OFurryTheme.typography.families.tech;
    if (font === 'jakarta') return OFurryTheme.typography.families.body;
    if (font === 'montserrat') return OFurryTheme.typography.families.montserrat;
    
    // Default by variant
    if (variant === 'hero') return OFurryTheme.typography.families.hero;
    if (variant === 'title') return OFurryTheme.typography.families.hero;
    if (variant === 'badge') return OFurryTheme.typography.families.tech;
    return OFurryTheme.typography.families.body;
  })();

  // Variant scales
  const fontSize =
    variant === 'hero'
      ? OFurryTheme.typography.sizes.hero
      : variant === 'title'
      ? OFurryTheme.typography.sizes.title
      : variant === 'badge'
      ? OFurryTheme.typography.sizes.badge
      : OFurryTheme.typography.sizes.subtitle;

  const fontWeight =
    variant === 'hero'
      ? OFurryTheme.typography.weights.black
      : variant === 'title'
      ? OFurryTheme.typography.weights.extraBold
      : variant === 'badge'
      ? OFurryTheme.typography.weights.bold
      : OFurryTheme.typography.weights.semiBold;

  const letterSpacing =
    variant === 'hero'
      ? OFurryTheme.typography.letterSpacing.tight
      : variant === 'badge'
      ? OFurryTheme.typography.letterSpacing.widest
      : OFurryTheme.typography.letterSpacing.snug;

  const isBadge = variant === 'badge';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'center' ? 'center' : align === 'left' ? 'flex-start' : 'flex-end',
        textAlign: align,
        transform: `translateY(${ambient.translateY}px) rotate(${ambient.rotate}deg)`,
        maxWidth: '100%',
        ...style,
      }}
    >
      {/* Primary Words Container */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: align === 'center' ? 'center' : align === 'left' ? 'flex-start' : 'flex-end',
          gap: variant === 'hero' ? '20px' : '14px',
          rowGap: variant === 'hero' ? '14px' : '10px',
        }}
      >
        {words.map((word, index) => {
          const wordDelay = delay + getStaggerDelay(index, 3);
          const progress = getSpringProgress(frame, fps, wordDelay, MotionPresets.snappy);

          const translateY = interpolate(progress, [0, 1], [40, 0]);
          const opacity = interpolate(progress, [0, 0.7, 1], [0, 0.9, 1]);
          const scale = interpolate(progress, [0, 1], [0.92, 1]);

          const cleanWord = word.replace(/[^a-zA-Z0-9À-ÿ]/g, '').toLowerCase();
          const isHighlighted =
            normalizedHighlights.includes(cleanWord) ||
            (highlightWords.length === 0 && index === words.length - 1 && words.length > 2);

          return (
            <span
              key={index}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: selectedFontFamily,
                fontSize: `${fontSize}px`,
                fontWeight,
                lineHeight: OFurryTheme.typography.lineHeights.none,
                letterSpacing,
                textTransform: isBadge ? 'uppercase' : undefined,
                color: isHighlighted ? OFurryTheme.colors.highlightText : OFurryTheme.colors.primary,
                backgroundColor: isHighlighted ? OFurryTheme.colors.highlightSolid : 'transparent',
                padding: isHighlighted
                  ? variant === 'hero'
                    ? '4px 18px'
                    : '2px 14px'
                  : '0px',
                borderRadius: isHighlighted ? '8px' : '0px',
                boxShadow: isHighlighted ? OFurryTheme.effects.solidBadgeShadow : undefined,
                textShadow: !isHighlighted && glow
                  ? `0 0 30px ${OFurryTheme.colors.accentOrangeAlpha(0.6)}`
                  : 'none',
                opacity,
                transform: `translateY(${translateY}px) scale(${scale})`,
                willChange: 'transform, opacity',
              }}
            >
              {word}
            </span>
          );
        })}
      </div>

      {/* Secondary Subtitle / Editorial Meta */}
      {subtitle && (
        <div
          style={{
            marginTop: variant === 'hero' ? '24px' : '16px',
            fontFamily: OFurryTheme.typography.families.body,
            fontSize: `${OFurryTheme.typography.sizes.body}px`,
            fontWeight: OFurryTheme.typography.weights.medium,
            color: OFurryTheme.colors.secondary,
            letterSpacing: OFurryTheme.typography.letterSpacing.wide,
            opacity: interpolate(
              getSpringProgress(frame, fps, delay + words.length * 3 + 4, MotionPresets.smooth),
              [0, 1],
              [0, 0.9]
            ),
            transform: `translateY(${interpolate(
              getSpringProgress(frame, fps, delay + words.length * 3 + 4, MotionPresets.smooth),
              [0, 1],
              [20, 0]
            )}px)`,
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
};
