class LoginPage {
    constructor(page) {
        this.page = page;

        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
    }

    async acessar() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async realizarLogin(usuario, senha) {
        await this.usernameInput.fill(usuario);
        await this.passwordInput.fill(senha);
        await this.loginButton.click();
    }
}

module.exports = { LoginPage };