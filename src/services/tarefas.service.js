// src/services/tarefas.service.js
const tarefas = [];
let proximoId = 1;

export class ErroDeValidacao extends Error {
  constructor(mensagem) {
    super(mensagem);
    this.name = 'ErroDeValidacao';
  }
}

export function listar() {
  return tarefas;
}

export function criar({ titulo }) {
  if (typeof titulo !== 'string' || titulo.trim().length < 3) {
    throw new ErroDeValidacao('O título deve ter ao menos 3 caracteres.');
  }
  const tarefa = { id: proximoId++, titulo: titulo.trim(), concluida: false };
  tarefas.push(tarefa);
  return tarefa;
}