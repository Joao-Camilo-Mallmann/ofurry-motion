import { SceneSpec } from '../../../src/director/schema';

export const scene: SceneSpec = {
  id: 'cena-p01-coe-no-papel',
  durationInFrames: 105,
  layout: 'split-left',
  choreography: {
    entryDirection: 'bottom-up',
    drawSpeed: 'snappy',
    ambientMotion: 'grid-drift',
  },
  artDirection: {
    mood: 'analytical-tech',
    visualMetaphor: 'O documento sedutor que vende a ilusão de segurança',
  },
  elements: [
    {
      type: 'text',
      text: 'COE NO PAPEL',
      subtitle: 'A teoria que seduz o investidor',
      variant: 'hero',
      highlightWords: ['COE'],
      font: 'syne',
      align: 'left',
    },
    {
      type: 'icon',
      name: 'FileText',
      size: 110,
      showRing: true,
      showGlow: true,
    },
  ],
};

export default scene;
