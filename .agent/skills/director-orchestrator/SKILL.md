---
name: director-orchestrator
description: Directs and orchestrates editorial motion graphics production for OFurry by breaking raw narration phrase-by-phrase, judging complexity, presenting scan-friendly prose plans, and ensuring clean anti-dashboard aesthetic on native alpha.
license: MIT
metadata:
  author: OFurry Motion Lab
  version: "1.1.0"
---

# 🎬 Diretor Orquestrador Skill (ADR-005 Editorial Engine)

Skill oficial de **Direção Criativa e Orquestração Editorial** para produção de mini-vídeos em Motion Design com canal Alpha transparente para o canal do YouTube **OFurry**.

---

## 🧭 When to Apply

Use esta skill quando:

- Receber um roteiro bruto de narração/locução para transformar em motion graphics.
- Decompor blocos de narração em mini-cenas granulares (frase a frase, de 3 a 5 segundos cada).
- Julgar dinamicamente a complexidade de cada mini-cena (resolução direta vs delegação a subagente).
- Gerar e submeter o **Checkpoint Editorial em Prosa Escaneável** para validação do usuário antes de codificar.
- Coordenar a alternância obrigatória entre as 6 silhuetas geométricas (ADR-004) e impor a estética _Clean Editorial_ (sem containers/cards cinzas de dashboard, 2 a 4 palavras monumentais flutuando no canal Alpha nativo).
- Supervisionar a criação de `SceneSpec` ou componentes bespoke em Remotion e a exportação em lote com transparência real.

---

## ⚡ Core Integration Directives

### 1. Always Incorporate `/motion-design`

Every scene must be grounded in the motion design principles from `/motion-design`:

- **Three Pillars**:
  1. **Emotional Intent**: Define target emotion (Alert/Urgency, Optimism/Growth, Tech Authority, Revelation, Critical Warning) before writing code.
  2. **Visual Narrative**: Micro-story structure (Setup/punch entry → Action/reading hold → Resolution/continuous micro-drift).
  3. **Motion Craft**: Damped springs (`snappy`, `smooth-draw`), spatial hierarchy, and zero linear spatial movement.
- **Three Motion Layers**:
  1. **Primary Layer**: Main hero text (`110px-150px`) / monumental counter (`180px-220px`) / chart curve.
  2. **Secondary Layer**: Neon highlight badge (`#FF9900` with `#000000` text), Lucide icon expanding ring, technical leader lines.
  3. **Ambient Layer**: Subdued framing markers and micro-push drift (zero floaty wobble/rotation).

### 2. Always Incorporate `/no-ai-slop` (Mandatory Anti-Slop Editorial Filter)

Every on-screen word, label, and visual metaphor must pass through the `/no-ai-slop` filter before appearing on screen:

- **Zero Throat-Clearing & Faux-Insights**: Cut "O que ninguém te conta:", "A verdade sobre...", "Entendendo o mercado:", "Alerta essencial:". Go straight to the brutal fact.
- **Concrete Over Abstract**: Replace abstract buzzwords ("Maximização de Retornos", "Gestão Eficiente de Risco", "Solução Transformadora") with hard numbers and visceral mechanisms ("TAXA 2.5%", "85% PRESO", "ZERO RETORNO", "TETO 12%").
- **Zero Formatting Slop & Fake Tech Jargon**: BANNED decorative sci-fi tags ("SYS.SCAN // 03:00", "REGULAMENTO // CLÁUSULA OFICIAL", "DATA_STREAM // 0x4F"). If it doesn't communicate an actual legal/financial mechanism from the script, it is AI slop.
- **Banned Buzzwords**: Banned outright from screen text: *game changer, transformador, revolucionário, robusto, inovador, ecossistema, alavancar, maximizar, mitigar, supercharge, tapete, reino, facetas*.
- **Motion Portability Test**: If a visual element or text lockup could move unchanged to a generic SaaS template or crypto landing page, it is slop. It must directly manifest the specific financial conflict of that exact 3-second phrase.
- **Strict 1-to-3 Words Limit**: Screen is not a teleprompter or summary slide. Extract strictly 1 to 3 punch keywords.

### 3. Always Use `/explore-openspec` for Planning

When exploring new video ideas, structuring long scripts into scenes, or deciding on visual metaphors:

- Use `/explore-openspec` (`openspec-explore`) to brainstorm the narrative structure, compare visual archetypes, and validate key visual anchors before generating scene code.

---

## ⚡ Core Operational Directives (ADR-005)

### 1. Decomposição Granular Frase a Frase (3s a 5s)

- **Uma frase = Uma mini-cena:** Nunca agrupe múltiplas frases ou parágrafos inteiros em uma única cena estática.
- Cada cena deve ter entre **90 e 150 frames** (3.0s a 5.0s a 30fps).
- O dinamismo da edição é garantido pela rápida alternância de estímulos visuais alinhados à locução.

### 2. Julgamento Dinâmico de Complexidade & Delegação

Para cada cena decomposta:

- **Resolução Direta (Orquestrador):** Ganchos de texto monumental (`monumental-hero`), números colossais com ícone (`split-authority`) ou grifos diretos (`blueprint-grifo`). O Orquestrador gera a cena diretamente sem disparar subagente.
- **Delegação a Subagente Especializado:** Físicas cinéticas não-triviais (colisões de teto com faíscas, splits vetoriais dinâmicos, clusters de nós interligados `hud-radial`, fluxos complexos em SVG). O Orquestrador define a silhueta, métricas e restrições e aciona o subagente.

### 3. Checkpoint Human-Readable Obrigatório (Plano em Prosa)

**NUNCA** apresente JSON cru ou código Remotion longo no checkpoint inicial. Apresente o plano editorial estruturado em prosa escaneável:

```markdown
### 🎬 Plano Editorial do Bloco: [Nome do Bloco]

- **Cena 01 (3.5s / 105 frames)**: "[Trecho exato da narração]"
  - _Metáfora Cinética_: [Descrição física visceral da animação em 1 frase]
  - _Silhueta_: `[monumental-hero | horizontal-split | stacked-steps | blueprint-grifo | hud-radial | split-authority]`
  - _Palavras em Tela_: `[2 a 4 palavras em caixa alta]`
  - _Origem_: [Direta | Subagente Especializado]

- **Cena 02 (3.0s / 90 frames)**: "[Trecho exato da narração]"
  - _Metáfora Cinética_: [Descrição física visceral da animação em 1 frase]
  - _Silhueta_: `[...]`
  - _Palavras em Tela_: `[...]`
  - _Origem_: [Direta | Subagente Especializado]
```

### 4. Padrão Estético Clean Editorial (Anti-SaaS Dashboard)

- **Zero Cards Cinzas/Containers:** Elementos visuais, tipografia monumental e vetores flutuam soltos sobre o canal Alpha real.
- **Limite de 2 a 4 Palavras:** Tipografia monumental (110px a 150px) em `Archivo Black`, `Bebas Neue` ou `Syne`.
- **Metáforas Físicas Diretas:** Em vez de "cards com tópicos", use impacto mecânico (fatiamento de bloco, colisão no teto, queima/derretimento pela inflação).

### 5. Arquitetura Escopada por Vídeo & Contexto Dinâmico (`videos/<video>/`)

Cada produção de vídeo reside isolada em `videos/<video-name>/`:
- `roteiro.md`: Narração completa com marcações e timestamps.
- `scenes/`: Cenas modulares numeradas (`01-nome.ts`, `02-nome.tsx`) e manifesto `index.ts`.
- `out/`: Destino exclusivo das renderizações Alpha (`.webm`, `.mov`, `full.mp4`).

**Fluxo para Solicitação de Cena por Frase:**
1. **Contexto Narrativo On-Demand:** Ao receber uma frase ou trecho, o Diretor inspeciona imediatamente `videos/<video-name>/roteiro.md`, identifica o que veio antes e o que vem depois, determinando tom, contraste e tensão física sem criar arquivos intermediários de resumo.
2. **Extração Punch:** Filtra 1 a 3 palavras-chave pelo `/no-ai-slop`.
3. **Escrita Modular:** Gera o arquivo `videos/<video-name>/scenes/<XX>-<nome>.ts` (ou `.tsx`) e o registra no `index.ts`.
4. **Comando Imediato:** Apresenta o plano em prosa e fornece o comando exato de renderização:
   `bun run render:video <video> --scene=<XX> --format=webm`

---

## 🏆 The 10 Golden Rules of OFurry Motion Design (ADR-002 + ADR-004 + ADR-005 + ADR-006)

| #   | Rule                                       | Directive                                                                                                                                                                                                                                                                                                               |
| --- | ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🎯  | **1. Strategic Punch Text (1-3 Words)**    | **NUNCA** coloque parágrafos, frases inteiras ou subtítulos explicativos na tela. Filtre por `/no-ai-slop`. Extraia apenas 1 a 3 palavras-chave de soco ou métricas contundentes. A voz conta a história; a tela entrega autoridade pura.                                                                            |
| 📏  | **2. Monumental Scale**                    | Títulos hero ocupam **70%–90%** da largura útil da tela (130px–160px). Números chegam a **200px a 240px**. Comande atenção instantânea nos primeiros 2 segundos da fala.                                                                                                                                              |
| 🎨  | **3. Typography by Role**                  | • `archivo` (`Archivo Black`) ou `bebas` (`Bebas Neue`): Ganchos de impacto e títulos hero<br>• `syne` (`Syne`): Títulos conceituais e editoriais modernos<br>• `space-grotesk` (`Space Grotesk`): Métricas, números, moedas e dados técnicos tabulares<br>• `jakarta` (`Plus Jakarta Sans`): Micro-labels de alta precisão (14px) |
| 🖼️  | **4. Anti-"AI Slop" / Zero Cards**        | **Proibido:** Cards cinzas (`rgba(20,20,20,...)`), bordas arredondadas, sombras de container, nuvens de blur e grids de sci-fi por padrão. **Exigido:** Tipografia monumental solta flutuando diretamente sobre Alpha nativo, tarjas sólidas neon `#FF9900` com texto preto `#000000` e hairlines finos de 1px.     |
| 🎬  | **5. Native Alpha Channel**                | Renderização nativa com fundo transparente real em **ProRes 4444 (`.mov`)** ou **WebM**. Permite sobreposição direta sobre vídeo no Premiere/DaVinci sem nenhum chroma-key.                                                                                                                                           |
| ⚡  | **6. Impact & Lock Physics (Anti-Wobble)** | **Entrada (0-12 frames):** Mask Reveal da linha de base (`overflow: hidden`) ou snap seco com spring firme.<br>**Retenção (12-final):** Trava sólida no lugar (*Lock*) para leitura sem esforço.<br>**Anti-Wobble:** Rotação senoidal PROIBIDA (`amplitudeRotate: 0`). Apenas micro-push unidirecional suave.       |
| ⚓  | **7. Anchored Composition (Zero Orphans)** | Nenhum elemento secundário flutua solto. Todo elemento filho deve declarar `anchorTo` apontando para o elemento primário, amarrado por uma ponte de composição (`connector-line`, `overlap`, `color-trail`, `none-justified`).                                                                                          |
| 📐  | **8. Relative Scaling (`sizeRatio`)**      | Ícones e elementos secundários derivam seu tamanho do elemento dominante (55%-75% da altura de texto hero, 35%-45% de números hero).                                                                                                                                                                                    |
| 🏛️  | **9. 5 Strategic Typographic Archetypes**   | Rotação contínua entre os 5 arquétipos editoriais para evitar repetição: `monumental-punch`, `metric-authority`, `strike-redaction`, `binary-tension` e `forensic-callout`.                                                                                                                                            |
| 💥  | **10. Dramatic Kinetic Metaphors**         | Transforme a tensão da fala em movimento físico visceral (risco de caneta/redaction desmascarando golpe, colisão contra barreira de teto, fatiamento a laser, corrosão inflacionária).                                                                                                                                  |

---

## 🏛️ Catálogo dos 5 Arquétipos Tipográficos Estratégicos

1. **`monumental-punch`**: 1 a 3 palavras massivas (130-160px), Mask Reveal da linha de base, com ou sem tarja sólida neon `#FF9900` deslizante. Foco absoluto no Alpha.
2. **`metric-authority`**: 1 número colossal (200-240px) em `Space Grotesk` com micro-label tabular de 14px posicionado com contraste extremo de escala. Sem caixas ou molduras.
3. **`strike-redaction`**: Metáfora de desmascaramento. Palavra A (promessa) aparece e, em seguida, uma tarja sólida corta a palavra e revela a Palavra B (realidade/risco).
4. **`binary-tension`**: Comparação 50/50 ou 60/40 limpa, com dois termos contrapostos divididos exclusivamente por uma hairline vertical fina de 1px. Zero containers.
5. **`forensic-callout`**: Parágrafo curto autêntico de contrato/regulamento onde uma tarja neon grifa cirurgicamente apenas as 2 palavras da armadilha, puxando uma linha líder para a métrica real.

---

## 🔄 Workflow de 5 Passos do Diretor Orquestrador

```
   ┌─────────────────────────────────────────────────────────────┐
   │ STEP 1: Decomposição da Fala & Metáforas Viscerais          │
   │ • Quebrar áudio bruto frase a frase (3-5s por mini-cena)    │
   │ • Atribuir silhuetas rotativas e metáforas físicas          │
   └──────────────────────────────┬──────────────────────────────┘
                                  │
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │ STEP 2: Julgamento de Delegação vs Resolução Direta         │
   │ • Identificar cenas simples (diretas) e complexas (subagente)│
   └──────────────────────────────┬──────────────────────────────┘
                                  │
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │ STEP 3: Checkpoint Editorial em Prosa (Validação Humana)    │
   │ • Submeter plano escaneável em prosa ao usuário             │
   │ • Ajustar conforme feedback antes de qualquer código        │
   └──────────────────────────────┬──────────────────────────────┘
                                  │
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │ STEP 4: Geração Remotion & Preview no Studio                │
   │ • Criar SceneSpec / componentes bespoke com Alpha nativo    │
   │ • Validar compilação TypeScript com bun run build           │
   │ • Conferir no Remotion Studio (bun run studio)              │
   └──────────────────────────────┬──────────────────────────────┘
                                  │
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │ STEP 5: Exportação em Canal Alpha (Batch Render)            │
   │ • Renderizar mini-vídeos transparentes (ProRes 4444 / WebM) │
   │ • Salvar em out/scenes/ para timeline do editor             │
   └─────────────────────────────────────────────────────────────┘
```

---

## 🖥️ Comandos de Execução Rápida

- **Remotion Studio**: `bun run studio`
- **Renderizar Cenas do Vídeo em WebM Alpha**: `bun run render:video <video-id> --format=webm`
- **Renderizar Cenas do Vídeo em ProRes 4444 Alpha**: `bun run render:video <video-id> --format=prores`
- **Renderizar Cena Específica**: `bun run render:video <video-id> --scene=<id-ou-numero> --format=webm`
- **Renderizar Vídeo Completo**: `bun run render:video <video-id> --full`
- **Verificar Tipos TypeScript**: `bun run build`
