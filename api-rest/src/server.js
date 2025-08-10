const app = require('./app');

// Porta padrão da aplicação
const PORT = process.env.PORT || 3333;

// Inicia o servidor HTTP
app.listen(PORT, () => {
    // Log simples com a URL do Swagger para facilitar o acesso
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Swagger disponível em http://localhost:${PORT}/api-docs`);
});


