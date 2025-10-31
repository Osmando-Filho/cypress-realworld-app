class RegisterPage {
    selectorsList() {
        return {
            signUpLink: '.MuiGrid-root > a', 
            firstNameField: '#firstName',
            lastNameField: '#lastName',
            usernameField: '#username',
            passwordField: '#password',
            confirmPasswordField: '#confirmPassword',
            submitButton: '[type="submit"]',
            helperText: '.MuiFormHelperText-contained',
            alertMessage: '#confirmPassword-helper-text',
            errorMessage: 'Password does not match'
        };
    }

    accessRegistrationPage() {
        cy.get(this.selectorsList().signUpLink).click();
        cy.url().should('include', '/signup');
    }

    fillRegistrationForm(firstName, lastName, username, password, confirmPassword) {
        cy.get(this.selectorsList().firstNameField).should('be.visible').type(firstName);
        cy.get(this.selectorsList().lastNameField).type(lastName);
        cy.get(this.selectorsList().usernameField).type(username);
        cy.get(this.selectorsList().passwordField).type(password);
        cy.get(this.selectorsList().confirmPasswordField).type(confirmPassword);
    }

    submitForm() {
        cy.get(this.selectorsList().submitButton).click();
    }

    checkValidationMessage() {
        const checkMessage = this.selectorsList().errorMessage;
        cy.get(this.selectorsList().alertMessage)
        .should('be.visible') // Garante que a mensagem apareceu
        .and('contain', checkMessage); // Verifica se o texto é o esperado
    }
}

export default RegisterPage;
