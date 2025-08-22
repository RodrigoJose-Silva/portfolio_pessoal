# Testes Automatizados da API-REST 🚀

Bem-vindo ao projeto **api-tests**! Este repositório contém os testes automatizados para a API-REST, utilizando JavaScript e as principais bibliotecas do ecossistema Node.js.

## 📦 Arquitetura do Projeto

- <img src="https://img.icons8.com/color/48/000000/json--v1.png" width="20"/> **fixtures/**: Contém arquivos JSON com dados estáticos para os testes, como exemplos de usuários.
- <img src="https://img.icons8.com/color/48/000000/test-tube.png" width="20"/> **tests/**: Scripts de teste automatizado, escritos em JavaScript, que validam as regras de negócio da API.
- <img src="https://img.icons8.com/color/48/000000/report-file.png" width="20"/> **mochawesome-report/**: Relatórios gerados automaticamente após a execução dos testes, em formato HTML e JSON.
- <img src="https://img.icons8.com/color/48/000000/settings.png" width="20"/> **package.json**: Gerencia as dependências e scripts do projeto.

## 🛠️ Tecnologias Utilizadas

- [@faker-js/faker](https://www.npmjs.com/package/@faker-js/faker) — Geração de dados dinâmicos para testes
- [chai](https://www.chaijs.com/) — Biblioteca de asserções
- [dotenv](https://www.npmjs.com/package/dotenv) — Gerenciamento de variáveis de ambiente
- [mocha](https://mochajs.org/) — Framework de testes
- [mochawesome](https://www.npmjs.com/package/mochawesome) — Relatórios de testes interativos
- [supertest](https://www.npmjs.com/package/supertest) — Testes de APIs HTTP

## 📋 Guia de Instalação e Execução

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   ```
2. **Acesse a pasta do projeto:**
   ```bash
   cd api-tests
   ```
3. **Instale as dependências:**
   ```bash
   npm install
   ```
4. **Configure o arquivo `.env`:**
   - Crie um arquivo `.env` na raiz do projeto com a variável `BASE_URL` apontando para a API-REST em execução.
   - Exemplo:
     ```env
     BASE_URL=http://localhost:3000
     ```
5. **Execute os testes:**
   ```bash
   npm test
   ```
6. **Visualize o relatório:**
   - Após a execução, abra o arquivo `mochawesome-report/mochawesome.html` para ver o relatório interativo dos testes.

## 🧩 Componentes dos Testes

- **cadastro.de.usuario.test.js**: Testa o endpoint de cadastro de usuário, cobrindo cenários de sucesso e validações de regras de negócio (CPF, nome, data de nascimento, senha, etc).
- **cadastro_usuario.json**: Dados estáticos para simular o cadastro de usuários.

## 📝 Documentação dos Testes

Os testes automatizados validam:
- Cadastro de usuário com dados válidos
- CPF duplicado ou inválido
- Nome fora dos limites permitidos
- Data de nascimento ausente, inválida ou menor de idade
- Senha fora dos padrões exigidos

Cada teste utiliza dados dinâmicos gerados pelo Faker, garantindo variedade e robustez na validação das regras de negócio.

## 💡 Observações
- Para executar os testes, a API-REST precisa estar rodando e acessível via URL definida no `.env`.
- Os relatórios são gerados automaticamente após cada execução e podem ser acessados via navegador.

---

Sinta-se à vontade para contribuir ou sugerir melhorias!