import { SceneSpec } from '../src/director/schema';

/**
 * Script de Produção: A Falsa Promessa do Produto Financeiro
 * Trecho do Roteiro: 00:00:27,666 -> 00:00:46,266
 * 
 * Regras de Ouro OFurry:
 * 1. Regra do Texto Mínimo (2-4 palavras-chave)
 * 2. Escala Monumental (Títulos 120-150px)
 * 3. Tipografia por Função (Archivo Black, Bebas Neue, Syne, Space Grotesk, Plus Jakarta Sans)
 * 4. Tarjas Sólidas Neon (#FF9900 com texto #000000)
 * 5. Fundo Transparente Real (Canal Alpha para sobreposição em Premiere / DaVinci)
 * 6. Física Punch & Hold com Micro-Drift contínuo (±2px)
 */
export const promessaScenes: SceneSpec[] = [
  {
    // 00:00:27,666 -> 00:00:32,066 (4.4s / 132 frames @ 30fps)
    // Fala: "No papel realmente parece uma boa ideia para Quem quer se arriscar"
    id: 'cena-01-boa-ideia-no-papel',
    durationInFrames: 132,
    layout: 'split-left',
    choreography: {
      entryDirection: 'bottom-up',
      drawSpeed: 'snappy',
      ambientMotion: 'grid-drift',
    },
    artDirection: {
      mood: 'analytical-tech',
      visualMetaphor: 'A proposta no papel que seduz o investidor iniciante',
    },
    elements: [
      {
        type: 'text',
        text: 'BOA IDEIA NO PAPEL',
        subtitle: 'A teoria sedutora de arriscar pouco',
        variant: 'hero',
        highlightWords: ['BOA', 'IDEIA'],
        font: 'syne',
        align: 'left',
      },
      {
        type: 'icon',
        name: 'FileText',
        size: 110,
        showRing: true,
        showGlow: true,
      },
    ],
  },
  {
    // 00:00:32,166 -> 00:00:34,366 (2.2s / 68 frames @ 30fps)
    // Fala: "pouco sem abrir mão da segurança."
    id: 'cena-02-seguranca-sem-risco',
    durationInFrames: 68,
    layout: 'centered-hero',
    choreography: {
      entryDirection: 'bottom-up',
      drawSpeed: 'snappy',
      ambientMotion: 'pulse-glow',
    },
    artDirection: {
      mood: 'analytical-tech',
      visualMetaphor: 'A promessa de segurança absoluta sem abrir mão do retorno',
    },
    elements: [
      {
        type: 'text',
        text: 'SEGURANÇA SEM RISCO?',
        subtitle: 'A fórmula mágica que o mercado tenta vender',
        variant: 'hero',
        highlightWords: ['SEGURANÇA'],
        font: 'archivo',
        glow: true,
      },
      {
        type: 'icon',
        name: 'ShieldCheck',
        size: 100,
        showRing: true,
      },
    ],
  },
  {
    // 00:00:34,666 -> 00:00:43,233 (8.6s / 258 frames @ 30fps)
    // Fala: "Muito bonito no discurso. Só que todo produto financeiro que promete o melhor dos dois mundos ao mesmo tempo merece uma pergunta"
    id: 'cena-03-melhor-dos-dois-mundos',
    durationInFrames: 258,
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
        text: 'O MELHOR DOS DOIS MUNDOS',
        subtitle: 'Muito bonito no discurso comercial',
        variant: 'hero',
        highlightWords: ['DOIS', 'MUNDOS'],
        font: 'archivo',
        align: 'left',
      },
    ],
  },
  {
    // 00:00:43,333 -> 00:00:46,266 (2.93s / 90 frames @ 30fps)
    // Fala: "muito simples. Será que isso funciona mesmo?"
    id: 'cena-04-funciona-mesmo',
    durationInFrames: 90,
    layout: 'centered-hero',
    choreography: {
      entryDirection: 'bottom-up',
      drawSpeed: 'snappy',
      ambientMotion: 'pulse-glow',
    },
    artDirection: {
      mood: 'aggressive-alert',
      visualMetaphor: 'O choque de realidade e o questionamento incisivo',
    },
    elements: [
      {
        type: 'text',
        text: 'SERÁ QUE FUNCIONA MESMO?',
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
  },
];
