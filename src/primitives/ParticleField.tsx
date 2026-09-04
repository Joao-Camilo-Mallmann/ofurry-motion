import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { OFurryTheme } from '../theme/ofurry';
import { getGlowPulse } from '../theme/motion';

export interface ParticleFieldProps {
  showGrid?: boolean;
  showCorners?: boolean;
  showCrosshairs?: boolean;
  showRadialVignette?: boolean;
  transparent?: boolean;
  accentColor?: string;
  speed?: number;
  style?: React.CSSProperties;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
  showGrid = false,
  showCorners = false,
  showCrosshairs = false,
  showRadialVignette = false,
  transparent = true,
  accentColor = OFurryTheme.colors.accentOrange,
  speed = 1.0,
  style,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Subtle breathing pulse for tech markers
  const markerPulse = getGlowPulse(frame * speed, 60, 0.4, 0.85);

  const safeLeft = OFurryTheme.layout.safeArea.left;
  const safeRight = width - OFurryTheme.layout.safeArea.right;
  const safeTop = OFurryTheme.layout.safeArea.top;
  const safeBottom = height - OFurryTheme.layout.safeArea.bottom;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: transparent ? 'transparent' : OFurryTheme.colors.background,
        overflow: 'hidden',
        pointerEvents: 'none',
        ...style,
      }}
    >
      {/* 1. Technical Alpha Grid */}
      {showGrid && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.025) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.025) 1px, transparent 1px)
            `,
            backgroundSize: '120px 120px',
            opacity: 0.8,
          }}
        />
      )}

      {/* 2. Technical Framing Markers & Precision Crosshairs */}
      <svg
        width="100%"
        height="100%"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        {/* Safe Area Framing Corners */}
        {showCorners && (
          <g stroke={accentColor} strokeWidth={1.5} opacity={markerPulse * 0.7}>
            {/* Top-Left Corner */}
            <path d={`M ${safeLeft - 20},${safeTop + 10} L ${safeLeft - 20},${safeTop - 20} L ${safeLeft + 10},${safeTop - 20}`} fill="none" />
            {/* Top-Right Corner */}
            <path d={`M ${safeRight + 20},${safeTop + 10} L ${safeRight + 20},${safeTop - 20} L ${safeRight - 10},${safeTop - 20}`} fill="none" />
            {/* Bottom-Left Corner */}
            <path d={`M ${safeLeft - 20},${safeBottom - 10} L ${safeLeft - 20},${safeBottom + 20} L ${safeLeft + 10},${safeBottom + 20}`} fill="none" />
            {/* Bottom-Right Corner */}
            <path d={`M ${safeRight + 20},${safeBottom - 10} L ${safeRight + 20},${safeBottom + 20} L ${safeRight - 10},${safeBottom + 20}`} fill="none" />
          </g>
        )}

        {/* Precision Crosshair Aiming Markers */}
        {showCrosshairs && (
          <g stroke="rgba(255, 255, 255, 0.3)" strokeWidth={1}>
            {/* Center-Left Crosshair */}
            <line x1={safeLeft - 20} y1={height / 2 - 8} x2={safeLeft - 20} y2={height / 2 + 8} />
            <line x1={safeLeft - 28} y1={height / 2} x2={safeLeft - 12} y2={height / 2} />

            {/* Center-Right Crosshair */}
            <line x1={safeRight + 20} y1={height / 2 - 8} x2={safeRight + 20} y2={height / 2 + 8} />
            <line x1={safeRight + 12} y1={height / 2} x2={safeRight + 28} y2={height / 2} />

            {/* Top-Center Crosshair */}
            <line x1={width / 2 - 8} y1={safeTop - 20} x2={width / 2 + 8} y2={safeTop - 20} />
            <line x1={width / 2} y1={safeTop - 28} x2={width / 2} y2={safeTop - 12} />

            {/* Bottom-Center Crosshair */}
            <line x1={width / 2 - 8} y1={safeBottom + 20} x2={width / 2 + 8} y2={safeBottom + 20} />
            <line x1={width / 2} y1={safeBottom + 12} x2={width / 2} y2={safeBottom + 28} />
          </g>
        )}
      </svg>

      {/* 3. Optional Radial Vignette (Only for non-transparent backgrounds) */}
      {!transparent && showRadialVignette && (
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

