/**
 * Repositório em memória para usuários.
 * Responsável por encapsular as operações de acesso a dados.
 */
class UserRepository {
    // Armazenamento em memória (escopo do módulo)
    static users = [];

    /**
     * Retorna um usuário pelo CPF.
     */
    static findByCpf(cpf) {
        return this.users.find((u) => u.cpf === String(cpf));
    }

    /**
     * Retorna um usuário pelo e-mail.
     */
    static findByEmail(email) {
        return this.users.find((u) => u.email?.toLowerCase() === String(email).toLowerCase());
    }

    /**
     * Cria e armazena um novo usuário.
     */
    static create(userData) {
        const newUser = { id: this.users.length + 1, ...userData };
        this.users.push(newUser);
        return newUser;
    }
}

module.exports = UserRepository;


