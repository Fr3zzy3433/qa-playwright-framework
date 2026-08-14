# QA Playwright Automation Framework

Portfólio técnico de automação E2E com **Playwright + JavaScript** sobre a aplicação pública SauceDemo. O projeto demonstra desenho de cenários, Page Object Model, custom fixtures, assertions auto-retrying, execução cross-browser, evidências de falha e integração contínua com GitHub Actions.

## O que este projeto demonstra

- **20 cenários automatizados** cobrindo autenticação, catálogo, carrinho e checkout.
- Execução em **Chromium, Firefox e WebKit**.
- Page Objects enxutos, usados para encapsular interação sem esconder as validações dos testes.
- Custom Fixtures com `test.extend()` para disponibilizar os Page Objects por teste.
- Locators baseados em `data-test` via `getByTestId()` quando existe um identificador estável.
- Web-first assertions do Playwright para estado de UI, mensagens, URL e contagem de elementos.
- Happy paths, testes negativos, validações de entrada, navegação e proteção de rota.
- HTML report, screenshot, vídeo e trace configurados para diagnóstico de falhas.
- CI real executando a suíte completa e publicando evidências como artifact.

## Cobertura

| Módulo | Cenários | Exemplos |
|---|---:|---|
| Autenticação | 10 | Login válido/inválido, campos vazios, usuário bloqueado, entradas de borda e rota protegida |
| Inventário | 4 | Carregamento do catálogo, adicionar/remover produto e ordenação por preço |
| Carrinho | 3 | Persistência do item, remoção e retorno ao catálogo preservando estado |
| Checkout | 3 | Compra E2E, validação de campo obrigatório e cancelamento |
| **Total** | **20** | **Fluxos críticos e cenários negativos** |

Com os três projetos de navegador habilitados em `playwright.config.js`, uma execução completa percorre os 20 cenários em Chromium, Firefox e WebKit.

## Estrutura

```text
qa-playwright-framework/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── docs/
│   ├── TEST-CASES.md
│   └── TEST-STRATEGY.md
├── fixtures/
│   ├── page-fixtures.js
│   └── users.js
├── pages/
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
├── tests/
│   ├── Login/login.spec.js
│   ├── inventory/inventory.spec.js
│   ├── cart/cart.spec.js
│   └── checkout/checkout.spec.js
├── utils/
│   └── helpers.js
├── package.json
└── playwright.config.js
```

## Pré-requisitos

- Node.js 20 ou superior.
- npm.

## Instalação

```bash
npm ci
npx playwright install
```

Para instalar também as dependências de sistema em Linux/CI:

```bash
npx playwright install --with-deps
```

## Execução

Suíte completa:

```bash
npm test
```

Modo headed:

```bash
npm run test:headed
```

UI Mode:

```bash
npm run test:ui
```

Por navegador:

```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

Listar os testes descobertos sem executá-los:

```bash
npm run test:list
```

Abrir o último HTML report:

```bash
npm run report
```

## URL do ambiente

A suíte usa `https://www.saucedemo.com` por padrão. O ambiente pode ser sobrescrito pela variável `BASE_URL` sem alteração de código.

PowerShell:

```powershell
$env:BASE_URL="https://www.saucedemo.com"
npm test
```

macOS/Linux:

```bash
BASE_URL=https://www.saucedemo.com npm test
```

## Evidências e diagnóstico

A configuração do Playwright mantém:

- **HTML report** em `playwright-report/`.
- **Screenshot** apenas quando o teste falha.
- **Vídeo** retido em falhas.
- **Trace** no primeiro retry em CI.
- Outputs de execução em `test-results/`.

Esses diretórios não são versionados. No GitHub Actions, report e resultados são enviados como artifact para investigação da execução.

## CI/CD

O workflow `.github/workflows/playwright.yml` roda em `push` e `pull_request` para `main` e também permite execução manual.

Pipeline:

1. Checkout do repositório.
2. Node.js 24 com cache npm.
3. `npm ci` para instalação reproduzível.
4. `npm run test:list` para validar descoberta da suíte.
5. Instalação dos browsers Playwright e dependências do runner.
6. Execução da suíte completa.
7. Upload de report/evidências mesmo quando houver falha de teste.

A CI usa `forbidOnly`, retries apenas no ambiente CI e um único worker para privilegiar estabilidade contra uma aplicação pública externa.

## Decisões de QA

### Locators
`data-test` é tratado como contrato de automação através de `getByTestId()` quando disponível. Seletores estruturais simples são mantidos apenas onde a aplicação não fornece identificador de teste apropriado.

### Assertions
As verificações de UI utilizam preferencialmente assertions do próprio Playwright, como `toHaveText`, `toContainText`, `toHaveURL`, `toHaveCount` e `toBeVisible`. Isso preserva o mecanismo de retry automático da ferramenta em vez de capturar texto cedo demais e fazer uma assertion síncrona.

### Sincronização
A suíte não utiliza `waitForTimeout()` nem sleeps fixos. A sincronização depende do auto-waiting do Playwright e de condições observáveis da interface.

### Isolamento
Cada teste recebe um novo contexto do Playwright. Os `beforeEach` estabelecem explicitamente a pré-condição necessária para cada módulo, evitando dependência da ordem de execução.

### Page Object Model
Os Page Objects encapsulam ações e locators compartilhados, enquanto as assertions permanecem visíveis nos arquivos de teste. Isso evita transformar o POM em uma camada que esconda o objetivo dos cenários.

## Limitações conhecidas

- SauceDemo é um ambiente externo; indisponibilidade ou mudança do site pode afetar a execução.
- O escopo é funcional E2E. Performance, acessibilidade especializada, visual regression e testes de segurança aprofundados não fazem parte desta suíte.
- A massa de dados utiliza contas públicas disponibilizadas pelo próprio ambiente SauceDemo.

## Documentação de QA

- [`docs/TEST-STRATEGY.md`](docs/TEST-STRATEGY.md) — estratégia, riscos, escopo e critérios de qualidade.
- [`docs/TEST-CASES.md`](docs/TEST-CASES.md) — matriz rastreável dos 20 casos automatizados.

## Autor

**Marcius Logan Barcellos**  
QA Analyst Júnior  
GitHub: https://github.com/Fr3zzy3433
