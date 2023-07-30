# Cine Api

Api rest que simula compra de ingressos


# Tabela de conteúdos


- [Sobre o projeto](#💻-sobre-o-projeto)
- [Funcionalidades](#⚙️-funcionalidades)
- [Como executar o projeto](#🚀-como-executar-o-projeto)
  - [Pré-requisitos](#pré-requisitos)
- [Tecnologias](#🛠-tecnologias)
- [Autor](#🦸-autor)
- [Documentação](#documentação)
- [Licença](#📝-licença)

## 💻 Sobre o projeto

É um projeto para simular a compra de ingresos, utilizando stripe como gateway de pagamentos. Além disso existem regras que somente usuários admins podem acessar, um exemplo é a criação do ingresso.

## ⚙️ Funcionalidades

- [x] Usuários podem se cadastrar e logar
- [x] Alterar dados da conta
- [x] Deletar conta
- [x] Listar todos os usuários (admin)
- [x] Criação de ingressos (admin)
- [x] Listar ingressos
- [x] Atualizar ingressos
- [x] Remover ingressos
- [x] Adicionar ingressos no carrinho
- [x] Listar ingressos do carrinho
- [x] Remover item do carrinho
- [x] Comprar pagamento
- [x] Listar histórico de pagamentos

## 🚀 Como executar o projeto

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

#### 🧭 Rodando a aplicação

```bash

# Clone este repositório
$ git clone https://github.com/douglas-filipe/cine-api.git

# Acesse a pasta do projeto no seu terminal/cmd
$ cd cine-api

# Instale as dependências
$ npm i

# Crie um banco de dados mongodb neste link: 
$ https://www.mongodb.com/atlas/database

# Crie uma conta no Stripe:
$ https://stripe.com/br

# Adicione o arquivo .env e adicione as variáveis:
$ DATABASE_URL
$ SECRET
$ STRIPE_KEY

# Execute o seguinte comando:
$ npx prisma generate
$ npx prisma db push

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# A aplicação será aberta na porta:3333 - acesse http://localhost:3333

```

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- **[Typescript](https://www.typescriptlang.org/)**
- **[Express](https://expressjs.com/pt-br/)**
- **[Bcrypt](https://www.npmjs.com/package/bcrypt)**
- **[Prisma](https://www.prisma.io/)**
- **[Stripe](https://stripe.com/br)**
- **[Yup](https://www.npmjs.com/package/yup)**
- **[Jsonwebtoken](https://jwt.io/)**

## 🦸 Autor

<a href="https://github.com/douglas-filipe">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/61639919?v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Douglas Filipe</b></sub></a> <a href="https://github.com/douglas-filipe" title="Author">🚀</a>
 <br />

[![Linkedin Badge](https://img.shields.io/badge/-Douglas-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/douglas-filipe-santos/)](https://www.linkedin.com/in/douglas-filipe-santos/)


# Documentação

Acesse a documentação [aqui](https://documenter.getpostman.com/view/23892715/2s8YYJrNqE).

## 📝 Licença

Este projeto esta sobe a licença [MIT](./LICENSE).

Feito com ❤️ por Douglas Filipe 👋🏽 [Entre em contato!](https://www.linkedin.com/in/douglas-filipe-santos/)

