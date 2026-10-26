// src/controllers/tarefas.controller.js
import * as service from '../services/tarefas.service.js';

export function listar(req, res) {
  res.json(service.listar());
}

export function criar(req, res) {
  const tarefa = service.criar(req.body);
  res.status(201).json(tarefa);
}