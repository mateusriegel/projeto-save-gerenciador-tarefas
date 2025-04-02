import express from 'express';
import { create, login, updatePassword } from '../controllers/AuthController.js';
import { requireAuth } from '../middleware/AuthMiddleware.js';

const router = express.Router();

// Rotas públicas
router.post('/register', create);
router.post('/login', login);

// Rotas privadas
router.put('/user/password', requireAuth, updatePassword);

export default router;