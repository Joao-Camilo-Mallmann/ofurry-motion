## Why

O ADR-004 e ADR-002 estabeleceram as 10 Leis de Motion Design e o catálogo de 6 silhuetas. No entanto, na prática de produção de vídeos para o canal OFurry:
1. Os blocos de narração ainda eram tratados com granularidade grossa demais (múltiplas frases numa única cena), gerando layouts com cara de "dashboard SaaS / IA pesada", excesso de texto e caixas desnecessárias.
2. Faltava o papel formal do **Diretor Orquestrador** para receber a fala bruta, decompor frase a frase em mini-cenas hiperdinâmicas, julgar a complexidade de cada uma (resolução direta vs subagente) e apresentar um **plano em prosa curto e escaneável** para aprovação antes de qualquer código técnico.

Esta proposta integra formalmente o **ADR-005**, a nova skill **`director-orchestrator`** e aplica a refatoração editorial minimalista às cenas do canal (iniciando pelo Bloco 3).

## What Changes

- **Integração do ADR-005**: Adiciona `docs/ADR/ADR-005-diretor-orquestrador.md` e atualiza `AGENTS.md`.
- **Instalação da Skill `director-orchestrator`**: Adiciona a skill operacional em `.agent/skills/director-orchestrator/SKILL.md` e `.agents/skills/director-orchestrator/SKILL.md`.
- **Novo Checkpoint de Aprovação Human-Readable**: Substitui rascunhos técnicos em JSON no checkpoint de validação por planos curtos em prosa escaneável (trecho da fala, metáfora visual, silhueta e origem).
- **Refatoração Editorial das Cenas do Bloco 3**: Elimina caixas cinzas/dashboard, reduz texto para 2-4 palavras por tela, e aplica metáforas cinéticas físicas e viscerais (corte de bloco COE, divisão de barra de capital, colisão no teto de rentabilidade e corrosão inflacionária).

## Capabilities

### New Capabilities
- `director-orchestration`: Decomposição de roteiro em mini-cenas por frase, julgamento dinâmico de delegação e checkpoint de plano legível human-readable.
- `clean-editorial-motion`: Padrão estético anti-dashboard/anti-IA pesada focado em 2-4 palavras monumentais, ausência de caixas/containers opacos e metáforas físicas viscerais.

### Modified Capabilities
- `interactive-generation-workflow`: Atualiza o checkpoint humano para validar o plano em prosa antes da geração de `SceneSpec` e renders.

## Impact

- **Documentação & Guias**: `docs/ADR/`, `AGENTS.md`, `.agent/skills/`, `.agents/skills/`.
- **Composições Remotion**: `src/composition/scenes/BespokeBloco3Scenes.tsx`, `example/coe-bloco3-script.ts`, `src/Root.tsx`.
- **Pipelines de Render**: Preservação total de transparência Alpha real (ProRes 4444 e WebM).
