import { SceneSpec } from '../src/director/schema';

/**
 * Script Completo de Produção: Bloco 3 — Como o COE Funciona (3:00–5:15)
 *
 * Sequência de 10 Cenas Dinâmicas sob ADR-004 e ADR-005 (Diretor Orquestrador)
 * Textos ultra-minimalistas (2 a 4 palavras), canal Alpha nativo e rotação de 6 silhuetas.
 */
export const coeBloco3Scenes: SceneSpec[] = [
  // -------------------------------------------------------------
  // CENA 1: Setup — Abrir o Produto / Engenharia Reversa (5.0s / 150 frames)
  // Fala: "Pra responder isso, primeiro a gente precisa abrir o produto e entender exatamente o que tem dentro dele"
  // -------------------------------------------------------------
  {
    id: 'cena-b03-01-abrir-produto',
    durationInFrames: 150,
    layout: 'blueprint-grifo',
    choreography: {
      entryDirection: 'bottom-up',
      drawSpeed: 'snappy',
      ambientMotion: 'grid-drift',
    },
    artDirection: {
      mood: 'analytical-tech',
      visualMetaphor: 'Fatiamento a laser da caixa-preta do COE expondo as camadas internas',
    },
    elements: [
      {
        id: 'hero-abrir',
        type: 'text',
        text: 'ABRIR PRODUTO',
        variant: 'hero',
        highlightWords: ['ABRIR', 'PRODUTO'],
        font: 'archivo',
        glow: true,
      },
      {
        id: 'box-scan-icon',
        type: 'icon',
        name: 'Layers',
        size: 110,
        sizeRatio: 0.65,
        delay: 5,
        showRing: true,
        showGlow: true,
        anchorTo: {
          targetId: 'hero-abrir',
          point: 'cap-height-right',
          bridge: 'overlap',
        },
      },
    ],
  },

  // -------------------------------------------------------------
  // CENA 2: Action — Duas Coisas ao Mesmo Tempo (3.0s / 90 frames)
  // Fala: "O COE tenta fazer duas coisas ao mesmo tempo."
  // -------------------------------------------------------------
  {
    id: 'cena-b03-02-duas-coisas',
    durationInFrames: 90,
    layout: 'horizontal-split',
    choreography: {
      entryDirection: 'left-glide',
      drawSpeed: 'snappy',
      ambientMotion: 'gentle-float',
    },
    artDirection: {
      mood: 'analytical-tech',
      visualMetaphor: 'Bifurcação de forças: duas promessas antagônicas no mesmo produto',
    },
    elements: [
      {
        id: 'split-title',
        type: 'text',
        text: '2 OBJETIVOS',
        variant: 'hero',
        highlightWords: ['2', 'OBJETIVOS'],
        font: 'archivo',
        align: 'left',
      },
      {
        id: 'split-badge',
        type: 'text',
        text: 'AO MESMO TEMPO',
        variant: 'badge',
        highlightWords: ['AO MESMO TEMPO'],
        font: 'space-grotesk',
        delay: 4,
        anchorTo: {
          targetId: 'split-title',
          point: 'side-rail',
          bridge: 'connector-line',
        },
      },
      {
        id: 'split-icon',
        type: 'icon',
        name: 'Zap',
        size: 90,
        sizeRatio: 0.55,
        delay: 6,
        anchorTo: {
          targetId: 'split-badge',
          point: 'cap-height-right',
          bridge: 'overlap',
        },
      },
    ],
  },

  // -------------------------------------------------------------
  // CENA 3: Action — Proteger o Capital Investido (3.0s / 90 frames)
  // Fala: "...De um lado, proteger o capital investido..."
  // -------------------------------------------------------------
  {
    id: 'cena-b03-03-proteger-capital',
    durationInFrames: 90,
    layout: 'monumental-hero',
    choreography: {
      entryDirection: 'bottom-up',
      drawSpeed: 'snappy',
      ambientMotion: 'pulse-glow',
    },
    artDirection: {
      mood: 'aggressive-alert',
      visualMetaphor: 'O escudo rígido do capital protegido com selo de garantia nominal',
    },
    elements: [
      {
        id: 'hero-proteger',
        type: 'text',
        text: 'PROTEGER CAPITAL',
        variant: 'hero',
        highlightWords: ['PROTEGER', 'CAPITAL'],
        font: 'archivo',
        glow: true,
      },
      {
        id: 'shield-icon',
        type: 'icon',
        name: 'ShieldCheck',
        size: 115,
        sizeRatio: 0.7,
        delay: 4,
        showRing: true,
        showGlow: true,
        anchorTo: {
          targetId: 'hero-proteger',
          point: 'cap-height-right',
          bridge: 'overlap',
        },
      },
    ],
  },

  // -------------------------------------------------------------
  // CENA 4: Action — Permitir Ganhos com a Valorização (3.0s / 90 frames)
  // Fala: "...Do outro, permitir ganhos com a valorização de algum ativo..."
  // -------------------------------------------------------------
  {
    id: 'cena-b03-04-buscar-ganhos',
    durationInFrames: 90,
    layout: 'split-authority',
    choreography: {
      entryDirection: 'radial-burst',
      drawSpeed: 'snappy',
      ambientMotion: 'gentle-float',
    },
    artDirection: {
      mood: 'optimistic-growth',
      visualMetaphor: 'Curva ascendente acelerada capturando a alta do ativo de mercado',
    },
    elements: [
      {
        id: 'hero-ganhos',
        type: 'text',
        text: 'SURFAR ALTA',
        variant: 'hero',
        highlightWords: ['SURFAR', 'ALTA'],
        font: 'archivo',
        align: 'left',
      },
      {
        id: 'trending-icon',
        type: 'icon',
        name: 'TrendingUp',
        size: 105,
        sizeRatio: 0.65,
        delay: 5,
        showRing: true,
        showGlow: true,
        anchorTo: {
          targetId: 'hero-ganhos',
          point: 'cap-height-right',
          bridge: 'connector-line',
        },
      },
    ],
  },

  // -------------------------------------------------------------
  // CENA 5: Resolution — Os 4 Ativos de Referência (3.0s / 90 frames)
  // Fala: "...uma ação, um índice, o dólar ou o ouro."
  // -------------------------------------------------------------
  {
    id: 'cena-b03-05-ativos-referencia',
    durationInFrames: 90,
    layout: 'hud-radial',
    choreography: {
      entryDirection: 'radial-burst',
      drawSpeed: 'smooth-draw',
      ambientMotion: 'pulse-glow',
    },
    artDirection: {
      mood: 'analytical-tech',
      visualMetaphor: 'Cluster técnico conectando os 4 ativos de referência empacotados',
    },
    elements: [
      {
        id: 'ativos-title',
        type: 'text',
        text: '4 ATIVOS',
        variant: 'hero',
        highlightWords: ['4', 'ATIVOS'],
        font: 'syne',
        align: 'center',
      },
      {
        id: 'ativos-nodes',
        type: 'nodes',
        nodes: [
          { id: 'n1', x: 20, y: 30, label: 'AÇÕES', icon: 'Activity', isPrimary: true },
          { id: 'n2', x: 80, y: 30, label: 'ÍNDICES', icon: 'TrendingUp', isPrimary: true },
          { id: 'n3', x: 20, y: 75, label: 'DÓLAR', icon: 'DollarSign', isPrimary: true },
          { id: 'n4', x: 80, y: 75, label: 'OURO', icon: 'Coins', isPrimary: true },
        ],
        connections: [
          { from: 'n1', to: 'n2' },
          { from: 'n2', to: 'n4' },
          { from: 'n4', to: 'n3' },
          { from: 'n3', to: 'n1' },
        ],
        delay: 5,
        width: 900,
        height: 480,
      },
    ],
  },

  // -------------------------------------------------------------
  // CENA 6: Action — A Divisão dos R$ 100 Mil (4.0s / 120 frames)
  // Fala: "E pra fazer essas duas coisas, o dinheiro investido é dividido. Vamos imaginar um exemplo simples. Você investe cem mil reais."
  // -------------------------------------------------------------
  {
    id: 'cena-b03-06-divisao-capital',
    durationInFrames: 120,
    layout: 'horizontal-split',
    choreography: {
      entryDirection: 'bottom-up',
      drawSpeed: 'snappy',
      ambientMotion: 'gentle-float',
    },
    artDirection: {
      mood: 'analytical-tech',
      visualMetaphor: 'Split cirúrgico do aporte de 100 mil em duas fatias assimétricas',
    },
    elements: [
      {
        id: 'split-100k-title',
        type: 'text',
        text: 'DINHEIRO DIVIDIDO',
        variant: 'hero',
        highlightWords: ['DINHEIRO', 'DIVIDIDO'],
        font: 'archivo',
        align: 'left',
      },
      {
        id: 'split-100k-number',
        type: 'number',
        value: 100000,
        prefix: 'R$ ',
        label: 'Aporte Inicial',
        variant: 'hero',
        delay: 4,
        anchorTo: {
          targetId: 'split-100k-title',
          point: 'side-rail',
          bridge: 'connector-line',
        },
      },
    ],
  },

  // -------------------------------------------------------------
  // CENA 7: Action — O Motor da Renda Fixa (4.0s / 120 frames)
  // Fala: "Uma parte desse dinheiro pode ser destinada a investimentos de renda fixa. E é justamente daqui que vem o tal 'capital protegido'..."
  // -------------------------------------------------------------
  {
    id: 'cena-b03-07-renda-fixa-motor',
    durationInFrames: 120,
    layout: 'stacked-steps',
    choreography: {
      entryDirection: 'bottom-up',
      drawSpeed: 'snappy',
      ambientMotion: 'pulse-glow',
    },
    artDirection: {
      mood: 'analytical-tech',
      visualMetaphor: 'A parcela de renda fixa rendendo com juros até recompor os 100k no vencimento',
    },
    elements: [
      {
        id: 'rf-hero',
        type: 'text',
        text: 'RENDA FIXA RENDE',
        variant: 'hero',
        highlightWords: ['RENDA FIXA', 'RENDE'],
        font: 'archivo',
      },
      {
        id: 'rf-shield',
        type: 'icon',
        name: 'ShieldCheck',
        size: 110,
        sizeRatio: 0.65,
        delay: 5,
        showRing: true,
        showGlow: true,
        anchorTo: {
          targetId: 'rf-hero',
          point: 'cap-height-right',
          bridge: 'overlap',
        },
      },
    ],
  },

  // -------------------------------------------------------------
  // CENA 8: Action — O Teto do Ganho / Call Spread (4.5s / 135 frames)
  // Fala: "Em português simples: existe um teto pro seu ganho. O ativo pode continuar subindo, mas o seu retorno pode parar bem antes disso..."
  // -------------------------------------------------------------
  {
    id: 'cena-b03-08-teto-call-spread',
    durationInFrames: 135,
    layout: 'split-authority',
    choreography: {
      entryDirection: 'radial-burst',
      drawSpeed: 'snappy',
      ambientMotion: 'gentle-float',
    },
    artDirection: {
      mood: 'aggressive-alert',
      visualMetaphor: 'Colisão física contra barreira de contenção: a ação sobe, mas o ganho do investidor bate no teto',
    },
    elements: [
      {
        id: 'teto-hero',
        type: 'text',
        text: 'TETO DE GANHO',
        variant: 'hero',
        highlightWords: ['TETO', 'GANHO'],
        font: 'archivo',
        align: 'left',
        glow: true,
      },
      {
        id: 'teto-badge',
        type: 'text',
        text: 'CALL SPREAD',
        variant: 'badge',
        highlightWords: ['CALL SPREAD'],
        font: 'space-grotesk',
        delay: 5,
        anchorTo: {
          targetId: 'teto-hero',
          point: 'side-rail',
          bridge: 'connector-line',
        },
      },
    ],
  },

  // -------------------------------------------------------------
  // CENA 9: Action — A Ilusão da Inflação & Iliquidez (4.5s / 135 frames)
  // Fala: "Mas capital protegido não significa poder de compra protegido. No número você não perdeu nada, mas a inflação corrói..."
  // -------------------------------------------------------------
  {
    id: 'cena-b03-09-inflacao-corrosao',
    durationInFrames: 135,
    layout: 'blueprint-grifo',
    choreography: {
      entryDirection: 'bottom-up',
      drawSpeed: 'snappy',
      ambientMotion: 'grid-drift',
    },
    artDirection: {
      mood: 'aggressive-alert',
      visualMetaphor: 'Corrosão inflacionária derretendo o poder de compra com o dinheiro preso sem liquidez',
    },
    elements: [
      {
        id: 'inflacao-hero',
        type: 'text',
        text: 'INFLAÇÃO CORRÓI',
        variant: 'hero',
        highlightWords: ['INFLAÇÃO', 'CORRÓI'],
        font: 'archivo',
        glow: true,
      },
      {
        id: 'inflacao-icon',
        type: 'icon',
        name: 'Flame',
        size: 110,
        sizeRatio: 0.65,
        delay: 5,
        showRing: true,
        showGlow: true,
        anchorTo: {
          targetId: 'inflacao-hero',
          point: 'cap-height-right',
          bridge: 'overlap',
        },
      },
    ],
  },

  // -------------------------------------------------------------
  // CENA 10: Resolution — As 4 Perguntas Decisivas (4.0s / 120 frames)
  // Fala: "Então, quando alguém te apresentar um COE, não basta perguntar 'posso perder?'. Você precisa fazer as 4 perguntas certas..."
  // -------------------------------------------------------------
  {
    id: 'cena-b03-10-perguntas-decisivas',
    durationInFrames: 120,
    layout: 'hud-radial',
    choreography: {
      entryDirection: 'radial-burst',
      drawSpeed: 'smooth-draw',
      ambientMotion: 'pulse-glow',
    },
    artDirection: {
      mood: 'analytical-tech',
      visualMetaphor: 'Checklist de auditoria com as 4 perguntas cruciais antes de assinar',
    },
    elements: [
      {
        id: 'checklist-hero',
        type: 'text',
        text: '4 PERGUNTAS',
        variant: 'hero',
        highlightWords: ['4', 'PERGUNTAS'],
        font: 'syne',
        align: 'center',
      },
      {
        id: 'checklist-icon',
        type: 'icon',
        name: 'FileSearch',
        size: 100,
        sizeRatio: 0.6,
        delay: 5,
        showRing: true,
        showGlow: true,
        anchorTo: {
          targetId: 'checklist-hero',
          point: 'center-below',
          bridge: 'connector-line',
        },
      },
    ],
  },
];
