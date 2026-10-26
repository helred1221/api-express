// src/controllers/tarefas.controller.js
import * as service from '../services/tarefas.service.js';
import { ErroDeValidacao } from '../services/tarefas.service.js';

export function listar(req, res) {
  res.json(service.listar());
}

export function criar(req, res, next) {
  try {
    const tarefa = service.criar(req.body ?? {});
    res.status(201).json(tarefa);
  } catch (error) {
    if (error instanceof ErroDeValidacao) {
      return res.status(400).json({ error: error.message });
    }
    next(error);
  }
}