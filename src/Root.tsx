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
import { promessaScenes } from '../example/promessa-script';
import { coePromessaScenes } from '../example/coe-promessa-script';
import { anchoredSilhouettesScenes } from '../example/anchored-silhouettes-script';
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
  const totalPromessaFrames = promessaScenes.reduce((acc, s) => acc + (s.durationInFrames ?? 90), 0);
  const totalCoePromessaFrames = coePromessaScenes.reduce((acc, s) => acc + (s.durationInFrames ?? 90), 0);
  const totalAnchoredFrames = anchoredSilhouettesScenes.reduce((acc, s) => acc + (s.durationInFrames ?? 90), 0);

  return (
    <>
      {/* Composição ADR-004 Silhuetas Ancoradas (Full Showcase) */}
      <Composition
        id="AnchoredSilhouettesComposition"
        component={MainVideo as unknown as React.FC<Record<string, unknown>>}
        durationInFrames={totalAnchoredFrames}
        fps={OFurryTheme.layout.fps}
        width={OFurryTheme.layout.width}
        height={OFurryTheme.layout.height}
        defaultProps={{
          scenes: anchoredSilhouettesScenes,
          transparent: false,
        }}
      />

      {/* Mini-Vídeos Individuais ADR-004 com Canal Alpha NATIVO */}
      {anchoredSilhouettesScenes.map((scene, idx) => (
        <Composition
          key={`adr04-${scene.id}`}
          id={`ADR04-Cena-${idx + 1}-${scene.id}`}
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

      {/* Composição do Vídeo Promessa (Full Sequence) */}
      <Composition
        id="PromessaComposition"
        component={MainVideo as unknown as React.FC<Record<string, unknown>>}
        durationInFrames={totalPromessaFrames}
        fps={OFurryTheme.layout.fps}
        width={OFurryTheme.layout.width}
        height={OFurryTheme.layout.height}
        defaultProps={{
          scenes: promessaScenes,
          transparent: false,
        }}
      />

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
          scene: anchoredSilhouettesScenes[0],
          transparent: true,
        }}
      />

      {/* Mini-Vídeos Promessa com Canal Alpha NATIVO (ProRes 4444 / WebM / Timeline Preview) */}
      {promessaScenes.map((scene, idx) => (
        <Composition
          key={`promessa-${scene.id}`}
          id={`Promessa-Cena-${idx + 1}-${scene.id}`}
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

      {/* Mini-Vídeos Individuais COE por Cena com Canal Alpha NATIVO */}
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

      {/* Composição COE Promessa — "Será Mesmo?" (Full Sequence 15s) */}
      <Composition
        id="COEPromessaComposition"
        component={MainVideo as unknown as React.FC<Record<string, unknown>>}
        durationInFrames={totalCoePromessaFrames}
        fps={OFurryTheme.layout.fps}
        width={OFurryTheme.layout.width}
        height={OFurryTheme.layout.height}
        defaultProps={{
          scenes: coePromessaScenes,
          transparent: false,
        }}
      />

      {/* Mini-Vídeos COE Promessa por Cena com Canal Alpha NATIVO */}
      {coePromessaScenes.map((scene, idx) => (
        <Composition
          key={`coe-promessa-${scene.id}`}
          id={`COEPromessa-Cena-${idx + 1}-${scene.id}`}
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
