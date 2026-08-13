class LoginPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async acessar() {
        await this.page.goto('/');
    }

    async realizarLogin(usuario, senha) {
        if (usuario !== undefined && usuario !== null) {
            await this.usernameInput.fill(usuario);
        }
        if (senha !== undefined && senha !== null) {
            await this.passwordInput.fill(senha);
        }
        await this.loginButton.click();
    }

    async obterMensagemErro() {
        return await this.errorMessage.textContent();
    }
}

module.exports = { LoginPage };