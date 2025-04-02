import express from 'express';
import { requireAuth } from '../middleware/AuthMiddleware.js';
import { create, update, updateStatus, remove } from '../controllers/TaskController.js';

const router = express.Router();

// Rotas privadas
router.post('/', requireAuth, create);
router.put('/:id', requireAuth, update);
router.put('/:id/status', requireAuth, updateStatus);
router.delete('/:id', requireAuth, remove);

export default router;