<div align="center">

# API REST - Gestão de Login 👤🔐

API em Node.js + Express para cadastro de usuários (em memória) e autenticação, com documentação via Swagger.

</div>

## ✨ Sobre

Esta API foi desenvolvida como parte de um portfólio pessoal para demonstrar boas práticas de **Qualidade de Testes**, camadas (Controller/Service/Repository), validações e documentação.

## 🧩 Requisitos Funcionais (Resumo)

- **R01 — Cadastro de usuário**: permitido se não existir CPF já cadastrado
- **R02 — CPF**: 11 dígitos numéricos (pode iniciar com 0) — obrigatório
- **R03 — CPF único**: não é possível cadastrar dois usuários com o mesmo CPF
- **R04 — Nome**: entre 3 e 100 caracteres — obrigatório
- **R05 — Data de nascimento**: formato dd/mm/aaaa — obrigatório
- **R06 — Idade mínima**: apenas 18+ anos
- **R07 — Senha**: alfanumérica, entre 5 e 12 caracteres — obrigatória
- **R08 — Confirmação de senha**: deve ser igual à senha — obrigatória
- **R09 — E-mail**: formato válido — obrigatório
- **R10 — Endereço**: 3 a 200 caracteres (opcional)
- **R11 — Cidade**: 3 a 100 caracteres (opcional)
- **R12 — Estado**: 2 letras (opcional)
- **R13 — Telefone**: 11 dígitos numéricos (opcional)

## 🛠️ Tecnologias

- Node.js
- Express
- Helmet
- CORS
- Swagger UI

## 🗂️ Estrutura do Projeto

```
api-rest/
  ├─ src/
  │  ├─ controllers/
  │  │  ├─ AuthController.js
  │  │  └─ UserController.js
  │  ├─ docs/
  │  │  └─ swagger.js
  │  ├─ repositories/
  │  │  └─ UserRepository.js
  │  ├─ routes/
  │  │  ├─ authRoutes.js
  │  │  ├─ index.js
  │  │  └─ userRoutes.js
  │  ├─ services/
  │  │  ├─ AuthService.js
  │  │  └─ UserService.js
  │  ├─ utils/
  │  │  └─ validators.js
  │  ├─ app.js
  │  └─ server.js
  ├─ package.json
  └─ README.md
```

## 🚀 Como instalar e rodar

1. Instale as dependências:

```bash
npm install
```

2. Inicie o servidor em modo desenvolvimento (com auto-reload):

```bash
npm run dev
```

3. Ou inicie em modo produção:

```bash
npm start
```

4. Acesse a documentação Swagger:

- URL: `http://localhost:3333/api-docs`

## 📚 Endpoints principais

- `POST /users`: cadastra um novo usuário (em memória)
- `POST /auth/login`: autentica via CPF ou e-mail + senha

## 🧪 Exemplos de requisição

Cadastro (`POST /users`):

```json
{
  "cpf": "01234567890",
  "nome": "Maria da Silva",
  "dataNascimento": "10/03/1995",
  "senha": "abc12",
  "confirmaSenha": "abc12",
  "email": "maria@example.com",
  "endereco": "Rua A, 123",
  "cidade": "São Paulo",
  "estado": "SP",
  "telefone": "11987654321"
}
```

Login (`POST /auth/login`):

```json
{
  "cpf": "01234567890",
  "senha": "abc12"
}
```

ou

```json
{
  "email": "maria@example.com",
  "senha": "abc12"
}
```

## 🧱 Observações

- Persistência apenas em memória (não há banco de dados)
- Senhas são mantidas em texto simples apenas para fins didáticos deste exercício
- Todas as regras de validação estão na camada de serviço

---

Feito com atenção aos detalhes para compor um portfólio pessoal profissional.


