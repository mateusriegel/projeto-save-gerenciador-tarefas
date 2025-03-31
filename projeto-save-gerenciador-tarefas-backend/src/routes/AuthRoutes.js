import express from 'express';
import { findAll, getById, create, update, login, updatePassword } from '../controllers/AuthController.js';
import { requireAuth }  from '../middleware/AuthMiddleware.js';

const router = express.Router();

// Rotas públicas
router.post('/register', create);
router.post('/login', login);

// Rotas privadas
router.get('/user', requireAuth, findAll);
router.get('/user/:id', requireAuth, getById); 
router.put('/user/:id', requireAuth, update);
router.put('/user/:id/password', requireAuth, updatePassword);

export default router;