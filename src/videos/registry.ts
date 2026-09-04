import { VideoPackage, VideoScene, isBespokeScene } from './types';
import { coeVideoPackage } from '../../videos/coe/scenes';

/**
 * Registry of all production video packages in the project.
 * Videos registered here will automatically be discovered by Remotion Studio and the CLI render scripts.
 */
export const videoRegistry: Record<string, VideoPackage> = {
  coe: coeVideoPackage,
};

/**
 * Register a video package in the registry.
 */
export function registerVideo(video: VideoPackage): void {
  videoRegistry[video.id] = video;
}

/**
 * Retrieve a registered video package by ID (case-insensitive).
 */
export function getVideo(id: string): VideoPackage | undefined {
  if (videoRegistry[id]) return videoRegistry[id];
  const target = id.toLowerCase();
  return Object.values(videoRegistry).find((v) => v.id.toLowerCase() === target);
}

/**
 * Get all registered video packages as an array.
 */
export function getAllVideos(): VideoPackage[] {
  return Object.values(videoRegistry);
}

/**
 * Get a list of all registered video IDs.
 */
export function listVideoIds(): string[] {
  return Object.keys(videoRegistry);
}

/**
 * Find a specific scene within a registered video.
 */
export function getVideoScene(videoId: string, sceneId: string): VideoScene | undefined {
  const video = getVideo(videoId);
  if (!video) return undefined;

  const target = sceneId.toLowerCase();
  return video.scenes.find((s) => {
    const idLower = s.id.toLowerCase();
    return (
      idLower === target ||
      idLower.includes(target) ||
      idLower.endsWith(`-${target}`)
    );
  });
}
