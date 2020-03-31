const express = require('express')
const cors = require('cors') //módulo que vai determinar quem poderá acessar a aplicação
const routes = require('./routes') // o "./" serve para mostrar que há uma pasta raiz, referenciando a mesma pasta do aquivo index.js

const app = express() // Solicita a função 'express'

app.use(cors()) //dentro do parâmetro, quando a aplicação for hospedada, deve ser colocado um objeto com atributo 'origin' e a url do ambiente
app.use(express.json()) // Informa à aplicação que o corpo das requisições será repassado em formato JSON
app.use(routes)

/*

Métodos HTTP: 

GET: buscar/listar uma informação do back-end
POST: criar uma informação no back-end
PUT: alterar uma informação no back-end
DELETE: deletar uma informação no back-end

*/

/*

Tipos de parâmetros:

* Query Params: parâmetros nomeados enviados na rota após o símbolo de interrogação "?" (geralmente servem para filtros, paginação) ('/users?aluno=Pedro')
* Route Params: parâmetros utilizados para identificar recursos ('/users/:id')
* Request Body: é o corpo da requisição, utilizado para criar e alterar recursos (ex: usuário)

Request: guarda os dados da requisição
Response: gera as repostas às requisições

*/

/*

Banco de dados:

    Linguagens para comunicação com o DB: será utilizado o SQLite

        * SQL: SQLite, MySQL, Oracle, Microsot SQL Server
        * NoSQL: MongoDB
    
    Configurando o banco de dados:

        A comunicação com o banco de dados pode se dar de três maneiras:

        Instalando o 
            Driver (pacote oficial do banco para o node): SELECT * FROM users
            Query Builder (escrever usando JS): table('users').select('*').where()
                usando 'knex'
                    npm i knex
                    npm i sqlite3
                        Pesquisar migrations -> .createTable: permite que seja definido um esquema/histórico de alterações das tabelas do
                        DB, então facilita a atualização do banco.

*/

/*

As entidades da aplicação é tudo aquilo que será salvo no banco de dados

    * ONG
    * Casos

Funcionalidades que cada entidade fará na aplicação

    * Cadastro DE ONG
    * Login de ONG
    * LogOUT de ONG
    * Cadastrar bovos casos
    * Deletar casos
    * Listar casos específicos de uma ONG
    * Listar todos os casos
    * Entrar em contato com a ONG

*/

app.listen(3333) //Porta ideal para rodar o node