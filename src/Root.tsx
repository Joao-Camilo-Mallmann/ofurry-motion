import React from 'react';
import { Composition, Series } from 'remotion';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';
import '@fontsource/montserrat/800.css';
import '@fontsource/montserrat/900.css';

import { OFurryTheme } from './theme/ofurry';
import { SceneComposer } from './composition/SceneComposer';
import { sampleScenes } from '../example/sample-script';
import { SceneSpec } from './director/schema';

export interface MainVideoProps {
  scenes: SceneSpec[];
}

export const MainVideo: React.FC<MainVideoProps> = ({ scenes }) => {
  return (
    <Series>
      {scenes.map((scene) => (
        <Series.Sequence
          key={scene.id}
          durationInFrames={scene.durationInFrames ?? 90}
          name={scene.id}
        >
          <SceneComposer scene={scene} />
        </Series.Sequence>
      ))}
    </Series>
  );
};

export const RemotionRoot: React.FC = () => {
  const totalFrames = sampleScenes.reduce((acc, s) => acc + (s.durationInFrames ?? 90), 0);

  return (
    <>
      {/* Complete Video Composition */}
      <Composition
        id="OFurryComposition"
        component={MainVideo as unknown as React.FC<Record<string, unknown>>}
        durationInFrames={totalFrames}
        fps={OFurryTheme.layout.fps}
        width={OFurryTheme.layout.width}
        height={OFurryTheme.layout.height}
        defaultProps={{
          scenes: sampleScenes,
        }}
      />

      {/* Individual Scene Previews for Fine-Tuning */}
      {sampleScenes.map((scene, idx) => (
        <Composition
          key={`preview-${scene.id}`}
          id={`Scene-${idx + 1}-${scene.id}`}
          component={SceneComposer as unknown as React.FC<Record<string, unknown>>}
          durationInFrames={scene.durationInFrames ?? 90}
          fps={OFurryTheme.layout.fps}
          width={OFurryTheme.layout.width}
          height={OFurryTheme.layout.height}
          defaultProps={{
            scene,
          }}
        />
      ))}
    </>
  );
};
