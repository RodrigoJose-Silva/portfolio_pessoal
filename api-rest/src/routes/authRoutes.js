const { Router } = require('express');
const AuthController = require('../controllers/AuthController');

const router = Router();

// Rota de login
router.post('/login', (req, res, next) => AuthController.login(req, res, next));

module.exports = router;


