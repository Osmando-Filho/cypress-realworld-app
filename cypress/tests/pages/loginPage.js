class LoginPage {
    selectorsList () {
        const selectors = {
            usernameField: "[name='username']",
            passwordField: "[name='password']",
            loginButton: "[type='submit']", 
            alertMessage: '[role="alert"]',
            message: 'Username or password is invalid'
        }
        return selectors
    }

    accessLoginPage() {
        cy.visit('/signin');
    }

    loginWithUser(username, password) {
        cy.get(this.selectorsList().usernameField).clear({ force: true });
        cy.get(this.selectorsList().usernameField).type(username);
        cy.get(this.selectorsList().passwordField).clear({ force: true });
        cy.get(this.selectorsList().passwordField).type(password);
        cy.wait(100);
        cy.get(this.selectorsList().loginButton).click({ force: true });
    }

    checkLoginSuccess() {
        cy.url().should('include', '/'); // ou o caminho que o app redireciona
    }

    checkAlertMessage() {
        const expectedMessage = this.selectorsList().message;
        cy.get(this.selectorsList().alertMessage)
        .should('be.visible') // Garante que a mensagem apareceu
        .and('contain', expectedMessage); // Verifica se o texto é o esperado
    }
    
}
export default LoginPage;

