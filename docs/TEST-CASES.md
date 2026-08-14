# Matriz de Casos de Teste Automatizados

| ID | Módulo | Título | Tipo | Resultado esperado |
|---|---|---|---|---|
| LOGIN-001 | Autenticação | Login com credenciais válidas | Happy Path | Redirecionar para `/inventory.html` e exibir `Products`. |
| LOGIN-002 | Autenticação | Login com senha inválida | Negativo | Permanecer fora do inventário e exibir erro de credenciais. |
| LOGIN-003 | Autenticação | Login com usuário inválido | Negativo | Permanecer fora do inventário e exibir erro de credenciais. |
| LOGIN-004 | Autenticação | Login sem usuário e senha | Negativo | Exibir `Username is required`. |
| LOGIN-005 | Autenticação | Login somente com usuário | Negativo | Exibir `Password is required`. |
| LOGIN-006 | Autenticação | Login somente com senha | Negativo | Exibir `Username is required`. |
| LOGIN-007 | Autenticação | Login com usuário bloqueado | Negativo | Exibir mensagem de usuário bloqueado. |
| LOGIN-008 | Autenticação | Login com espaços extras no usuário | Borda | Rejeitar credenciais e exibir erro. |
| LOGIN-009 | Autenticação | Login com usuário em maiúsculas | Borda | Rejeitar credenciais e exibir erro. |
| LOGIN-010 | Autenticação | Acesso direto à rota protegida | Segurança funcional | Redirecionar para login e informar que a rota exige autenticação. |
| INV-001 | Inventário | Exibir catálogo após login | Happy Path | Exibir título `Products` e 6 produtos. |
| INV-002 | Inventário | Adicionar item ao carrinho | Happy Path | Exibir badge do carrinho com valor `1`. |
| INV-003 | Inventário | Remover item no catálogo | Estado | Remover o badge após retirar o único produto. |
| INV-004 | Inventário | Ordenar por menor preço | Validação | Exibir 6 preços em ordem crescente, iniciando em `$7.99`. |
| CART-001 | Carrinho | Exibir produto adicionado | Estado | Abrir `/cart.html` com um `Sauce Labs Backpack`. |
| CART-002 | Carrinho | Remover produto diretamente do carrinho | Estado | Carrinho ficar vazio e badge desaparecer. |
| CART-003 | Carrinho | Continuar comprando preservando item | Navegação/Estado | Retornar ao inventário mantendo badge `1`. |
| CHK-001 | Checkout | Fluxo completo de compra | E2E Happy Path | Validar resumo, concluir pedido e exibir `Thank you for your order!`. |
| CHK-002 | Checkout | Avançar com campos obrigatórios vazios | Negativo | Exibir `Error: First Name is required`. |
| CHK-003 | Checkout | Cancelar checkout no Step 1 | Navegação | Retornar ao carrinho preservando o item. |

## Rastreabilidade

Os IDs acima são os mesmos utilizados nos títulos de `tests/**/*.spec.js`. Isso permite localizar rapidamente a implementação automatizada de cada caso a partir desta matriz ou do relatório HTML do Playwright.

## Resumo

- 10 cenários de autenticação.
- 4 cenários de inventário.
- 3 cenários de carrinho.
- 3 cenários de checkout.
- **20 cenários automatizados no total.**
