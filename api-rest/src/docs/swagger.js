// Geração do documento OpenAPI usando objeto literal
// Objetivo: documentação clara do contrato da API

const swaggerSpec = {
    openapi: '3.0.0',
    info: {
        title: 'API de Login - Mentoria 2.0',
        description:
            'API REST em memória para cadastro de usuários e autenticação. Documentação para facilitar testes via Swagger UI.',
        version: '1.0.0',
    },
    servers: [
        {
            url: 'http://localhost:3333',
            description: 'Servidor Local',
        },
    ],
    paths: {
        '/users': {
            post: {
                tags: ['Usuários'],
                summary: 'Cadastro de usuário',
                description: 'Cadastra um novo usuário em memória garantindo CPF único.',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/UserRegistrationRequest' },
                        },
                    },
                },
                responses: {
                    201: {
                        description: 'Usuário cadastrado com sucesso',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/UserRegistrationResponse' },
                            },
                        },
                    },
                    400: { description: 'Erros de validação' },
                    409: { description: 'CPF já cadastrado' },
                },
            },
        },
        '/auth/login': {
            post: {
                tags: ['Autenticação'],
                summary: 'Login do usuário',
                description:
                    'Realiza login utilizando CPF OU e-mail, além da senha. Não cria sessão ou token, apenas valida credenciais.',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/LoginRequest' },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'Login realizado com sucesso',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/LoginResponse' },
                            },
                        },
                    },
                    400: { description: 'Requisição inválida' },
                    401: { description: 'Credenciais inválidas' },
                },
            },
        },
    },
    components: {
        schemas: {
            UserRegistrationRequest: {
                type: 'object',
                required: ['cpf', 'nome', 'dataNascimento', 'senha', 'confirmaSenha', 'email'],
                properties: {
                    cpf: { type: 'string', example: '01234567890' },
                    nome: { type: 'string', example: 'Maria da Silva' },
                    dataNascimento: { type: 'string', example: '10/03/1995' },
                    senha: { type: 'string', example: 'abc12' },
                    confirmaSenha: { type: 'string', example: 'abc12' },
                    email: { type: 'string', example: 'maria@example.com' },
                    endereco: { type: 'string', example: 'Rua A, 123' },
                    cidade: { type: 'string', example: 'São Paulo' },
                    estado: { type: 'string', example: 'SP' },
                    telefone: { type: 'string', example: '11987654321' },
                },
            },
            UserPublic: {
                type: 'object',
                properties: {
                    id: { type: 'integer', example: 1 },
                    cpf: { type: 'string' },
                    nome: { type: 'string' },
                    dataNascimento: { type: 'string' },
                    email: { type: 'string' },
                    endereco: { type: 'string', nullable: true },
                    cidade: { type: 'string', nullable: true },
                    estado: { type: 'string', nullable: true },
                    telefone: { type: 'string', nullable: true },
                    criadoEm: { type: 'string', example: '2024-01-01T12:00:00.000Z' },
                },
            },
            UserRegistrationResponse: {
                type: 'object',
                properties: {
                    message: { type: 'string', example: 'Usuário cadastrado com sucesso' },
                    user: { $ref: '#/components/schemas/UserPublic' },
                },
            },
            LoginRequest: {
                type: 'object',
                properties: {
                    cpf: { type: 'string', example: '01234567890' },
                    email: { type: 'string', example: 'maria@example.com' },
                    senha: { type: 'string', example: 'abc12' },
                },
            },
            LoginResponse: {
                type: 'object',
                properties: {
                    message: { type: 'string', example: 'Login realizado com sucesso' },
                    user: { $ref: '#/components/schemas/UserPublic' },
                },
            },
        },
    },
};

module.exports = swaggerSpec;


