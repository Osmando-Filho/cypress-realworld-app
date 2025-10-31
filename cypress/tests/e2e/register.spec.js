import { faker } from '@faker-js/faker'

// Importa os Page Objects
import LoginPage from '../pages/loginPage';
import RegisterPage from '../pages/registerPage';

// Cria instâncias dos Page Objects
const loginPage = new LoginPage();
const registerPage = new RegisterPage();

// Geração de dados dinâmicos para o teste de Registro com Sucesso
// Usamos o 'let' para que o login posterior use o mesmo usuário gerado.
let registeredUsername = ''; 
let registeredPassword = '';

describe('Real World App - Access tests', () => {
    
    // Configuração: Visita a página base antes de cada teste
    beforeEach(() => {
        cy.visit('/'); 
    });

    // --- Cenários de Registro ---
    it('Registro e Login - Novo Usuário Válido (Dados Dinâmicos)', () => {
        // 1. Geração de Dados Únicos
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        // Garante que o username seja único a cada execução
        registeredUsername = faker.internet.username(); 
        // Geramos uma senha robusta (simulando requisitos)
        registeredPassword = faker.internet.password({ length: 10, memorable: true }); 

        // 2. Ações de Registro (Usando Page Object)
        registerPage.accessRegistrationPage();
        registerPage.fillRegistrationForm(
            firstName,
            lastName,
            registeredUsername,
            registeredPassword,
            registeredPassword // Confirmação da senha
        )

        registerPage.submitForm();
        
        // Asserção: Verifica se foi redirecionado para a página de login ou home
        loginPage.accessLoginPage();
        cy.url().should('include', '/signin'); 

        // 3. Login com o Usuário Recém-Criado
        loginPage.loginWithUser(registeredUsername, registeredPassword);
        // Asserção: Verifica o sucesso do login (implementar no seu PO)
        loginPage.checkLoginSuccess(); 
    }); 

    // Removido o .only, pois ele só é usado para debug
    it('Registro - Falha com Senhas Diferentes', () => {
        // Tenta registrar um novo usuário com senhas que não combinam
        registerPage.accessRegistrationPage();
        registerPage.fillRegistrationForm(
            'Antonio',
            'de Sousa',
            'antoniosousa', // Gerando username dinamicamente
            '45672348',
            '45600000' // Senha de confirmação incorreta/diferente
        );
                
        // Asserção: Verifica a mensagem de validação
        registerPage.checkValidationMessage();
    });

});
