const { test, expect } = require('../../fixtures/page-fixtures');
const { users } = require('../../fixtures/users');

test.describe('Gestão de Inventário e Catálogo', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.acessar();
        await loginPage.realizarLogin(users.standard.username, users.standard.password);
    });

    test('INV-001 - Exibir catálogo de produtos após login', async ({ inventoryPage }) => {
        await expect(inventoryPage.title).toHaveText('Products');
        await expect(inventoryPage.inventoryItems).toHaveCount(6);
    });

    test('INV-002 - Adicionar produto ao carrinho e verificar o badge de contagem', async ({ inventoryPage }) => {
        await inventoryPage.adicionarItemAoCarrinho('sauce-labs-backpack');
        await expect(inventoryPage.shoppingCartBadge).toHaveText('1');
    });

    test('INV-003 - Remover produto do carrinho na página de catálogo', async ({ inventoryPage }) => {
        await inventoryPage.adicionarItemAoCarrinho('sauce-labs-backpack');
        await expect(inventoryPage.shoppingCartBadge).toHaveText('1');

        await inventoryPage.removerItemDoCarrinho('sauce-labs-backpack');
        await expect(inventoryPage.shoppingCartBadge).not.toBeVisible();
    });

    test('INV-004 - Ordenar produtos por preço do menor para o maior (Low to High)', async ({ inventoryPage }) => {
        await inventoryPage.ordenarPor('lohi');
        
        // Garantir sincronização observando o menor preço ($7.99) no primeiro item
        await expect(inventoryPage.itemPrices.first()).toHaveText('$7.99');
        
        const precos = await inventoryPage.obterListaDePrecos();
        const precosOrdenados = [...precos].sort((a, b) => a - b);
        expect(precos).toEqual(precosOrdenados);
    });

});
