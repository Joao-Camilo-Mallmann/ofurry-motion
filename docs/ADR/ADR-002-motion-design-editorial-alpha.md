# ADR-002: Diretrizes de Motion Design Editorial, Canal Alpha e Escala Monumental para o Diretor IA

**Status:** Aceito  
**Data:** 2026-08-29  
**Referência:** Evolução do ADR-001 para o Sistema de Produção v2  
**Público-alvo:** Modelos de IA (Claude, Gemini, GPT) atuando como Diretores de Motion Design e Desenvolvedores do Motor Remotion.

---

## 1. Contexto e Motivação

As primeiras versões geravam composições com escala visual reduzida, tipografia única (`Montserrat`), fundo com partículas pontilhadas genéricas ("cara de template de IA") e saída exclusiva em vídeo completo com fundo preto opaco.

Para atender ao fluxo de trabalho profissional de edição do canal **OFurry** (YouTube), este ADR formaliza as decisões de design editorial de alto impacto, exportação de mini-vídeos independentes por cena e renderização com transparência real (canal Alpha / ProRes 4444) para sobreposição direta sobre filmagens de câmera e B-rolls.

---

## 2. As Regras de Ouro do Diretor de Motion Design (Diretrizes para IA)

Qualquer modelo de IA que atue como Diretor de Cenas deve obrigatoriamente seguir estas 6 regras ao gerar o JSON `SceneSpec`:

### 🎯 1. Regra do Texto Mínimo (2 a 4 Palavras)
- **NUNCA** gere blocos de frases longas ou transcrições completas da fala.
- Extraia apenas **2 a 4 palavras-chave de âncora** ou métricas numéricas por cena.
- O espectador já está escutando o áudio; o texto na tela serve exclusivamente como **gancho visual de autoridade**.

### 📏 2. Escala Monumental (Anti-Mini-Widgets)
- Títulos de impacto devem ocupar entre **70% e 90% da largura útil** da tela (tamanhos de 120px a 150px).
- Números e contadores de destaque devem assumir tamanho monumental (180px a 220px).
- Os elementos principais devem dominar o enquadramento nos primeiros 3 segundos da fala.

### 🎨 3. Tipografia Editorial por Função
A tipografia agora é dividida estrategicamente por papel visual:

| Função | Família Tipográfica | Peso | Finalidade |
|---|---|---|---|
| **Títulos & Ganchos Hero** | `Archivo Black` ou `Bebas Neue` | Black / ExtraBold | Impacto brutalista, autoridade e retenção |
| **Títulos Conceituais** | `Syne` | ExtraBold | Estética vanguardista e editorial moderna |
| **Métricas, Moedas e Datas** | `Space Grotesk` | Bold (Tabular) | Precisão técnica, alinhamento monospaced e dados |
| **Subtítulos & Labels** | `Plus Jakarta Sans` / `Inter` | SemiBold / Medium | Leitura rápida e suporte limpo |

### 🖼️ 4. Design Editorial vs "Cara de IA"
- **Proibido:** Caixinhas arredondadas idênticas com sombras suaves genéricas e constelações de bolinhas flutuantes desconexas.
- **Exigido:** 
  - **Tarjas Sólidas de Destaque:** Texto preto sobre bloco sólido neon laranja (`#FF9900`).
  - **Miras & Linhas Técnicas:** Cantos de enquadramento finos (`L-corners`), miras de mira central e grids sutis com transparência total.
  - **Assimetria Intencional:** Textos ancorados à esquerda com contrastes extremos de escala.

### 🎬 5. Fundo Transparente Real (Canal Alpha)
- O motor deve ser renderizado nativamente com fundo `transparent` em formato **ProRes 4444 (`.mov`)** ou **WebM com Alpha**.
- Permite arrastar os mini-vídeos diretamente para timelines do **Adobe Premiere Pro**, **DaVinci Resolve** ou **CapCut** sobre o vídeo principal gravado (zero chroma-key).

### ⚡ 6. Física "Punch & Hold"
- **Entrada (0 a 15 frames):** Entrada rápida e enérgica com spring amortecido (*Punch*).
- **Retenção (15 a final):** O elemento trava firme no lugar para facilitar a leitura (*Hold*).
- **Micro-Drift:** Movimento senoidal contínuo suave (±2px) para garantir zero sensação de frame congelado.

---

## 3. Catálogo de Primitivas e Mapeamento de Props

O Diretor IA possui à disposição as seguintes primitivas visuais em `src/primitives/`:

```
1. TextReveal
   ├── text: string (2-4 palavras)
   ├── subtitle?: string (frase curta de apoio)
   ├── variant: 'hero' | 'title' | 'badge'
   ├── highlightWords: string[] (palavras que ganham tarja sólida neon)
   └── font: 'archivo' | 'bebas' | 'syne' | 'jakarta'

2. AnimatedNumber
   ├── value: number (valor numérico alvo)
   ├── prefix?: string ('R$ ', '+', '$')
   ├── suffix?: string ('%', 'M', 'k', 'x')
   ├── label?: string ('RENTABILIDADE', 'PATRIMÔNIO')
   └── variant: 'hero' | 'card' | 'badge'

3. Icon
   ├── name: string (nome de ícone Lucide, ex: ShieldAlert, Flame, Zap, TrendingUp, Lock)
   ├── size?: number (72 a 120px)
   └── showRing?: boolean (anel de choque em neon)

4. ConnectedNodes
   ├── nodes: Array<{ id, x, y, label, icon, isPrimary }>
   ├── connections: Array<{ from, to }>
   └── width: 850-950px (ocupa 80% do quadro)

5. DynamicChart
   ├── data: Array<{ label, value }>
   ├── type: 'line' | 'bar'
   └── highlightLast: boolean (ponto focal ativo)

6. TechFrame
   ├── showCorners: boolean (cantos de enquadramento técnico)
   └── showCrosshairs: boolean (miras de precisão)
```

---

## 4. Pipeline de Execução e Exportação Modular

O workflow de produção é executado no terminal com **Bun**:

```bash
# 1. Visualização interativa na Timeline com Hot-Reload
bun run studio

# 2. Exportar todos os mini-vídeos individuais por cena (com Alpha)
bun run render:scenes

# 3. Exportar apenas uma cena específica em ~2s
bun run render:scene -- --id=01

# 4. Exportar vídeo completo unificado
bun run render:full
```

---

## 5. Exemplo de Referência (Few-Shot para Diretores IA)

**Trecho de Fala do Roteiro:**  
*"O COE é uma furada completa, ele é sempre empurrado para você de alguma forma."*

**JSON `SceneSpec` Esperado do Diretor IA:**
```json
{
  "id": "cena-01-alerta-coe",
  "durationInFrames": 240,
  "layout": "centered-hero",
  "choreography": {
    "entryDirection": "bottom-up",
    "drawSpeed": "snappy",
    "ambientMotion": "pulse-glow"
  },
  "artDirection": {
    "mood": "aggressive-alert",
    "visualMetaphor": "Alerta de produto financeiro empurrado com tarja de perigo"
  },
  "elements": [
    {
      "type": "text",
      "text": "CUIDADO COM O COE",
      "subtitle": "O produto mais empurrado do mercado financeiro",
      "variant": "hero",
      "highlightWords": ["COE"],
      "font": "archivo",
      "glow": true
    },
    {
      "type": "icon",
      "name": "ShieldAlert",
      "size": 96,
      "showRing": true
    }
  ]
}
```
