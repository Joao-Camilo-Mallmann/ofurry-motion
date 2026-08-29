import { SceneSpec } from '../src/director/schema';

/**
 * Sample OFurry Video Script & Scene Sequence
 * High impact, tech-infographic style motion graphics
 */
export const sampleScenes: SceneSpec[] = [
  // Scene 1: Rentabilidade e Crescimento
  {
    id: 'scene-1-growth',
    durationInFrames: 90, // 3.0s
    layout: 'split-right',
    choreography: {
      entryDirection: 'bottom-up',
      drawSpeed: 'snappy',
      ambientMotion: 'pulse-glow',
    },
    artDirection: {
      mood: 'optimistic-growth',
      visualMetaphor: 'Explosão de rentabilidade e quebra de recorde',
    },
    elements: [
      {
        type: 'text',
        text: 'RETORNO HISTÓRICO',
        subtitle: 'Performance acumulada no ciclo',
        variant: 'title',
        highlightWords: ['HISTÓRICO'],
        align: 'left',
        delay: 0,
      },
      {
        type: 'number',
        value: 154.8,
        prefix: '+',
        suffix: '%',
        decimals: 1,
        label: 'Rentabilidade Líquida',
        variant: 'card',
        delay: 4,
      },
      {
        type: 'icon',
        name: 'TrendingUp',
        size: 80,
        delay: 6,
        showRing: true,
        showGlow: true,
      },
    ],
  },

  // Scene 2: Rede Descentralizada & Nós Tecnológicos
  {
    id: 'scene-2-network',
    durationInFrames: 105, // 3.5s
    layout: 'radial-network',
    choreography: {
      entryDirection: 'radial-burst',
      drawSpeed: 'smooth-draw',
      ambientMotion: 'grid-drift',
    },
    artDirection: {
      mood: 'analytical-tech',
      visualMetaphor: 'Malha de validação criptográfica inviolável',
    },
    elements: [
      {
        type: 'text',
        text: 'REDE DESCENTRALIZADA',
        variant: 'badge',
        highlightWords: ['DESCENTRALIZADA'],
        align: 'center',
        glow: true,
        delay: 0,
      },
      {
        type: 'nodes',
        delay: 4,
        drawDuration: 30,
        width: 850,
        height: 460,
        nodes: [
          { id: 'core', x: 50, y: 50, label: 'Consenso Central', icon: 'Shield', isPrimary: true },
          { id: 'n1', x: 20, y: 25, label: 'Nó São Paulo', icon: 'Cpu' },
          { id: 'n2', x: 80, y: 25, label: 'Nó Frankfurt', icon: 'Cpu' },
          { id: 'n3', x: 30, y: 80, label: 'Nó Tokyo', icon: 'Cpu' },
          { id: 'n4', x: 70, y: 80, label: 'Nó Nova York', icon: 'Cpu' },
        ],
        connections: [
          { from: 'core', to: 'n1' },
          { from: 'core', to: 'n2' },
          { from: 'core', to: 'n3' },
          { from: 'core', to: 'n4' },
          { from: 'n1', to: 'n2' },
          { from: 'n3', to: 'n4' },
        ],
      },
    ],
  },

  // Scene 3: Dominância de Mercado & Curva de Adoção
  {
    id: 'scene-3-chart',
    durationInFrames: 105, // 3.5s
    layout: 'split-left',
    choreography: {
      entryDirection: 'left-glide',
      drawSpeed: 'smooth-draw',
      ambientMotion: 'gentle-float',
    },
    artDirection: {
      mood: 'analytical-tech',
      visualMetaphor: 'Aceleração exponencial da curva de adoção',
    },
    elements: [
      {
        type: 'text',
        text: 'ADOÇÃO EXPONENCIAL',
        subtitle: 'Evolução de volume diário',
        variant: 'title',
        highlightWords: ['EXPONENCIAL'],
        align: 'left',
        delay: 0,
      },
      {
        type: 'chart',
        chartType: 'line',
        width: 650,
        height: 340,
        delay: 4,
        drawDuration: 32,
        data: [
          { label: 'Q1', value: 18 },
          { label: 'Q2', value: 34 },
          { label: 'Q3', value: 58 },
          { label: 'Q4', value: 142 },
        ],
        highlightLast: true,
      },
      {
        type: 'icon',
        name: 'Zap',
        size: 72,
        delay: 8,
        showRing: true,
        showGlow: true,
      },
    ],
  },
];
