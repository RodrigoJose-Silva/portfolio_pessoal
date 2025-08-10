const UserRepository = require('../repositories/UserRepository');
const {
    isValidCPF,
    isValidName,
    isValidDatePtBr,
    isAdult,
    isValidPassword,
    isValidEmail,
    isValidOptionalText,
    isValidState,
    isValidPhone,
} = require('../utils/validators');

/**
 * Camada de serviço contendo as regras de negócio de usuários.
 * Não lida com transporte HTTP nem persistência diretamente.
 */
class UserService {
    /**
     * Valida o payload de cadastro conforme os requisitos R01..R13.
     * Retorna uma lista de erros de validação (strings). Sem erros => lista vazia.
     */
    static validateRegistrationPayload(payload) {
        const errors = [];

        const {
            cpf,
            nome,
            dataNascimento,
            senha,
            confirmaSenha,
            email,
            endereco,
            cidade,
            estado,
            telefone,
        } = payload || {};

        // R02 - CPF (obrigatório, 11 dígitos numéricos)
        if (!cpf || !isValidCPF(cpf)) {
            errors.push('CPF é obrigatório e deve conter exatamente 11 dígitos numéricos.');
        }

        // R04 - Nome (obrigatório, 3..100)
        if (!nome || !isValidName(nome)) {
            errors.push('Nome é obrigatório e deve conter entre 3 e 100 caracteres.');
        }

        // R05 - Data de nascimento (obrigatório, formato dd/mm/aaaa)
        if (!dataNascimento || !isValidDatePtBr(dataNascimento)) {
            errors.push('Data de nascimento é obrigatória e deve estar no formato dd/mm/aaaa.');
        } else if (!isAdult(dataNascimento)) {
            // R06 - Idade mínima 18 anos
            errors.push('Usuário deve ter 18 anos ou mais para se cadastrar.');
        }

        // R07 - Senha (obrigatória, alfanumérica, 5..12)
        if (!senha || !isValidPassword(senha)) {
            errors.push('Senha é obrigatória, deve ser alfanumérica e conter entre 5 e 12 caracteres.');
        }

        // R08 - Confirmação de senha (igual à senha)
        if (!confirmaSenha || confirmaSenha !== senha) {
            errors.push('Confirmação de senha é obrigatória e deve ser igual à senha.');
        }

        // R09 - E-mail (obrigatório, formato válido)
        if (!email || !isValidEmail(email)) {
            errors.push('E-mail é obrigatório e deve possuir um formato válido.');
        }

        // R10 - Endereço (opcional, se enviado 3..200)
        if (endereco !== undefined && !isValidOptionalText(endereco, 3, 200)) {
            errors.push('Endereço deve conter entre 3 e 200 caracteres quando informado.');
        }

        // R11 - Cidade (opcional, se enviado 3..100)
        if (cidade !== undefined && !isValidOptionalText(cidade, 3, 100)) {
            errors.push('Cidade deve conter entre 3 e 100 caracteres quando informada.');
        }

        // R12 - Estado (opcional, se enviado 2 letras)
        if (estado !== undefined && !isValidState(estado)) {
            errors.push('Estado deve ser informado com 2 letras (sigla), quando informado.');
        }

        // R13 - Telefone (opcional, se enviado 11 dígitos)
        if (telefone !== undefined && !isValidPhone(telefone)) {
            errors.push('Telefone deve conter 11 dígitos (incluindo DDD), quando informado.');
        }

        return errors;
    }

    /**
     * Registra um novo usuário em memória garantindo CPF único.
     * Retorna dados públicos do usuário recém cadastrado.
     */
    static registerUser(payload) {
        const validationErrors = this.validateRegistrationPayload(payload);
        if (validationErrors.length > 0) {
            const error = new Error('Erros de validação');
            error.statusCode = 400;
            error.details = validationErrors;
            throw error;
        }

        // R03 - CPF único
        const existingByCpf = UserRepository.findByCpf(payload.cpf);
        if (existingByCpf) {
            const error = new Error('Já existe um usuário com este CPF.');
            error.statusCode = 409;
            throw error;
        }

        const created = UserRepository.create({
            cpf: String(payload.cpf),
            nome: String(payload.nome),
            dataNascimento: String(payload.dataNascimento),
            senha: String(payload.senha),
            email: String(payload.email),
            endereco: payload.endereco !== undefined ? String(payload.endereco) : undefined,
            cidade: payload.cidade !== undefined ? String(payload.cidade) : undefined,
            estado: payload.estado !== undefined ? String(payload.estado).toUpperCase() : undefined,
            telefone: payload.telefone !== undefined ? String(payload.telefone) : undefined,
            criadoEm: new Date().toISOString(),
        });

        // Retornar dados públicos (sem senha)
        const { senha, ...publicUser } = created;
        return publicUser;
    }
}

module.exports = UserService;


