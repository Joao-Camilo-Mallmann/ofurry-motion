# ADR-001: Arquitetura do motor de animação `animation-to-yt` e Sistema de Motion Design

**Status:** Aceito (Atualizado)  
**Data:** 2026-08-29  
**Contexto do projeto:** Canal OFurry (YouTube) — automatizar a geração de motion design para vídeos a partir de roteiro + timestamps.

---

## Contexto

O processo de produção de vídeo do canal OFurry busca automação com qualidade de estúdio: receber um roteiro com timestamps, interpretar o *conteúdo* semântico de cada fala e gerar automaticamente uma animação fluida, estética e com alto impacto visual em MP4 (16:9, 1080p ou 4K).

Requisitos fundamentais refinados:
1. **Identidade Visual Marcante**: Fundo preto sólido (`#000000`), linhas brancas flat art, acentos em laranja/amarelo néon (`#FF9900` / `#FFB800`) e tipografia **Montserrat** (pesos Bold e ExtraBold para impacto).
2. **Sensação "Smooth" / Zero-Travado (Anti-Stuck)**: Elementos nunca ficam 100% estáticos como slides. Devem possuir desacelerações orgânicas, entradas e saídas fluidas, e micro-movimentos contínuos ("ambient drift" / "breathing" senoidal).
3. **Construção Visual em Tempo Real ("Ao Vivo")**: Elementos e gráficos são desenhados na tela com traçados laser/glow (`strokeDashoffset`), contadores interpolados e expansões radiais, em vez de simples fades.
4. **Filosofia de Texto Mínimo**: Nada de blocos de transcrição ou parágrafos. Máximo de 2 a 4 palavras-chave, termos de ancoragem ou métricas destacadas por cena.
5. **Variedade & Dinamismo Anti-Repetição**: Posições e âncoras variadas a cada cena (split, radial, diagonal, comparação dual, hero central).
6. **Diretor Inteligente com 2 Níveis de Liberdade**:
   - *Nível 1 (Base Sólida)*: Layouts e primitivas calibradas e previsíveis.
   - *Nível 2 (Inovação Fora da Caixa)*: Combinação livre de camadas, interpretação de metáforas visuais conceituais e suporte a overrides criativos do usuário.

---

## Decisão

### 1. Motor de Renderização: **Remotion** (React + TypeScript → Vídeo)
- Renderização frame a frame via Chrome Headless (`npx remotion render`).
- Uso das APIs nativas do Remotion (`interpolate`, `spring`, `useCurrentFrame`, `useVideoConfig`) para garantir interpolação matemática perfeita em 30/60 fps.

### 2. Biblioteca de Primitivas Visuais Atômicas
As primitivas embutem as regras de motion design da skill `motion-design` e são parametrizadas por `OFurryTheme`:

| Primitiva | Função | Camada Primary | Camada Secondary | Camada Ambient |
|---|---|---|---|---|
| `TextReveal` | Palavras-chave / Título de impacto (Montserrat) | Fade + Glide vertical/horizontal com spring | Glow sutil em laranja | Micro-drift de posição |
| `Icon` | Ícone flat line-art vetorial | Escala com overshoot controlado | Anel de pulso / onda de choque | Rotação/flutuação senoidal (0.5°) |
| `AnimatedNumber` | Contador numérico (moeda, %, métrica) | Interpolação rápida com antecipação | Unidade/Badge animada | Glow pulsante de destaque |
| `ConnectedNodes` | Grafo de nós em rede tech | Nós surgindo em stagger | Linhas SVG desenhadas com glow | Conexões pulsando fluxo de dados |
| `DynamicChart` | Gráfico de linha/barra minimalista | Linha traçada via SVG `strokeDashoffset` | Área com gradiente transparente | Ponto focal brilhante em órbita |
| `ParticleField` | Fundo tecnológico dinâmico | Partículas com movimento contínuo | Linhas de grade sutis (5% opacidade) | Oscilação contínua global |

### 3. O "Diretor" (LLM) e o Schema `SceneSpec`
O Diretor (Claude / Gemini) consome o texto da fala e devolve um JSON `SceneSpec` estruturado:
```ts
export type SceneSpec = {
  id: string;
  durationInFrames: number;
  layout: 'split-left' | 'split-right' | 'radial-network' | 'bottom-heavy' | 'centered-hero' | 'dual-compare' | 'freeform';
  choreography: {
    entryDirection: 'bottom-up' | 'left-glide' | 'radial-burst' | 'diagonal-flow';
    drawSpeed: 'snappy' | 'smooth-draw' | 'cascade';
    ambientMotion: 'gentle-float' | 'pulse-glow' | 'grid-drift';
  };
  artDirection?: {
    mood?: 'aggressive-alert' | 'optimistic-growth' | 'analytical-tech' | 'mysterious-reveal';
    visualMetaphor?: string;
    overridePrompt?: string;
  };
  elements: VisualElement[];
};
```

### 4. Orquestrador e Pipeline de Execução
1. `parser`: Roteiro / Timestamps / SRT → `Scene[]`.
2. `director`: `Scene[]` + Contexto de Marca → `SceneSpec[]` (com validação Zod e fallback seguro).
3. `composer`: Renderização via Remotion do array de cenas.
4. `cli / script`: `npm run generate` ou `npx remotion render`.

---

## Consequências

**Positivas:**
- Elimina a sensação de vídeo estático/travado através das camadas de movimento e interpolação contínua.
- Mantém coerência visual de estúdio (Montserrat, preto absoluto e néon) enquanto dá variedade ilimitada de cenas.
- Texto mínimo foca a atenção do espectador nas métricas e metáforas visuais.
- Arquitetura desacoplada e 100% testável em TypeScript.

**Riscos e Mitigações:**
- *Validação de JSON do LLM*: Uso de schema Zod com fallback automático (renderiza layout padrão caso o LLM invente parâmetros inválidos).
- *Desempenho de Renderização*: Primitivas baseadas em SVG leve e CSS transforms acelerados por GPU no Chrome.
