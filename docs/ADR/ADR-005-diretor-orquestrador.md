# ADR-005: Diretor Orquestrador — Decomposição Granular Frase a Frase, Julgamento Dinâmico e Checkpoint em Prosa

**Status:** Aceito  
**Data:** 2026-09-01  
**Referência:** Evolução do ADR-002 e ADR-004 para o Sistema de Direção Criativa & Orquestração Editorial OFurry  
**Público-alvo:** Modelos de IA atuando como Diretores Orquestradores de Motion Design e Desenvolvedores do Motor Remotion.

---

## 1. Contexto e Motivação

O ADR-002 e o ADR-004 consolidaram as 10 Leis de Motion Design, a tipografia monumental com canal Alpha nativo e o catálogo de 6 Silhuetas com Composição Ancorada. No entanto, na prática de produção em vídeos reais para o canal OFurry, foram observados os seguintes desafios:

1. **Granularidade Excessiva de Áudio por Cena:** Cenas que tentavam cobrir parágrafos inteiros de narração geravam composições com excesso de informação, múltiplos cards/containers cinzas e aspecto visual pesado de "dashboard SaaS / template genérico de IA".
2. **Falta de Papel Central de Direção:** Faltava um papel formal de **Diretor Orquestrador** encarregado de ouvir/ler o roteiro falado e decompor frase a frase em mini-cenas dinâmicas de 3 a 5 segundos.
3. **Sobrecarga de Checkpoint Técnico:** O checkpoint de validação anterior muitas vezes apresentava estruturas de JSON ou código complexo, dificultando uma revisão rápida e escaneável pelo diretor humano antes da geração de código.

Este ADR estabelece a atuação do **Diretor Orquestrador**, a decomposição granular frase a frase, o julgamento dinâmico de delegação e o **Checkpoint Human-Readable em Prosa**, além de consolidar a estética *Clean Editorial* (anti-dashboard).

---

## 2. Princípios Centrais do ADR-005

### 🎬 1. Decomposição Granular Frase a Frase (3s a 5s por Mini-Cena)
- Cada mini-cena deve cobrir estritamente **uma única frase** ou unidade de sentido imediata da narração.
- A duração típica varia de **90 a 150 frames (3.0s a 5.0s a 30fps)**.
- Transições rápidas entre mini-cenas mantêm o dinamismo editorial no Premiere/DaVinci, evitando telas estáticas prolongadas.

### 🧠 2. Julgamento Dinâmico de Complexidade & Delegação
O Diretor Orquestrador avalia a complexidade visual e cinética de cada mini-cena do bloco:
- **Resolução Direta (Orquestrador):** Mini-cenas diretas com métricas, ganchos de texto monumental ou ícones ancorados são planejadas e codificadas diretamente pelo Diretor Orquestrador, sem overhead de delegação.
- **Delegação a Subagente Especializado:** Mini-cenas que exigem física vetorial avançada, múltiplos estágios de animação, SVG interativo complexo ou gráficos cinéticos sob medida são delegadas a subagentes com instruções estéticas e silhuetas pré-definidas.

### 📋 3. Checkpoint Human-Readable em Prosa Escaneável
Antes de gerar qualquer especificação técnica JSON (`SceneSpec`) ou código Remotion, o Diretor Orquestrador apresenta um plano consolidado em **prosa curta e escaneável** para validação pelo usuário:

```markdown
### 🎬 Plano Editorial do Bloco: [Nome do Bloco]

- **Cena 01 (3.5s)**: "[Trecho da fala narrada]"
  - *Metáfora Cinética*: [1 frase descrevendo o movimento físico visceral]
  - *Silhueta*: `[monumental-hero | horizontal-split | stacked-steps | blueprint-grifo | hud-radial | split-authority]`
  - *Origem*: [Direta | Subagente Especializado]

- **Cena 02 (3.0s)**: "[Trecho da fala narrada]"
  - *Metáfora Cinética*: [1 frase descrevendo o movimento físico visceral]
  - *Silhueta*: `[...]`
  - *Origem*: [Direta | Subagente Especializado]
```

### 🚫 4. Padrão Estético Clean Editorial (Anti-SaaS Dashboard)
- **Zero Containers/Cards Cinzas:** Elementos flutuam diretamente sobre o canal Alpha transparente, integrando-se organicamente ao vídeo real.
- **2 a 4 Palavras Monumentais:** Jamais exibir frases completas na tela. Apenas palavras-chave de 110px a 150px e números de 180px a 220px.
- **Metáforas Físicas Viscerais:** Traduzir abstrações financeiras em física tangível (fatiamento de bloco de investimento, divisão cirúrgica de barra de capital, colisão violenta com faíscas no teto de rentabilidade e corrosão/derretimento pela inflação).

---

## 3. Matriz de Rotação de Silhuetas & Ritmo

Para evitar repetição entre cenas consecutivas, o Diretor Orquestrador organiza a alternância mandatória entre as 6 silhuetas geométricas:

| # | Silhueta | Foco Visual |
|---|---|---|
| 1 | `monumental-hero` | Título massivo central com badge colado e overlap de ícone |
| 2 | `horizontal-split` | Comparação lado a lado (50/50 ou 60/40) com linha de divisão |
| 3 | `stacked-steps` | Progressão vertical em camadas/etapas com conectores |
| 4 | `blueprint-grifo` | Grifo de documento/contrato técnico em neon #FF9900 |
| 5 | `hud-radial` | Núcleo de autoridade com anéis de laser e nós orbitais |
| 6 | `split-authority` | Métrica colossal assimétrica cruzando divisória técnica |

---

## 4. Workflow Integrado de Produção (5 Etapas)

1. **Decomposição & Metáforas:** Decompor a narração frase a frase e definir metáforas físicas viscerais com rotação de silhuetas.
2. **Julgamento de Complexidade:** Definir quais cenas são resolvidas diretamente e quais são delegadas.
3. **Validação do Plano em Prosa:** Submeter o plano editorial escaneável ao usuário para aprovação.
4. **Implementação Técnica & Preview:** Gerar `SceneSpec` e componentes Remotion com suporte a Alpha nativo e validar em `bun run studio`.
5. **Renderização Alpha:** Exportar mini-vídeos em ProRes 4444 (`.mov`) ou WebM para timeline de edição.

---

## 5. Conclusão

Com o ADR-005, o motor `ofurry-motion` atinge um fluxo de direção criativa profissional: ritmo hiperdinâmico (cenas de 3 a 5 segundos), estética cinematográfica limpa sem caixas pesadas, e transparência editorial total para aprovação rápida antes do código.
