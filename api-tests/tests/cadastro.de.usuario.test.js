// Importa o módulo 'supertest' para realizar requisições HTTP em testes automatizados
const request = require('supertest')
// Importa a função 'expect' da biblioteca 'chai' para asserções nos testes
const { expect } = require('chai')
require('dotenv').config()
const cadastro_usuario = require('../fixtures/cadastro_usuario.json')
const { faker } = require('@faker-js/faker')


// Testes automatizados para o cadastro de usuário na API REST
// Este arquivo cobre cenários de sucesso e validações das regras de negócio
// Utilize o comando 'npm test' para executar os testes e gerar o relatório interativo
describe('Cadastro de usuário', () => {
    // Função utilitária para gerar CPF válido e aleatório
    function gerarCPF() {
        return faker.string.numeric({ length: 11, allowLeadingZeros: true });
    }

    /**
     * Gera uma senha alfanumérica entre 5 e 12 caracteres.
     * Utiliza o Faker para garantir variedade nos testes.
     */
    function gerarSenhaValida() {
        // Garante que a senha seja alfanumérica
        let senha = '';
        while (!/^[a-zA-Z0-9]{5,12}$/.test(senha)) {
            senha = faker.internet.password({ length: faker.number.int({ min: 5, max: 12 }), memorable: true });
        }
        return senha;
    }

    /**
     * Gera um usuário válido com base em todas as regras de negócio.
     * Utiliza dados dinâmicos para aumentar a cobertura dos testes.
     */
    function gerarUsuarioFalso() {
        const senha = gerarSenhaValida();

        const nome = faker.person.fullName();
        const nomeValido = nome.slice(0, 100); // Trunca para 100 caracteres no máximo

        const endereco = faker.location.streetAddress();
        const enderecoValido = endereco.slice(0, 200);

        const cidade = faker.location.city().slice(0, 100);
        const estado = faker.location.state({ abbreviated: true }); // 2 letras (sigla)

        const telefone = faker.string.numeric({ length: 11, allowLeadingZeros: true });

        const dataNascimento = faker.date.birthdate({ min: 18, max: 90, mode: 'age' });
        const dataFormatada = dataNascimento.toLocaleDateString('pt-BR'); // dd/mm/aaaa

        return {
            cpf: gerarCPF(),
            nome: nomeValido.length >= 3 ? nomeValido : nomeValido + ' da Silva', // garantir mínimo 3 chars
            dataNascimento: dataFormatada,
            senha: senha,
            confirmaSenha: senha,
            email: faker.internet.email(),
            endereco: enderecoValido.length >= 3 ? enderecoValido : "Rua Teste, 123",
            cidade: cidade.length >= 3 ? cidade : "Cidade Teste",
            estado: estado,
            telefone: telefone
        };
    }

    describe('POST / Cadastro de usuário', () => {
        // Utiliza dados do fixture para garantir consistência nos testes
        const bodyCadastroUsuario = { ...cadastro_usuario }
        it('Cadastro de usuário com sucesso deverá retornar o ID do usuário', async () => {
            // Gera um usuário válido e dinâmico para o teste
            const novoUsuario = gerarUsuarioFalso()

            const response = await request(process.env.BASE_URL)
                .post('/users')
                .set('Content-Type', 'application/json')
                .send(novoUsuario)

            expect(response.status).to.be.equal(201)
            expect(response.body.message).to.equal('Usuário cadastrado com sucesso')
        })

        it('Não deverá permitir cadastro de usuário com CPF duplicado', async () => {
            const novoUsuario1 = gerarUsuarioFalso();
            const novoUsuario2 = { ...novoUsuario1, nome: "João Silva" }; // Novo usuário com o mesmo CPF duplicado

            await request(process.env.BASE_URL)
                .post('/users')
                .set('Content-Type', 'application/json')
                .send(novoUsuario1)

            const response = await request(process.env.BASE_URL)
                .post('/users')
                .set('Content-Type', 'application/json')
                .send(novoUsuario2)

            expect(response.status).to.be.equal(409)
            expect(response.body.message).to.equal('Já existe um usuário com este CPF.')
        })

        it('Não deverá permitir cadastro de usuário com CPF não numérico', async () => {
            const novoUsuario = gerarUsuarioFalso();
            const novoUsuarioCPFInvalido = { ...novoUsuario, cpf: "0a2s3d4f5g1" }; // Novo usuário com CPF não numerico

            const response = await request(process.env.BASE_URL)
                .post('/users')
                .set('Content-Type', 'application/json')
                .send(novoUsuarioCPFInvalido)

            expect(response.status).to.be.equal(400)
            expect(response.body.message).to.equal('CPF é obrigatório e deve conter exatamente 11 dígitos numéricos.')
        })

        it('Não deverá permitir cadastro de usuário com nome com menos de 3 caracteres', async () => {
            const novoUsuario = gerarUsuarioFalso();
            const novoUsuarioNomeComMenosDeTresCaracteres = { ...novoUsuario, nome: "Ab" }; // Novo usuário com nome com menos de 3 caracteres

            const response = await request(process.env.BASE_URL)
                .post('/users')
                .set('Content-Type', 'application/json')
                .send(novoUsuarioNomeComMenosDeTresCaracteres)

            expect(response.status).to.be.equal(400)
            expect(response.body.message).to.equal('Nome é obrigatório e deve conter entre 3 e 100 caracteres.')
        })

        it('Não deverá permitir cadastro de usuário com nome com mais de 100 caracteres', async () => {
            const novoUsuario = gerarUsuarioFalso();
            const novoUsuarioNomeComMaisDeCemCaracteres = { ...novoUsuario, nome: "Maximilliano Frederico Antônio Luiz Henrique Sebastião da Silva Monteiro Albuquerque da Souza de Lima" }; // Novo usuário com nome com mais de 100 caracteres

            const response = await request(process.env.BASE_URL)
                .post('/users')
                .set('Content-Type', 'application/json')
                .send(novoUsuarioNomeComMaisDeCemCaracteres)

            expect(response.status).to.be.equal(400)
            expect(response.body.message).to.equal('Nome é obrigatório e deve conter entre 3 e 100 caracteres.')
        })

        it('Não deverá permitir cadastro de usuário sem preencher data de nascimento', async () => {
            const novoUsuario = gerarUsuarioFalso();
            const novoUsuarioSemDataDeNascimento = { ...novoUsuario, dataNascimento: "" }; // Novo usuário sem preencher data de nascimento

            const response = await request(process.env.BASE_URL)
                .post('/users')
                .set('Content-Type', 'application/json')
                .send(novoUsuarioSemDataDeNascimento)

            expect(response.status).to.be.equal(400)
            expect(response.body.message).to.equal('Data de nascimento é obrigatória e deve estar no formato dd/mm/aaaa.')
        })

        it('Não deverá permitir cadastro de usuário com data de nascimento no formato invalido', async () => {
            const novoUsuario = gerarUsuarioFalso();
            const novoUsuarioComDataDeNascimentoFormatoInvalido = { ...novoUsuario, dataNascimento: "" }; // Novo usuário com data de nascimento no formato invalido

            const response = await request(process.env.BASE_URL)
                .post('/users')
                .set('Content-Type', 'application/json')
                .send(novoUsuarioComDataDeNascimentoFormatoInvalido)

            expect(response.status).to.be.equal(400)
            expect(response.body.message).to.equal('Data de nascimento é obrigatória e deve estar no formato dd/mm/aaaa.')
        })

        it('Não deverá permitir cadastro de usuário menor de 18 anos', async () => {
            const novoUsuario = gerarUsuarioFalso();
            const novoUsuarioMenorDeDezoitoAnos = { ...novoUsuario, dataNascimento: "01/01/2025" }; // Novo usuário com menor de 18 anos

            const response = await request(process.env.BASE_URL)
                .post('/users')
                .set('Content-Type', 'application/json')
                .send(novoUsuarioMenorDeDezoitoAnos)

            expect(response.status).to.be.equal(400)
            expect(response.body.message).to.equal('Usuário deve ter 18 anos ou mais para se cadastrar.')
        })

        it('Não deverá permitir cadastro de usuário com senha de menos de 5 caracteres', async () => {
            const novoUsuario = gerarUsuarioFalso();
            const novoUsuarioSenhaComMenosDeCincoCaracteres = { ...novoUsuario, senha: "a1s2" }; // Novo usuário com senha menor de 5 caracteres
            const novoUsuarioSenhaComMenosDeCincoCaracteres2 = { ...novoUsuarioSenhaComMenosDeCincoCaracteres, confirmaSenha: "a1s2" }; // Novo usuário com validação senha menor de 5 caracteres


            const response = await request(process.env.BASE_URL)
                .post('/users')
                .set('Content-Type', 'application/json')
                .send(novoUsuarioSenhaComMenosDeCincoCaracteres2)

            expect(response.status).to.be.equal(400)
            expect(response.body.message).to.equal('Senha é obrigatória, deve ser alfanumérica e conter entre 5 e 12 caracteres.')
        })

        it('Não deverá permitir cadastro de usuário com senha maior de 12 caracteres', async () => {
            const novoUsuario = gerarUsuarioFalso();
            const novoUsuarioSenhaComMaisDeDozeCaracteres = { ...novoUsuario, senha: "a1s2d3f4g5h6j" }; // Novo usuário com senha maior de 12 caracteres
            const novoUsuarioSenhaComMaisDeDozeCaracteres2 = { ...novoUsuarioSenhaComMaisDeDozeCaracteres, confirmaSenha: "a1s2d3f4g5h6j" }; // Novo usuário com confirma senha maior de 12 caracteres

            const response = await request(process.env.BASE_URL)
                .post('/users')
                .set('Content-Type', 'application/json')
                .send(novoUsuarioSenhaComMaisDeDozeCaracteres2)

            expect(response.status).to.be.equal(400)
            expect(response.body.message).to.equal('Senha é obrigatória, deve ser alfanumérica e conter entre 5 e 12 caracteres.')
        })

        it('Não deverá permitir cadastro de usuário com validação senha incorreta', async () => {
            const novoUsuario = gerarUsuarioFalso();
            const novoUsuarioValidacaoSenhaInvalida = { ...novoUsuario, senha: "a1s2d3f4g5h6" }; // Novo usuário com validação senha incorreta

            const response = await request(process.env.BASE_URL)
                .post('/users')
                .set('Content-Type', 'application/json')
                .send(novoUsuarioValidacaoSenhaInvalida)

            expect(response.status).to.be.equal(400)
            expect(response.body.message).to.equal('Confirmação de senha é obrigatória e deve ser igual à senha.')
        })

        it('Não deverá permitir cadastro de usuário com email em formato invalido', async () => {
            const novoUsuario = gerarUsuarioFalso();
            const novoUsuarioEmailFormatoInvalido = { ...novoUsuario, email: "email.fomato.invalido" }; // Novo usuário com email em formato invalido

            const response = await request(process.env.BASE_URL)
                .post('/users')
                .set('Content-Type', 'application/json')
                .send(novoUsuarioEmailFormatoInvalido)

            expect(response.status).to.be.equal(400)
            expect(response.body.message).to.equal('E-mail é obrigatório e deve possuir um formato válido.')
        })

        it('Não deverá permitir cadastro de usuário com endereço com menos de 3 caracteres', async () => {
            const novoUsuario = gerarUsuarioFalso();
            const novoUsuarioEnderecoMenorTresCaracteres = { ...novoUsuario, endereco: "Ab" }; // Novo usuário com endereço com menos de 3 caracteres

            const response = await request(process.env.BASE_URL)
                .post('/users')
                .set('Content-Type', 'application/json')
                .send(novoUsuarioEnderecoMenorTresCaracteres)

            expect(response.status).to.be.equal(400)
            expect(response.body.message).to.equal('Endereço deve conter entre 3 e 200 caracteres quando informado.')
        })

        it('Não deverá permitir cadastro de usuário com endereço com mais de 200 caracteres', async () => {
            const novoUsuario = gerarUsuarioFalso();
            const novoUsuarioEnderecoMaisDuzentosCaracteres = { ...novoUsuario, endereco: "Avenida Prof. Doutor Engenheiro Joaquim da Costa e Silva, nº 4721, Bloco D, Apto 1803, Condomínio Jardim Imperial do Sol Nascente, Bairro Monte das Oliveiras, CEP 72345-678, Campo Sereno, Goiás, Brasil" }; // Novo usuário com endereço com mais de 200 caracteres

            const response = await request(process.env.BASE_URL)
                .post('/users')
                .set('Content-Type', 'application/json')
                .send(novoUsuarioEnderecoMaisDuzentosCaracteres)

            expect(response.status).to.be.equal(400)
            expect(response.body.message).to.equal('Endereço deve conter entre 3 e 200 caracteres quando informado.')
        })

        it('Não deverá permitir cadastro de usuário com cidade com menos de 3 caracteres', async () => {
            const novoUsuario = gerarUsuarioFalso();
            const novoUsuarioCidadeMenorTresCaracteres = { ...novoUsuario, cidade: "Ab" }; // Novo usuário com cidade com menos de 3 caracteres

            const response = await request(process.env.BASE_URL)
                .post('/users')
                .set('Content-Type', 'application/json')
                .send(novoUsuarioCidadeMenorTresCaracteres)

            expect(response.status).to.be.equal(400)
            expect(response.body.message).to.equal('Cidade deve conter entre 3 e 100 caracteres quando informada.')
        })

        it('Não deverá permitir cadastro de usuário com endereço com mais de 200 caracteres', async () => {
            const novoUsuario = gerarUsuarioFalso();
            const novoUsuarioCidadeMaisCemCaracteres = { ...novoUsuario, cidade: "Santa Margarida das Colinas Douradas do Vale Encantado São Jerônimo das Águas Claras Serenas do Norte" }; // Novo usuário com cidade com mais de 100 caracteres

            const response = await request(process.env.BASE_URL)
                .post('/users')
                .set('Content-Type', 'application/json')
                .send(novoUsuarioCidadeMaisCemCaracteres)

            expect(response.status).to.be.equal(400)
            expect(response.body.message).to.equal('Cidade deve conter entre 3 e 100 caracteres quando informada.')
        })

        it('Não deverá permitir cadastro de usuário com sigla do estado com menos de 2 caracteres', async () => {
            const novoUsuario = gerarUsuarioFalso();
            const novoUsuarioSiglaEstadoMenorDoisCaracteres = { ...novoUsuario, estado: "A" }; // com sigla do estado com menos de 2 caracteres

            const response = await request(process.env.BASE_URL)
                .post('/users')
                .set('Content-Type', 'application/json')
                .send(novoUsuarioSiglaEstadoMenorDoisCaracteres)

            expect(response.status).to.be.equal(400)
            expect(response.body.message).to.equal('Estado deve ser informado com 2 letras (sigla), quando informado.')
        })

        it('Não deverá permitir cadastro de usuário com sigla do estado com mais de 2 caracteres', async () => {
            const novoUsuario = gerarUsuarioFalso();
            const novoUsuarioSiglaEstadoMaiorDoisCaracteres = { ...novoUsuario, estado: "ABC" }; // Novo usuário com sigla do estado com mais de 2 caracteres

            const response = await request(process.env.BASE_URL)
                .post('/users')
                .set('Content-Type', 'application/json')
                .send(novoUsuarioSiglaEstadoMaiorDoisCaracteres)

            expect(response.status).to.be.equal(400)
            expect(response.body.message).to.equal('Estado deve ser informado com 2 letras (sigla), quando informado.')
        })

        it('Não deverá permitir cadastro de usuário com numero de telefone com menos de 11 caracteres', async () => {
            const novoUsuario = gerarUsuarioFalso();
            const novoUsuarioNUmeroTelefoneMenorOnzeCaracteres = { ...novoUsuario, telefone: "(11)11111111" }; // com numero de telefone com menos de 11 caracteres
            const response = await request(process.env.BASE_URL)
                .post('/users')
                .set('Content-Type', 'application/json')
                .send(novoUsuarioNUmeroTelefoneMenorOnzeCaracteres)

            expect(response.status).to.be.equal(400)
            expect(response.body.message).to.equal('Telefone deve conter 11 dígitos (incluindo DDD), quando informado.')
        })

        it('Não deverá permitir cadastro de usuário com numero de telefone com mais de 11 caracteres', async () => {
            const novoUsuario = gerarUsuarioFalso();
            const novoUsuarioNUmeroTelefoneMaiorOnzeCaracteres = { ...novoUsuario, telefone: "(22)2222222222)" }; // Novo usuário com numero de telefone com mais de 11 caracteres

            const response = await request(process.env.BASE_URL)
                .post('/users')
                .set('Content-Type', 'application/json')
                .send(novoUsuarioNUmeroTelefoneMaiorOnzeCaracteres)

            expect(response.status).to.be.equal(400)
            expect(response.body.message).to.equal('Telefone deve conter 11 dígitos (incluindo DDD), quando informado.')
        })
    })
})