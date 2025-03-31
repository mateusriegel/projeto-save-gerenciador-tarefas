import express from 'express';
import { requireAuth } from '../middleware/AuthMiddleware.js';
import { create, findAll, getById, remove, update, updateStatus } from '../controllers/TaskController.js';

const router = express.Router();

// Rotas privadas
router.get('/', requireAuth, findAll);
router.get('/:id', requireAuth, getById); 
router.post('/', requireAuth, create);
router.put('/:id', requireAuth, update);
router.put('/:id/status', requireAuth, updateStatus);
router.delete('/:id', requireAuth, remove);

export default router;