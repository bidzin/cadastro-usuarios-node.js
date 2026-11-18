# cadastro-usuarios

API REST para cadastro de usuários, construída com Node.js, Express e Prisma, usando MongoDB como banco de dados.

## Requisitos

- Node.js e npm
- Uma instância acessível do MongoDB

## Configuração

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Crie um arquivo `.env` na raiz do projeto e configure a URL do MongoDB:

   ```env
   DATABASE_URL="mongodb+srv://<usuario>:<senha>@<cluster>/<banco>?retryWrites=true&w=majority"
   ```

   Substitua os valores entre `< >` pelos dados do seu banco. Não compartilhe nem versione o arquivo `.env`.

3. Gere o cliente do Prisma:

   ```bash
   npx prisma generate
   ```

## Iniciar o servidor

Execute na raiz do projeto:

```bash
node server.js
```

O servidor fica disponível em `http://localhost:3000`.

## Endpoints

Todos os endpoints recebem e retornam JSON.

### Criar usuário

`POST /usuarios`

```json
{
  "email": "ana@example.com",
  "name": "Ana",
  "age": "25"
}
```

O e-mail deve ser único. A idade é armazenada como texto.

### Listar usuários

`GET /usuarios`

Opcionalmente, filtre por correspondência exata usando `name`, `email` e/ou `age`:

```text
GET /usuarios?name=Ana
GET /usuarios?email=ana@example.com&age=25
```

### Atualizar usuário

`PUT /usuarios/:id`

```json
{
  "email": "ana.nova@example.com",
  "name": "Ana Silva",
  "age": "26"
}
```

O `id` é o identificador ObjectId do MongoDB.

### Excluir usuário

`DELETE /usuarios/:id`

## Modelo de usuário

| Campo | Tipo | Observações |
| --- | --- | --- |
| `id` | String | ObjectId do MongoDB, gerado automaticamente |
| `email` | String | Obrigatório e único |
| `name` | String | Obrigatório |
| `age` | String | Obrigatório |
