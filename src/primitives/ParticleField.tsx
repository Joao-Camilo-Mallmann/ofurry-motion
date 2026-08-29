import React, { useMemo } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { OFurryTheme } from '../theme/ofurry';

export interface ParticleFieldProps {
  count?: number;
  showGrid?: boolean;
  showRadialVignette?: boolean;
  accentColor?: string;
  speed?: number;
  style?: React.CSSProperties;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  isAccent: boolean;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
  count = 35,
  showGrid = true,
  showRadialVignette = true,
  accentColor = OFurryTheme.colors.accentOrange,
  speed = 1.0,
  style,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Precompute deterministic pseudo-random particles
  const particles = useMemo(() => {
    const list: Particle[] = [];
    for (let i = 0; i < count; i++) {
      // Deterministic PRNG using index
      const seed1 = (i * 9301 + 49297) % 233280;
      const rnd1 = seed1 / 233280;
      const seed2 = (i * 49297 + 9301) % 233280;
      const rnd2 = seed2 / 233280;

      list.push({
        id: i,
        x: rnd1 * width,
        y: rnd2 * height,
        size: 2 + (i % 3) * 1.5,
        speedX: ((i % 5) - 2) * 0.3 * speed,
        speedY: -0.4 - (i % 4) * 0.2 * speed,
        opacity: 0.15 + (i % 4) * 0.12,
        isAccent: i % 4 === 0,
      });
    }
    return list;
  }, [count, width, height, speed]);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: OFurryTheme.colors.background,
        overflow: 'hidden',
        pointerEvents: 'none',
        ...style,
      }}
    >
      {/* Subtle Tech Grid Lines */}
      {showGrid && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            opacity: 0.8,
          }}
        />
      )}

      {/* Floating Ambient Particles */}
      <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
        {particles.map((p) => {
          // Continuous looping movement
          const curX = (p.x + p.speedX * frame + width) % width;
          const curY = (p.y + p.speedY * frame + height) % height;
          const pulse = Math.sin((frame / 30) + p.id) * 0.2;
          const currentOpacity = Math.max(0.05, Math.min(0.8, p.opacity + pulse));

          return (
            <circle
              key={p.id}
              cx={curX}
              cy={curY}
              r={p.size}
              fill={p.isAccent ? accentColor : OFurryTheme.colors.primary}
              opacity={currentOpacity}
              filter={p.isAccent ? 'drop-shadow(0 0 6px rgba(255,153,0,0.6))' : undefined}
            />
          );
        })}
      </svg>

      {/* Radial Vignette */}
      {showRadialVignette && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.85) 100%)',
          }}
        />
      )}
    </div>
  );
};
