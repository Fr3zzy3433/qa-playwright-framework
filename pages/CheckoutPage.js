class CheckoutPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.firstNameInput = page.getByTestId('firstName');
        this.lastNameInput = page.getByTestId('lastName');
        this.postalCodeInput = page.getByTestId('postalCode');
        this.continueButton = page.getByTestId('continue');
        this.cancelButton = page.getByTestId('cancel');
        this.finishButton = page.getByTestId('finish');
        this.errorMessage = page.getByTestId('error');
        this.completeHeader = page.locator('.complete-header');
        this.backHomeButton = page.getByTestId('back-to-products');
        this.summaryItemName = page.locator('.inventory_item_name');
        this.summaryTotal = page.locator('.summary_total_label');
    }

    async preencherInformacoes(primeiroNome, sobrenome, cep) {
        await this.firstNameInput.fill(primeiroNome ?? '');
        await this.lastNameInput.fill(sobrenome ?? '');
        await this.postalCodeInput.fill(cep ?? '');
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
}

module.exports = { CheckoutPage };
