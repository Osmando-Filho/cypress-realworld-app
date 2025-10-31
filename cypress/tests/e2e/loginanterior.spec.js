import Chance from 'chance';
const chance = new Chance();

describe('Login Real World App - Tests', () => {
  
    it('Login - Fail', () => {
    //Tentar fazer login com credenciais inválidas
    cy.visit('http://localhost:3000');
    cy.get('#username').type('Admin');
    cy.get('input[name=password]').type('123456');
    cy.get('button').click();
    cy.get('[role="alert"]').should('contain', 'Username or password is invalid');
    });

    it('Register - New User Valid', () => {
    //Registro de novo usuário com sucesso
    cy.visit('http://localhost:3000');
    cy.get('[href="/signup"]').click();
    cy.get('#firstName').type('Jose');
    cy.get('#lastName').type('da Silva');
    cy.get('#username').type('josesilva');
    cy.get('#password').type('123456');
    cy.get('#confirmPassword').type('123456');
    cy.get('[type="submit"]').click();
    });

    it.only('Register - New User Valid', () => {
    //Registro de novo usuário com sucesso
    const firstName = chance.first();
    const lastName = chance.last();
    // Gera um username aleatório. 'chance.word()' é uma alternativa simples.
    const userName = chance.word({ length: 10 }); 
    // Garante que a senha tenha letras e números
    const password = chance.string({ length: 6, pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' });

    cy.visit('http://localhost:3000');
    cy.get('[href="/signup"]').click();
    cy.url().should('include', '/signup');
    cy.get('#firstName').should('be.visible');
    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.get('#username').type(userName);
    cy.get('#password').type(password);
    cy.get('#confirmPassword').type(password);
    cy.get('[type="submit"]').click();
    });

    it('Login - Sucess', () => {
    //Login com credenciais válidas
    cy.visit('http://localhost:3000');
    cy.get('#username').type('josesilva');
    cy.get('input[name=password]').type('123456');
    cy.get('button').click();
    });

    it('Register - New User invalid', () => {
    //Tentar registrar um novo usuário com informações incompletas
    cy.visit('http://localhost:3000');
    cy.get('[href="/signup"]').click();
    cy.get('#firstName').type('Antonio');
    cy.get('#lastName').type('de Sousa');
    cy.get('#username').type('antoniosousa');
    cy.get('#password').type('4567');
    cy.get('#confirmPassword').type('456');
    cy.get('[type="submit"]').click();
    cy.get('.MuiFormHelperText-contained').should('contain', 'Password must contain at least 4 characters');
    });

})

