const UserService = require('../services/UserService');

/**
 * Controller responsável por orquestrar as requisições relacionadas a usuários.
 * Atua como intermediário entre as rotas (HTTP) e a camada de serviço.
 */
class UserController {
    /**
     * Realiza o cadastro de um novo usuário.
     * - Valida os campos de entrada (camada de serviço)
     * - Garante regra de CPF único (camada de serviço)
     * - Retorna apenas dados não sensíveis
     */
    static register(req, res, next) {
        try {
            const user = UserService.registerUser(req.body);
            return res.status(201).json({ message: 'Usuário cadastrado com sucesso', user });
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = UserController;


