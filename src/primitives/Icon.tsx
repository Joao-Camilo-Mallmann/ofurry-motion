import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import * as LucideIcons from 'lucide-react';
import { OFurryTheme } from '../theme/ofurry';
import { MotionPresets, getAmbientDrift, getSpringProgress, getGlowPulse } from '../theme/motion';

export interface IconProps {
  name?: string;
  size?: number;
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

  // 1. Ambient layer: Continuous floating and gentle breathing
  const ambient = getAmbientDrift(frame, {
    amplitudeY: 3.5,
    amplitudeX: 1.5,
    amplitudeRotate: 0.8,
    periodFrames: 60,
  });

  // 2. Primary layer: Scale entrance with bouncy spring
  const entryProgress = getSpringProgress(frame, fps, delay, MotionPresets.bouncy);
  const scale = interpolate(entryProgress, [0, 1], [0.2, 1]);
  const opacity = interpolate(entryProgress, [0, 0.4, 1], [0, 0.8, 1]);

  // 3. Secondary layer: Expanding shockwave accent ring
  const ringProgress = interpolate(frame, [delay + 2, delay + 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ringScale = interpolate(ringProgress, [0, 1], [0.8, 1.6]);
  const ringOpacity = interpolate(ringProgress, [0, 0.3, 1], [0, 0.7, 0]);

  // Continuous glow pulse
  const glowIntensity = getGlowPulse(frame, 50, 0.4, 0.8);

  // Dynamic Lucide Icon Component lookup
  const iconsMap = LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number; color?: string; strokeWidth?: number; style?: React.CSSProperties }>>;
  const LucideComponent = iconsMap[name] || LucideIcons.Zap;

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size * 1.5,
        height: size * 1.5,
        transform: `translate3d(${ambient.translateX}px, ${ambient.translateY}px, 0) rotate(${ambient.rotate}deg)`,
        ...style,
      }}
    >
      {/* Secondary: Expanding Pulse Ring */}
      {showRing && ringProgress > 0 && ringProgress < 1 && (
        <div
          style={{
            position: 'absolute',
            width: size * 1.2,
            height: size * 1.2,
            borderRadius: '50%',
            border: `2px solid ${accentColor}`,
            boxShadow: `0 0 15px ${accentColor}`,
            transform: `scale(${ringScale})`,
            opacity: ringOpacity,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Static Background Glow Halo */}
      {showGlow && (
        <div
          style={{
            position: 'absolute',
            width: size * 1.1,
            height: size * 1.1,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
            opacity: glowIntensity * 0.35 * opacity,
            filter: 'blur(16px)',
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
          filter: showGlow ? `drop-shadow(0 0 16px ${accentColor})` : undefined,
        }}
      >
        {customSvg ? (
          customSvg
        ) : (
          <LucideComponent
            size={size}
            color={color}
            strokeWidth={1.75}
            style={{ display: 'block' }}
          />
        )}
      </div>
    </div>
  );
};
