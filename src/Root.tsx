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
import { coeBloco2Scenes } from '../example/coe-bloco2-script';
import { coeBloco3Scenes } from '../example/coe-bloco3-script';
import {
  BespokeBloco2Sequence,
  Scene1PatrimonioSeguro,
  Scene2ArmadilhaBloqueada,
  Scene3MaquinaDeVendas,
} from './composition/scenes/BespokeBloco2Scenes';
import {
  BespokeBloco3Sequence,
  Scene1AbrirProduto,
  Scene2DuasCoisas,
  Scene3ProtegerCapital,
  Scene4BuscarGanhos,
  Scene5AtivosReferencia,
  Scene6DivisaoCapital,
  Scene7RendaFixaMotor,
  Scene8TetoCallSpread,
  Scene9InflacaoCorrosao,
  Scene10PerguntasDecisivas,
} from './composition/scenes/BespokeBloco3Scenes';
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
  const totalBloco2Frames = coeBloco2Scenes.reduce((acc, s) => acc + (s.durationInFrames ?? 90), 0);
  const totalBloco3Frames = coeBloco3Scenes.reduce((acc, s) => acc + (s.durationInFrames ?? 90), 0);
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

      {/* Composição Bloco 2 — Fato Chocante / Padrão Repetido (Full Sequence 10s) */}
      <Composition
        id="COEBloco2Composition"
        component={MainVideo as unknown as React.FC<Record<string, unknown>>}
        durationInFrames={totalBloco2Frames}
        fps={OFurryTheme.layout.fps}
        width={OFurryTheme.layout.width}
        height={OFurryTheme.layout.height}
        defaultProps={{
          scenes: coeBloco2Scenes,
          transparent: false,
        }}
      />

      {/* Mini-Vídeos Bloco 2 por Cena com Canal Alpha NATIVO (ProRes 4444 / WebM) */}
      {coeBloco2Scenes.map((scene, idx) => (
        <Composition
          key={`coe-b02-${scene.id}`}
          id={`COEB2-Cena-${idx + 1}-${scene.id}`}
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

      {/* ========================================================= */}
      {/* 🚀 BESPOKE KINETIC MOTION GRAPHICS (BLOCO 2 - 10s)        */}
      {/* Visual cinematográfico direto com animações ricas & Alpha  */}
      {/* ========================================================= */}
      <Composition
        id="KineticBloco2-Full-10s"
        component={BespokeBloco2Sequence as unknown as React.FC<Record<string, unknown>>}
        durationInFrames={300}
        fps={OFurryTheme.layout.fps}
        width={OFurryTheme.layout.width}
        height={OFurryTheme.layout.height}
        defaultProps={{
          transparent: false,
        }}
      />

      <Composition
        id="KineticB2-Cena-1-Patrimonio-Seguro"
        component={Scene1PatrimonioSeguro as unknown as React.FC<Record<string, unknown>>}
        durationInFrames={105}
        fps={OFurryTheme.layout.fps}
        width={OFurryTheme.layout.width}
        height={OFurryTheme.layout.height}
        defaultProps={{
          transparent: true,
        }}
      />

      <Composition
        id="KineticB2-Cena-2-Armadilha-Bloqueada"
        component={Scene2ArmadilhaBloqueada as unknown as React.FC<Record<string, unknown>>}
        durationInFrames={90}
        fps={OFurryTheme.layout.fps}
        width={OFurryTheme.layout.width}
        height={OFurryTheme.layout.height}
        defaultProps={{
          transparent: true,
        }}
      />

      <Composition
        id="KineticB2-Cena-3-Maquina-De-Vendas"
        component={Scene3MaquinaDeVendas as unknown as React.FC<Record<string, unknown>>}
        durationInFrames={105}
        fps={OFurryTheme.layout.fps}
        width={OFurryTheme.layout.width}
        height={OFurryTheme.layout.height}
        defaultProps={{
          transparent: true,
        }}
      />

      {/* ========================================================= */}
      {/* 📊 DECLARATIVE BLOCO 3 (5 CENAS - 17s)                    */}
      {/* ========================================================= */}
      <Composition
        id="COEBloco3Composition"
        component={MainVideo as unknown as React.FC<Record<string, unknown>>}
        durationInFrames={totalBloco3Frames}
        fps={OFurryTheme.layout.fps}
        width={OFurryTheme.layout.width}
        height={OFurryTheme.layout.height}
        defaultProps={{
          scenes: coeBloco3Scenes,
          transparent: false,
        }}
      />

      {/* Mini-Vídeos Bloco 3 Declarativo por Cena com Canal Alpha NATIVO */}
      {coeBloco3Scenes.map((scene, idx) => (
        <Composition
          key={`coe-b03-${scene.id}`}
          id={`COEB3-Cena-${idx + 1}-${scene.id}`}
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

      {/* ========================================================= */}
      {/* 🚀 BESPOKE KINETIC MOTION GRAPHICS (BLOCO 3 - 38s)        */}
      {/* Visual cinematográfico direto com animações ricas & Alpha  */}
      {/* ========================================================= */}
      <Composition
        id="KineticBloco3-Full-38s"
        component={BespokeBloco3Sequence as unknown as React.FC<Record<string, unknown>>}
        durationInFrames={1140}
        fps={OFurryTheme.layout.fps}
        width={OFurryTheme.layout.width}
        height={OFurryTheme.layout.height}
        defaultProps={{
          transparent: false,
        }}
      />

      <Composition
        id="KineticB3-Cena-1-Abrir-Produto"
        component={Scene1AbrirProduto as unknown as React.FC<Record<string, unknown>>}
        durationInFrames={150}
        fps={OFurryTheme.layout.fps}
        width={OFurryTheme.layout.width}
        height={OFurryTheme.layout.height}
        defaultProps={{
          transparent: true,
        }}
      />

      <Composition
        id="KineticB3-Cena-2-Duas-Coisas"
        component={Scene2DuasCoisas as unknown as React.FC<Record<string, unknown>>}
        durationInFrames={90}
        fps={OFurryTheme.layout.fps}
        width={OFurryTheme.layout.width}
        height={OFurryTheme.layout.height}
        defaultProps={{
          transparent: true,
        }}
      />

      <Composition
        id="KineticB3-Cena-3-Proteger-Capital"
        component={Scene3ProtegerCapital as unknown as React.FC<Record<string, unknown>>}
        durationInFrames={90}
        fps={OFurryTheme.layout.fps}
        width={OFurryTheme.layout.width}
        height={OFurryTheme.layout.height}
        defaultProps={{
          transparent: true,
        }}
      />

      <Composition
        id="KineticB3-Cena-4-Buscar-Ganhos"
        component={Scene4BuscarGanhos as unknown as React.FC<Record<string, unknown>>}
        durationInFrames={90}
        fps={OFurryTheme.layout.fps}
        width={OFurryTheme.layout.width}
        height={OFurryTheme.layout.height}
        defaultProps={{
          transparent: true,
        }}
      />

      <Composition
        id="KineticB3-Cena-5-Ativos-Referencia"
        component={Scene5AtivosReferencia as unknown as React.FC<Record<string, unknown>>}
        durationInFrames={90}
        fps={OFurryTheme.layout.fps}
        width={OFurryTheme.layout.width}
        height={OFurryTheme.layout.height}
        defaultProps={{
          transparent: true,
        }}
      />

      <Composition
        id="KineticB3-Cena-6-Divisao-Capital"
        component={Scene6DivisaoCapital as unknown as React.FC<Record<string, unknown>>}
        durationInFrames={120}
        fps={OFurryTheme.layout.fps}
        width={OFurryTheme.layout.width}
        height={OFurryTheme.layout.height}
        defaultProps={{
          transparent: true,
        }}
      />

      <Composition
        id="KineticB3-Cena-7-Renda-Fixa-Motor"
        component={Scene7RendaFixaMotor as unknown as React.FC<Record<string, unknown>>}
        durationInFrames={120}
        fps={OFurryTheme.layout.fps}
        width={OFurryTheme.layout.width}
        height={OFurryTheme.layout.height}
        defaultProps={{
          transparent: true,
        }}
      />

      <Composition
        id="KineticB3-Cena-8-Teto-Call-Spread"
        component={Scene8TetoCallSpread as unknown as React.FC<Record<string, unknown>>}
        durationInFrames={135}
        fps={OFurryTheme.layout.fps}
        width={OFurryTheme.layout.width}
        height={OFurryTheme.layout.height}
        defaultProps={{
          transparent: true,
        }}
      />

      <Composition
        id="KineticB3-Cena-9-Inflacao-Corrosao"
        component={Scene9InflacaoCorrosao as unknown as React.FC<Record<string, unknown>>}
        durationInFrames={135}
        fps={OFurryTheme.layout.fps}
        width={OFurryTheme.layout.width}
        height={OFurryTheme.layout.height}
        defaultProps={{
          transparent: true,
        }}
      />

      <Composition
        id="KineticB3-Cena-10-Perguntas-Decisivas"
        component={Scene10PerguntasDecisivas as unknown as React.FC<Record<string, unknown>>}
        durationInFrames={120}
        fps={OFurryTheme.layout.fps}
        width={OFurryTheme.layout.width}
        height={OFurryTheme.layout.height}
        defaultProps={{
          transparent: true,
        }}
      />
    </>
  );
};
