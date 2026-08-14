class CartPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.title = page.locator('.title');
        this.cartItems = page.locator('.cart_item');
        this.itemNames = page.locator('.inventory_item_name');
        this.checkoutButton = page.getByTestId('checkout');
        this.continueShoppingButton = page.getByTestId('continue-shopping');
    }

    async iniciarCheckout() {
        await this.checkoutButton.click();
    }

    async continuarComprando() {
        await this.continueShoppingButton.click();
    }

    async removerItem(itemSlug) {
        await this.page.getByTestId(`remove-${itemSlug}`).click();
    }
}

module.exports = { CartPage };
