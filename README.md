<div align="center">

# Portfólio Pessoal - Mentoria 2.0 🚀👨‍💻

Projeto desenvolvido como parte dos estudos da Mentoria 2.0 ministrada por Júlio de Lima, com o objetivo de criar um portfólio pessoal profissional, focado em boas práticas de desenvolvimento, testes automatizados e documentação.

</div>

## 🗂️ Componentes do Projeto

- **API REST** (`api-rest/`)<br>API para cadastro e autenticação de usuários, desenvolvida em Node.js + Express, com documentação via Swagger.
- **Testes Automatizados** (`api-tests/`)<br>Scripts de automação de testes utilizando Mocha, Chai, Supertest e Mochawesome.
- **Pipeline CI** (`.github/workflows/`)<br>Configuração para execução automatizada dos testes.
- **Artefatos** (`artfacts/`)<br>Documentos de requisitos e plano de testes.

## 🛠️ Tecnologias Utilizadas

- ![Express](https://img.shields.io/badge/Express.js-000?logo=express&logoColor=white)
- ![Swagger](https://img.shields.io/badge/Swagger-85EA2D?logo=swagger&logoColor=black)
- ![CORS](https://img.shields.io/badge/CORS-000?logo=cors&logoColor=white)
- ![Helmet](https://img.shields.io/badge/Helmet-000?logo=helmet&logoColor=white)
- ![Mocha](https://img.shields.io/badge/Mocha-8D6748?logo=mocha&logoColor=white)
- ![Chai](https://img.shields.io/badge/Chai-A30701?logo=chai&logoColor=white)
- ![Supertest](https://img.shields.io/badge/Supertest-000?logo=supertest&logoColor=white)
- ![Mochawesome](https://img.shields.io/badge/Mochawesome-000?logo=mochawesome&logoColor=white)
- ![Faker](https://img.shields.io/badge/Faker-000?logo=faker&logoColor=white)

## 📦 Instalação e Execução

### API REST

1. Acesse a pasta `api-rest`:
   ```bash
   cd api-rest
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor em modo desenvolvimento:
   ```bash
   npm run dev
   ```
   Ou em modo produção:
   ```bash
   npm start
   ```
4. Acesse a documentação Swagger:<br>
   [http://localhost:3333/api-docs](http://localhost:3333/api-docs)

### Testes Automatizados

1. Acesse a pasta `api-tests`:
   ```bash
   cd api-tests
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute os testes (API REST deve estar rodando):
   ```bash
   npm test
   ```
4. Relatórios gerados em `mochawesome-report/mochawesome.html`

## 🔎 Estrutura dos Testes

- **fixtures/**: Dados de exemplo para cadastro de usuário (`cadastro_usuario.json`).
- **tests/**: Scripts de teste automatizado (`cadastro.de.usuario.test.js`).
- **mochawesome-report/**: Relatórios de execução dos testes.

## 🧪 Exemplos de Testes

- Testes de cadastro de usuário, validação de regras de negócio, CPF único, formatos e restrições de campos.
- Testes automatizados utilizam dados dinâmicos gerados pelo Faker para garantir cobertura variada.

## 📝 Observações Importantes

- API REST utiliza persistência em memória, sem banco de dados.
- Senhas são mantidas em texto simples apenas para fins didáticos.
- Todas as validações estão na camada de serviço.
- Para executar os testes, a API deve estar rodando localmente.

## 🤝 Contribuição

Este projeto foi criado para fins de estudo e aprimoramento profissional, seguindo as orientações da Mentoria 2.0.

---

Feito com dedicação para compor um portfólio pessoal profissional.