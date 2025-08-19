// Importa o módulo 'supertest' para realizar requisições HTTP em testes automatizados
const request = require('supertest')
// Importa a função 'expect' da biblioteca 'chai' para asserções nos testes
const { expect } = require('chai')
require('dotenv').config()
const cadastro_usuario = require('./fixtures/cadastro_usuario.json')


describe('Cadastro de usuário', () =>{
    describe('POST / Cadastro de usuário', () => {
        const bodyCadastroUsuario = {...cadastro_usuario}
        it('Cadastro de usuário com sucesso deverá retornar o ID do usuário', async () =>{
            const response= await request(process.env.BASE_URL)
                .post('/users')
                .set('Content-Type', 'application/json')
                .send(bodyCadastroUsuario)

                expect(response.status).to.be.equal(201)
        })
    })
})