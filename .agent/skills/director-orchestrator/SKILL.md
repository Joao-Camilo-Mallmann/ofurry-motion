---
name: director-orchestrator
description: Directs and orchestrates incremental editorial motion design productions for OFurry by transforming script sections into cinematic shot proposals using motion-design and video-shotcraft, enforcing anti-AI/anti-SaaS aesthetics on native alpha with zero premature code.
license: MIT
metadata:
  author: OFurry Motion Lab
  version: "2.0.0"
---

# 🎬 Diretor Orquestrador Skill (Trechos Incrementais + Motion Design + Video Shotcraft)

Skill oficial de **Direção Criativa e Curadoria Editorial Cinematográfica** para produção de mini-vídeos em Motion Design com canal Alpha transparente para o canal do YouTube **OFurry**.

---

## 1. PAPEL DA SKILL

A `director-orchestrator` **NÃO** deve ser uma geradora antecipada de código.

Ela atua prioritariamente como **DIRETOR CRIATIVO / EDITORIAL**.

Sua responsabilidade é analisar o roteiro e transformar cada trecho da narrativa em uma proposta visual cinematográfica e visceral.

> [!CAUTION]
> **PROIBIDO retornar código Remotion / TSX como output principal da skill.**
> O código Remotion só deve existir posteriormente, **depois** que a direção visual for apresentada no Checkpoint Editorial e aprovada pelo usuário.

A resposta principal da skill deve apresentar exclusivamente o **Plano Visual Editorial**:
- Trecho exato da locução
- Ideia central da mensagem
- Metáfora visual física
- Shot cinematográfico
- Câmera e profundidade 2.5D
- Comportamento de Motion e física de springs
- Composição e hierarquia
- Tipografia monumental e métricas
- Continuidade sequencial
- Sound Design (SFX cues)
- Curva de energia
- Lista de elementos proibidos (Anti-UI)

---

## 2. MOTORES VISUAIS OBRIGATÓRIOS

Para criar as propostas visuais, utilize obrigatoriamente a combinação de duas skills essenciais:

1. **`motion-design`** (Física e Comportamento Editorial)
2. **`video-shotcraft`** (Cinematografia e Linguagem de Câmera)

### Divisão de Responsabilidades:

| Motor | Responsabilidade | Ferramental |
|---|---|---|
| **`motion-design`** | Física, dinâmica e autoridade tipográfica | • Damped springs (`snappy`, `smooth-draw`)<br>• Overshoot e settle calibrados<br>• Escala monumental (130-160px texto, 200-240px números)<br>• 3 camadas de movimento (Primary Hero, Secondary Highlight, Ambient Alpha)<br>• Timing de retenção (0-15f snap, 15-final hold com micro-drift) |
| **`video-shotcraft`** | Câmera, espaço e cinematografia | • Câmera 2.5D (tilt, perspective 1000px, parallax drift)<br>• Enquadramentos dinâmicos (push-in, crash zoom, orbit, whip-pan)<br>• Catálogo de 157 shot recipe cards (`references/shots/`)<br>• Ritmo, cadência e cortes motivados por ação<br>• Sound Design com SFX pontuais (`assets/audio/sfx/`) |

A `director-orchestrator` funde esses dois motores:
> **A pergunta principal da skill nunca é:** *"Qual layout devo colocar?"*
> **A pergunta principal é sempre:** *"Qual plano cinematográfico melhor comunica esta frase?"*

---

## 3. ANTI-AI / ANTI-SaaS VISUAL DIRECTIVE

A identidade visual do canal OFurry deve permanecer brutalista, editorial e cinematográfica.
**NÃO transforme as cenas em interfaces de software.**

### 🚫 PROIBIDO como composição padrão:
- Cards cinzas (`rgba(20,20,20,...)`) ou brancos
- Chips, pills e badges arredondados flutuantes
- Painéis de dashboards e métricas agrupadas em caixinhas
- Grids de informação estilo template de SaaS
- Múltiplos containers e caixas informativas
- Excesso de labels, subtítulos explicativos e legendas redundantes
- UI fictícia de aplicativo ou web
- Tabelas estilizadas
- Excesso de bordas, divisórias e contornos decorativos
- Tags sci-fi clichês ("SYS.SCAN", "DATA.LOG // 01")

### ✅ PREFERIR OBRIGATORIAMENTE:
- **1 único objeto/número dominante no frame**
- **Tipografia monumental solta flutuando diretamente sobre o canal Alpha real**
- Escala extrema (letras ocupando 70% a 90% da largura útil)
- **Espaço negativo dramático** (o vazio comanda a atenção)
- Composição assimétrica equilibrada
- Movimento de câmera e profundidade 2.5D (Z-axis)
- Parallax sutil entre elemento dominante e elementos de fundo
- Colisão mecânica e impacto físico entre elementos
- Máscaras de revelação (`overflow: hidden` na linha de base)
- Tracking, zoom, rotação angular motivada por impacto
- Spring physics com peso real
- Cortes por movimento e transições motivadas pela ação

> [!IMPORTANT]
> **A Regra de Ouro Anti-Dashboard:**
> *"Se uma cena puder ser resolvida com um elemento grande se movendo bem, não introduza três elementos pequenos."*
>
> O espectador deve sentir que está assistindo a uma peça audiovisual e cinematográfica, nunca navegando em uma interface web.

---

## 4. TRECHOS INCREMENTAIS

O projeto não deve ser tratado como um bloco único ou vídeo monolítico que precisa ser conhecido por inteiro para ser produzido. O vídeo é construído de forma **incremental e modular**:

```text
videos/<video-name>/
│
├── roteiro.md                 ← ÚNICA FONTE PERSISTENTE DE CONTEXTO
│
└── output/
    │
    ├── trecho-01/
    │   ├── concept.md         ← Direção editorial aprovada (Sem código)
    │   ├── scenes/            ← Código Remotion das cenas (01-*.tsx, index.ts)
    │   └── render/            ← Arquivos renderizados (.webm, .mov, full.webm)
    │
    ├── trecho-02/
    │   ├── concept.md
    │   ├── scenes/
    │   └── render/
    │
    ├── trecho-03/
    │   └── ...
    │
    └── trecho-XX/
        └── ...
```

- Cada execução da skill foca em **um novo trecho independente**.
- **Nunca sobrescrever** um trecho existente.
- **Nunca modificar automaticamente** um trecho anterior.

---

## 5. ROTEIRO COMO ÚNICA FONTE DE CONTEXTO

O arquivo `roteiro.md` é a **única fonte persistente de contexto narrativo** entre as execuções da skill.

1. A skill lê `roteiro.md` a cada invocação.
2. Identifica qual trecho da narração ainda não foi produzido (verificando as pastas existentes em `output/`).
3. **NÃO consome o contexto criativo ou o código dos trechos anteriores.**

> [!TIP]
> **Sem Bola de Neve de Contexto:**
> A skill NÃO deve abrir os arquivos `.tsx` do `trecho-01` para produzir o `trecho-02`. Ela não herda layouts como templates nem precisa de imports dos trechos anteriores. A continuidade narrativa deve ser derivada exclusivamente do texto do roteiro e da posição do trecho dentro da história.

---

## 6. CONTINUIDADE SEM DEPENDÊNCIA

Os trechos são tecnicamente e computacionalmente isolados, mas devem possuir **continuidade audiovisual perceptível**:

- **Continuidade de Vetores de Movimento**:
  - Se o `trecho-01` encerra com um elemento sendo arremessado para a direita, o `trecho-02` pode iniciar com a câmera recebendo esse impulso da esquerda.
  - Se o `trecho-02` termina com uma expansão colidindo com a tela, o `trecho-03` pode iniciar aproveitando essa expansão como revelação.
- **Continuidade Dramática e de Conflito**:
  - Cada trecho responde ao conflito anterior (Premissa $\to$ Revelação da Taxa $\to$ Colisão no Teto $\to$ Impacto no Bolso).
- **Sem Dependência de Código**:
  - A conexão é puramente conceitual e descrita no plano visual, sem requerer que o arquivo de código anterior seja importado ou conhecido.

---

## 7. ESTRUTURA INTERNA DE CADA TRECHO

Cada pasta de trecho gerada deve conter estritamente:

```text
output/trecho-XX/
├── concept.md     # Plano visual editorial detalhado e aprovado
├── scenes/        # Implementação Remotion das cenas (01-*.tsx, 02-*.tsx, index.ts)
└── render/        # Arquivos de saída renderizados (.webm, .mov, full.webm)
```

- `concept.md`: Registro permanente da direção de fotografia, enquadramentos, tipografia e sound design.
- `scenes/`: Código modular Remotion com Alpha nativo.
- `render/`: Destino dos renders. Permite apagar e recriar renders a qualquer momento sem perder a direção criativa.

---

## 8. CHECKPOINT EDITORIAL (PADRÃO OBRIGATÓRIO)

Antes de gerar qualquer linha de código TSX, apresente a proposta visual no formato scan-friendly:

```markdown
### 🎬 TRECHO [XX]: [Nome do Trecho / Bloco]

#### Locução
"[Trecho exato da narração extraído de roteiro.md]"

#### Ideia
[O que o espectador deve entender visceralmente em 1 frase direta]

#### Metáfora Visual
[Como a ideia é representada fisicamente na tela — ex: um fluxo de dinheiro sofrendo desvio mecânico lateral]

#### Shot
[Descrição cinematográfica do enquadramento — ex: Plano médio com câmera 2.5D e deslocamento horizontal]

#### Câmera (Video Shotcraft)
[Receita do Shotcraft: push-in, crash-zoom, tilt 2.5D, parallax drift, orbit sutil]

#### Motion (Motion Design)
[Física de damped spring, timing 0-15f punch, 15-final hold com micro-drift, zero wobble senoidal]

#### Composição
[Disposição no frame: 1 elemento dominante, assimetria, 80% espaço negativo sobre Alpha nativo. Zero cards.]

#### Tipografia
- Hero: `[1 a 3 PALAVRAS EM CAIXA ALTA]` (130px–160px em Archivo Black / Bebas Neue)
- Métrica: `[NÚMERO OU PERCENTUAL]` (200px–240px em Space Grotesk)
- Destaque: Tarja sólida neon `#FF9900` com texto preto `#000000`

#### Continuidade
[Como este trecho termina e prepara o vetor de movimento para o próximo trecho do roteiro]

#### Sound Design (SFX Cues)
[Quem entra e quando: whoosh inicial → silêncio de tensão → impact mecânico no lock do número]

#### Energia
[Barra de intensidade do trecho: ████████░░ (8/10)]

#### Elementos Proibidos
[Lista explícita de armadilhas evitadas: sem cards cinzas, sem containers, sem dashboards, sem mini-labels]
```

> [!IMPORTANT]
> **Aguarde a validação do usuário antes de criar os arquivos `.tsx` ou executar renderizações.**

---

## 9. DIAGRAMA OPERACIONAL

O fluxo de pensamento e produção segue a linha contínua:

```
ROTEIRO (roteiro.md)
  │
  ▼
IDEIA & TENSÃO NARRATIVA
  │
  ▼
METÁFORA FÍSICA
  │
  ▼
SHOT CINEMATOGRÁFICO
  │
  ├─► MOTION DESIGN (Física, Tipografia Monumental, Damped Springs)
  │
  └─► VIDEO SHOTCRAFT (Câmera 2.5D, Parallax, Ritmo, SFX Cues)
  │
  ▼
CONTINUIDADE SEQUENCIAL
  │
  ▼
CHECKPOINT EDITORIAL EM PROSA (Sem código preliminar)
  │
  ▼
APROVAÇÃO DO USUÁRIO
  │
  ▼
IMPLEMENTAÇÃO REMOTION (output/trecho-XX/scenes/)
  │
  ▼
RENDER TRANSPARENTE ALPHA (output/trecho-XX/render/)
```

---

## 10. REGRAS DE ESCALA E ESPAÇO

- **Tipografia Principal**: `130px a 160px` (ocupa 70%–90% da largura útil).
- **Números e Métricas Hero**: `200px a 240px`.
- **Micro-Tags Técnicas**: Máximo 1 tag de alta precisão (14px) rigidamente amarrada ao número hero.
- **Espaço Vazio Dramático**: Não tente preencher os cantos da tela. O espaço negativo comanda a atenção para a sobreposição de vídeo.

---

## 11. COMANDOS DE EXECUÇÃO RÁPIDA

- **Remotion Studio**: `bun run studio`
- **Renderizar Trecho Específico em WebM**:
  `bun run render:trecho <video-id> <numero-trecho>`
  *(Exemplo: `bun run render:trecho coe 01` salva automaticamente em `videos/coe/output/trecho-01/render/`)*
- **Renderizar Trecho em ProRes 4444**:
  `bun run render:trecho <video-id> <numero-trecho> --format=prores`
- **Renderizar Todas as Cenas de um Vídeo**:
  `bun run render:video <video-id> --format=webm`
- **Verificar Tipos TypeScript**: `bun run build`
