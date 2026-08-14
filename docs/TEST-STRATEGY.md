# Estratégia de Testes — QA Playwright Automation Framework

## 1. Objetivo

Validar os fluxos funcionais críticos da aplicação pública SauceDemo através de automação E2E com Playwright e JavaScript, mantendo a suíte legível, isolada, reproduzível e útil para investigação de falhas.

## 2. Escopo

### Em escopo

- **Autenticação**: sucesso, falhas de credencial, campos obrigatórios, usuário bloqueado, entradas de borda e proteção de rota.
- **Inventário**: carregamento do catálogo, adição/remoção de produto e ordenação por preço.
- **Carrinho**: persistência do item, remoção e navegação de retorno ao catálogo.
- **Checkout**: preenchimento de dados, validação obrigatória, cancelamento e conclusão de compra.
- **Cross-browser**: Chromium, Firefox e WebKit.

### Fora do escopo

- Testes de carga, stress e performance.
- Auditoria de acessibilidade especializada/WCAG.
- Visual regression.
- Testes de segurança aprofundados.
- Validação de banco de dados ou serviços internos da aplicação.

## 3. Abordagem

A suíte combina:

- **Happy Path** para os fluxos principais do usuário.
- **Negative Testing** para credenciais, autenticação e campos obrigatórios.
- **Boundary/Input Testing** para variações como strings vazias, espaços e capitalização.
- **State Validation** para carrinho, navegação e conclusão do checkout.
- **Cross-Browser Testing** através dos projetos nativos do Playwright.

As assertions permanecem nos arquivos de teste para deixar explícito o comportamento validado. Page Objects encapsulam interação e locators reutilizáveis, não regras de aprovação do cenário.

## 4. Dados e pré-condições

- Dados de teste ficam centralizados em `fixtures/users.js`.
- A suíte utiliza contas públicas fornecidas pelo próprio SauceDemo.
- Cada teste recebe um contexto novo do Playwright.
- `beforeEach` estabelece apenas a pré-condição necessária para o módulo atual.
- Nenhum cenário depende do resultado ou estado deixado por outro teste.

## 5. Estratégia de locators

Prioridade:

1. `getByTestId()` quando a aplicação fornece `data-test` estável.
2. Locators estruturais simples quando não existe identificador de teste adequado.

O projeto configura `testIdAttribute: 'data-test'` em `playwright.config.js`, transformando os atributos de teste da aplicação em um contrato explícito de automação.

## 6. Estratégia de assertions e sincronização

- Preferência por web-first assertions como `toHaveText`, `toContainText`, `toHaveURL`, `toHaveCount`, `toBeVisible` e `not.toBeVisible`.
- Não são utilizados `waitForTimeout()` ou sleeps arbitrários.
- A sincronização depende do auto-waiting do Playwright e de estados observáveis da interface.
- Assertions síncronas são usadas apenas para dados já materializados em memória, como a comparação da lista numérica de preços após coleta da UI.

## 7. Critérios de qualidade

Uma mudança é considerada apta para merge quando:

- todos os testes descobertos são executados sem falhas não explicadas;
- a CI termina verde nos três projetos de navegador configurados;
- não existem testes focados acidentalmente (`test.only`) em CI;
- falhas reais retornam exit code diferente de zero;
- documentação e quantidade de cenários permanecem coerentes com o código;
- evidências suficientes são preservadas para investigar falhas.

Retries em CI são usados como apoio diagnóstico contra instabilidade transitória do ambiente externo, não como mecanismo para transformar teste quebrado em sucesso silencioso. Uma falha recorrente deve ser investigada.

## 8. Evidências

Configuradas em `playwright.config.js`:

- screenshot em falha;
- vídeo retido em falha;
- trace no primeiro retry;
- HTML report;
- diretório `test-results/` para outputs da execução.

A pipeline publica `playwright-report/` e `test-results/` como artifact quando disponíveis.

## 9. Riscos e limitações

| Risco | Impacto | Mitigação |
|---|---|---|
| SauceDemo indisponível ou alterado | Falhas externas à suíte | CI, evidências e diagnóstico antes de alterar assertions |
| Mudança de DOM | Quebra de locator | Uso de `data-test` quando disponível e locators simples |
| Estado compartilhado | Flakiness / dependência de ordem | Contexto novo por teste e pré-condições explícitas |
| Timing de UI | Assertions instáveis | Auto-waiting e web-first assertions |
| Diferenças entre engines | Regressão específica de browser | Chromium, Firefox e WebKit na mesma suíte |

## 10. Cobertura atual

- Autenticação: 10 cenários.
- Inventário: 4 cenários.
- Carrinho: 3 cenários.
- Checkout: 3 cenários.
- **Total: 20 cenários automatizados.**

A matriz detalhada está em `docs/TEST-CASES.md`.
