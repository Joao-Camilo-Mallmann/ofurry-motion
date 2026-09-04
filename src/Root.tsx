import React from 'react';
import { Composition, Series } from 'remotion';

// Load Motion Design Font Packages Locally for Instant Deterministic Rendering
import '@fontsource/archivo-black';
import '@fontsource/bebas-neue';
import '@fontsource/syne';
import '@fontsource/space-grotesk';
import '@fontsource/plus-jakarta-sans';
import '@fontsource/montserrat';

import { OFurryTheme } from './theme/ofurry';
import { SceneComposer } from './composition/SceneComposer';
import { SceneSpec } from './director/schema';
import { getAllVideos } from './videos/registry';
import { VideoScene, isBespokeScene } from './videos/types';

export interface MainVideoProps {
  scenes: VideoScene[];
  transparent?: boolean;
}

export const MainVideo: React.FC<MainVideoProps> = ({ scenes, transparent = false }) => {
  return (
    <Series>
      {scenes.map((scene) => {
        const duration = scene.durationInFrames ?? 90;
        return (
          <Series.Sequence
            key={scene.id}
            durationInFrames={duration}
            name={scene.id}
          >
            {isBespokeScene(scene) ? (
              <scene.component transparent={transparent} />
            ) : (
              <SceneComposer scene={scene as SceneSpec} transparent={transparent} />
            )}
          </Series.Sequence>
        );
      })}
    </Series>
  );
};

export const RemotionRoot: React.FC = () => {
  const videos = getAllVideos();

  return (
    <>
      {videos.length === 0 && (
        <Composition
          id="Placeholder"
          component={() => null}
          durationInFrames={30}
          fps={OFurryTheme.layout.fps}
          width={OFurryTheme.layout.width}
          height={OFurryTheme.layout.height}
        />
      )}

      {videos.map((video) => {
        const totalVideoFrames = Math.max(
          1,
          video.scenes.reduce((acc, s) => acc + (s.durationInFrames ?? 90), 0)
        );
        const fps = video.fps ?? OFurryTheme.layout.fps;
        const width = video.width ?? OFurryTheme.layout.width;
        const height = video.height ?? OFurryTheme.layout.height;

        return (
          <React.Fragment key={video.id}>
            {/* Composição de Sequência Completa do Vídeo */}
            <Composition
              id={`${video.id}-Full-Sequence`}
              component={
                (video.fullSequenceComponent ?? MainVideo) as unknown as React.FC<Record<string, unknown>>
              }
              durationInFrames={totalVideoFrames}
              fps={fps}
              width={width}
              height={height}
              defaultProps={{
                scenes: video.scenes,
                transparent: false,
              }}
            />

            {/* Backwards-compatible alias for COE full sequence if applicable */}
            {video.id.toLowerCase() === 'coe' && (
              <Composition
                id="COEComposition"
                component={
                  (video.fullSequenceComponent ?? MainVideo) as unknown as React.FC<Record<string, unknown>>
                }
                durationInFrames={totalVideoFrames}
                fps={fps}
                width={width}
                height={height}
                defaultProps={{
                  scenes: video.scenes,
                  transparent: false,
                }}
              />
            )}

            {/* Mini-Vídeos Individuais por Cena com Canal Alpha NATIVO */}
            {video.scenes.map((scene, idx) => {
              const sceneNumber = String(idx + 1).padStart(2, '0');
              const compId = `${video.id}-Cena-${sceneNumber}-${scene.id}`;
              const duration = scene.durationInFrames ?? 90;
              const sceneFps = isBespokeScene(scene) ? (scene.fps ?? fps) : fps;
              const sceneWidth = isBespokeScene(scene) ? (scene.width ?? width) : width;
              const sceneHeight = isBespokeScene(scene) ? (scene.height ?? height) : height;

              if (isBespokeScene(scene)) {
                return (
                  <Composition
                    key={`${video.id}-${scene.id}`}
                    id={compId}
                    component={scene.component as unknown as React.FC<Record<string, unknown>>}
                    durationInFrames={duration}
                    fps={sceneFps}
                    width={sceneWidth}
                    height={sceneHeight}
                    defaultProps={{
                      transparent: true,
                    }}
                  />
                );
              }

              return (
                <Composition
                  key={`${video.id}-${scene.id}`}
                  id={compId}
                  component={SceneComposer as unknown as React.FC<Record<string, unknown>>}
                  durationInFrames={duration}
                  fps={sceneFps}
                  width={sceneWidth}
                  height={sceneHeight}
                  defaultProps={{
                    scene,
                    transparent: true,
                  }}
                />
              );
            })}
          </React.Fragment>
        );
      })}
    </>
  );
};
