import { SceneSpec } from '../../../src/director/schema';

export const scene: SceneSpec = {
  id: 'cena-p03-dois-mundos',
  durationInFrames: 150,
  layout: 'split-right',
  choreography: {
    entryDirection: 'bottom-up',
    drawSpeed: 'snappy',
    ambientMotion: 'grid-drift',
  },
  artDirection: {
    mood: 'aggressive-alert',
    visualMetaphor: 'O mito da conciliação perfeita entre retorno máximo e risco zero',
  },
  elements: [
    {
      type: 'icon',
      name: 'Layers',
      size: 110,
      showRing: true,
      showGlow: true,
    },
    {
      type: 'text',
      text: 'MELHOR DOS DOIS MUNDOS',
      subtitle: 'Muito bonito no discurso comercial',
      variant: 'hero',
      highlightWords: ['DOIS', 'MUNDOS'],
      font: 'archivo',
      align: 'left',
    },
  ],
};

export default scene;
