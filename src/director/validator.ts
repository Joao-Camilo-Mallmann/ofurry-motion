import { z } from 'zod';
import { SceneSpec, SceneSpecSchema } from './schema';

/**
 * Generates a safe, beautifully styled fallback SceneSpec
 * when LLM output is malformed or invalid.
 */
export function createFallbackScene(
  rawText: string = 'CONCEITO CENTRAL',
  id: string = 'fallback-scene',
  durationInFrames: number = 90
): SceneSpec {
  // Extract max 3-4 words for safe presentation
  const words = rawText
    .replace(/[^\w\sÀ-ÿ]/g, '')
    .trim()
    .split(/\s+/)
    .slice(0, 4)
    .join(' ')
    .toUpperCase();

  const safeText = words.length > 0 ? words : 'OFURRY MOTION';

  return {
    id,
    durationInFrames,
    layout: 'centered-hero',
    choreography: {
      entryDirection: 'bottom-up',
      drawSpeed: 'snappy',
      ambientMotion: 'gentle-float',
    },
    artDirection: {
      mood: 'analytical-tech',
      visualMetaphor: 'Fallback visual safety preset',
    },
    elements: [
      {
        type: 'text',
        text: safeText,
        variant: 'title',
        align: 'center',
        glow: true,
        delay: 0,
        highlightWords: [],
      },
      {
        type: 'icon',
        name: 'Zap',
        size: 96,
        delay: 4,
        showRing: true,
        showGlow: true,
      },
    ],
  };
}

/**
 * Validates a raw input (string or object) as SceneSpec.
 * In case of failure, automatically builds a safe fallback scene.
 */
export function validateSceneSpec(
  input: unknown,
  fallbackContext?: { id?: string; text?: string; durationInFrames?: number }
): {
  success: boolean;
  data: SceneSpec;
  error?: z.ZodError;
} {
  let parsedInput: unknown = input;

  if (typeof input === 'string') {
    try {
      // Remove any markdown code block wrapper if present
      const cleanJson = input.replace(/```json/gi, '').replace(/```/g, '').trim();
      parsedInput = JSON.parse(cleanJson);
    } catch {
      return {
        success: false,
        data: createFallbackScene(
          fallbackContext?.text,
          fallbackContext?.id,
          fallbackContext?.durationInFrames
        ),
      };
    }
  }

  const result = SceneSpecSchema.safeParse(parsedInput);

  if (result.success) {
    return {
      success: true,
      data: result.data,
    };
  }

  return {
    success: false,
    data: createFallbackScene(
      fallbackContext?.text,
      fallbackContext?.id,
      fallbackContext?.durationInFrames
    ),
    error: result.error,
  };
}

/**
 * Validates an array of scenes, repairing any broken scenes with fallbacks.
 */
export function validateSceneArray(scenes: unknown[]): SceneSpec[] {
  return scenes.map((s, idx) => {
    const res = validateSceneSpec(s, { id: `scene-${idx + 1}` });
    return res.data;
  });
}
