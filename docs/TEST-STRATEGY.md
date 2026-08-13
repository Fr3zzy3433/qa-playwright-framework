# Estratégia de Testes de Automação (QA Test Strategy)

## 1. Objetivo
Garantir a qualidade, funcionalidade e integridade dos fluxos críticos da aplicação web SauceDemo através da automação de testes de ponta a ponta (E2E) com a ferramenta Playwright e JavaScript.

## 2. Escopo
- **Em Escopo**:
  - Fluxo de Autenticação (cenários de sucesso, erro, bloqueio e casos de borda).
  - Gestão de Inventário e Catálogo (visualização, adição/remoção de itens no carrinho e ordenação de preços).
  - Fluxo de Checkout (preenchimento de dados do cliente, validação de campos obrigatórios, navegação e confirmação de pedido).
- **Fora do Escopo**:
  - Testes de carga e performance sob estresse.
  - Testes de acessibilidade avançada (WCAG) nesta fase.

## 3. Tipos de Teste
- **Testes Funcionais E2E**: Validação dos cenários principais da perspectiva do usuário final (*Happy Path*).
- **Testes Negativos e de Validação**: Garantia de tratamento adequado de erros e exibição de mensagens claras ao usuário.
- **Testes Cross-Browser**: Execução em múltiplos navegadores (Chromium, Firefox e WebKit).

## 4. Gestão de Dados de Teste
- Centralizados em `fixtures/users.js`, cobrindo diferentes perfis disponibilizados pelo ambiente de testes (`standard_user`, `locked_out_user`, `problem_user`).
- Isolamento total por teste: cada cenário inicializa seu próprio contexto e estado navegacional para evitar acoplamento.

## 5. Critérios de Aceite e Qualidade
- **Critério de Sucesso**: 100% dos testes da suíte passando sem instabilidade (*flakiness*).
- **Tratamento de Falhas**: Em caso de erro em CI, evidências detalhadas (screenshots, vídeos e trace files) são salvas automaticamente como artefato da pipeline.

## 6. Riscos e Mitigações
- **Mudanças na DOM/Locatores**: Utilização de seletores resilientes baseados em atributos `data-test` e roles do utilizador, minimizando quebras por alterações visuais de layout.
- **Dependência de Conexão Externa**: Timeout configurado adequadamente em `playwright.config.js` (30s global, 5s para assertions).
