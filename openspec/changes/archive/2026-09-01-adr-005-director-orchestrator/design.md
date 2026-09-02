## Context

O pipeline de geração de motion graphics do `ofurry-motion` baseia-se em Remotion, React, TypeScript e Bun. O ADR-002 introduziu as primitivas visuais e o ADR-004 formalizou as 6 silhuetas e a composição ancorada. A introdução do ADR-005 resolve a sobrecarga cognitiva e a granularidade excessiva das cenas ao estabelecer o **Diretor Orquestrador** como papel central na decomposição do roteiro e na validação prévia de planos em prosa escaneável.

## Goals / Non-Goals

**Goals:**
- Institucionalizar o ADR-005 em `docs/ADR/` e criar a skill operacional `director-orchestrator`.
- Atualizar as diretrizes de agentes em `AGENTS.md`.
- Refatorar as cenas do Bloco 3 para eliminar containers de dashboard SaaS, reduzindo o texto para 2 a 4 palavras e usando metáforas físicas viscerais.
- Manter suporte nativo ao canal Alpha (ProRes 4444 e WebM).

**Non-Goals:**
- Não alterar o schema central do Zod (`SceneSpecSchema`), mantendo compatibilidade com as composições existentes.
- Não abandonar as primitivas de renderização do Remotion nem o catálogo de 6 silhuetas do ADR-004.

## Decisions

### 1. Papel do Diretor Orquestrador
- **Decisão**: O agente atua como Diretor Orquestrador que quebra o roteiro frase a frase e gera um plano human-readable em prosa antes de criar qualquer código.
- **Alternativa Considerada**: Deixar cada subagente planejar sua própria cena isoladamente (rejeitado por causar quebra de ritmo e repetição de silhuetas).

### 2. Estética Clean Editorial vs SaaS Dashboard
- **Decisão**: Remover containers cinzas, bordas duplas e parágrafos de texto. Apenas tipografia monumental flutuando sobre o canal Alpha com contraste extremo (#FFFFFF e #FF9900).
- **Alternativa Considerada**: Manter cards com fundo semi-transparente (rejeitado por dar aspecto de template genérico de IA).

### 3. Localização da Skill
- **Decisão**: Instalar em `.agent/skills/director-orchestrator/SKILL.md` e espelhar em `.agents/skills/director-orchestrator/SKILL.md`.

## Risks / Trade-offs

- **[Aumento no número de mini-cenas]** → *Mitigação*: Cenas mais curtas (3s a 5s) tornam a edição no Premiere muito mais dinâmica e reduzem o tempo individual de render de cada arquivo.
- **[Repetição de silhuetas entre subagentes]** → *Mitigação*: O Orquestrador centraliza a matriz de silhuetas antes de delegar, garantindo alternância obrigatória.
