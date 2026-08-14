const { test, expect } = require('../../fixtures/page-fixtures');
const { users, checkoutData } = require('../../fixtures/users');

test.describe('Fluxo de Checkout e Conclusão de Compra', () => {
    test.beforeEach(async ({ loginPage, inventoryPage }) => {
        await loginPage.acessar();
        await loginPage.realizarLogin(users.standard.username, users.standard.password);
        await inventoryPage.adicionarItemAoCarrinho('sauce-labs-backpack');
        await inventoryPage.abrirCarrinho();
    });

    test('CHK-001 - Realizar fluxo completo de compra E2E com sucesso', async ({ page, cartPage, checkoutPage }) => {
        await cartPage.iniciarCheckout();

        await checkoutPage.preencherInformacoes(
            checkoutData.valid.firstName,
            checkoutData.valid.lastName,
            checkoutData.valid.postalCode
        );
        await checkoutPage.continuar();

        await expect(page).toHaveURL(/checkout-step-two\.html/);
        await expect(checkoutPage.summaryItemName).toHaveText('Sauce Labs Backpack');
        await expect(checkoutPage.summaryTotal).toContainText('Total: $32.39');

        await checkoutPage.finalizarCompra();

        await expect(page).toHaveURL(/checkout-complete\.html/);
        await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
        await expect(checkoutPage.backHomeButton).toBeVisible();
    });

    test('CHK-002 - Validar erro ao tentar avançar no checkout com campos obrigatórios vazios', async ({ cartPage, checkoutPage }) => {
        await cartPage.iniciarCheckout();
        await checkoutPage.preencherInformacoes('', '', '');
        await checkoutPage.continuar();

        await expect(checkoutPage.errorMessage).toContainText('Error: First Name is required');
    });

    test('CHK-003 - Cancelar checkout na primeira etapa e retornar ao carrinho', async ({ page, cartPage, checkoutPage }) => {
        await cartPage.iniciarCheckout();
        await checkoutPage.cancelar();

        await expect(page).toHaveURL(/cart\.html/);
        await expect(cartPage.title).toHaveText('Your Cart');
        await expect(cartPage.cartItems).toHaveCount(1);
    });
});
