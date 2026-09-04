import { SceneSpec } from '../../../src/director/schema';

export const scene: SceneSpec = {
  id: 'cena-04-desempenho-real',
  durationInFrames: 135,
  layout: 'centered-hero',
  choreography: {
    entryDirection: 'bottom-up',
    drawSpeed: 'snappy',
    ambientMotion: 'grid-drift',
  },
  artDirection: {
    mood: 'analytical-tech',
    visualMetaphor: 'Comparativo de rentabilidade real contra a inflação',
  },
  elements: [
    {
      type: 'text',
      text: 'PERFORMANCE REAL',
      subtitle: 'Após 5 anos travado com liquidez zero',
      variant: 'title',
      highlightWords: ['REAL'],
      font: 'archivo',
      align: 'center',
    },
    {
      type: 'chart',
      chartType: 'line',
      width: 920,
      height: 420,
      drawDuration: 35,
      showGrid: true,
      highlightLast: true,
      data: [
        { label: 'Ano 1', value: 100 },
        { label: 'Ano 2', value: 104 },
        { label: 'Ano 3', value: 107 },
        { label: 'Ano 4', value: 109 },
        { label: 'Ano 5', value: 112 },
      ],
    },
  ],
};

export default scene;
