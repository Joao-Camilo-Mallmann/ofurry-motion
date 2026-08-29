import { SceneSpec } from '../src/director/schema';

/**
 * Script de Demonstração e Produção: O Golpe do COE
 * Exemplifica as 6 Regras de Ouro de Motion Design Editorial OFurry:
 * 1. Regra do Texto Mínimo (2-4 palavras)
 * 2. Escala Monumental (Títulos 120-150px, Números 180-220px)
 * 3. Tipografia Editorial Especializada (Archivo Black, Bebas Neue, Syne, Space Grotesk)
 * 4. Tarjas Sólidas Neon de Alto Contraste (Anti-"Cara de IA")
 * 5. Transparência Real (Canal Alpha / Overlays)
 * 6. Física Punch & Hold com Micro-Drift
 */
export const coeScenes: SceneSpec[] = [
  {
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
  },
  {
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
  },
  {
    id: 'cena-03-rede-intermediarios',
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
  },
  {
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
  },
  {
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
  },
];
