const UserRepository = require('../repositories/UserRepository');
const { isValidCPF, isValidEmail } = require('../utils/validators');

/**
 * Camada de serviço para autenticação (login).
 */
class AuthService {
    /**
     * Realiza o login por CPF ou e-mail, validando a senha em memória.
     */
    static login({ cpf, email, senha }) {
        if (!senha) {
            const error = new Error('Senha é obrigatória.');
            error.statusCode = 400;
            throw error;
        }

        let user = null;

        if (cpf) {
            if (!isValidCPF(cpf)) {
                const error = new Error('CPF deve conter exatamente 11 dígitos numéricos.');
                error.statusCode = 400;
                throw error;
            }
            user = UserRepository.findByCpf(cpf);
        } else if (email) {
            if (!isValidEmail(email)) {
                const error = new Error('E-mail deve possuir um formato válido.');
                error.statusCode = 400;
                throw error;
            }
            user = UserRepository.findByEmail(email);
        } else {
            const error = new Error('Informe CPF ou e-mail para realizar login.');
            error.statusCode = 400;
            throw error;
        }

        if (!user || user.senha !== senha) {
            const error = new Error('Credenciais inválidas.');
            error.statusCode = 401;
            throw error;
        }

        // Retornar dados públicos
        const { senha: _senha, ...publicUser } = user;
        return publicUser;
    }
}

module.exports = AuthService;


