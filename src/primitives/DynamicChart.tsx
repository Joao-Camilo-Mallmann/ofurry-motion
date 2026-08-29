import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { OFurryTheme } from '../theme/ofurry';
import { MotionPresets, getAmbientDrift, getSpringProgress, getLiveDrawProgress, getGlowPulse } from '../theme/motion';

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface DynamicChartProps {
  data: ChartDataPoint[];
  type?: 'line' | 'bar';
  width?: number;
  height?: number;
  delay?: number;
  drawDuration?: number;
  accentColor?: string;
  showGrid?: boolean;
  highlightLast?: boolean;
  style?: React.CSSProperties;
}

export const DynamicChart: React.FC<DynamicChartProps> = ({
  data,
  type = 'line',
  width = 920,
  height = 440,
  delay = 0,
  drawDuration = 35,
  accentColor = OFurryTheme.colors.accentOrange,
  showGrid = true,
  highlightLast = true,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Ambient layer: smooth drift (zero frozen frame)
  const ambient = getAmbientDrift(frame, {
    amplitudeY: 2.0,
    amplitudeRotate: 0.2,
    periodFrames: 70,
  });

  const padding = { top: 50, right: 50, bottom: 60, left: 60 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const values = data.map((d) => d.value);
  const minVal = Math.min(...values, 0);
  const maxVal = Math.max(...values) * 1.15 || 100;

  const points = data.map((d, i) => {
    const x = padding.left + (i / (data.length - 1 || 1)) * chartW;
    const y = padding.top + chartH - ((d.value - minVal) / (maxVal - minVal)) * chartH;
    return { ...d, x, y };
  });

  // Calculate SVG line path
  const pathD = points.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = points[i - 1];
    const cpX1 = prev.x + (pt.x - prev.x) / 2;
    const cpY1 = prev.y;
    const cpX2 = prev.x + (pt.x - prev.x) / 2;
    const cpY2 = pt.y;
    return `${acc} C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${pt.x} ${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1]?.x ?? 0} ${padding.top + chartH} L ${points[0]?.x ?? 0} ${padding.top + chartH} Z`;

  // Path drawing interpolation
  const lineProgress = getLiveDrawProgress(frame, delay, drawDuration);
  const totalLength = chartW * 1.6;
  const strokeDashoffset = totalLength * (1 - lineProgress);

  const glowIntensity = getGlowPulse(frame, 45, 0.4, 0.9);

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        backgroundColor: 'rgba(15, 15, 15, 0.85)',
        borderRadius: '16px',
        border: `1px solid ${OFurryTheme.colors.borderLight}`,
        boxShadow: OFurryTheme.effects.cardGlow,
        transform: `translateY(${ambient.translateY}px) rotate(${ambient.rotate}deg)`,
        padding: '12px',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {/* Editorial Corner Guides */}
      <svg
        width={width}
        height={height}
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', opacity: 0.5 }}
      >
        <path d="M 0,16 L 0,0 L 16,0" fill="none" stroke={accentColor} strokeWidth={2} />
        <path d={`M ${width},16 L ${width},0 L ${width - 16},0`} fill="none" stroke={accentColor} strokeWidth={2} />
        <path d={`M 0,${height - 16} L 0,${height} L 16,${height}`} fill="none" stroke={accentColor} strokeWidth={2} />
        <path d={`M ${width},${height - 16} L ${width},${height} L ${width - 16},${height}`} fill="none" stroke={accentColor} strokeWidth={2} />
      </svg>

      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <linearGradient id="chartAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={accentColor} stopOpacity={0.35} />
            <stop offset="100%" stopColor={accentColor} stopOpacity={0.0} />
          </linearGradient>
          <filter id="chartGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Grid Lines */}
        {showGrid && (
          <g opacity={0.35}>
            {[0, 0.33, 0.66, 1].map((pct, idx) => {
              const y = padding.top + chartH * (1 - pct);
              return (
                <line
                  key={idx}
                  x1={padding.left}
                  y1={y}
                  x2={padding.left + chartW}
                  y2={y}
                  stroke={OFurryTheme.colors.borderLight}
                  strokeDasharray="6 6"
                  strokeWidth={1}
                />
              );
            })}
          </g>
        )}

        {/* Area Gradient Fill */}
        {type === 'line' && (
          <path
            d={areaD}
            fill="url(#chartAreaGrad)"
            opacity={lineProgress * 0.9}
          />
        )}

        {/* Main Bold Trend Line */}
        {type === 'line' && (
          <path
            d={pathD}
            fill="none"
            stroke={accentColor}
            strokeWidth={5}
            strokeDasharray={totalLength}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            filter="url(#chartGlow)"
          />
        )}

        {/* Bar Chart Type */}
        {type === 'bar' &&
          points.map((pt, i) => {
            const barDelay = delay + i * 4;
            const barProgress = interpolate(
              frame,
              [barDelay, barDelay + 20],
              [0, 1],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
            );
            const barW = (chartW / points.length) * 0.55;
            const barH = (padding.top + chartH - pt.y) * barProgress;
            const isLast = i === points.length - 1;

            return (
              <rect
                key={i}
                x={pt.x - barW / 2}
                y={padding.top + chartH - barH}
                width={barW}
                height={barH}
                fill={isLast ? accentColor : OFurryTheme.colors.primary}
                rx={6}
                opacity={0.9}
                filter={isLast ? 'url(#chartGlow)' : undefined}
              />
            );
          })}

        {/* Data Points & Value Badges */}
        {points.map((pt, i) => {
          const ptDelay = delay + (i / points.length) * drawDuration;
          const ptSpring = getSpringProgress(frame, fps, ptDelay, MotionPresets.bouncy);
          const isLast = i === points.length - 1;
          if (ptSpring <= 0.05) return null;

          return (
            <g key={i} transform={`translate(${pt.x}, ${pt.y}) scale(${ptSpring})`}>
              {/* Point Dot */}
              <circle
                r={isLast ? 8 : 5}
                fill={isLast ? OFurryTheme.colors.accentYellow : OFurryTheme.colors.primary}
                stroke={accentColor}
                strokeWidth={2.5}
                filter={isLast ? 'url(#chartGlow)' : undefined}
              />

              {/* Pulsing ring on the focal point */}
              {isLast && highlightLast && (
                <circle
                  r={16}
                  fill="none"
                  stroke={OFurryTheme.colors.accentYellow}
                  strokeWidth={2}
                  opacity={glowIntensity}
                />
              )}

              {/* Data Label / Value */}
              <text
                x={0}
                y={-18}
                textAnchor="middle"
                fill={isLast ? OFurryTheme.colors.accentOrange : OFurryTheme.colors.primary}
                fontSize={isLast ? 18 : 14}
                fontWeight={isLast ? 800 : 600}
                fontFamily={OFurryTheme.typography.families.tech}
              >
                {pt.value}
              </text>
            </g>
          );
        })}

        {/* X Axis Labels */}
        {points.map((pt, i) => (
          <text
            key={`lbl-${i}`}
            x={pt.x}
            y={height - 20}
            textAnchor="middle"
            fill={OFurryTheme.colors.secondary}
            fontSize={14}
            fontWeight={600}
            fontFamily={OFurryTheme.typography.families.tech}
          >
            {pt.label}
          </text>
        ))}
      </svg>
    </div>
  );
};

