import { SceneSpec } from '../../../src/director/schema';

export const scene: SceneSpec = {
  id: 'cena-03-comissoes-ocultas',
  durationInFrames: 135,
  layout: 'radial-network',
  choreography: {
    entryDirection: 'radial-burst',
    drawSpeed: 'snappy',
    ambientMotion: 'grid-drift',
  },
  artDirection: {
    mood: 'analytical-tech',
    visualMetaphor: 'A cadeia de comissões oculta que drena o dinheiro do investidor',
  },
  elements: [
    {
      type: 'text',
      text: 'COMISSÕES OCULTAS',
      subtitle: 'Para onde realmente vai o seu dinheiro?',
      variant: 'title',
      highlightWords: ['OCULTAS'],
      font: 'bebas',
      align: 'center',
    },
    {
      type: 'nodes',
      width: 940,
      height: 480,
      drawDuration: 28,
      nodes: [
        { id: 'banco', x: 50, y: 48, label: 'Emissor / Banco', icon: 'Landmark', isPrimary: true },
        { id: 'assessor', x: 18, y: 25, label: 'Comissão Assessor', icon: 'Percent' },
        { id: 'corretora', x: 82, y: 25, label: 'Margem Corretora', icon: 'Briefcase' },
        { id: 'investidor', x: 50, y: 85, label: 'Investidor (Você)', icon: 'UserX' },
      ],
      connections: [
        { from: 'investidor', to: 'banco' },
        { from: 'banco', to: 'assessor' },
        { from: 'banco', to: 'corretora' },
      ],
    },
  ],
};

export default scene;
