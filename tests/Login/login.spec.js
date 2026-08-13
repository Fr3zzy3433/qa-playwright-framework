const { test, expect } = require('../../fixtures/page-fixtures');
const { users } = require('../../fixtures/users');

test.describe('Autenticação de Usuários', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.acessar();
    });

    test('LOGIN-001 - Login com credenciais válidas', async ({ page, loginPage }) => {
        await loginPage.realizarLogin(
            users.standard.username,
            users.standard.password
        );

        await expect(page).toHaveURL(/inventory.html/);
    });

    test('LOGIN-002 - Login com senha inválida', async ({ page, loginPage }) => {
        await loginPage.realizarLogin(
            users.standard.username,
            'senha_invalida'
        );

        await expect(page).not.toHaveURL(/inventory.html/);
        const erro = await loginPage.obterMensagemErro();
        expect(erro).toContain('Username and password do not match any user in this service');
    });

    test('LOGIN-003 - Login com usuário inválido', async ({ page, loginPage }) => {
        await loginPage.realizarLogin(
            'usuario_invalido',
            users.standard.password
        );

        await expect(page).not.toHaveURL(/inventory.html/);
        const erro = await loginPage.obterMensagemErro();
        expect(erro).toContain('Username and password do not match any user in this service');
    });

    test('LOGIN-004 - Login sem usuário e sem senha', async ({ page, loginPage }) => {
        await loginPage.realizarLogin('', '');

        await expect(page).not.toHaveURL(/inventory.html/);
        const erro = await loginPage.obterMensagemErro();
        expect(erro).toContain('Username is required');
    });

    test('LOGIN-005 - Login somente com usuário informado', async ({ page, loginPage }) => {
        await loginPage.realizarLogin(
            users.standard.username,
            ''
        );

        await expect(page).not.toHaveURL(/inventory.html/);
        const erro = await loginPage.obterMensagemErro();
        expect(erro).toContain('Password is required');
    });

    test('LOGIN-006 - Login somente com senha informada', async ({ page, loginPage }) => {
        await loginPage.realizarLogin(
            '',
            users.standard.password
        );

        await expect(page).not.toHaveURL(/inventory.html/);
        const erro = await loginPage.obterMensagemErro();
        expect(erro).toContain('Username is required');
    });

    test('LOGIN-007 - Login com usuário bloqueado', async ({ page, loginPage }) => {
        await loginPage.realizarLogin(
            users.locked.username,
            users.locked.password
        );

        await expect(page).not.toHaveURL(/inventory.html/);
        const erro = await loginPage.obterMensagemErro();
        expect(erro).toContain('Sorry, this user has been locked out.');
    });

    test('LOGIN-008 - Login com espaços extras no nome de usuário', async ({ page, loginPage }) => {
        await loginPage.realizarLogin(
            '  ' + users.standard.username + '  ',
            users.standard.password
        );

        await expect(page).not.toHaveURL(/inventory.html/);
        const erro = await loginPage.obterMensagemErro();
        expect(erro).toContain('Username and password do not match any user in this service');
    });

    test('LOGIN-009 - Login com usuário em letras maiúsculas', async ({ page, loginPage }) => {
        await loginPage.realizarLogin(
            users.standard.username.toUpperCase(),
            users.standard.password
        );

        await expect(page).not.toHaveURL(/inventory.html/);
        const erro = await loginPage.obterMensagemErro();
        expect(erro).toContain('Username and password do not match any user in this service');
    });

    test('LOGIN-010 - Bloqueio de acesso direto à rota protegida /inventory.html', async ({ page, loginPage }) => {
        await page.goto('/inventory.html');

        await expect(page).not.toHaveURL(/inventory.html/);
        await expect(page).toHaveURL('/');
        await expect(loginPage.loginButton).toBeVisible();
        const erro = await loginPage.obterMensagemErro();
        expect(erro).toContain("You can only access '/inventory.html' when you are logged in.");
    });

});