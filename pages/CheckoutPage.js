class CheckoutPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.cancelButton = page.locator('[data-test="cancel"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.errorMessage = page.locator('[data-test="error"]');
        this.completeHeader = page.locator('.complete-header');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');
        this.summaryItemName = page.locator('.inventory_item_name');
        this.summaryTotal = page.locator('.summary_total_label');
    }

    async preencherInformacoes(primeiroNome, sobrenome, cep) {
        if (primeiroNome) await this.firstNameInput.fill(primeiroNome);
        if (sobrenome) await this.lastNameInput.fill(sobrenome);
        if (cep) await this.postalCodeInput.fill(cep);
    }

    async continuar() {
        await this.continueButton.click();
    }

    async cancelar() {
        await this.cancelButton.click();
    }

    async finalizarCompra() {
        await this.finishButton.click();
    }

    async obterMensagemSucesso() {
        return await this.completeHeader.textContent();
    }

    async obterMensagemErro() {
        return await this.errorMessage.textContent();
    }
}

module.exports = { CheckoutPage };
