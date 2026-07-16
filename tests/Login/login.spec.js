const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { users } = require('../../fixtures/users');

test('LOGIN-001 - Login com credenciais válidas', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.acessar();

    await loginPage.realizarLogin(
        users.standard.username,
        users.standard.password
    );

    await expect(page).toHaveURL(/inventory.html/);

});

test('LOGIN-002 - Login com senha inválida', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.acessar();

    await loginPage.realizarLogin(
        users.standard.username,
        'senha_invalida'
    );

    await expect(page).not.toHaveURL(/inventory.html/);

});

test('LOGIN-003 - Login com usuário inválido', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.acessar();

    await loginPage.realizarLogin(
        'usuario_invalido',
        users.standard.password
    );

    await expect(page).not.toHaveURL(/inventory.html/);

});

test('LOGIN-004 - Login sem usuário e senha', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.acessar();

    await loginPage.realizarLogin(
        '',
        ''
    );

    await expect(page).not.toHaveURL(/inventory.html/);

});

test('LOGIN-005 - Login somente com usuário', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.acessar();

    await loginPage.realizarLogin(
        '',
        users.standard.password
    );

    await expect(page).not.toHaveURL(/inventory.html/);
});