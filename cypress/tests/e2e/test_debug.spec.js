import RegisterPage from '../pages/registerPage.js';

const registerPage = new RegisterPage();

describe('Debug - isolando o RegisterPage', () => {
  it('acessa página de registro', () => {
    cy.visit('/');
    registerPage.accessRegistrationPage();
  });
});
