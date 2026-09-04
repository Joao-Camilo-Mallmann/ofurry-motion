import { SceneSpec } from '../../../src/director/schema';

export const scene: SceneSpec = {
  id: 'cena-p02-risco-zero',
  durationInFrames: 90,
  layout: 'centered-hero',
  choreography: {
    entryDirection: 'bottom-up',
    drawSpeed: 'snappy',
    ambientMotion: 'pulse-glow',
  },
  artDirection: {
    mood: 'analytical-tech',
    visualMetaphor: 'A promessa mágica de arriscar pouco sem perder segurança',
  },
  elements: [
    {
      type: 'text',
      text: 'RISCO ZERO?',
      subtitle: 'Arriscar pouco sem abrir mão da segurança',
      variant: 'hero',
      highlightWords: ['ZERO?'],
      font: 'archivo',
      glow: true,
    },
    {
      type: 'icon',
      name: 'ShieldCheck',
      size: 100,
      showRing: true,
    },
  ],
};

export default scene;
