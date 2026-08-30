import { SceneSpec } from '../src/director/schema';

/**
 * ADR-004 Anchored Composition Showcase Script
 * Demonstrates all 6 Geometrically Distinct Silhouettes with Anchored Spatial Hierarchy.
 */
export const anchoredSilhouettesScenes: SceneSpec[] = [
  // 1. Monumental Hero
  {
    id: 'cena-adr04-01-monumental-hero',
    durationInFrames: 120,
    layout: 'monumental-hero',
    choreography: {
      entryDirection: 'bottom-up',
      drawSpeed: 'snappy',
      ambientMotion: 'pulse-glow',
    },
    artDirection: {
      mood: 'aggressive-alert',
      visualMetaphor: 'Gancho monumental com selo de alerta em sobreposição direta',
    },
    elements: [
      {
        id: 'hero-hook',
        type: 'text',
        text: 'CUIDADO COM O COE',
        subtitle: 'O produto mais empurrado do mercado financeiro',
        variant: 'hero',
        highlightWords: ['COE'],
        font: 'archivo',
        glow: true,
      },
      {
        id: 'alert-stamp',
        type: 'icon',
        name: 'ShieldAlert',
        size: 105,
        sizeRatio: 0.65,
        delay: 4,
        showRing: true,
        anchorTo: {
          targetId: 'hero-hook',
          point: 'cap-height-right',
          bridge: 'overlap',
        },
      },
    ],
  },

  // 2. Horizontal Split
  {
    id: 'cena-adr04-02-horizontal-split',
    durationInFrames: 120,
    layout: 'horizontal-split',
    choreography: {
      entryDirection: 'left-glide',
      drawSpeed: 'snappy',
      ambientMotion: 'gentle-float',
    },
    artDirection: {
      mood: 'analytical-tech',
      visualMetaphor: 'Divisão polar comparando a promessa com o ganho real',
    },
    elements: [
      {
        id: 'split-title',
        type: 'text',
        text: 'PROMESSA VS REALIDADE',
        subtitle: 'O dobro do CDI que perde para a inflação real',
        variant: 'title',
        highlightWords: ['REALIDADE'],
        font: 'archivo',
        align: 'left',
      },
      {
        id: 'split-metric',
        type: 'number',
        value: 0,
        prefix: 'GANHO: ',
        suffix: '%',
        label: 'Retorno Real IPCA',
        variant: 'card',
        delay: 5,
        anchorTo: {
          targetId: 'split-title',
          point: 'side-rail',
          bridge: 'connector-line',
        },
      },
      {
        id: 'split-icon',
        type: 'icon',
        name: 'TrendingDown',
        size: 84,
        sizeRatio: 0.55,
        delay: 7,
        anchorTo: {
          targetId: 'split-metric',
          point: 'cap-height-right',
          bridge: 'overlap',
        },
      },
    ],
  },

  // 3. Stacked Steps
  {
    id: 'cena-adr04-03-stacked-steps',
    durationInFrames: 135,
    layout: 'stacked-steps',
    choreography: {
      entryDirection: 'bottom-up',
      drawSpeed: 'cascade',
      ambientMotion: 'gentle-float',
    },
    artDirection: {
      mood: 'aggressive-alert',
      visualMetaphor: 'Hierarquia vertical das 3 etapas da armadilha',
    },
    elements: [
      {
        id: 'step-1',
        type: 'text',
        text: '1. CAPITAL TRAVADO',
        subtitle: '5 anos sem liquidez de resgate antecipado',
        variant: 'title',
        highlightWords: ['TRAVADO'],
        font: 'archivo',
        align: 'left',
      },
      {
        id: 'step-2',
        type: 'text',
        text: '2. BANCO FICA COM LUCRO',
        subtitle: 'Ganhos acima do teto retidos pela instituição',
        variant: 'title',
        highlightWords: ['LUCRO'],
        font: 'archivo',
        align: 'left',
        delay: 8,
        anchorTo: {
          targetId: 'step-1',
          point: 'center-below',
          bridge: 'connector-line',
        },
      },
      {
        id: 'step-3-icon',
        type: 'icon',
        name: 'Lock',
        size: 90,
        sizeRatio: 0.65,
        delay: 12,
        anchorTo: {
          targetId: 'step-2',
          point: 'cap-height-right',
          bridge: 'overlap',
        },
      },
    ],
  },

  // 4. Blueprint Grifo
  {
    id: 'cena-adr04-04-blueprint-grifo',
    durationInFrames: 120,
    layout: 'blueprint-grifo',
    choreography: {
      entryDirection: 'left-glide',
      drawSpeed: 'snappy',
      ambientMotion: 'grid-drift',
    },
    artDirection: {
      mood: 'analytical-tech',
      visualMetaphor: 'Regulamento oficial com cláusula grifada em neon sólido',
    },
    elements: [
      {
        id: 'contract-clause',
        type: 'text',
        text: 'CLÁUSULA DE TETO',
        subtitle: 'Artigo 14: Qualquer ganho excedente reverte 100% ao banco emissor',
        variant: 'hero',
        highlightWords: ['TETO'],
        font: 'archivo',
        align: 'left',
      },
      {
        id: 'leader-callout',
        type: 'icon',
        name: 'FileText',
        size: 96,
        sizeRatio: 0.65,
        delay: 5,
        anchorTo: {
          targetId: 'contract-clause',
          point: 'leader-line',
          bridge: 'connector-line',
        },
      },
    ],
  },

  // 5. HUD Radial
  {
    id: 'cena-adr04-05-hud-radial',
    durationInFrames: 130,
    layout: 'hud-radial',
    choreography: {
      entryDirection: 'radial-burst',
      drawSpeed: 'smooth-draw',
      ambientMotion: 'pulse-glow',
    },
    artDirection: {
      mood: 'analytical-tech',
      visualMetaphor: 'Ecossistema de comissões interconectado via laser',
    },
    elements: [
      {
        id: 'hud-title',
        type: 'text',
        text: 'ENGRENAGEM DE COMISSÕES',
        subtitle: 'O fluxo oculto de incentivos entre os agentes',
        variant: 'title',
        highlightWords: ['COMISSÕES'],
        font: 'syne',
        align: 'center',
      },
      {
        id: 'hud-network',
        type: 'nodes',
        width: 900,
        height: 420,
        delay: 4,
        nodes: [
          { id: 'bank', x: 20, y: 50, label: 'BANCO EMISSOR', icon: 'Building' },
          { id: 'broker', x: 50, y: 30, label: 'CORRETORA', icon: 'Layers', isPrimary: true },
          { id: 'advisor', x: 80, y: 50, label: 'ASSESSOR', icon: 'DollarSign' },
        ],
        connections: [
          { from: 'bank', to: 'broker' },
          { from: 'broker', to: 'advisor' },
        ],
        anchorTo: {
          targetId: 'hud-title',
          point: 'center-below',
          bridge: 'connector-line',
        },
      },
    ],
  },

  // 6. Split Authority
  {
    id: 'cena-adr04-06-split-authority',
    durationInFrames: 120,
    layout: 'split-authority',
    choreography: {
      entryDirection: 'bottom-up',
      drawSpeed: 'snappy',
      ambientMotion: 'pulse-glow',
    },
    artDirection: {
      mood: 'aggressive-alert',
      visualMetaphor: 'Métrica colossal que atravessa o limite da tela com selo de bloqueio',
    },
    elements: [
      {
        id: 'authority-counter',
        type: 'number',
        value: 0,
        prefix: 'R$ ',
        suffix: ' REAL',
        label: 'GANHO LÍQUIDO ACIMA DA INFLAÇÃO',
        variant: 'hero',
        delay: 0,
      },
      {
        id: 'authority-text',
        type: 'text',
        text: 'GANHO REAL ZERO',
        subtitle: '5 anos de patrimônio sacrificado sem correção monetária',
        variant: 'title',
        highlightWords: ['ZERO'],
        font: 'archivo',
        align: 'left',
        delay: 6,
        anchorTo: {
          targetId: 'authority-counter',
          point: 'side-rail',
          bridge: 'connector-line',
        },
      },
      {
        id: 'authority-stamp',
        type: 'icon',
        name: 'Ban',
        size: 88,
        sizeRatio: 0.4,
        delay: 8,
        anchorTo: {
          targetId: 'authority-counter',
          point: 'stamp-corner',
          bridge: 'overlap',
        },
      },
    ],
  },
];
