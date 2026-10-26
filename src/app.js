// src/app.js
import express from 'express';
import tarefasRoutes from './routes/tarefas.routes.js';

const app = express();

app.use(express.json());
app.use('/tarefas', tarefasRoutes);

export default app;