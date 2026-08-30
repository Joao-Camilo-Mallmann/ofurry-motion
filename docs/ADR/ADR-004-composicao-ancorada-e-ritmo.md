# ADR-004: Composição Ancorada, 6 Silhuetas de Layout e Metáforas Cinéticas

**Status:** Aceito  
**Data:** 2026-08-30  
**Referência:** Evolução do ADR-002 para o Sistema de Produção v3 (Anti-Template & Human-in-the-Loop)  
**Público-alvo:** Modelos de IA atuando como Diretores Criativos de Motion Design e Desenvolvedores do Motor Remotion.

---

## 1. Contexto e Motivação

As versões anteriores (ADR-001 e ADR-002) estabeleceram a tipografia monumental, canal Alpha real (ProRes 4444) e a física *Punch & Hold*. No entanto, a análise visual das primeiras cenas revelou dois gargalos críticos de qualidade:

1. **Elementos Órfãos e Desproporcionais (Look "Template de IA"):** Ícones e elementos secundários eram posicionados de forma solta na tela sem relações espaciais claras com o texto monumental, resultando em ícones flutuantes minúsculos e espaços vazios mortos.
2. **Repetição de Silhueta:** Cenas sequenciais tendiam a convergir para o mesmo layout centralizado, gerando fadiga visual no espectador.
3. **Falta de Validação Interativa:** O processo de geração não possuía um checkpoint formal de validação criativa (análise de metáfora cinética → preview em snapshot → validação com usuário → render final).

Este ADR formaliza as **Leis 7 a 10** do canal OFurry, define o catálogo de **6 Silhuetas de Layout**, a arquitetura de **Grafo de Ancoragem (`anchorTo` e `compositionBridge`)** e a escala proporcional relativa (`sizeRatio`).

---

## 2. As Novas Leis do Motion Design OFurry (Leis 7 a 10)

Complementando as 6 Regras de Ouro do ADR-002, todo Diretor IA deve aplicar:

### ⚓ Lei 7: Composição Ancorada (Zero Elementos Órfãos)
- **Nenhum elemento secundário pode flutuar isolado no espaço.**
- Todo elemento secundário (ícone, métrica de apoio, anotação de rodapé) deve declarar um alvo de ancoragem (`anchorTo`) apontando para o elemento primário da cena.
- A relação espacial deve ser amarrada por uma **Ponte de Composição (`compositionBridge`)**:
  - `connector-line`: Linha técnica fina com mira conectando a palavra-chave ou dado ao elemento filho.
  - `overlap`: Sobreposição intencional com margem negativa (-20px a -40px) ou efeito carimbo (*stamp*).
  - `color-trail`: Rastro de luz neon (#FF9900) guiando o olho do dominante para o secundário.
  - `none-justified`: Alinhamento milimétrico por *cap-height* ou *baseline*, compartilhando eixo rígido sem linha física.

### 📐 Lei 8: Escala Proporcional Relativa (`sizeRatio`)
- O tamanho dos elementos secundários é calculado como proporção direta do elemento dominante:
  - **Ícones ancorados a Título Hero (136px):** Proporção de **55% a 75%** da altura do texto (75px a 105px).
  - **Ícones ancorados a Número Hero (200px):** Proporção de **35% a 45%** da altura do número (70px a 90px).
  - **Badges/Stamps:** Proporção de **25% a 35%** da largura total do bloco de texto hero.
- Evita o efeito "emoji minúsculo solto em tela preta gigante".

### 🏛️ Lei 9: Catálogo das 6 Silhuetas Geométricas Não-Repetitivas
- Sequências de cenas nunca devem repetir a mesma silhueta de layout consecutivamente.
- O catálogo oficial do motor contempla 6 arranjos geométricos contrastantes:

| Silhueta | Identificador | Estrutura Visual | Melhor Aplicação |
|---|---|---|---|
| **1. Monumental Hero** | `monumental-hero` | Título massivo (70-90% largura) com badge sólido colado e ícone em sobreposição direta. | Ganchos brutais de abertura, frases de impacto absoluto. |
| **2. Horizontal Split** | `horizontal-split` | Divisão 50/50 ou 60/40 esquerda/direita com divisor central técnico ou ponte de fluxo. | Comparações (Antes vs Depois, Promessa vs Realidade), dado vs consequência. |
| **3. Stacked Steps** | `stacked-steps` | Progressão vertical hierárquica em 2 ou 3 blocos conectados por linhas ortogonais. | Processos passo a passo, cadeia de eventos, etapas de um golpe/produto. |
| **4. Blueprint Grifo** | `blueprint-grifo` | Trecho simulado de contrato/regulamento com grifo sólido neon e linha líder para callout. | Cláusulas de contratos (ex: letras miúdas de COE), regras regulatórias. |
| **5. HUD Radial** | `hud-radial` | Núcleo central com expansão radial conectando nós periféricos via anéis de laser. | Ecossistemas, redes de agentes, fluxo de taxas e intermediação. |
| **6. Split Authority** | `split-authority` | Divisão assimétrica 70/30 onde o número/gráfico colossal atravessa a linha divisória. | Métricas históricas monumentais com contexto analítico de autoridade. |

### 💥 Lei 10: Metáforas Cinéticas Dramáticas
- A IA não deve apenas criar "slides de texto"; deve traduzir a tensão dramática da narração em movimento físico:
  - *Exemplo "Teto de rendimento":* Barra de gráfico subindo e colidindo violentamente contra uma barreira de teto com faíscas.
  - *Exemplo "Taxa escondida":* Número principal exibido com uma linha de líder puxando a taxa minúscula que corrói o patrimônio.
  - *Exemplo "Risco mascarado":* Badge de "Capital Protegido" sofrendo transição de tarja para "Rentabilidade Real Negativa".

---

## 3. Arquitetura do Grafo de Ancoragem

### 3.1 Schema de Tipos (`src/director/schema.ts`)

```typescript
export type AnchorPoint = 
  | 'cap-height-right' 
  | 'baseline-left' 
  | 'stamp-corner' 
  | 'leader-line' 
  | 'side-rail' 
  | 'center-below';

export type CompositionBridgeType = 
  | 'connector-line' 
  | 'overlap' 
  | 'color-trail' 
  | 'none-justified';

export interface AnchorConfig {
  targetId: string;
  point: AnchorPoint;
  bridge?: CompositionBridgeType;
  offsetX?: number;
  offsetY?: number;
}
```

---

## 4. Workflow Human-in-the-Loop (5 Passos)

1. **Conceito & Metáfora Cinética:** Identificação da emoção central e metáfora física a partir do áudio/roteiro.
2. **Rascunho & Geração de Preview:** Construção da especificação `SceneSpec` com ancoragem e silhueta dedicada.
3. **Checkpoint de Validação com Usuário:** Apresentação clara do plano visual, ancoragem e palavras de impacto antes de renderizar.
4. **Refinamento Ágil:** Ajustes pontuais solicitados pelo usuário (texto, cores de destaque, timing).
5. **Renderização Final em Canal Alpha:** Exportação em lote de mini-vídeos ProRes 4444 (`.mov`) e WebM.

---

## 5. Conclusão e Próximos Passos

Com a adoção do ADR-004:
- O motor `ofurry-motion` elimina de vez o aspecto amador de templates pré-fabricados.
- Os vídeos ganham diversidade rítmica com a alternância das 6 silhuetas.
- O canal Alpha é preservado em todas as combinações gráficas.
