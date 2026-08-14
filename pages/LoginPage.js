class LoginPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.usernameInput = page.getByTestId('username');
        this.passwordInput = page.getByTestId('password');
        this.loginButton = page.getByTestId('login-button');
        this.errorMessage = page.getByTestId('error');
    }

    async acessar() {
        await this.page.goto('/');
    }

    async realizarLogin(usuario, senha) {
        await this.usernameInput.fill(usuario ?? '');
        await this.passwordInput.fill(senha ?? '');
        await this.loginButton.click();
    }
}

module.exports = { LoginPage };
