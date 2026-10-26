# api-express

API REST simples para gerenciamento de tarefas (to-do list), construída com [Express](https://expressjs.com/) 5 e ES Modules.

Os dados são armazenados em memória: ao reiniciar o servidor, todas as tarefas são perdidas.

## Requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- npm

## Instalação

```bash
npm install
```

## Execução

```bash
npm start
```

Ou diretamente:

```bash
node src/server.js
```

O servidor sobe na porta **3000**:

```
API em http://localhost:3000
```

## Estrutura do projeto

```
api-express/
├── src/
│   ├── app.js                       # Configura o Express (middlewares e rotas)
│   ├── server.js                    # Inicia o servidor HTTP na porta 3000
│   ├── routes/
│   │   └── tarefas.routes.js        # Define as rotas de /tarefas
│   ├── controllers/
│   │   └── tarefas.controller.js    # Trata requisição e resposta HTTP
│   └── services/
│       └── tarefas.service.js       # Regras de negócio e armazenamento em memória
├── package.json
└── package-lock.json
```

A separação segue a arquitetura em camadas:

1. **Routes** – mapeia método e caminho para um controller.
2. **Controllers** – lê a requisição, chama o service e monta a resposta.
3. **Services** – valida os dados e mantém a lista de tarefas.

## Endpoints

Base URL: `http://localhost:3000`

### `GET /tarefas`

Retorna a lista de todas as tarefas.

**Resposta** – `200 OK`

```json
[
  { "id": 1, "titulo": "Estudar Express", "concluida": false }
]
```

### `POST /tarefas`

Cria uma nova tarefa.

**Corpo da requisição** (`application/json`):

| Campo    | Tipo   | Obrigatório | Regras                              |
|----------|--------|-------------|-------------------------------------|
| `titulo` | string | sim         | Mínimo de 3 caracteres (sem espaços nas extremidades) |

**Exemplo:**

```bash
curl -X POST http://localhost:3000/tarefas \
  -H "Content-Type: application/json" \
  -d '{"titulo": "Estudar Express"}'
```

**Resposta de sucesso** – `201 Created`

```json
{ "id": 1, "titulo": "Estudar Express", "concluida": false }
```

**Resposta de erro** – `400 Bad Request`

Quando o `titulo` não é uma string ou tem menos de 3 caracteres (após remover espaços):

```json
{ "error": "O título deve ter ao menos 3 caracteres." }
```

Erros inesperados retornam `500 Internal Server Error` pelo tratamento padrão do Express.

## Modelo de dados

Tarefa:

| Campo       | Tipo    | Descrição                                   |
|-------------|---------|---------------------------------------------|
| `id`        | number  | Identificador gerado automaticamente (sequencial, a partir de 1) |
| `titulo`    | string  | Descrição da tarefa, já sem espaços nas extremidades |
| `concluida` | boolean | Situação da tarefa. Sempre `false` na criação |

## Dependências

| Pacote    | Uso                          |
|-----------|------------------------------|
| `express` | Framework HTTP e roteamento  |

## Limitações conhecidas

- **Sem persistência:** os dados ficam em memória e são perdidos ao reiniciar.
- **Sem endpoints de atualização ou remoção:** não há `PUT`, `PATCH` ou `DELETE`, por isso o campo `concluida` não pode ser alterado pela API.
- **Sem testes automatizados:** o script `npm test` ainda não está configurado.
