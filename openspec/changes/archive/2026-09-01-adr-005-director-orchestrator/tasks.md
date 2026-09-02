## 1. ADR-005 & Skill Setup

- [x] 1.1 Criar `docs/ADR/ADR-005-diretor-orquestrador.md` a partir do download do usuário.
- [x] 1.2 Criar skill operacional `.agent/skills/director-orchestrator/SKILL.md`.
- [x] 1.3 Espelhar skill em `.agents/skills/director-orchestrator/SKILL.md`.
- [x] 1.4 Atualizar `AGENTS.md` incorporando o papel do Diretor Orquestrador e o ADR-005.

## 2. Refatoração Editorial Clean do Bloco 3

- [x] 2.1 Atualizar `example/coe-bloco3-script.ts` com textos ultra-minimalistas (2 a 4 palavras) e novas silhuetas.
- [x] 2.2 Redesenhar as 10 cenas em `src/composition/scenes/BespokeBloco3Scenes.tsx` removendo containers de dashboard/cards cinzas e implementando metáforas físicas diretas (fatiamento de bloco, split de barra, colisão no teto e derretimento inflacionário).
- [x] 2.3 Atualizar registros e durações em `src/Root.tsx`.

## 3. Verificação & Render

- [x] 3.1 Executar `bun run build` para garantir zero erros de TypeScript.
- [x] 3.2 Renderizar todas as 10 cenas individuais em WebM Alpha em `out/scenes/`.
- [x] 3.3 Renderizar o vídeo unificado do Bloco 3 (`out/bloco3-full.mp4` e `out/bloco3-full.webm`).
