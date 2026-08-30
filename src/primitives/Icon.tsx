import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import * as LucideIcons from 'lucide-react';
import { OFurryTheme } from '../theme/ofurry';
import { MotionPresets, getAmbientDrift, getSpringProgress, getGlowPulse } from '../theme/motion';

export interface IconProps {
  name?: string;
  size?: number;
  sizeRatio?: number;
  baseReferenceSize?: number;
  color?: string;
  accentColor?: string;
  delay?: number;
  showRing?: boolean;
  showGlow?: boolean;
  style?: React.CSSProperties;
  customSvg?: React.ReactNode;
}

export const Icon: React.FC<IconProps> = ({
  name = 'Zap',
  size = 96,
  sizeRatio,
  baseReferenceSize = OFurryTheme.typography.sizes.hero,
  color = OFurryTheme.colors.primary,
  accentColor = OFurryTheme.colors.accentOrange,
  delay = 0,
  showRing = true,
  showGlow = true,
  style,
  customSvg,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Calculate proportional size according to ADR-004 Law 8
  const effectiveSize = sizeRatio
    ? Math.round(baseReferenceSize * sizeRatio)
    : size;

  // 1. Ambient layer: Continuous floating and gentle breathing (zero frozen frames)
  const ambient = getAmbientDrift(frame, {
    amplitudeY: 3.5,
    amplitudeX: 1.5,
    amplitudeRotate: 0.6,
    periodFrames: 60,
  });

  // 2. Primary layer: Scale entrance with snappy bouncy spring
  const entryProgress = getSpringProgress(frame, fps, delay, MotionPresets.bouncy);
  const scale = interpolate(entryProgress, [0, 1], [0.2, 1]);
  const opacity = interpolate(entryProgress, [0, 0.4, 1], [0, 0.9, 1]);

  // 3. Secondary layer: Expanding shockwave laser accent ring
  const ringProgress = interpolate(frame, [delay + 2, delay + 28], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ringScale = interpolate(ringProgress, [0, 1], [0.75, 1.7]);
  const ringOpacity = interpolate(ringProgress, [0, 0.3, 1], [0, 0.8, 0]);

  // Continuous glow pulse
  const glowIntensity = getGlowPulse(frame, 50, 0.4, 0.85);

  // Dynamic Lucide Icon Component lookup
  const iconsMap = LucideIcons as unknown as Record<
    string,
    React.ComponentType<{ size?: number; color?: string; strokeWidth?: number; style?: React.CSSProperties }>
  >;
  const LucideComponent = iconsMap[name] || LucideIcons.Zap;

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: effectiveSize * 1.4,
        height: effectiveSize * 1.4,
        backgroundColor: 'transparent',
        transform: `translate3d(${ambient.translateX}px, ${ambient.translateY}px, 0) rotate(${ambient.rotate}deg)`,
        ...style,
      }}
    >
      {/* Secondary: Expanding Pulse Ring (Alpha friendly) */}
      {showRing && ringProgress > 0 && ringProgress < 1 && (
        <div
          style={{
            position: 'absolute',
            width: effectiveSize * 1.2,
            height: effectiveSize * 1.2,
            borderRadius: '50%',
            border: `2px solid ${accentColor}`,
            boxShadow: `0 0 20px ${accentColor}`,
            transform: `scale(${ringScale})`,
            opacity: ringOpacity,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Static Background Glow Halo (Alpha friendly radial gradient) */}
      {showGlow && (
        <div
          style={{
            position: 'absolute',
            width: effectiveSize * 1.2,
            height: effectiveSize * 1.2,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${OFurryTheme.colors.accentOrangeAlpha(0.5)} 0%, transparent 70%)`,
            opacity: glowIntensity * 0.4 * opacity,
            filter: 'blur(18px)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Primary Icon Container */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${scale * ambient.scale})`,
          opacity,
          filter: showGlow ? `drop-shadow(0 0 20px ${OFurryTheme.colors.accentOrangeAlpha(0.7)})` : undefined,
        }}
      >
        {customSvg ? (
          customSvg
        ) : (
          <LucideComponent
            size={effectiveSize}
            color={color}
            strokeWidth={2.2}
            style={{ display: 'block' }}
          />
        )}
      </div>
    </div>
  );
};
