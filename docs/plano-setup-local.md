# Plano de setup local — `animation-to-yt`

Este documento cobre: (1) como rodar o que já foi construído, (2) o que falta para fechar o MVP completo (Diretor + parser real).

---

## 1. Rodando o que já existe (render de teste com roteiro fake)

### Pré-requisitos
- Node.js 20+ instalado
- Conexão de rede normal (sem bloqueio de domínios) — necessário na primeira execução para o Remotion baixar o Chrome Headless Shell

### Passos

```bash
# 1. Extrair/copiar o projeto para sua máquina, depois:
cd animation-to-yt

# 2. Instalar dependências
npm install

# 3. (Opcional, recomendado) Abrir o Remotion Studio para visualizar e ajustar
#    ao vivo antes de renderizar — mostra a timeline, cada cena, e permite
#    mexer nos parâmetros do sampleScenes com hot-reload.
npx remotion studio

# 4. Renderizar o vídeo de teste em MP4
npx remotion render src/index.ts OFurryMVP out/mvp-test.mp4

# O primeiro `render` ou `studio` vai baixar o Chrome Headless Shell
# automaticamente (~200MB) — isso só acontece uma vez.
```

O resultado esperado: `out/mvp-test.mp4`, ~10 segundos, 1920x1080, 3 cenas sobre investimentos (roteiro fake em `example/sample-script.ts`), seguindo a paleta preto/branco/amarelo.

### Ajustando resolução/fps

Está centralizado em `src/theme/ofurry.ts` → `layout: { width, height, fps }`. Mudar ali propaga para toda a composição (`src/Root.tsx` lê esses valores).

### Ajustando a paleta/tema

Tudo em `src/theme/ofurry.ts` (`OFurryTheme.colors`). Como você mencionou que a direção visual ainda vai evoluir, esse é o único lugar que deveria precisar mudar quando isso acontecer.

---

## 2. O que falta para o MVP completo

O que existe hoje renderiza a partir de um `SceneSpec[]` **escrito à mão** (`example/sample-script.ts`). Para fechar o loop completo (roteiro → vídeo automático), faltam duas peças:

### 2.1. Parser de entrada
Transformar o roteiro real (formato ainda a decidir — SRT, texto colado, JSON) em:
```ts
type Scene = { start: number; end: number; text: string };
```
Sugestão de ordem: comece pelo formato mais simples de gerar a partir do seu processo atual de roteiro (provavelmente texto colado com timestamps), e trate SRT como um parser adicional depois — a interface `Scene[]` não muda.

### 2.2. O "Diretor" (chamada ao LLM)
Para cada `Scene`, uma chamada à API do Claude que:
- Recebe: o texto da fala + a lista de primitivas disponíveis (`TextReveal`, `Icon`, `AnimatedNumber`, `ConnectedNodes`) com seus schemas de props (já documentados como TypeScript interfaces em `src/primitives/*.tsx`).
- Devolve: um `SceneSpec` válido em JSON (mesmo formato que está hoje hardcoded em `sample-script.ts`).
- Precisa de validação do JSON retornado (schema check) antes de passar pro `SceneComposer`, com fallback simples (ex: só `TextReveal` com a fala) caso a resposta seja inválida.

Esse prompt deve reusar o `PROMPT MOTION` que você já tinha (paleta + estilo) como parte do system prompt, mais a lista de primitivas e exemplos de `SceneSpec` válidos (few-shot).

### 2.3. Orquestração ponta a ponta
Um script (`scripts/generate.ts` ou similar) que:
1. Lê o roteiro de entrada.
2. Roda o parser → `Scene[]`.
3. Para cada `Scene`, chama o Diretor → `SceneSpec`.
4. Monta o array final de `SceneSpec[]` e escreve num arquivo que o `Root.tsx` consome (substituindo o `sampleScenes` fixo).
5. Dispara `npx remotion render` programaticamente (via `@remotion/renderer`, sem precisar do CLI manual).

## 3. Ordem sugerida de trabalho a partir daqui

1. **Validar visualmente o MVP atual** — rodar `npx remotion studio` localmente, ver as 3 cenas fake, ajustar timing/cores/ícones que não estejam agradando antes de automatizar mais nada.
2. **Construir o Diretor** com 2-3 roteiros reais de exemplo (colados manualmente), sem parser ainda — validar se o JSON gerado é bom.
3. **Construir o parser** do formato de entrada que você realmente vai usar no dia a dia.
4. **Ligar tudo** no script de orquestração ponta a ponta.
5. Iterar no vocabulário de primitivas conforme cenas reais pedirem visuais que ainda não existem no kit.
