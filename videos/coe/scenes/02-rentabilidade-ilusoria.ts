import { SceneSpec } from '../../../src/director/schema';

export const scene: SceneSpec = {
  id: 'cena-02-rentabilidade-ilusoria',
  durationInFrames: 120,
  layout: 'split-right',
  choreography: {
    entryDirection: 'bottom-up',
    drawSpeed: 'snappy',
    ambientMotion: 'pulse-glow',
  },
  artDirection: {
    mood: 'aggressive-alert',
    visualMetaphor: 'Promessa de ganho astronômico que esconde taxas e perdas reais',
  },
  elements: [
    {
      type: 'text',
      text: 'RENTABILIDADE ILUSÓRIA',
      subtitle: 'Prometem ganhos infinitos com capital protegido',
      variant: 'title',
      highlightWords: ['ILUSÓRIA'],
      font: 'syne',
      align: 'left',
    },
    {
      type: 'number',
      value: 180,
      prefix: '+',
      suffix: '%',
      label: 'Teto Prometido',
      variant: 'hero',
    },
    {
      type: 'icon',
      name: 'TrendingUp',
      size: 96,
      showRing: true,
    },
  ],
};

export default scene;
