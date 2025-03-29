import express from 'express';
import { requireAuth } from '../middleware/AuthMiddleware.js';
import { findAll, getById, remove, update, updateStatus } from '../controllers/TaskController.js';

const router = express.Router();

// Rotas privadas
router.get('/', requireAuth, findAll);
router.get('/:id', requireAuth, getById); 
router.put('/:id', requireAuth, update);
router.put('/:id/status', requireAuth, updateStatus);
router.delete('/:id', requireAuth, remove);

export default router;