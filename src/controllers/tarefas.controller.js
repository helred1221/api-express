// src/controllers/tarefas.controller.js
import * as service from '../services/tarefas.service.js';
import { ErroDeValidacao } from '../services/tarefas.service.js';

export async function listar(req, res) {
  try {
    res.json(await service.listar());
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno ao listar as tarefas.' });
  }
}

export async function criar(req, res) {
  try {
    const tarefa = await service.criar(req.body ?? {});
    res.status(201).json(tarefa);
  } catch (error) {
    if (error instanceof ErroDeValidacao) {
      return res.status(400).json({ error: error.message });
    }
    console.error(error);
    res.status(500).json({ error: 'Erro interno ao criar a tarefa.' });
  }
}
