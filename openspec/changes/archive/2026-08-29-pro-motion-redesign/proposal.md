## Why

As animações iniciais apresentavam escala reduzida, tipografia uniforme (apenas Montserrat) e fundo pontilhado genérico ("cara de IA/template"). Além disso, o fluxo de edição de vídeo exige exportação em formato de mini-vídeos independentes por cena com transparência real (canal Alpha / ProRes 4444 e WebM) para serem sobrepostos diretamente em timelines do Premiere Pro, DaVinci Resolve ou CapCut sobre filmagens reais e B-rolls.

## What Changes

- **Transparência Real (Alpha Channel)**: Configuração de fundo transparente nativo com suporte a exportação em ProRes 4444 (`.mov`) e WebM com canal Alpha para sobreposição direta em editores de vídeo.
- **Tipografia de Motion Design**: Expansão do catálogo de fontes para incluir famílias consolidadas em canais de ponta (`Archivo Black`, `Bebas Neue`, `Syne`, `Space Grotesk`, `Plus Jakarta Sans`).
- **Escala Monumental & Design Editorial (Anti-"Cara de IA")**: Redesenho das primitivas visuais com elementos 2x a 3x maiores (títulos de 120-150px, contadores de 180-220px, tarjas sólidas de alto contraste e miras técnicas em substituição a bolinhas aleatórias).
- **Exportação de Mini-Vídeos por Cena**: Adição de scripts de renderização em lote e individual por cena (`bun run render:scenes`, `bun run render:scene`) no Bun.

## Capabilities

### New Capabilities
<!-- Nenhuma capacidade isolada totalmente nova; as capacidades fundamentais são evoluídas -->

### Modified Capabilities
- `theme-and-motion-foundation`: Adição de fontes de edição profissionais (`Archivo Black`, `Bebas Neue`, `Syne`, `Space Grotesk`, `Plus Jakarta Sans`), escala tipográfica gigante e suporte a tokens transparentes.
- `visual-primitives`: Refatoração dos componentes visuais com escala aumentada, tarjas de alto contraste, linhas técnicas limpas e fundo transparente nativo.
- `remotion-composition-pipeline`: Suporte a exportação com canal Alpha (ProRes 4444 / WebM) e renderização de mini-vídeos independentes por cena via Bun.

## Impact

- **Código**: Atualização em `src/theme/ofurry.ts`, `src/theme/motion.ts`, `src/primitives/*`, `src/composition/SceneComposer.tsx`, `src/Root.tsx` e `remotion.config.ts`.
- **Dependências**: Inclusão de pacotes `@fontsource/archivo-black`, `@fontsource/bebas-neue`, `@fontsource/syne`, `@fontsource/space-grotesk`, `@fontsource/plus-jakarta-sans`.
- **Scripts**: Novos scripts em `package.json` (`render:scenes`, `render:scene`).
