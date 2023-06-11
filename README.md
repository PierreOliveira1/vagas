# Observações para o uso

## Uso

### Instale as dependências

Use `npm install` para instalar todas as dependências.

### ATENÇÂO

Antes de rodar o projeto é necessário configurar o .env enviado como exemplo.

### Dev

Use `npm run dev` para rodar o projeto no modo dev.

### Build

Use `npm run build` para fazer o build do projeto.

### Start

Use `npm run start` para rodar o build gerado do projeto.

## Autenticação

### POST /auth

#### Rota

```
{{baseUrl}}/auth
```

#### Body

| PARÂMETRO | DESCRIÇÃO | TIPO   | OBRIGATÓRIO |
| --------- | --------- | ------ | ----------- |
| username  | Usuário   | String | Sim         |
| password  | Senha     | String | Sim         |

#### Response

```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjlhMmU2ZDkyLWY1YWEtNDNmNy1iMWZhLTg2ZmUxZmE0YTUyZCIsImlhdCI6MTY3MzQwMTg4OCwiZXhwIjoxNjczNDg4Mjg4LCJzdWIiOiI5YTJlNmQ5Mi1mNWFhLTQzZjctYjFmYS04NmZlMWZhNGE1MmQifQ.UfbKa0cg82IdO0eFfFnWC5j4OwGNTLXPMdGuSbtg0xs"
}
```

## Usuários

### Headers

Este header deve conter nas rotas de deletar e atualizar usuário.

| Parameter     | Value          |
| ------------- | -------------- |
| authorization | Bearer {token} |

### GET /users/{id}

Buscar apenas um usuário

#### Route

```
{{ _.baseUrl }}/users/{id}
```

#### Params

| PARÂMETRO | DESCRIÇÃO     | TIPO   | OBRIGATÓRIO |
| --------- | ------------- | ------ | ----------- |
| id        | Id do usuário | Number | Sim         |

#### Response

```json
{
	"id": 1,
	"username": "joao.oliveira",
	"name": "João Oliveira",
	"job": "Desenvolvedor",
	"permission": "admin",
	"accessCount": 1
}
```

### GET /users

Buscar todos os usuários

#### Response

```json
[
	{
		"id": 1,
		"username": "joao.oliveira",
		"name": "João Oliveira",
		"job": "Desenvolvedor",
		"permission": "admin",
		"accessCount": 1
	}
]
```

### POST /users

Criar usuário.

#### Route

```
{{ _.baseUrl }}/users
```

#### Body

| PARÂMETRO  | DESCRIÇÃO            | TIPO              | OBRIGATÓRIO |
| ---------- | -------------------- | ----------------- | ----------- |
| username   | Usuário              | String            | Sim         |
| name       | Nome do usuário      | String            | Sim         |
| job        | Cargo do usuário     | String            | Sim         |
| permission | Permissão do usuário | 'admin' ou 'user' | Sim         |
| password   | Senha do usuário     | String            | Sim         |

#### Response

```json
{
	"id": 2,
	"username": "pierre",
	"name": "Pierre Oliveira",
	"job": "Programador",
	"permission": "admin",
	"accessCount": 0
}
```

### PATCH /users/{id}

Atualizar usuário.

#### Params

| PARÂMETRO | DESCRIÇÃO     | TIPO   | OBRIGATÓRIO |
| --------- | ------------- | ------ | ----------- |
| id        | Id do usuário | Number | Sim         |

#### Route

```
{{ _.baseUrl }}/users/{id}
```

#### Body

| PARÂMETRO  | DESCRIÇÃO            | TIPO              | OBRIGATÓRIO |
| ---------- | -------------------- | ----------------- | ----------- |
| username   | Usuário              | String            | Não         |
| name       | Nome do usuário      | String            | Não         |
| job        | Cargo do usuário     | String            | Não         |
| permission | Permissão do usuário | 'admin' ou 'user' | Não         |
| password   | Senha do usuário     | String            | Não         |

#### Response

```json
{
	"id": 2,
	"username": "pierre",
	"name": "Pierre Oliveira",
	"job": "Programador",
	"permission": "admin"
}
```

### DELETE /users/{id}

Deletar usuário.

#### Route

```
{{ _.baseUrl }}/users/{id}
```

#### Params

| PARÂMETRO | DESCRIÇÃO     | TIPO   | OBRIGATÓRIO |
| --------- | ------------- | ------ | ----------- |
| id        | Id do usuário | Number | Sim         |

#### Response

```json
{
	"success": true
}
```

### GET /users/access/{id}

Buscar quantas vezes um usuário foi acessado.

#### Route

```
{{ _.baseUrl }}/users/access/{id}
```

#### Params

| PARÂMETRO | DESCRIÇÃO     | TIPO   | OBRIGATÓRIO |
| --------- | ------------- | ------ | ----------- |
| id        | Id do usuário | Number | Sim         |

#### Response

```json
{
	"message": "Usuário Pierre Oliveira 3 foi lido undefined vezes."
}
```

# Este é um teste para desenvolvedores

# possui 5 testes

## Introdução

Este projeto possui um banco de dados fake em fakeData.js com apenas um registro.
A ideia é melhorar e o CRUD escrito nos 4 arquivos de teste abaixo.

Será a validada a forma de escrita de código.
Escreva códigos que humanos consigam entender.

Fique a vontade para fazer modificaçoes nos serviços, comentários em código, estrutura, mas seja objetivo.

## teste1.js

GET em /user

Possuimos neste arquivo um serviço que faz uma busca no banco fake e retorna um registro.
Este código funciona, mas é possivel melhorar.
Veja o que pode deixar ele melhor escrito e mais performatico.

## teste2.js

POST em /users, descubra a intenção dele e o corrija.

## teste3.js

Este procura um usuário e o deleta da base.
Retorne sucesso para o client caso realmente tenha sido excluido e deixe o código mais performatico.

## teste4.js

Atualiza os dados de um usuário especifico.

## teste5.js

Retorne quantas vezes determinado usuário foi lido no teste1.

## teste 6

Definina uma forma de criar permissão para o usuario, defina se o usuário pode deletar ou atualizar usuários. Crie um middleware para validar essas permissões e adicione no teste4 e teste3.
