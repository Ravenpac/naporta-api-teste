# NaPorta API

API REST desenvolvida para gerenciamento de pedidos da plataforma **NaPorta**.

Este projeto foi desenvolvido como desafio técnico Backend Node.js, aplicando boas práticas de arquitetura, segurança, organização de código e persistência de dados utilizando banco relacional.

---

# Tecnologias utilizadas

## Backend

- Node.js
- NestJS
- TypeScript

## Banco de dados

- PostgreSQL
- Prisma ORM

## Segurança

- JWT (JSON Web Token)
- Passport JWT
- Bcrypt para criptografia de senhas

## Qualidade e desenvolvimento

- ESLint
- Prettier
- Jest
- Class Validator

## Documentação

- Swagger / OpenAPI

---

# Funcionalidades

A API possui as seguintes funcionalidades:

## Autenticação

- Login utilizando email e senha
- Geração de token JWT
- Autenticação utilizando Bearer Token

## Pedidos

- Criar pedido
- Listar pedidos
- Filtrar pedidos por:
  - Número do pedido
  - Data inicial e final
  - Status
- Editar pedido
- Exclusão lógica de pedido

---

# Arquitetura do projeto

A aplicação segue uma arquitetura modular utilizando NestJS.

```
src
├── auth
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── jwt.strategy.ts
│   └── jwt-auth.guard.ts
│
├── orders
│   ├── orders.controller.ts
│   ├── orders.service.ts
│   └── dto
│
├── prisma
│   ├── prisma.module.ts
│   └── prisma.service.ts
│
└── main.ts
```

A organização por módulos facilita manutenção, escalabilidade e separação de responsabilidades.

---

# 🗄 Modelo de dados

A aplicação utiliza PostgreSQL com Prisma ORM.

## Usuário

Responsável pela autenticação da aplicação.

Campos:

- id
- email
- senha
- data de criação


## Pedido

Representa um pedido realizado.

Campos:

- id
- número do pedido
- data prevista de entrega
- cliente
- documento do cliente
- endereço de entrega
- status
- data de criação
- data de exclusão


## Item do pedido

Representa os itens pertencentes a um pedido.

Campos:

- id
- descrição
- preço
- pedido relacionado

---

# Instalação

## Pré-requisitos

Antes de iniciar, tenha instalado:

- Node.js 20+
- Yarn
- PostgreSQL ou Docker


## Clonar o projeto

```bash
git clone https://github.com/Ravenpac/naporta-api-teste.git

cd naporta-api
```

---

## Instalar dependências

```bash
yarn
```

---

# Configuração de ambiente

Crie um arquivo:

```
.env
```

baseado no arquivo:

```
.env.example
```

Exemplo:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/naporta"

JWT_SECRET="secret-key"
```

---

# Banco de dados

Executar migrations:

```bash
yarn prisma migrate dev
```

Gerar Prisma Client:

```bash
yarn prisma generate
```

---

# Seed do banco

O projeto possui um script de seed responsável por popular o banco inicialmente com dados fictícios.

Executar:

```bash
yarn prisma db seed
```

O seed cria:

## Usuário administrador

```
Email:
admin@naporta.com

Senha:
admin123
```

Também são criados pedidos e itens fictícios para demonstração.

---

# Executando a aplicação

Modo desenvolvimento:

```bash
yarn start:dev
```

A aplicação ficará disponível em:

```
http://localhost:3000
```

---

# Swagger

A documentação da API está disponível através do Swagger:

```
http://localhost:3000/api
```

A documentação permite:

- Visualizar endpoints
- Testar requisições
- Informar token JWT
- Validar contratos da API

---

# Autenticação

As rotas de pedidos são protegidas utilizando JWT.

## Login

Endpoint:

```
POST /auth/login
```

Body:

```json
{
  "email": "admin@naporta.com",
  "senha": "admin123"
}
```

Resposta:

```json
{
  "access_token": "jwt-token"
}
```

Para acessar rotas protegidas, informe o token no header:

```
Authorization: Bearer jwt-token
```

---

# Endpoints

## Auth

### Login

```
POST /auth/login
```

---

# Pedidos

Todas as rotas abaixo necessitam de autenticação.

---

## Criar pedido

```
POST /pedidos
```

---

## Listar pedidos

```
GET /pedidos
```

---

## Filtrar pedidos

### Por número

```
GET /pedidos?numeroPedido=PED-001
```

### Por status

```
GET /pedidos?status=PENDENTE
```

### Por período

```
GET /pedidos?dataInicial=2026-01-01&dataFinal=2026-12-31
```

---

## Editar pedido

```
PATCH /pedidos/:id
```

---

## Excluir pedido

A exclusão dos pedidos é feita utilizando exclusão lógica.

Os registros continuam no banco, porém recebem uma data de exclusão e deixam de aparecer nas consultas padrões.

```
DELETE /pedidos/:id
```

---

# Testes

Executar testes:

```bash
yarn test
```

Executar testes com cobertura:

```bash
yarn test:cov
```

---

# Qualidade de código

Formatar código:

```bash
yarn format
```

Executar lint:

```bash
yarn lint
```

---

# Docker

Subir containers:

```bash
docker compose up -d
```

---

# Decisões técnicas

## NestJS

Escolhido por sua arquitetura modular, suporte nativo a TypeScript e recursos como injeção de dependência, validação e organização por módulos.

## PostgreSQL

Escolhido por ser um banco relacional robusto e adequado para o relacionamento entre pedidos e itens.

## Prisma ORM

Utilizado para facilitar o gerenciamento do banco, migrations e consultas com segurança de tipos.

## JWT

Utilizado para autenticação stateless e proteção das rotas privadas utilizando Bearer Token.

---

# Scripts disponíveis

| Comando | Descrição |
|---|---|
| `yarn start:dev` | Executa aplicação em desenvolvimento |
| `yarn build` | Compila aplicação |
| `yarn prisma migrate dev` | Executa migrations |
| `yarn prisma db seed` | Popula banco com dados iniciais |
| `yarn prisma studio` | Abre interface visual do banco |
| `yarn test` | Executa testes |
| `yarn lint` | Verifica padrões de código |
| `yarn format` | Formata arquivos |

---

# Sobre o projeto

Projeto desenvolvido como parte de um desafio técnico Backend Node.js, com foco em construção de uma API REST escalável, segura e organizada utilizando tecnologias modernas do ecossistema JavaScript/TypeScript.
