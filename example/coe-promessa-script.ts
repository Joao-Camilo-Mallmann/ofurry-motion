import { SceneSpec } from '../src/director/schema';

/**
 * Script de Produção: A Falsa Promessa do COE — "Será Mesmo?" (15s)
 * Trecho do Roteiro: Subtitles 8-12 (00:00:27,666 → 00:00:46,266)
 * Duração Total: 15 segundos (450 frames @ 30fps)
 *
 * Arco Narrativo:
 *   Setup (analítico) → "COE no papel parece bom" → "Risco zero?"
 *   Action (alerta) → "Promete o melhor dos dois mundos"
 *   Resolution (questionamento) → "Funciona mesmo?"
 *
 * Regras de Ouro OFurry:
 * 1. Texto Mínimo (2-4 palavras-chave)
 * 2. Escala Monumental (120-150px hero, 180-220px numbers)
 * 3. Tipografia por Função (Archivo Black, Syne, Space Grotesk)
 * 4. Tarjas Sólidas Neon (#FF9900 com texto #000000)
 * 5. Fundo Transparente Real (Canal Alpha — ProRes 4444 / WebM)
 * 6. Física Punch & Hold com Micro-Drift contínuo (±2px)
 */
export const coePromessaScenes: SceneSpec[] = [
  {
    // Sub-Cena 1: Setup — O documento sedutor
    // Fala: "No papel realmente parece uma boa ideia para quem quer se arriscar..."
    // Emotional Intent: Falsa confiança / sedução analítica
    id: 'cena-p01-coe-no-papel',
    durationInFrames: 105, // 3.5s
    layout: 'split-left',
    choreography: {
      entryDirection: 'bottom-up',
      drawSpeed: 'snappy',
      ambientMotion: 'grid-drift',
    },
    artDirection: {
      mood: 'analytical-tech',
      visualMetaphor: 'O documento sedutor que vende a ilusão de segurança',
    },
    elements: [
      {
        type: 'text',
        text: 'COE NO PAPEL',
        subtitle: 'A teoria que seduz o investidor',
        variant: 'hero',
        highlightWords: ['COE'],
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
    // Sub-Cena 2: Escalation — A promessa mágica de segurança
    // Fala: "...pouco sem abrir mão da segurança."
    // Emotional Intent: Questionamento crescente
    id: 'cena-p02-risco-zero',
    durationInFrames: 90, // 3.0s
    layout: 'centered-hero',
    choreography: {
      entryDirection: 'bottom-up',
      drawSpeed: 'snappy',
      ambientMotion: 'pulse-glow',
    },
    artDirection: {
      mood: 'analytical-tech',
      visualMetaphor: 'A promessa mágica de arriscar pouco sem perder segurança',
    },
    elements: [
      {
        type: 'text',
        text: 'RISCO ZERO?',
        subtitle: 'Arriscar pouco sem abrir mão da segurança',
        variant: 'hero',
        highlightWords: ['ZERO?'],
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
    // Sub-Cena 3: Confronto — O mito dos dois mundos
    // Fala: "Muito bonito no discurso. Só que todo produto financeiro que
    //        promete o melhor dos dois mundos ao mesmo tempo merece uma pergunta"
    // Emotional Intent: Alerta / confronto com a narrativa comercial
    id: 'cena-p03-dois-mundos',
    durationInFrames: 150, // 5.0s
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
  },
  {
    // Sub-Cena 4: Resolution — A pergunta que desmascara
    // Fala: "...muito simples. Será que isso funciona mesmo?"
    // Emotional Intent: Urgência / choque de realidade
    id: 'cena-p04-funciona-mesmo',
    durationInFrames: 105, // 3.5s
    layout: 'centered-hero',
    choreography: {
      entryDirection: 'bottom-up',
      drawSpeed: 'snappy',
      ambientMotion: 'pulse-glow',
    },
    artDirection: {
      mood: 'aggressive-alert',
      visualMetaphor: 'O choque de realidade — a pergunta que desmascara',
    },
    elements: [
      {
        type: 'text',
        text: 'FUNCIONA MESMO?',
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
