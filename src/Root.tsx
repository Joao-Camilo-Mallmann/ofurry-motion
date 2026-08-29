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
import { sampleScenes } from '../example/sample-script';
import { coeScenes } from '../example/coe-script';
import { SceneSpec } from './director/schema';

export interface MainVideoProps {
  scenes: SceneSpec[];
  transparent?: boolean;
}

export const MainVideo: React.FC<MainVideoProps> = ({ scenes, transparent = false }) => {
  return (
    <Series>
      {scenes.map((scene) => (
        <Series.Sequence
          key={scene.id}
          durationInFrames={scene.durationInFrames ?? 90}
          name={scene.id}
        >
          <SceneComposer scene={scene} transparent={transparent} />
        </Series.Sequence>
      ))}
    </Series>
  );
};

export const RemotionRoot: React.FC = () => {
  const totalSampleFrames = sampleScenes.reduce((acc, s) => acc + (s.durationInFrames ?? 90), 0);
  const totalCoeFrames = coeScenes.reduce((acc, s) => acc + (s.durationInFrames ?? 90), 0);

  return (
    <>
      {/* Composição do Vídeo do COE (Full Sequence) */}
      <Composition
        id="COEComposition"
        component={MainVideo as unknown as React.FC<Record<string, unknown>>}
        durationInFrames={totalCoeFrames}
        fps={OFurryTheme.layout.fps}
        width={OFurryTheme.layout.width}
        height={OFurryTheme.layout.height}
        defaultProps={{
          scenes: coeScenes,
          transparent: false,
        }}
      />

      {/* Composição de Demonstração Geral */}
      <Composition
        id="OFurryComposition"
        component={MainVideo as unknown as React.FC<Record<string, unknown>>}
        durationInFrames={totalSampleFrames}
        fps={OFurryTheme.layout.fps}
        width={OFurryTheme.layout.width}
        height={OFurryTheme.layout.height}
        defaultProps={{
          scenes: sampleScenes,
          transparent: false,
        }}
      />

      {/* Composição Genérica de Cena com Transparência Alpha para Scripts de Renderização */}
      <Composition
        id="SceneOverlay"
        component={SceneComposer as unknown as React.FC<Record<string, unknown>>}
        durationInFrames={120}
        fps={OFurryTheme.layout.fps}
        width={OFurryTheme.layout.width}
        height={OFurryTheme.layout.height}
        defaultProps={{
          scene: coeScenes[0],
          transparent: true,
        }}
      />

      {/* Mini-Vídeos Individuais por Cena com Canal Alpha NATIVO (ProRes 4444 / WebM / Timeline Preview) */}
      {coeScenes.map((scene, idx) => (
        <Composition
          key={`coe-${scene.id}`}
          id={`COE-Cena-${idx + 1}-${scene.id}`}
          component={SceneComposer as unknown as React.FC<Record<string, unknown>>}
          durationInFrames={scene.durationInFrames ?? 90}
          fps={OFurryTheme.layout.fps}
          width={OFurryTheme.layout.width}
          height={OFurryTheme.layout.height}
          defaultProps={{
            scene,
            transparent: true,
          }}
        />
      ))}
    </>
  );
};

