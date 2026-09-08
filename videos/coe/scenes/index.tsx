import React from 'react';
import { Series } from 'remotion';
import { VideoPackage } from '../../../src/videos/types';
import { altaDiretaScene, AltaDiretaComponent } from './01-alta-direta';
import { tetoCallSpreadScene, TetoCallSpreadComponent } from './02-teto-call-spread';

export * from './01-alta-direta';
export * from './02-teto-call-spread';

export const CoeFullSequence: React.FC<{ transparent?: boolean }> = ({ transparent = false }) => {
  return (
    <Series>
      <Series.Sequence durationInFrames={altaDiretaScene.durationInFrames}>
        <AltaDiretaComponent transparent={transparent} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={tetoCallSpreadScene.durationInFrames}>
        <TetoCallSpreadComponent transparent={transparent} />
      </Series.Sequence>
    </Series>
  );
};

export const coeVideoPackage: VideoPackage = {
  id: 'coe',
  title: 'Por Que COE É Uma Merda',
  scenes: [
    altaDiretaScene,      // 210 frames (7.0s)
    tetoCallSpreadScene,  // 240 frames (8.0s)
  ],
  fullSequenceComponent: CoeFullSequence,
};
