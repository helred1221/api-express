# api-express

API REST simples para gerenciamento de tarefas (to-do list), construída com [Express](https://expressjs.com/) 5 e ES Modules.

Os dados são armazenados no [MongoDB](https://www.mongodb.com/), por meio do driver oficial `mongodb`.

## Requisitos

- [Node.js](https://nodejs.org/) 20.19 ou superior
- npm
- MongoDB (veja a seção [Banco de dados](#banco-de-dados-mongodb))

## Instalação

```bash
npm install
```

## Execução

```bash
npm start
```

O servidor sobe na porta **3000**:

```
API em http://localhost:3000
```

## Banco de dados (MongoDB)

### Pré-requisitos

Você precisa de um servidor MongoDB em execução. Há duas opções:

- **MongoDB local:** instale o [MongoDB Community Server](https://www.mongodb.com/try/download/community).
- **Docker:**

  ```bash
  docker run -d --name mongo-tarefas -p 27017:27017 mongo:8
  ```

### Configuração do `.env`

Copie o arquivo de exemplo e ajuste se necessário:

```bash
cp .env.example .env
```

No Windows (PowerShell ou Prompt de Comando), use `copy .env.example .env`.

| Variável          | Descrição                                   | Exemplo                      |
|-------------------|---------------------------------------------|------------------------------|
| `MONGODB_URI`     | Endereço de conexão com o servidor          | `mongodb://localhost:27017`  |
| `MONGODB_DB_NAME` | Nome do banco de dados usado pela API       | `api_express`                |

O arquivo `.env` não vai para o Git, porque pode conter credenciais.

> Se `localhost` apontar para outro servidor (por exemplo, um contêiner Docker no Windows), use `mongodb://127.0.0.1:27017` em `MONGODB_URI`.

### Execução

```bash
npm install
npm start
```

Se o MongoDB não estiver acessível, o servidor exibe uma mensagem de erro e encerra.

Ou diretamente, com o `.env` carregado pelo Node:

```bash
node --env-file-if-exists=.env src/server.js
```

### Inspecionando os dados com `mongosh`

Com o [mongosh](https://www.mongodb.com/docs/mongodb-shell/) instalado, conecte-se ao servidor:

```bash
mongosh "mongodb://localhost:27017"
```

Depois, dentro do shell:

```js
show dbs                  // lista os bancos de dados
use api_express           // seleciona o banco usado pela API
show collections          // lista as coleções (deve aparecer "tarefas")
db.tarefas.find()         // mostra todas as tarefas gravadas
db.tarefas.countDocuments() // conta quantas tarefas existem
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
│   ├── config/
│   │   └── database.js              # Conexão única com o MongoDB
│   └── services/
│       └── tarefas.service.js       # Regras de negócio e acesso à coleção de tarefas
├── .env.example
├── package.json
└── package-lock.json
```

A separação segue a arquitetura em camadas:

1. **Routes** – mapeia método e caminho para um controller.
2. **Controllers** – lê a requisição, chama o service e monta a resposta.
3. **Services** – valida os dados e acessa a coleção `tarefas` no MongoDB.

## Endpoints

Base URL: `http://localhost:3000`

### `GET /tarefas`

Retorna a lista de todas as tarefas.

**Resposta** – `200 OK`

```json
[
  { "id": "65f1c2a9e4b0a1b2c3d4e5f6", "titulo": "Estudar Express", "concluida": false }
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
{ "id": "65f1c2a9e4b0a1b2c3d4e5f6", "titulo": "Estudar Express", "concluida": false }
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
| `id`        | string  | Identificador gerado pelo MongoDB (ObjectId, 24 caracteres hexadecimais) |
| `titulo`    | string  | Descrição da tarefa, já sem espaços nas extremidades |
| `concluida` | boolean | Situação da tarefa. Sempre `false` na criação |

## Dependências

| Pacote    | Uso                          |
|-----------|------------------------------|
| `express` | Framework HTTP e roteamento  |
| `mongodb` | Driver oficial para acessar o MongoDB |

## Limitações conhecidas

- **Sem endpoints de atualização ou remoção:** não há `PUT`, `PATCH` ou `DELETE`, por isso o campo `concluida` não pode ser alterado pela API.
- **Sem testes automatizados:** o script `npm test` ainda não está configurado.
