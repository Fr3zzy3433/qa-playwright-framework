const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { users } = require('../../fixtures/users');

let loginPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.acessar();
});

test('LOGIN-001 - Login com credenciais válidas', async ({ page }) => {


    await loginPage.acessar();

    await loginPage.realizarLogin(
        users.standard.username,
        users.standard.password
    );

    await expect(page).toHaveURL(/inventory.html/);

});

test('LOGIN-002 - Login com senha inválida', async ({ page }) => {

    await loginPage.acessar();

    await loginPage.realizarLogin(
        users.standard.username,
        'senha_invalida'
    );

    await expect(page).not.toHaveURL(/inventory.html/);

});

test('LOGIN-003 - Login com usuário inválido', async ({ page }) => {

    await loginPage.acessar();

    await loginPage.realizarLogin(
        'usuario_invalido',
        users.standard.password
    );

    await expect(page).not.toHaveURL(/inventory.html/);

});

test('LOGIN-004 - Login sem usuário e senha', async ({ page }) => {

    await loginPage.acessar();

    await loginPage.realizarLogin(
        '',
        ''
    );

    await expect(page).not.toHaveURL(/inventory.html/);

});

test('LOGIN-005 - Login somente com usuário', async ({ page }) => {

    await loginPage.acessar();

    await loginPage.realizarLogin(
        users.standard.username,
        ''
    );

    await expect(page).not.toHaveURL(/inventory.html/);
});

test('LOGIN-006 - Login somente com senha', async ({ page }) => {

    await loginPage.acessar();

    await loginPage.realizarLogin(
        '',
        users.standard.password
    );

    await expect(page).not.toHaveURL(/inventory.html/);
});

test('LOGIN-007 - Login com usuário bloquado', async ({ page }) => {

    await loginPage.acessar();

    await loginPage.realizarLogin(
        users.locked.username,
        users.locked.password
    );

    await expect(page).not.toHaveURL(/inventory.html/);
});

test('LOGIN-008 - Login com espaços antes ou depois do usuário', async ({ page }) => { 

    await loginPage.acessar(); 

    await loginPage.realizarLogin(
        '  ' + users.standard.username + '  ',
        users.standard.password
    );
    await expect(page).not.toHaveURL(/inventory.html/);
});

test("LOGIN-009 - Login com usuário em  letras maiúsculas", async ({ page }) => {

    await loginPage.acessar(); 

    await loginPage.realizarLogin(
        users.standard.username.toUpperCase(),
        users.standard.password
    );
    await expect(page).not.toHaveURL(/inventory.html/);
});

test("LOGIN-010 - Acessar /inventory.html sem autenticação", async ({ page }) => {

    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page).not.toHaveURL(/inventory.html/);
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginPage.loginButton).toBeVisible();
});