## Context

O canal OFurry produz vídeos educacionais com foco em finanças, investimentos e tecnologia. O estilo visual característico ("tech infographic") combina fundo preto absoluto, linhas brancas flat art, acentos em laranja/amarelo néon e tipografia Montserrat. Para automatizar essa produção com qualidade profissional e sem rigidez de templates, o sistema utiliza o Remotion (React + TypeScript) e um Diretor LLM para interpretar o roteiro e compor cenas fluidas e variadas com texto mínimo.

## Goals / Non-Goals

**Goals:**
- Configurar o ecossistema Remotion com TypeScript, Montserrat e suporte a renderização local em 1080p (1920x1080) e 4K a 30/60 fps.
- Implementar a biblioteca de primitivas visuais atômicas (`TextReveal`, `Icon`, `AnimatedNumber`, `ConnectedNodes`, `DynamicChart`, `ParticleField`).
- Criar a física de movimento baseada nas regras de `motion-design`: 3 camadas (Primary, Secondary, Ambient), micro-flutuação senoidal contínua (zero travamento) e traçado de linhas SVG ao vivo (`strokeDashoffset`).
- Definir o schema Zod `SceneSpec` e o sistema de prompt para o Diretor LLM com 2 níveis de liberdade criativa (presets robustos + inovação fora da caixa).
- Desenvolver o `SceneComposer` que renderiza sequências dinâmicas de cenas em tempo real no Remotion Studio e via render CLI.

**Non-Goals:**
- Reconhecimento automático de voz (Whisper/ASR) na fase inicial (o parser consumirá texto/SRT pronto).
- Criação de interface web gráfica para edição de vídeo (a edição/visualização é feita pelo Remotion Studio e arquivos de código/JSON).
- Suporte a modelos 3D pesados (WebGL / Three.js) — o foco é motion design 2D vetorial de alto contraste e performance.

## Decisions

### 1. Remotion como Motor de Renderização
- **Decisão**: Usar Remotion para transformar componentes React em vídeo frame a frame via Chrome Headless.
- **Alternativas consideradas**: After Effects Scripting (workflow proprietário e não-programático) ou Lottie (limitado para orquestração de layouts complexos e contadores dinâmicos).
- **Justificativa**: 100% código, tipagem estrita TypeScript, integração perfeita com SVG, animações matemáticas puras (`interpolate`, `spring`) e preview em tempo real com hot-reload.

### 2. Micro-Movimento Contínuo (Ambient Drift) para Eliminar Sensação de Vídeo Travado
- **Decisão**: Toda primitiva deve implementar uma camada "Ambient" com oscilação contínua baseada em ondas senoidais (`Math.sin(frame / period)`).
- **Justificativa**: Evita o aspecto estático de slides quando a entrada do elemento termina.

### 3. Construção Visual ao Vivo (SVG Stroke Drawing)
- **Decisão**: Gráficos, molduras e nós utilizam `strokeDashoffset` interpolado e expansões radiais para parecerem estar sendo desenhados na tela na hora da fala.
- **Justificativa**: Cria alta retenção visual e dinamismo estético característico de motion graphics modernos.

### 4. Diretor LLM com 2 Níveis de Liberdade
- **Decisão**: O schema `SceneSpec` suporta layouts semânticos padrão (`split-left`, `radial-network`, etc.) e um modo de composição livre em camadas (`freeform`) com campos de `artDirection` (metáforas visuais e humor da cena).
- **Justificativa**: Evita repetições e telas idênticas, permitindo soluções visuais inovadoras sugeridas pelo LLM ou solicitadas pelo usuário.

### 5. Tipografia Montserrat e Filosofia de Texto Mínimo
- **Decisão**: Carregar `@fontsource/montserrat` e limitar elementos de texto a 2–4 palavras-chave ou métricas no prompt do Diretor.
- **Justificativa**: Vídeos do OFurry valorizam a narrativa visual e ritmo dinâmico, evitando poluição textual.

## Risks / Trade-offs

- **[Risco] LLM gerar JSON inválido ou campos fora do schema** → **Mitigação**: Validação estrita via Zod com mecanismo de fallback seguro (converte para layout simples com `TextReveal` + `Icon`).
- **[Risco] Sobrecarga de elementos simultâneos em cena** → **Mitigação**: Aplicação da Regra de 1/3 do `motion-design` (máximo de 3 elementos principais em movimento ativo simultâneo).
- **[Risco] Download do Chrome Headless pelo Remotion em ambientes restritos** → **Mitigação**: Documentar pré-requisitos de rede no setup local e utilizar o cache global do Remotion.
