const { parseMoedaParaNumero } = require('../utils/helpers');

class InventoryPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.title = page.locator('.title');
        this.inventoryItems = page.locator('.inventory_item');
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
        this.shoppingCartLink = page.locator('.shopping_cart_link');
        this.sortSelect = page.getByTestId('product-sort-container');
        this.itemPrices = page.locator('.inventory_item_price');
    }

    async adicionarItemAoCarrinho(itemSlug) {
        await this.page.getByTestId(`add-to-cart-${itemSlug}`).click();
    }

    async removerItemDoCarrinho(itemSlug) {
        await this.page.getByTestId(`remove-${itemSlug}`).click();
    }

    async abrirCarrinho() {
        await this.shoppingCartLink.click();
    }

    async ordenarPor(opcaoValue) {
        await this.sortSelect.selectOption(opcaoValue);
    }

    async obterListaDePrecos() {
        const pricesText = await this.itemPrices.allTextContents();
        return pricesText.map(parseMoedaParaNumero);
    }
}

module.exports = { InventoryPage };
