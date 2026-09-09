# OFurry Motion Engine - Agent Guidelines

## 🎬 Project Mission
This project (`ofurry-motion`) is a programmatic Editorial Motion Design engine for the **OFurry** YouTube channel, built with **Remotion**, **React**, **TypeScript**, and **Bun**. It generates transparent Alpha Channel mini-videos (ProRes 4444 and WebM) to be overlaid on real video footage in Premiere Pro, DaVinci Resolve, or CapCut.

---

## ⚡ Mandatory Directives for AI Agents

## ⚡ Mandatory Directives for AI Agents

### 1. Act as the Diretor Orquestrador (`/director-orchestrator`)
Whenever processing script narration or building motion scenes:
- **Creative Director First, Never a Code Dumper**: PROIBIDO retornar código Remotion/TSX como output principal da skill. A resposta primária deve ser exclusivamente o **Plano Visual Editorial / Checkpoint** estruturado em prosa. O código só existe após a aprovação humana.
- **Incremental & Independent Trechos (`output/trecho-XX/`)**: O projeto nunca é tratado como um monólito. O vídeo é construído trecho a trecho de forma incremental. Cada execução cria um novo trecho isolado.
- **Roteiro Como Única Fonte Persistente de Contexto**: A skill lê `videos/<video>/roteiro.md` para identificar o próximo trecho a ser produzido. **NÃO consome o código ou implementações dos trechos anteriores.** Continuidade narrativa e vetorial sem dependência de código.
- **Granularidade Cinematográfica**: Cada trecho é composto por tomadas de 3s a 5s (90-150 frames) que formam uma corrente audiovisual contínua com a locução.

### 2. Mandatory Dual Visual Engine: `/motion-design` + `video-shotcraft`
Every scene must fuse the editorial physics of `motion-design` with the cinematography of `video-shotcraft`:
- **`motion-design` (Física & Comportamento)**: Damped springs (`snappy`, `smooth-draw`), timing 0-15f punch / 15-final hold com micro-drift, 3 camadas de movimento, tipografia monumental (130px-160px) e métricas (200px-240px).
- **`video-shotcraft` (Câmera & Cinematografia)**: Câmera 2.5D (tilt, perspective 1000px, parallax drift), enquadramentos dinâmicos (push-in, crash zoom, orbit, whip), 157 shot recipes, curva de energia (`promo-energy-arc`), cortes motivados pela ação e Sound Design cirúrgico (SFX cues: impact, riser, whoosh, silence).
- **Core Question**: *"Qual plano cinematográfico melhor comunica esta frase?"* (e não *"Qual layout colocar?"*).

### 3. Always Incorporate `/no-ai-slop` & Anti-SaaS Visual Directive
- **Zero Cards / Zero Dashboards**: Proibido cards cinzas, chips, pills, badges, painéis de dashboard, grids de informação, UI fictícia, excesso de labels e divisórias.
- **1 Objeto Dominante & Espaço Vazio Dramático**: Letras monumentais flutuando no canal Alpha real, alto contraste neon `#FF9900` com texto `#000000`.
- **Golden Rule**: *"Se uma cena puder ser resolvida com um elemento grande se movendo bem, não introduza três elementos pequenos."*
- **Concrete Over Abstract**: Cortar rodeios ("O que ninguém te conta"). Extrair 1 a 3 palavras-chave viscerais por cena ("TAXA 2.5%", "85% PRESO").

### 4. Incremental Workspace Organization (`videos/<video>/`)
Every video project is structured incrementally:
```text
videos/<video-name>/
  ├── roteiro.md                 # Full script narration (Única fonte persistente de contexto)
  └── output/
      ├── trecho-01/
      │   ├── concept.md         # Direção editorial aprovada (Sem código)
      │   ├── scenes/            # Implementação Remotion modular (01-*.tsx, index.ts)
      │   └── render/            # Arquivos renderizados (.webm, .mov, full.webm)
      ├── trecho-02/
      │   ├── concept.md
      │   ├── scenes/
      │   └── render/
      └── trecho-XX/
          └── ...
```

---

## 🏆 The 10 Golden Rules of the OFurry Engine

1. **Strategic Punch Text (1-3 Words & Zero Faux-Web Clutter)**: Never display full sentences, paragraphs, or dense tickers. Maximum 1 micro-tag (14px) tied to the hero metric. Pure visual authority.
2. **Monumental Scale**: Hero titles occupy 70%-90% screen width (130px-160px). Numbers reach 200px-240px.
3. **Typography by Role**:
   - `archivo` (`Archivo Black`) or `bebas` (`Bebas Neue`): Hero hook titles.
   - `syne` (`Syne`): Conceptual modern editorial titles.
   - `space-grotesk` (`Space Grotesk`): Metrics, numbers, currencies, technical data.
   - `jakarta` (`Plus Jakarta Sans`): Micro-labels de alta precisão (14px).
4. **Anti-"AI Slop" / Zero Cards**: High contrast solid black (#000000), solid neon orange blocks (#FF9900) with pure black text (#000000), zero grey background cards (`rgba(20,20,20,...)`), zero container boxes, zero generic blur clouds, zero default grids.
5. **Native Alpha Channel**: Transparent background output in ProRes 4444 (`.mov`) or WebM.
6. **Cinematography & 2.5D Camera**: Use camera moves from `video-shotcraft` (push-in, crash-zoom, subtle 2.5D tilt/orbit, parallax drift). Proibido rotação senoidal amadora (`amplitudeRotate: 0`).
7. **Impact & Full-Timeline Fluidity (Anti-Freeze)**:
   - **Entrada (0-15 frames):** Mask Reveal da linha de base (`overflow: hidden`) ou snap seco com spring firme.
   - **Fluidez Contínua (15-final):** Movimento orgânico contínuo (pulsação suave, ondas de luz/gradiente e micro-flutuação visível), sem estagnação.
8. **Anchored Composition (Zero Orphans)**: Every secondary element must declare `anchorTo` and `compositionBridge` tied to the dominant anchor element.
9. **Continuidade Audiovisual Sem Dependência de Código**: O fim do trecho $N$ motiva a entrada do trecho $N+1$ por vetor de movimento e tensão dramática, descritos conceitualmente no plano visual.
10. **Sound Design Cirúrgico**: Toda ação física relevante é pontuada por SFX (`impact`, `whoosh`, `riser`, `silence`).

---

## 🔄 Incremental Production Workflow

1. **Leitura do Roteiro**: Inspecionar `videos/<video>/roteiro.md` e identificar o próximo trecho a ser produzido.
2. **Concepção Cinematográfica**: Fundir `motion-design` + `video-shotcraft` + `no-ai-slop`.
3. **Checkpoint Editorial em Prosa**: Apresentar ao usuário o plano cinematográfico detalhado (Locução, Ideia, Metáfora, Shot, Câmera, Motion, Composição, Tipografia, Continuidade, SFX, Energia, Elementos Proibidos). **NÃO gerar código.**
4. **Geração Modular Pós-Aprovação**: Criar `output/trecho-XX/concept.md` e os arquivos Remotion em `output/trecho-XX/scenes/`.
5. **Alpha Render**: Renderizar as cenas em `output/trecho-XX/render/` via `bun run render:trecho <video> <XX> --format=webm|prores`.

---

## 🚀 Quick Execution Commands

- **Launch Remotion Studio**: `bun run studio` (Opens at `http://localhost:3000`)
- **Render Trecho Específico (WebM Alpha)**: `bun run render:trecho <video-id> <numero-trecho>`
- **Render Trecho Específico (ProRes 4444 Alpha)**: `bun run render:trecho <video-id> <numero-trecho> --format=prores`
- **Render Video Scenes (WebM Alpha)**: `bun run render:video <video-id> --format=webm`
- **Render Video Scenes (ProRes 4444 Alpha)**: `bun run render:video <video-id> --format=prores`
- **Check TypeScript Types**: `bun run build`
