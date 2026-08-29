import { spring, interpolate, SpringConfig } from 'remotion';

/**
 * Motion Physics Presets for OFurry Engine
 * Following MD3, Apple HIG, and Studio Motion Design rules.
 */
export const MotionPresets = {
  // Snappy: Fast, confident, decisive entrances (UI badges, numbers)
  snappy: {
    damping: 16,
    mass: 0.5,
    stiffness: 170,
    overshootClamping: false,
  } satisfies SpringConfig,

  // Smooth: Default entrance for cards, containers, heroes
  smooth: {
    damping: 18,
    mass: 0.8,
    stiffness: 110,
    overshootClamping: false,
  } satisfies SpringConfig,

  // Gentle: Floating elements, ambient movements, subtitles
  gentle: {
    damping: 24,
    mass: 1.0,
    stiffness: 80,
    overshootClamping: false,
  } satisfies SpringConfig,

  // Bouncy: Playful icons, success checkmarks, alert pops
  bouncy: {
    damping: 11,
    mass: 0.6,
    stiffness: 140,
    overshootClamping: false,
  } satisfies SpringConfig,
} as const;

/**
 * Calculates continuous sinusoidal micro-movements (ambient drift / breathing)
 * to ensure 0% static/frozen frames ("Anti-Stuck" rule).
 */
export interface AmbientDriftOptions {
  amplitudeY?: number;      // Default ±3px
  amplitudeX?: number;      // Default ±1.5px
  amplitudeRotate?: number; // Default ±0.5deg
  periodFrames?: number;    // Default 60 frames (~2s at 30fps)
  phaseOffset?: number;     // Random or stagger phase offset
}

export function getAmbientDrift(frame: number, options: AmbientDriftOptions = {}) {
  const {
    amplitudeY = 3.0,
    amplitudeX = 1.5,
    amplitudeRotate = 0.5,
    periodFrames = 60,
    phaseOffset = 0,
  } = options;

  const angle = ((frame + phaseOffset) / periodFrames) * Math.PI * 2;
  const secondaryAngle = ((frame + phaseOffset * 1.5) / (periodFrames * 1.4)) * Math.PI * 2;

  return {
    translateY: Math.sin(angle) * amplitudeY,
    translateX: Math.cos(secondaryAngle) * amplitudeX,
    rotate: Math.sin(angle * 0.8) * amplitudeRotate,
    scale: 1 + Math.sin(angle * 0.5) * 0.008, // Subtle 0.8% breathing
  };
}

/**
 * Calculates live SVG stroke drawing progress (0.0 to 1.0)
 * Uses smooth interpolation with deceleration at completion.
 */
export function getLiveDrawProgress(
  frame: number,
  startFrame: number = 0,
  durationInFrames: number = 30
): number {
  return interpolate(frame, [startFrame, startFrame + durationInFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: (t) => 1 - Math.pow(1 - t, 3), // cubic ease-out for fast start and clean lock-in
  });
}

/**
 * Helper to compute spring entry progress (0 -> 1)
 */
export function getSpringProgress(
  frame: number,
  fps: number = 30,
  delay: number = 0,
  config: SpringConfig = MotionPresets.smooth
): number {
  return spring({
    frame: frame - delay,
    fps,
    config,
  });
}

/**
 * Helper to calculate stagger delay per element index
 */
export function getStaggerDelay(index: number, stepFrames: number = 3): number {
  return index * stepFrames;
}

/**
 * Continuous glow pulsing for neon accent elements
 */
export function getGlowPulse(
  frame: number,
  periodFrames: number = 45,
  minOpacity: number = 0.4,
  maxOpacity: number = 0.85
): number {
  const sine = (Math.sin((frame / periodFrames) * Math.PI * 2) + 1) / 2;
  return minOpacity + sine * (maxOpacity - minOpacity);
}
