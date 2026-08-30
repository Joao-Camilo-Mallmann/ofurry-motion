import { z } from 'zod';
import { SceneSpec, SceneSpecSchema, VisualElement } from './schema';

/**
 * Ensures multi-element scenes have valid anchoring hierarchies (ADR-004 Law 7 & 8)
 * and prevents unanchored floating orphan elements.
 */
export function repairAnchors(scene: SceneSpec): SceneSpec {
  if (!scene.elements || scene.elements.length <= 1) {
    return scene;
  }

  const elements = [...scene.elements];
  // 1. Identify dominant anchor element (first text or number or first element)
  let dominantIndex = elements.findIndex(
    (el) => el.type === 'text' || el.type === 'number'
  );
  if (dominantIndex === -1) dominantIndex = 0;

  const dominant = { ...elements[dominantIndex] };
  const dominantId = dominant.id || 'hero-anchor';
  dominant.id = dominantId;
  elements[dominantIndex] = dominant;

  const dominantIsNumber = dominant.type === 'number';

  // 2. Validate and attach secondary elements to dominant anchor if unanchored
  const repairedElements: VisualElement[] = elements.map((el, idx) => {
    if (idx === dominantIndex) {
      return el;
    }

    const updated = { ...el };
    if (!updated.id) {
      updated.id = `${el.type}-${idx + 1}`;
    }

    // If unanchored, auto-assign anchorTo pointing to dominant
    if (!updated.anchorTo) {
      updated.anchorTo = {
        targetId: dominantId,
        point: 'cap-height-right',
        bridge: 'connector-line',
        offsetX: 0,
        offsetY: 0,
      };
    }

    // If sizeRatio not specified, calculate based on dominant element
    if (updated.sizeRatio === undefined) {
      if (updated.type === 'icon') {
        updated.sizeRatio = dominantIsNumber ? 0.4 : 0.65;
      } else {
        updated.sizeRatio = 0.8;
      }
    }

    return updated;
  });

  return {
    ...scene,
    elements: repairedElements,
  };
}

/**
 * Generates a safe, beautifully styled fallback SceneSpec
 * adhering to ADR-004 Anchored Composition when LLM output is malformed.
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
    layout: 'monumental-hero',
    choreography: {
      entryDirection: 'bottom-up',
      drawSpeed: 'snappy',
      ambientMotion: 'gentle-float',
    },
    artDirection: {
      mood: 'analytical-tech',
      visualMetaphor: 'Fallback anchored visual safety preset',
    },
    elements: [
      {
        id: 'fallback-hero-text',
        type: 'text',
        text: safeText,
        variant: 'hero',
        align: 'center',
        glow: true,
        delay: 0,
        highlightWords: [],
      },
      {
        id: 'fallback-hero-icon',
        type: 'icon',
        name: 'Zap',
        size: 96,
        sizeRatio: 0.65,
        delay: 4,
        showRing: true,
        showGlow: true,
        anchorTo: {
          targetId: 'fallback-hero-text',
          point: 'cap-height-right',
          bridge: 'overlap',
        },
      },
    ],
  };
}

/**
 * Validates a raw input (string or object) as SceneSpec.
 * In case of failure, automatically builds a safe fallback scene.
 * Automatically repairs unanchored secondary elements on valid scenes.
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
    const repaired = repairAnchors(result.data);
    return {
      success: true,
      data: repaired,
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
 * Validates an array of scenes, repairing any broken scenes with fallbacks and anchor graphs.
 */
export function validateSceneArray(scenes: unknown[]): SceneSpec[] {
  return scenes.map((s, idx) => {
    const res = validateSceneSpec(s, { id: `scene-${idx + 1}` });
    return res.data;
  });
}
