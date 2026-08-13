# QA Playwright Automation Framework

Framework de automação de testes End-to-End (E2E) desenvolvido com Playwright e JavaScript para a aplicação SauceDemo, construído com foco em boas práticas de engenharia de software e qualidade de testes.

## Objetivo
Demonstrar a aplicação prática de conceitos de QA Automation para candidaturas a vagas de QA Analyst Júnior e Junior QA Engineer:
- Arquitetura limpa utilizando Page Object Model (POM) e Custom Fixtures.
- Cobertura de cenários felizes (*Happy Path*), cenários negativos e casos de borda.
- Asserções estritas e específicas de mensagens de interface e estado de navegação.
- Execução automatizada e geração de evidências integradas via CI (GitHub Actions).

## Tecnologias Utilizadas
- **Playwright** (v1.61+)
- **Node.js**
- **JavaScript (CommonJS)**
- **GitHub Actions**

## Cobertura de Testes
A suíte é composta por 17 cenários automatizados cobrindo os fluxos vitais do produto:

- **Autenticação (`tests/Login/login.spec.js`)**:
  - Login com credenciais válidas e inválidas.
  - Campos em branco, parciais, espaços extras e letras maiúsculas.
  - Bloqueio de usuário e proteção de rotas privadas sem autenticação.
- **Catálogo de Produtos (`tests/inventory/inventory.spec.js`)**:
  - Exibição de catálogo e validação de carregamento de itens.
  - Adição e remoção de produtos com atualização dinâmica do badge do carrinho.
  - Ordenação dinâmica de preços (Price Low to High).
- **Checkout e Compra E2E (`tests/checkout/checkout.spec.js`)**:
  - Fluxo completo E2E da adição de item à confirmação do pedido (*Thank you for your order!*).
  - Validação de formulários obrigatórios do comprador.
  - Cancelamento de etapas e navegação reversa.

## Estrutura do Projeto

```text
automation/
├── .github/
│   └── workflows/
│       └── playwright.yml      # Pipeline CI do GitHub Actions
├── docs/
│   ├── TEST-STRATEGY.md        # Documento de Estratégia de Testes
│   └── TEST-CASES.md           # Matriz detalhada de Casos de Teste
├── fixtures/
│   ├── page-fixtures.js        # Custom Fixtures (Injeção de dependências dos POMs)
│   └── users.js                # Massa de dados de teste (usuários e formulários)
├── pages/                      # Page Object Model (POM)
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
├── tests/                      # Especificações de testes automatizados
│   ├── Login/
│   │   └── login.spec.js
│   ├── inventory/
│   │   └── inventory.spec.js
│   └── checkout/
│       └── checkout.spec.js
├── utils/
│   └── helpers.js              # Funções utilitárias auxiliares
├── .env.example                # Modelo de variáveis de ambiente
├── package.json                # Gerenciador de dependências e scripts npm
└── playwright.config.js        # Configuração global do Playwright
```

## Como Executar

### Pré-requisitos
- Node.js (v18+)

### Instalação
```bash
npm install
npx playwright install
```

### Execução dos Testes

Executar todos os testes em modo headless:
```bash
npm test
```

Executar com interface visual (Headed mode):
```bash
npm run test:headed
```

Executar via Playwright UI Mode:
```bash
npm run test:ui
```

Executar em navegadores específicos:
```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

Exibir o relatório em HTML:
```bash
npm run report
```

## Evidências e Relatórios
- **HTML Report**: Gerado automaticamente após a execução em `playwright-report/`.
- **Screenshots & Traces**: Configurados em `playwright.config.js` para captura automática em caso de falha em testes (`only-on-failure` / `on-first-retry`), permitindo debug detalhado no Playwright Trace Viewer.

## Integração Contínua (CI)
O projeto conta com uma pipeline em GitHub Actions configurada em `.github/workflows/playwright.yml`. A pipeline é disparada a cada `push` ou `pull_request` no ramo `main`, instalando as dependências, rodando a suíte de testes e armazenando o relatório como artefato no repositório.

## Decisões de Engenharia de QA
- **Resiliência de Locatores**: Priorização de seletores declarativos baseados em `data-test` e papeis de interface, garantindo testes robustos imunes a alterações visuais superficiais no HTML.
- **Zero Sleeps Arbitrários**: Utilização exclusiva do *Auto-waiting* nativo do Playwright para sincronização de elementos, eliminando o risco de *flakiness*.
- **Injeção de Dependências com Custom Fixtures**: Uso de `test.extend` para fornecer instâncias isoladas dos Page Objects em cada teste, prevenindo vazamentos de estado global entre execuções concorrentes.

## Autor
**Marcius Logan Barcellos**  
QA Analyst Júnior  
GitHub: [https://github.com/Fr3zzy3433](https://github.com/Fr3zzy3433)