// src/routes/tarefas.routes.js
import { Router } from 'express';
import * as controller from '../controllers/tarefas.controller.js';

const router = Router();
router.get('/', controller.listar);
router.post('/', controller.criar);

export default router;