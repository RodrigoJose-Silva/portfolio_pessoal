const { Router } = require('express');
const UserController = require('../controllers/UserController');

const router = Router();

// Rota de cadastro de usuário
router.post('/', (req, res, next) => UserController.register(req, res, next));

module.exports = router;


