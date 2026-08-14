const { test, expect } = require('../../fixtures/page-fixtures');
const { users } = require('../../fixtures/users');

test.describe('Gestão do Carrinho', () => {
    test.beforeEach(async ({ loginPage, inventoryPage }) => {
        await loginPage.acessar();
        await loginPage.realizarLogin(users.standard.username, users.standard.password);
        await inventoryPage.adicionarItemAoCarrinho('sauce-labs-backpack');
        await inventoryPage.abrirCarrinho();
    });

    test('CART-001 - Exibir no carrinho o produto adicionado no catálogo', async ({ page, cartPage }) => {
        await expect(page).toHaveURL(/cart\.html/);
        await expect(cartPage.title).toHaveText('Your Cart');
        await expect(cartPage.cartItems).toHaveCount(1);
        await expect(cartPage.itemNames).toHaveText(['Sauce Labs Backpack']);
    });

    test('CART-002 - Remover produto diretamente do carrinho', async ({ cartPage, inventoryPage }) => {
        await cartPage.removerItem('sauce-labs-backpack');

        await expect(cartPage.cartItems).toHaveCount(0);
        await expect(inventoryPage.shoppingCartBadge).not.toBeVisible();
    });

    test('CART-003 - Continuar comprando e preservar o item no carrinho', async ({ page, cartPage, inventoryPage }) => {
        await cartPage.continuarComprando();

        await expect(page).toHaveURL(/inventory\.html/);
        await expect(inventoryPage.title).toHaveText('Products');
        await expect(inventoryPage.shoppingCartBadge).toHaveText('1');
    });
});
