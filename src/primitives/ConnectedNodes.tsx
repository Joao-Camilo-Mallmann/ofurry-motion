import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import * as LucideIcons from 'lucide-react';
import { OFurryTheme } from '../theme/ofurry';
import { MotionPresets, getAmbientDrift, getSpringProgress } from '../theme/motion';

export interface NodePoint {
  id: string;
  x: number; // 0 to 100 (% of container width)
  y: number; // 0 to 100 (% of container height)
  label?: string;
  icon?: string;
  isPrimary?: boolean;
}

export interface NodeConnection {
  from: string;
  to: string;
}

export interface ConnectedNodesProps {
  nodes: NodePoint[];
  connections?: NodeConnection[];
  delay?: number;
  drawDuration?: number;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

export const ConnectedNodes: React.FC<ConnectedNodesProps> = ({
  nodes,
  connections = [],
  delay = 0,
  drawDuration = 30,
  width = 920,
  height = 520,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Ambient layer: subtle organic drift (zero frozen frames)
  const ambient = getAmbientDrift(frame, {
    amplitudeY: 2.5,
    amplitudeRotate: 0.2,
    periodFrames: 75,
  });

  // Convert percentages to coordinates
  const nodeMap = new Map(
    nodes.map((n) => [
      n.id,
      {
        ...n,
        px: (n.x / 100) * width,
        py: (n.y / 100) * height,
      },
    ])
  );

  const iconsMap = LucideIcons as unknown as Record<
    string,
    React.ComponentType<{ size?: number; color?: string; strokeWidth?: number; style?: React.CSSProperties }>
  >;

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        transform: `translateY(${ambient.translateY}px) rotate(${ambient.rotate}deg)`,
        backgroundColor: 'transparent',
        ...style,
      }}
    >
      {/* Editorial Tech Frame Guides / Crosshairs */}
      <svg
        width={width}
        height={height}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          overflow: 'visible',
          pointerEvents: 'none',
          opacity: 0.45,
        }}
      >
        {/* Corner L-Guides */}
        <path d={`M 0,20 L 0,0 L 20,0`} fill="none" stroke={OFurryTheme.colors.accentOrange} strokeWidth={2} />
        <path d={`M ${width},20 L ${width},0 L ${width - 20},0`} fill="none" stroke={OFurryTheme.colors.accentOrange} strokeWidth={2} />
        <path d={`M 0,${height - 20} L 0,${height} L 20,${height}`} fill="none" stroke={OFurryTheme.colors.accentOrange} strokeWidth={2} />
        <path d={`M ${width},${height - 20} L ${width},${height} L ${width - 20},${height}`} fill="none" stroke={OFurryTheme.colors.accentOrange} strokeWidth={2} />
      </svg>

      {/* SVG Connecting Lines with Live Drawing */}
      <svg
        width={width}
        height={height}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          overflow: 'visible',
          pointerEvents: 'none',
        }}
      >
        <defs>
          <linearGradient id="neonOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={OFurryTheme.colors.primary} stopOpacity={0.9} />
            <stop offset="100%" stopColor={OFurryTheme.colors.accentOrange} stopOpacity={1} />
          </linearGradient>
          <filter id="orangeLineGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {connections.map((conn, idx) => {
          const fromNode = nodeMap.get(conn.from);
          const toNode = nodeMap.get(conn.to);
          if (!fromNode || !toNode) return null;

          const dx = toNode.px - fromNode.px;
          const dy = toNode.py - fromNode.py;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Stagger line draw per connection
          const connStart = delay + idx * 4;
          const connProgress = interpolate(
            frame,
            [connStart, connStart + drawDuration],
            [0, 1],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );

          const strokeDashoffset = distance * (1 - connProgress);
          const flowDashOffset = -((frame * 2.0) % 32);

          return (
            <g key={`${conn.from}-${conn.to}`}>
              {/* Background faint connecting track */}
              <line
                x1={fromNode.px}
                y1={fromNode.py}
                x2={toNode.px}
                y2={toNode.py}
                stroke={OFurryTheme.colors.borderLight}
                strokeWidth={2}
                strokeDasharray="4 4"
                opacity={0.5}
              />

              {/* Main live drawing bold neon laser line */}
              <line
                x1={fromNode.px}
                y1={fromNode.py}
                x2={toNode.px}
                y2={toNode.py}
                stroke="url(#neonOrangeGrad)"
                strokeWidth={4}
                strokeDasharray={distance}
                strokeDashoffset={strokeDashoffset}
                filter="url(#orangeLineGlow)"
              />

              {/* Ambient energetic pulse beam */}
              {connProgress >= 0.8 && (
                <line
                  x1={fromNode.px}
                  y1={fromNode.py}
                  x2={toNode.px}
                  y2={toNode.py}
                  stroke={OFurryTheme.colors.accentYellow}
                  strokeWidth={3}
                  strokeDasharray="8 24"
                  strokeDashoffset={flowDashOffset}
                  opacity={0.85}
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Render Node Points */}
      {nodes.map((node, index) => {
        const nodeData = nodeMap.get(node.id)!;
        const nodeDelay = delay + drawDuration * 0.4 + index * 4;
        const nodeSpring = getSpringProgress(frame, fps, nodeDelay, MotionPresets.bouncy);

        const nodeScale = interpolate(nodeSpring, [0, 1], [0, 1]);
        const nodeOpacity = interpolate(nodeSpring, [0, 0.5, 1], [0, 0.9, 1]);

        const isPrimary = node.isPrimary ?? index === 0;
        const nodeSize = isPrimary ? 62 : 46;

        const LucideComponent = node.icon
          ? iconsMap[node.icon] || LucideIcons.Circle
          : null;

        return (
          <div
            key={node.id}
            style={{
              position: 'absolute',
              left: `${nodeData.px}px`,
              top: `${nodeData.py}px`,
              transform: `translate(-50%, -50%) scale(${nodeScale})`,
              opacity: nodeOpacity,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: isPrimary ? 10 : 5,
            }}
          >
            {/* Node Circle */}
            <div
              style={{
                width: nodeSize,
                height: nodeSize,
                borderRadius: '50%',
                backgroundColor: isPrimary ? OFurryTheme.colors.accentOrange : 'rgba(20, 20, 20, 0.95)',
                border: `2px solid ${isPrimary ? OFurryTheme.colors.accentYellow : OFurryTheme.colors.borderLight}`,
                boxShadow: isPrimary ? OFurryTheme.effects.glowOrangeStrong : OFurryTheme.effects.cardGlow,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isPrimary ? '#000000' : OFurryTheme.colors.primary,
              }}
            >
              {LucideComponent ? (
                <LucideComponent size={isPrimary ? 30 : 22} strokeWidth={2.4} />
              ) : (
                <div
                  style={{
                    width: isPrimary ? 14 : 10,
                    height: isPrimary ? 14 : 10,
                    borderRadius: '50%',
                    backgroundColor: isPrimary ? '#000000' : OFurryTheme.colors.accentOrange,
                  }}
                />
              )}
            </div>

            {/* Node Label */}
            {node.label && (
              <span
                style={{
                  marginTop: '10px',
                  fontFamily: OFurryTheme.typography.families.tech,
                  fontSize: isPrimary ? '16px' : '13px',
                  fontWeight: isPrimary
                    ? OFurryTheme.typography.weights.bold
                    : OFurryTheme.typography.weights.semiBold,
                  color: isPrimary ? OFurryTheme.colors.accentOrange : OFurryTheme.colors.primary,
                  backgroundColor: 'rgba(0, 0, 0, 0.85)',
                  padding: '3px 10px',
                  borderRadius: '6px',
                  border: `1px solid ${
                    isPrimary
                      ? OFurryTheme.colors.accentOrangeAlpha(0.6)
                      : OFurryTheme.colors.borderLight
                  }`,
                  whiteSpace: 'nowrap',
                  letterSpacing: OFurryTheme.typography.letterSpacing.normal,
                }}
              >
                {node.label}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

