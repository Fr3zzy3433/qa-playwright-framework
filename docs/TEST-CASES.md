# Matriz de Casos de Teste Automatizados

| ID | Módulo | Título | Tipo | Resultado Esperado |
|---|---|---|---|---|
| LOGIN-001 | Autenticação | Login com credenciais válidas | Happy Path | Redirecionamento correto para `/inventory.html`. |
| LOGIN-002 | Autenticação | Login com senha inválida | Negativo | Redirecionamento bloqueado e mensagem de erro exibida. |
| LOGIN-003 | Autenticação | Login com usuário inválido | Negativo | Redirecionamento bloqueado e mensagem de erro exibida. |
| LOGIN-004 | Autenticação | Login sem usuário e sem senha | Negativo | Mensagem de erro `"Username is required"`. |
| LOGIN-005 | Autenticação | Login somente com usuário | Negativo | Mensagem de erro `"Password is required"`. |
| LOGIN-006 | Autenticação | Login somente com senha | Negativo | Mensagem de erro `"Username is required"`. |
| LOGIN-007 | Autenticação | Login com usuário bloqueado | Negativo | Mensagem de erro `"Sorry, this user has been locked out."`. |
| LOGIN-008 | Autenticação | Login com espaços no usuário | Borda | Erro de credenciais inválidas. |
| LOGIN-009 | Autenticação | Login em maiúsculas | Borda | Erro de credenciais inválidas. |
| LOGIN-010 | Autenticação | Acesso direto à rota protegida | Segurança | Redirecionamento de volta à página inicial de login. |
| INV-001 | Catálogo | Exibir catálogo após login | Happy Path | Lista de produtos carregada e visível. |
| INV-002 | Catálogo | Adicionar item ao carrinho | Happy Path | Contador do badge no cabeçalho atualizado para 1. |
| INV-003 | Catálogo | Remover item do carrinho no catálogo | Happy Path | Contador do badge zerado e item removido. |
| INV-004 | Catálogo | Ordenar produtos por menor preço | Validação | Lista de produtos reordenada em ordem crescente de valor. |
| CHK-001 | Checkout | Fluxo completo de compra E2E | Happy Path | Pedido concluído com mensagem `"Thank you for your order!"`. |
| CHK-002 | Checkout | Validação de campos obrigatórios | Negativo | Mensagem de erro `"First Name is required"`. |
| CHK-003 | Checkout | Cancelar checkout no Step 1 | Navegação | Retorno à página `/cart.html`. |
