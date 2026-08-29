## Context

O motor de animação do OFurry evoluiu de um protótipo básico para um sistema de produção profissional de Motion Design para o YouTube. Para atender ao fluxo de trabalho real de edição (onde animações são sobrepostas a filmagens de câmera e B-rolls em editores como Premiere Pro, DaVinci Resolve e CapCut), o sistema necessita de suporte nativo a canal Alpha (transparência real), exportação modular de mini-vídeos por cena/fala, tipografia diversificada de alto padrão e escala monumental que domine a atenção do espectador sem parecer um template genérico de IA.

## Goals / Non-Goals

**Goals:**
- Implementar suporte a canal Alpha com exportação em ProRes 4444 (`.mov`) e WebM com transparência real.
- Integrar pacote de fontes de motion design consagradas (`Archivo Black`, `Bebas Neue`, `Syne`, `Space Grotesk`, `Plus Jakarta Sans`) via pacotes locais `@fontsource/*` para evitar dependência de rede durante a renderização.
- Redesenhar as primitivas visuais com escala monumental (títulos de 120-150px, contadores de 180-220px, tarjas sólidas de alto contraste, linhas de mira e enquadramento técnico).
- Criar pipeline de renderização em lote e individual para exportar cada cena do roteiro como um mini-vídeo independente (`out/scenes/`).

**Non-Goals:**
- Criação de interface gráfica proprietária de edição (o preview e ajuste ocorrem via Remotion Studio com hot-reload).
- Compressão com perda de dados em canais Alpha (prioriza-se fidelidade máxima para edição de estúdio).

## Decisions

### 1. Pacote de Fontes Locais com @fontsource
- **Decisão**: Utilizar pacotes `@fontsource/*` dedicados (`@fontsource/archivo-black`, `@fontsource/bebas-neue`, `@fontsource/syne`, `@fontsource/space-grotesk`, `@fontsource/plus-jakarta-sans`).
- **Justificativa**: Garante carregamento instantâneo, offline e deterministicamente idêntico no Chrome Headless durante a renderização, sem risco de falha de conexão a APIs externas do Google Fonts.

### 2. Arquitetura de Transparência Real (Alpha Channel)
- **Decisão**: Configurar `OFurryTheme` com toggle de fundo transparente e registrar presets de renderização com codec ProRes 4444 (`.mov`) e VP9/WebM.
- **Justificativa**: O formato ProRes 4444 é o padrão da indústria para overlays em Adobe Premiere Pro, DaVinci Resolve e Final Cut Pro, eliminando a necessidade de chroma-key ou máscaras manuais.

### 3. Escala Monumental & Estética Editorial Anti-"Cara de IA"
- **Decisão**:
  - Títulos Hero saltam para 120px–150px com famílias pesadas (`Archivo Black` / `Syne`).
  - Métricas e Contadores utilizam `Space Grotesk` em 180px–220px com alinhamento monospaced tabular e micro-labels em caixas altas.
  - Substituição da constelação de partículas aleatórias por linhas de mira, cantos de enquadramento técnico e tarjas de alto contraste (texto preto sobre bloco sólido neon).
- **Justificativa**: Cria impacto imediato nos primeiros 3 segundos do vídeo e transmite autoridade visual de estúdio, abandonando o visual de templates padronizados.

### 4. Pipeline de Exportação de Mini-Vídeos por Cena
- **Decisão**: Implementar um script orquestrador em TypeScript/Bun (`scripts/render-scenes.ts`) que lê as cenas registradas no roteiro e renderiza cada uma sequencialmente para `out/scenes/cena-[id].mov` (ou `.mp4`).
- **Justificativa**: Permite ao editor arrastar diretamente o mini-vídeo de cada fala para o ponto exato da timeline de edição.

## Risks / Trade-offs

- **[Risco] Arquivos ProRes 4444 podem ser pesados (~50-100MB por trecho)** → **Mitigação**: Oferecer opções de exportação em WebM (muito mais leve e com alpha) e MP4 com fundo preto sólido.
- **[Risco] Variação de proporção com textos longos em escala gigante** → **Mitigação**: Manter a regra estrita de texto mínimo (2 a 4 palavras-chave) e aplicar quebras automáticas de linha e `max-width` inteligente no `TextReveal`.
