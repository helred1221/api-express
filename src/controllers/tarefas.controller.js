// src/controllers/tarefas.controller.js
import * as service from '../services/tarefas.service.js';

export function listar(req, res) {
  res.json(service.listar());
}

export function criar(req, res) {
  try {
    const tarefa = service.criar(req.body);
    res.status(201).json(tarefa);
  } catch (error) {
    res.status(400).json({error: 'Body vazio, é necessário que haja informações para serem enviadas.'});
    throw new Error(error);
  }
}