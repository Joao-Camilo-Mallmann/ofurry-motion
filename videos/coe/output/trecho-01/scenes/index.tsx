import React from 'react';
import { Series } from 'remotion';
import { TrechoPackage, VideoPackage } from '../../../../../src/videos/types';
import { altaDiretaScene, AltaDiretaComponent } from './01-alta-direta';
import { tetoCallSpreadScene, TetoCallSpreadComponent } from './02-teto-call-spread';
import { naoEGratisScene, NaoEGratisComponent } from './03-nao-e-gratis';
import { cadeiaIntermediariosScene, CadeiaIntermediariosComponent } from './04-cadeia-intermediarios';
import { comissaoEmbutidaScene, ComissaoEmbutidaComponent } from './05-comissao-embutida';
import { strikeFalsaIgualdadeScene, StrikeFalsaIgualdadeComponent } from './06-strike-falsa-igualdade';
import { quantoSobraScene, QuantoSobraComponent } from './07-quanto-sobra';

export * from './01-alta-direta';
export * from './02-teto-call-spread';
export * from './03-nao-e-gratis';
export * from './04-cadeia-intermediarios';
export * from './05-comissao-embutida';
export * from './06-strike-falsa-igualdade';
export * from './07-quanto-sobra';

export const CoeTrecho01FullSequence: React.FC<{ transparent?: boolean }> = ({ transparent = false }) => {
  return (
    <Series>
      <Series.Sequence durationInFrames={altaDiretaScene.durationInFrames}>
        <AltaDiretaComponent transparent={transparent} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={tetoCallSpreadScene.durationInFrames}>
        <TetoCallSpreadComponent transparent={transparent} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={naoEGratisScene.durationInFrames}>
        <NaoEGratisComponent transparent={transparent} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={cadeiaIntermediariosScene.durationInFrames}>
        <CadeiaIntermediariosComponent transparent={transparent} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={comissaoEmbutidaScene.durationInFrames}>
        <ComissaoEmbutidaComponent transparent={transparent} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={strikeFalsaIgualdadeScene.durationInFrames}>
        <StrikeFalsaIgualdadeComponent transparent={transparent} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={quantoSobraScene.durationInFrames}>
        <QuantoSobraComponent transparent={transparent} />
      </Series.Sequence>
    </Series>
  );
};

export const trecho01Package: TrechoPackage = {
  id: 'trecho-01',
  title: 'Bloco 3: Mecânica de Ganho e Comissões',
  scenes: [
    altaDiretaScene,            // 01: 210 frames (7.0s)
    tetoCallSpreadScene,        // 02: 240 frames (8.0s)
    naoEGratisScene,            // 03: 105 frames (3.5s)
    cadeiaIntermediariosScene,  // 04: 135 frames (4.5s)
    comissaoEmbutidaScene,      // 05: 105 frames (3.5s)
    strikeFalsaIgualdadeScene,  // 06: 120 frames (4.0s)
    quantoSobraScene,           // 07: 135 frames (4.5s)
  ],
  fullSequenceComponent: CoeTrecho01FullSequence,
};

