# ADR-006: Clean Editorial, Tipografia Estratégica & Diretrizes Anti-AI Slop

**Status:** Aceito  
**Data:** 2026-09-02  
**Referência:** Evolução do ADR-002, ADR-004 e ADR-005 para o Sistema Clean Editorial do OFurry  
**Público-alvo:** Modelos de IA atuando como Diretores Orquestradores de Motion Design e Desenvolvedores do Motor Remotion.

---

## 1. Contexto e Motivação

Embora o ADR-002 e o ADR-005 tenham introduzido o canal Alpha nativo e a decomposição de 3 a 5 segundos, a produção prática ainda apresentava sintomas recorrentes de **"template genérico de IA" (AI Slop)**:

1. **Vício em Containers ("Dashboard SaaS Syndrome"):** Elementos eram empacotados em caixas `<div>` com bordas arredondadas (`borderRadius: 20px`), fundos cinzas translúcidos (`rgba(20,20,20,0.85)`) e sombras de card. Em sobreposição de vídeo, esses cards geravam manchas escuras artificiais sobre o apresentador.
2. **Poluição Tecnológica (Fake Sci-Fi Clutter):** O `ParticleField` injetava grids de 120px e cantos L em todas as cenas, acompanhados de tags decorativas como `SYS.SCAN // 03:00` ou `REGULAMENTO // CLÁUSULA`, conferindo um aspecto amador de HUD espacial.
3. **Sobrecarga Textual:** Cenas chegavam a 15-20 palavras simultâneas (badge + título + subtítulo + cards explicativos), impossibilitando leitura em 3 segundos.
4. **Física Solta ("Jelly Wobble"):** Oscilação senoidal com rotação angular (`rotate: 0.5deg`) conferia instabilidade e sensação de flutuação em água aos elementos.

Este ADR formaliza o padrão **Clean Editorial**, a integração mandatória de **`/no-ai-slop`** dentro do **`/director-orchestrator`**, e o catálogo dos **5 Arquétipos Tipográficos Estratégicos**.

---

## 2. A Tríade Mandatória do Diretor Orquestrador

Todo planejamento e execução de cena deve integrar a Tríade:

1. **`/director-orchestrator`:** Decomposição granular (1 frase = 3s a 5s), julgamento dinâmico e checkpoint em prosa.
2. **`/no-ai-slop`:** Filtro implacável contra jargões, abstrações vazias, *throat-clearing* ("O que ninguém te conta:") e formatações decorativas. O texto é reduzido estritamente a **1 a 3 palavras de soco**.
3. **`/motion-design`:** Física firme (*Impact & Lock*), camadas de movimento conscientes e eliminação total de rotação senoidal.

---

## 3. As Novas Leis do Padrão Clean Editorial

### 🚫 Lei 1: Zero Containers e Zero Cards Cinzas
- Elementos flutuam diretamente sobre o canal Alpha transparente puro.
- Proibido qualquer `background` cinza, borda arredondada de container ou sombra difusa de card.
- A estrutura visual é criada exclusivamente por contraste monumental de tamanho de fonte, hairlines vetoriais de 1px e blocos sólidos de cor neon `#FF9900` com texto preto `#000000`.

### 🎯 Lei 2: Ponto Focal Único & Teto de 3 Palavras
- Cada mini-cena tem **1 único estímulo visual**.
- Proibido empilhar título hero + subtítulo longo + cards de apoio na mesma cena.
- O espectador ouve o locutor; a tela crava apenas a palavra-chave ou a métrica de autoridade.

### ⚡ Lei 3: Física Impact & Lock (Fim do Efeito Gelatina)
- **Entrada (0 a 12 frames):** Revelação por máscara da linha de base (*Mask Baseline Reveal*) com `overflow: hidden`, ou snap seco.
- **Retenção (12 ao final):** O elemento trava rigidamente (*Lock*) para leitura sem esforço.
- **Anti-Wobble:** Rotação angular estritamente proibida (`amplitudeRotate: 0`). Movimento ambiente restrito a micro-push unidirecional suave.

### 📐 Lei 4: Desativação do Clutter Tecnológico Padrão
- Grids, cantos L e miras centrais passam a ser estritamente *opt-in* (`showGrid = false`, `showCorners = false`).
- Fundo 100% limpo por padrão. Elementos gráficos entram apenas quando representarem diretamente um documento ou perícia técnica.

---

## 4. Catálogo dos 5 Arquétipos Tipográficos Estratégicos

| # | Arquétipo | Estrutura Cinética | Aplicação Editorial |
|---|---|---|---|
| 1 | `monumental-punch` | 1 a 3 palavras gigantes (130-160px), Mask Reveal da baseline, tarja neon sólida #FF9900 deslizante. | Ganchos brutais, palavras de impacto absoluto. |
| 2 | `metric-authority` | 1 número monumental (200-240px) tabular com micro-label de 14px em contraste de escala extremo. | Dados contundentes, taxas, perdas financeiras. |
| 3 | `strike-redaction` | Palavra A (promessa) é riscada por uma tarja sólida após 20 frames, revelando Palavra B (risco/fraude). | Desmascaramento de promessas falsas de assessores. |
| 4 | `binary-tension` | Comparação lado a lado dividida apenas por uma hairline vertical de 1px, sem nenhuma caixa. | Oposição direta de teses (Promessa vs Realidade). |
| 5 | `forensic-callout` | Parágrafo autêntico de regulamento com grifo neon animado na cláusula armadilha e callout para a métrica. | Cláusulas de letras miúdas de COE e contratos. |

---

## 5. Conclusão

Com o ADR-006, o motor `ofurry-motion` elimina todo o aspecto de "AI slop" e "dashboard SaaS", alinhando-se à direção de arte cinematográfica de estúdios internacionais de referência (Vox, Apple, Studio Dumbar) e entregando overlays Alpha transparentes de altíssimo impacto.
