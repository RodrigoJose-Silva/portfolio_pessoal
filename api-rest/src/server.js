const app = require('./app');

// Este arquivo é responsável por iniciar o servidor HTTP da aplicação.
// Aqui definimos a porta padrão e exibimos informações úteis no console para facilitar o acesso à API e à documentação Swagger.
const PORT = process.env.PORT || 3333;

// Inicia o servidor HTTP
// O callback exibe no console a URL do Swagger e do servidor, tornando o uso mais intuitivo.
app.listen(PORT, () => {
    // Log simples com a URL do Swagger para facilitar o acesso
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Swagger disponível em http://localhost:${PORT}/api-docs`);
});


