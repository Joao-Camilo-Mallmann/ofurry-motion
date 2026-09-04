import { SceneSpec } from '../../../src/director/schema';

export const scene: SceneSpec = {
  id: 'cena-05-conclusao-liberdade',
  durationInFrames: 120,
  layout: 'centered-hero',
  choreography: {
    entryDirection: 'bottom-up',
    drawSpeed: 'snappy',
    ambientMotion: 'pulse-glow',
  },
  artDirection: {
    mood: 'optimistic-growth',
    visualMetaphor: 'Liberdade financeira e investimentos com autonomia total',
  },
  elements: [
    {
      type: 'text',
      text: 'COE NUNCA MAIS',
      subtitle: 'Assuma o controle direto dos seus investimentos',
      variant: 'hero',
      highlightWords: ['NUNCA', 'MAIS'],
      font: 'archivo',
      glow: true,
    },
    {
      type: 'icon',
      name: 'Flame',
      size: 110,
      showRing: true,
    },
  ],
};

export default scene;
