import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { OFurryTheme } from '../theme/ofurry';
import { MotionPresets, getAmbientDrift, getSpringProgress, getStaggerDelay } from '../theme/motion';

export interface TextRevealProps {
  text: string;
  subtitle?: string;
  variant?: 'hero' | 'title' | 'subtitle' | 'badge';
  highlightWords?: string[];
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
  align = 'center',
  delay = 0,
  glow = false,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Ambient layer: subtle continuous drift
  const ambient = getAmbientDrift(frame, {
    amplitudeY: 2.0,
    amplitudeRotate: 0.2,
    periodFrames: 70,
  });

  const words = text.split(' ');
  const normalizedHighlights = highlightWords.map((w) => w.toLowerCase());

  // Variant styles
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

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'center' ? 'center' : align === 'left' ? 'flex-start' : 'flex-end',
        textAlign: align,
        transform: `translateY(${ambient.translateY}px) rotate(${ambient.rotate}deg)`,
        fontFamily: OFurryTheme.typography.fontFamily,
        maxWidth: '100%',
        ...style,
      }}
    >
      {/* Primary Words Container */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: align === 'center' ? 'center' : align === 'left' ? 'flex-start' : 'flex-end',
          gap: variant === 'hero' ? '18px' : '14px',
          rowGap: '8px',
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

          const wordColor = isHighlighted ? OFurryTheme.colors.accentOrange : OFurryTheme.colors.primary;
          const wordGlow =
            isHighlighted || glow
              ? `0 0 25px ${OFurryTheme.colors.accentOrangeAlpha(0.5)}`
              : 'none';

          return (
            <span
              key={index}
              style={{
                display: 'inline-block',
                fontSize: `${fontSize}px`,
                fontWeight,
                color: wordColor,
                lineHeight: OFurryTheme.typography.lineHeights.tight,
                letterSpacing: OFurryTheme.typography.letterSpacing.snug,
                textShadow: wordGlow,
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

      {/* Secondary Subtitle / Meta */}
      {subtitle && (
        <div
          style={{
            marginTop: '16px',
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
