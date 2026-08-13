class CartPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.title = page.locator('.title');
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    }

    async obterQuantidadeItens() {
        return await this.cartItems.count();
    }

    async iniciarCheckout() {
        await this.checkoutButton.click();
    }

    async continuarComprando() {
        await this.continueShoppingButton.click();
    }

    async removerItem(itemSlug) {
        await this.page.locator(`[data-test="remove-${itemSlug}"]`).click();
    }
}

module.exports = { CartPage };
