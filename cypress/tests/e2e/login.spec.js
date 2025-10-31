// Importa os Page Objects
import LoginPage from '../pages/loginPage.js'; 

// Importa a Fixture com credenciais fixas
import loginData from '../../fixtures/loginData.json'; 

// Cria instâncias dos Page Objects
const loginPage = new LoginPage();

describe('Real World App - Access tests', () => {
    
    // --- Cenários de Login ---

    it('Login - Falha com Credenciais Inválidas', () => {
        loginPage.accessLoginPage();
        // Usa dados da fixture para credenciais inválidas
        loginPage.loginWithUser(loginData.userFail.username, loginData.userFail.password);
        
        // Asserção usando o método encapsulado no PO
        loginPage.checkAlertMessage();
    });
    
    it('Login - Sucesso com Credenciais Válidas', () => {
        loginPage.accessLoginPage();
        // Usa dados da fixture para credenciais válidas
        loginPage.loginWithUser(loginData.userSuccess.username, loginData.userSuccess.password);
        loginPage.checkLoginSuccess();
    });

});