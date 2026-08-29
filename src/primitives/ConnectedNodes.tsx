import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import * as LucideIcons from 'lucide-react';
import { OFurryTheme } from '../theme/ofurry';
import { MotionPresets, getAmbientDrift, getSpringProgress, getLiveDrawProgress } from '../theme/motion';

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
  width = 800,
  height = 500,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Ambient layer: subtle organic drift
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

  const iconsMap = LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number; color?: string; strokeWidth?: number; style?: React.CSSProperties }>>;

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        transform: `translateY(${ambient.translateY}px) rotate(${ambient.rotate}deg)`,
        fontFamily: OFurryTheme.typography.fontFamily,
        ...style,
      }}
    >
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
            <stop offset="0%" stopColor={OFurryTheme.colors.primary} stopOpacity={0.8} />
            <stop offset="100%" stopColor={OFurryTheme.colors.accentOrange} stopOpacity={1} />
          </linearGradient>
          <filter id="orangeLineGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
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

          // Ambient pulse flow along line
          const flowDashOffset = -((frame * 1.5) % 30);

          return (
            <g key={`${conn.from}-${conn.to}`}>
              {/* Background faint connecting track */}
              <line
                x1={fromNode.px}
                y1={fromNode.py}
                x2={toNode.px}
                y2={toNode.py}
                stroke={OFurryTheme.colors.border}
                strokeWidth={2}
                strokeDasharray="4 4"
              />

              {/* Main live drawing neon laser line */}
              <line
                x1={fromNode.px}
                y1={fromNode.py}
                x2={toNode.px}
                y2={toNode.py}
                stroke="url(#neonOrangeGrad)"
                strokeWidth={3}
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
                  strokeWidth={2}
                  strokeDasharray="6 24"
                  strokeDashoffset={flowDashOffset}
                  opacity={0.7}
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Render Node Points */}
      {nodes.map((node, index) => {
        const nodeData = nodeMap.get(node.id)!;
        const nodeDelay = delay + (drawDuration * 0.4) + index * 4;
        const nodeSpring = getSpringProgress(frame, fps, nodeDelay, MotionPresets.bouncy);

        const nodeScale = interpolate(nodeSpring, [0, 1], [0, 1]);
        const nodeOpacity = interpolate(nodeSpring, [0, 0.5, 1], [0, 0.8, 1]);

        const isPrimary = node.isPrimary ?? index === 0;
        const nodeSize = isPrimary ? 54 : 42;

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
                backgroundColor: isPrimary ? OFurryTheme.colors.accentOrange : OFurryTheme.colors.surfaceElevated,
                border: `2px solid ${isPrimary ? OFurryTheme.colors.accentYellow : OFurryTheme.colors.borderLight}`,
                boxShadow: isPrimary ? OFurryTheme.effects.glowOrangeStrong : OFurryTheme.effects.cardShadow,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isPrimary ? '#000000' : OFurryTheme.colors.primary,
              }}
            >
              {LucideComponent ? (
                <LucideComponent size={isPrimary ? 26 : 20} strokeWidth={2.2} />
              ) : (
                <div
                  style={{
                    width: isPrimary ? 12 : 8,
                    height: isPrimary ? 12 : 8,
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
                  fontSize: isPrimary ? '16px' : '14px',
                  fontWeight: isPrimary
                    ? OFurryTheme.typography.weights.bold
                    : OFurryTheme.typography.weights.semiBold,
                  color: isPrimary ? OFurryTheme.colors.accentOrange : OFurryTheme.colors.primary,
                  backgroundColor: 'rgba(0,0,0,0.75)',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  border: `1px solid ${isPrimary ? OFurryTheme.colors.accentOrangeAlpha(0.4) : OFurryTheme.colors.border}`,
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
