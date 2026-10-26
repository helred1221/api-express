// src/services/tarefas.service.js
import { colecaoTarefas } from '../config/database.js';

export class ErroDeValidacao extends Error {
  constructor(mensagem) {
    super(mensagem);
    this.name = 'ErroDeValidacao';
  }
}

// O MongoDB guarda o identificador em `_id` (ObjectId). A API expõe `id` como texto,
// e é isso que este formato devolve.
function paraFormatoDaApi(documento) {
  return {
    id: documento._id.toHexString(),
    titulo: documento.titulo,
    concluida: documento.concluida,
  };
}

export async function listar() {
  // mongosh: db.tarefas.find()
  const documentos = await colecaoTarefas().find().toArray();
  return documentos.map(paraFormatoDaApi);
}

export async function criar({ titulo }) {
  if (typeof titulo !== 'string' || titulo.trim().length < 3) {
    throw new ErroDeValidacao('O título deve ter ao menos 3 caracteres.');
  }
  const novaTarefa = { titulo: titulo.trim(), concluida: false };
  // mongosh: db.tarefas.insertOne({ titulo: "Estudar", concluida: false })
  const resultado = await colecaoTarefas().insertOne(novaTarefa);
  return paraFormatoDaApi({ _id: resultado.insertedId, ...novaTarefa });
}
