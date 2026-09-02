import { SceneSpec } from '../src/director/schema';

/**
 * Script de Produção: Bloco 2 — Fato Chocante / O Padrão Repetido do COE (10s)
 * Trecho do Roteiro:
 *   "E o padrão é quase sempre igual. Pessoas colocando dinheiro que levaram anos para construir
 *    num investimento vendido como seguro... e descobrindo tarde demais que a história não era bem essa.
 *    Mas aí surge uma pergunta. Se tanta gente já passou por isso... Se tanta gente já reclamou...
 *    Por que esse produto continua sendo vendido todos os dias?"
 *
 * Duração Total: 10 segundos (300 frames @ 30fps)
 *
 * Silhuetas Utilizadas (Rotação ADR-004):
 *   1. Monumental Hero (Cena 1) -> 3.5s (105 frames)
 *   2. Horizontal Split (Cena 2) -> 3.0s (90 frames)
 *   3. HUD Radial (Cena 3)       -> 3.5s (105 frames)
 */
export const coeBloco2Scenes: SceneSpec[] = [
  // -------------------------------------------------------------
  // CENA 1: Setup — O Padrão do Sacrifício vs Promessa (3.5s / 105 frames)
  // Fala: "E o padrão é quase sempre igual. Pessoas colocando dinheiro que levaram anos para construir num investimento vendido como seguro..."
  // -------------------------------------------------------------
  {
    id: 'cena-b02-01-padrao-repetido',
    durationInFrames: 105,
    layout: 'monumental-hero',
    choreography: {
      entryDirection: 'bottom-up',
      drawSpeed: 'snappy',
      ambientMotion: 'pulse-glow',
    },
    artDirection: {
      mood: 'aggressive-alert',
      visualMetaphor: 'O ciclo vicioso do patrimônio de anos vendido sob a falsa promessa de segurança',
    },
    elements: [
      {
        id: 'hero-padrao',
        type: 'text',
        text: 'PADRÃO REPETIDO',
        subtitle: 'Anos de patrimônio num investimento "seguro"',
        variant: 'hero',
        highlightWords: ['PADRÃO', 'REPETIDO'],
        font: 'archivo',
        glow: true,
      },
      {
        id: 'alert-icon',
        type: 'icon',
        name: 'ShieldAlert',
        size: 110,
        sizeRatio: 0.65,
        delay: 4,
        showRing: true,
        showGlow: true,
        anchorTo: {
          targetId: 'hero-padrao',
          point: 'cap-height-right',
          bridge: 'overlap',
        },
      },
    ],
  },

  // -------------------------------------------------------------
  // CENA 2: Action — O Choque de Realidade / Tarde Demais (3.0s / 90 frames)
  // Fala: "...e descobrindo tarde demais que a história não era bem essa."
  // -------------------------------------------------------------
  {
    id: 'cena-b02-02-tarde-demais',
    durationInFrames: 90,
    layout: 'horizontal-split',
    choreography: {
      entryDirection: 'left-glide',
      drawSpeed: 'snappy',
      ambientMotion: 'gentle-float',
    },
    artDirection: {
      mood: 'aggressive-alert',
      visualMetaphor: 'Divisão polar entre a promessa de segurança e o bloqueio da realidade',
    },
    elements: [
      {
        id: 'reality-title',
        type: 'text',
        text: 'TARDE DEMAIS',
        subtitle: 'Descobrindo que a história não era bem essa',
        variant: 'title',
        highlightWords: ['TARDE', 'DEMAIS'],
        font: 'archivo',
        align: 'left',
      },
      {
        id: 'reality-metric',
        type: 'number',
        value: 0,
        prefix: 'RESGATE: ',
        suffix: ' BLOQUEADO',
        label: 'Sem Liquidez Imediata',
        variant: 'card',
        delay: 5,
        anchorTo: {
          targetId: 'reality-title',
          point: 'side-rail',
          bridge: 'connector-line',
        },
      },
      {
        id: 'reality-icon',
        type: 'icon',
        name: 'Lock',
        size: 88,
        sizeRatio: 0.55,
        delay: 7,
        anchorTo: {
          targetId: 'reality-metric',
          point: 'cap-height-right',
          bridge: 'overlap',
        },
      },
    ],
  },

  // -------------------------------------------------------------
  // CENA 3: Resolution — O Grande Questionamento (3.5s / 105 frames)
  // Fala: "Mas aí surge uma pergunta. Se tanta gente já passou por isso... Se tanta gente já reclamou... Por que esse produto continua sendo vendido todos os dias?"
  // -------------------------------------------------------------
  {
    id: 'cena-b02-03-por-que-continua',
    durationInFrames: 105,
    layout: 'hud-radial',
    choreography: {
      entryDirection: 'radial-burst',
      drawSpeed: 'smooth-draw',
      ambientMotion: 'pulse-glow',
    },
    artDirection: {
      mood: 'analytical-tech',
      visualMetaphor: 'A grande interrogação sobre a engrenagem contínua de vendas e comissões',
    },
    elements: [
      {
        id: 'question-title',
        type: 'text',
        text: 'POR QUE CONTINUA?',
        subtitle: 'Centenas de reclamações e o produto segue à venda',
        variant: 'hero',
        highlightWords: ['POR QUE', 'CONTINUA?'],
        font: 'syne',
        align: 'center',
        glow: true,
      },
      {
        id: 'network-incentives',
        type: 'nodes',
        width: 920,
        height: 380,
        delay: 4,
        nodes: [
          { id: 'reclama', x: 20, y: 50, label: 'RECLAMAÇÕES', icon: 'Users' },
          { id: 'venda', x: 50, y: 30, label: 'VENDAS DIÁRIAS', icon: 'RefreshCw', isPrimary: true },
          { id: 'lucro', x: 80, y: 50, label: 'COMISSÕES', icon: 'DollarSign' },
        ],
        connections: [
          { from: 'reclama', to: 'venda' },
          { from: 'venda', to: 'lucro' },
        ],
        anchorTo: {
          targetId: 'question-title',
          point: 'center-below',
          bridge: 'connector-line',
        },
      },
    ],
  },
];
