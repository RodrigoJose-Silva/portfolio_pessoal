// Importa o módulo 'supertest' para realizar requisições HTTP em testes automatizados
const request = require('supertest')
// Importa a função 'expect' da biblioteca 'chai' para asserções nos testes
const { expect } = require('chai')
require('dotenv').config()
const cadastro_usuario = require('./fixtures/cadastro_usuario.json')
const { faker } = require('@faker-js/faker')


describe('Cadastro de usuário', () =>{
    function gerarCPF() {
        return faker.string.numeric({ length: 11, allowLeadingZeros: true });
    }
    
    /**
     * Gera uma senha alfanumérica entre 5 e 12 caracteres.
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
        const bodyCadastroUsuario = {...cadastro_usuario}
        it('Cadastro de usuário com sucesso deverá retornar o ID do usuário', async () =>{
            const novoUsuario = gerarUsuarioFalso()
            
            const response= await request(process.env.BASE_URL)
                .post('/users')
                .set('Content-Type', 'application/json')
                .send(novoUsuario)

                expect(response.status).to.be.equal(201)
                expect(response.body.message).to.equal('Usuário cadastrado com sucesso')
        })

        it('Não deverá permitir cadastro com CPF duplicado', async () =>{
            const novoUsuario1 = gerarUsuarioFalso();
            const novoUsuario2 = { ...novoUsuario1, nome: "João Silva" }; // Segundo usuário com o mesmo CPF

            await request(process.env.BASE_URL)
                .post('/users')
                .set('Content-Type', 'application/json')
                .send(novoUsuario1)

            const response= await request(process.env.BASE_URL)
                .post('/users')
                .set('Content-Type', 'application/json')
                .send(novoUsuario2)

                expect(response.status).to.be.equal(409)
                expect(response.body.message).to.equal('Já existe um usuário com este CPF.')
        })
    })
})