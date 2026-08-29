# ADR-001: Arquitetura do motor `animation-to-yt`, Sistema de Motion Design e Diretrizes do Diretor IA

**Status:** Aceito (Atualizado v2.0 - Editorial & Alpha Overlays)  
**Data:** 2026-08-29  
**Contexto do projeto:** Canal OFurry (YouTube) — automatizar a geração de motion design profissional a partir de roteiro + timestamps (SRT), com suporte a overlays transparentes para edição em Premiere/DaVinci/CapCut.

---

## 1. Contexto & Desafio

O canal OFurry produz vídeos de alta retenção no YouTube sobre finanças, tecnologia e mercados. 
Para garantir um visual com **autoridade de estúdio de animação** e **zero aspecto de template genérico de IA**, o sistema adota regras estritas de composição, escala monumental, tipografia de motion design e exportação modular em mini-vídeos com canal Alpha (fundo transparente).

---

## 2. As 6 Leis do Diretor de Motion Design (Diretrizes para IAs e Desenvolvedores)

### 🔴 Lei 1: Fundo Transparente Real (Alpha Channel) e Overlay
- As animações são projetadas para serem **sobrepostas diretamente sobre o vídeo gravado / B-roll** no software de edição (Premiere Pro, DaVinci Resolve, CapCut).
- O motor suporta exportação nativa em **ProRes 4444 (`.mov`)** e **WebM com Alpha**, eliminando a necessidade de chroma-key.
- Para vídeos independentes, o fundo preto sólido (`#000000`) continua disponível.

### 🔴 Lei 2: Escala Monumental (Fim dos Mini-Widgets)
- **Títulos Hero:** `120px` a `150px`, ocupando de 70% a 90% da largura útil.
- **Números e Métricas:** `180px` a `220px`, tornando-se o monumento visual do quadro.
- **Zero timidez:** O elemento principal deve dominar a tela nos primeiros 3 segundos de cada fala.

### 🔴 Lei 3: Tipografia de Motion Design por Função
Abandonamos o uso exclusivo de uma única fonte genérica. Cada elemento possui sua identidade:
- **Títulos e Ganchos:** `Archivo Black`, `Bebas Neue` ou `Syne` (impacto, força e autoridade).
- **Valores, Moedas e Datas:** `Space Grotesk` (estética tech/monospaced tabular de alta precisão).
- **Subtítulos e Rótulos:** `Plus Jakarta Sans` ou `Inter` (legibilidade limpa e rápida).

### 🔴 Lei 4: Design Editorial vs "Cara de IA"
- **O que é proibido:** Caixinhas arredondadas idênticas, constelações de bolinhas flutuantes aleatórias e glow uniforme excessivo.
- **O que é exigido:** Tarjas sólidas de alto contraste (texto preto sobre bloco sólido neon laranja), miras e linhas técnicas de enquadramento nos cantos, assimetria intencional e hierarquia clara.

### 🔴 Lei 5: Regra do Texto Mínimo (2 a 4 Palavras)
- A tela **não é legenda de transcrição**. O espectador já está ouvindo a voz do narrador.
- Extraia apenas **2 a 4 palavras-chave de âncora** ou métricas numéricas por cena.

### 🔴 Lei 6: Física "Punch & Hold" + Micro-Movimento (Anti-Stuck)
- **Entrada (Punch):** Movimento rápido e enérgico nos primeiros 15–20 frames (springs amortecidos sem oscilação excessiva).
- **Retenção (Hold):** O elemento trava firme no lugar para facilitar a leitura.
- **Vida Contínua (Ambient):** Micro-oscilação senoidal suave (±2px) para garantir 0% de telas congeladas.

---

## 3. Arquitetura Técnica & Decisões

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                    ARQUITETURA DE PRODUÇÃO OFURRY                            │
└──────────────────────────────────────────────────────────────────────────────┘
                                       │
         ┌─────────────────────────────┼─────────────────────────────┐
         ▼                             ▼                             ▼
   1. DIRETOR LLM                2. MOTOR REMOTION             3. EXPORT MODULAR
   (Claude / Gemini)             (React + TypeScript + Bun)    (Mini-Vídeos .mov/.mp4)
   • Parser de SRT               • Theme Tokens Expandidos     • out/scenes/01-alerta.mov
   • Schema Zod SceneSpec        • Primitivas com Alpha        • out/scenes/02-pato.mov
   • Fallback automático         • Fontes locais @fontsource   • Batch render via Bun
```

### 3.1. Motor de Execução e Renderização
- **Runtime:** **Bun** (`bun install`, `bun run`) para inicialização e execução ultra-rápidas.
- **Framework:** **Remotion** para renderização frame a frame no Chrome Headless com precisão matemática em 30 fps.

### 3.2. Catálogo de Primitivas Visuais Atômicas

| Primitiva | Função Principal | Fonte / Estilo | Camada de Destaque |
|---|---|---|---|
| `TextReveal` | Palavra-chave / Título de choque | `Archivo Black` / `Syne` | Tarja sólida neon laranja com texto invertido |
| `AnimatedNumber` | Contador métrico / financeiro | `Space Grotesk` tabular | Monumental (180-220px) com micro-badge |
| `Icon` | Ícone vetorial flat | Lucide Icons | Anel laser expansivo com física elástica |
| `ConnectedNodes` | Grafo de nós em rede tech | Vetorial SVG + Labels | Traçado `strokeDashoffset` ao vivo ocupando 80% |
| `DynamicChart` | Gráfico de linha / barras | SVG com gradiente | Traço de tendência laser com ponto focal pulsante |
| `TechFrame` | Enquadramento e atmosfera | Linhas finas / Alpha | Miras técnicas e cantos de enquadramento editorial |

---

## 4. Pipeline de Exportação de Mini-Vídeos

O sistema disponibiliza 3 fluxos de exportação:

1. **`bun run render:scenes`**: Renderiza **cada cena individualmente** em lote para `out/scenes/` com transparência Alpha (`.mov` ProRes 4444 ou WebM). O editor simplesmente arrasta os arquivos para a timeline sobre as falas correspondentes.
2. **`bun run render:scene -- --id=<cena-id>`**: Renderiza apenas uma cena específica em ~2 segundos para validação ágil.
3. **`bun run render:full`**: Renderiza a composição completa sequenciada em `.mp4` para visualização contínua.

---

## 5. Consequências & Benefícios

- **Fluxo de Edição Fluido:** O editor não precisa mais cortar manualmente uma gravação longa de 1 minuto nem fazer máscaras/chroma-key.
- **Design de Alta Retenção:** Aumento dramático de CTR e retenção de vídeo através de tipografia brutalista e elementos monumentais.
- **Previsibilidade para IAs:** Qualquer LLM que consuma este documento e o `DIRECTOR_SYSTEM_PROMPT` entenderá exatamente como compor cenas que respeitem a identidade da marca.
