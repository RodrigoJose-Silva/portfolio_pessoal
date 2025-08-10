const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
const routes = require('./routes');

// Cria a aplicação Express
const app = express();

// Middlewares globais
app.use(helmet());
app.use(cors());
app.use(express.json());

// Roteador principal
app.use('/', routes);

// Documentação Swagger em /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware de rota inexistente
app.use((req, res, next) => {
    return res.status(404).json({ message: 'Rota não encontrada' });
});

// Middleware de tratamento de erros
// Observação: mantém respostas consistentes para qualquer erro não tratado
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Erro interno do servidor';
    const details = err.details || undefined;
    return res.status(statusCode).json({ message, details });
});

module.exports = app;


