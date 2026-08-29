## Why

A criação manual de motion graphics para os vídeos do canal OFurry (YouTube) é demorada e limita a velocidade de publicação. É necessário um motor programático de animação baseado em Remotion que interprete roteiros textuais e gere automaticamente vídeos MP4 de alta qualidade (1080p/4K, 16:9), seguindo rigorosamente a identidade visual da marca (fundo preto, Montserrat, linhas brancas e acentos néon laranja/amarelo), com animações contínuas, suaves ("smooth" / zero-travadas), texto mínimo e alta variedade visual.

## What Changes

- Inicialização da estrutura de projeto Remotion com React e TypeScript (`package.json`, `remotion.config.ts`, `tsconfig.json`).
- Criação do sistema de tema e física de movimento OFurry (`theme/ofurry.ts`, tipografia Montserrat, interpolações senoidais contínuas e springs amortecidos).
- Implementação do catálogo de primitivas visuais atômicas (`TextReveal`, `Icon`, `AnimatedNumber`, `ConnectedNodes`, `DynamicChart`, `ParticleField`) com técnicas de construção ao vivo (desenho de traço SVG `strokeDashoffset`, contadores rápidos e explosões radiais).
- Definição do schema tipado `SceneSpec` (com validação Zod) e prompt do Diretor Inteligente com 2 níveis de liberdade (layouts pré-testados + inovação fora da caixa / metáforas visuais).
- Criação do `SceneComposer` e composição raiz no Remotion para visualização no Remotion Studio e renderização em MP4.
- Criação de roteiro de exemplo e script de orquestração inicial.

## Capabilities

### New Capabilities
- `theme-and-motion-foundation`: Sistema de tema da marca OFurry (cores, Montserrat, layout 16:9 1080p/4K) e utilitários de física de movimento contínuo (springs amortecidos, micro-flutuação senoidal / ambient drift).
- `visual-primitives`: Biblioteca de componentes visuais atômicos em Remotion com suporte a construção ao vivo, 3 camadas de animação (Primary, Secondary, Ambient) e foco em texto mínimo.
- `director-schema`: Schema tipado Zod e sistema de prompt para o Diretor LLM estruturar cenas com variedade de layouts e liberdade criativa para metáforas visuais.
- `remotion-composition-pipeline`: Pipeline de composição (`Root.tsx`, `SceneComposer`) e renderizador programático para Remotion Studio e exportação de MP4.

### Modified Capabilities
<!-- Nenhuma capacidade existente modificada (projeto novo) -->

## Impact

- **Código & Arquitetura**: Criação dos módulos `src/theme/`, `src/primitives/`, `src/director/`, `src/composition/` e scripts de execução.
- **Dependências**: Adição de `remotion`, `@remotion/cli`, `@remotion/bundler`, `zod`, `lucide-react` (ou ícones SVG customizados) e fontes `@fontsource/montserrat`.
- **Sistemas**: Renderização local via Chrome Headless integrado ao Remotion.
