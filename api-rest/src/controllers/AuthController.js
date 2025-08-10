const AuthService = require('../services/AuthService');

/**
 * Controller responsável por orquestrar requisições de autenticação (login).
 */
class AuthController {
    /**
     * Realiza o login do usuário utilizando CPF ou e-mail e senha.
     * - Não cria sessão, apenas valida credenciais e retorna dados públicos
     */
    static login(req, res, next) {
        try {
            const { cpf, email, senha } = req.body;
            const user = AuthService.login({ cpf, email, senha });
            return res.status(200).json({ message: 'Login realizado com sucesso', user });
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = AuthController;


