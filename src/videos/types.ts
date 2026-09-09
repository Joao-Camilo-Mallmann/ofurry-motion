import React from 'react';
import { SceneSpec } from '../director/schema';

/**
 * Bespoke React / Remotion Scene Component
 */
export interface BespokeScene {
  id: string;
  name?: string;
  durationInFrames: number;
  component: React.ComponentType<{ transparent?: boolean; [key: string]: any }>;
  fps?: number;
  width?: number;
  height?: number;
  spec?: SceneSpec;
}

/**
 * Union type supporting both declarative SceneSpec and custom Bespoke Remotion scenes
 */
export type VideoScene = SceneSpec | BespokeScene;

/**
 * Type guard for BespokeScene
 */
export function isBespokeScene(scene: VideoScene): scene is BespokeScene {
  return 'component' in scene && typeof (scene as any).component === 'function';
}

/**
 * Type guard for SceneSpec
 */
export function isSceneSpec(scene: VideoScene): scene is SceneSpec {
  return 'elements' in scene && Array.isArray((scene as any).elements);
}

/**
 * Helper to get the frame duration of any VideoScene
 */
export function getSceneDuration(scene: VideoScene, defaultDuration = 90): number {
  return scene.durationInFrames ?? defaultDuration;
}

/**
 * Modular Scene Definition wrapper
 */
export interface SceneModule {
  id: string;
  title?: string;
  scene: VideoScene;
}

/**
 * Incremental Trecho Package definition
 */
export interface TrechoPackage {
  id: string; // e.g. 'trecho-01'
  title?: string;
  scenes: VideoScene[];
  fullSequenceComponent?: React.ComponentType<{ transparent?: boolean }>;
}

/**
 * Self-contained Video Package definition
 */
export interface VideoPackage {
  id: string;
  title: string;
  fps?: number;
  width?: number;
  height?: number;
  scenes?: VideoScene[];
  trechos?: TrechoPackage[];
  fullSequenceComponent?: React.ComponentType<{ transparent?: boolean }>;
}

