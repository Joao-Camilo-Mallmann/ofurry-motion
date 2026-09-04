import { SceneSpec } from '../../../src/director/schema';

export const scene: SceneSpec = {
  id: 'cena-01-alerta-coe',
  durationInFrames: 120,
  layout: 'centered-hero',
  choreography: {
    entryDirection: 'bottom-up',
    drawSpeed: 'snappy',
    ambientMotion: 'pulse-glow',
  },
  artDirection: {
    mood: 'aggressive-alert',
    visualMetaphor: 'Alerta de produto financeiro empurrado com tarja de perigo',
  },
  elements: [
    {
      type: 'text',
      text: 'CUIDADO COM O COE',
      subtitle: 'O produto mais empurrado do mercado financeiro',
      variant: 'hero',
      highlightWords: ['COE'],
      font: 'archivo',
      glow: true,
    },
    {
      type: 'icon',
      name: 'ShieldAlert',
      size: 110,
      showRing: true,
      showGlow: true,
    },
  ],
};

export default scene;
