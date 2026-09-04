import { SceneSpec } from '../../../src/director/schema';

export const scene: SceneSpec = {
  id: 'cena-p04-funciona-mesmo',
  durationInFrames: 105,
  layout: 'centered-hero',
  choreography: {
    entryDirection: 'bottom-up',
    drawSpeed: 'snappy',
    ambientMotion: 'pulse-glow',
  },
  artDirection: {
    mood: 'aggressive-alert',
    visualMetaphor: 'O choque de realidade — a pergunta que desmascara',
  },
  elements: [
    {
      type: 'text',
      text: 'FUNCIONA MESMO?',
      subtitle: 'A pergunta que desmascara o produto',
      variant: 'hero',
      highlightWords: ['FUNCIONA', 'MESMO?'],
      font: 'archivo',
      glow: true,
    },
    {
      type: 'icon',
      name: 'HelpCircle',
      size: 115,
      showRing: true,
      showGlow: true,
    },
  ],
};

export default scene;
