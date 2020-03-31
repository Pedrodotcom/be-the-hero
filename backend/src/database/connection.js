//Arquivo para fazer a conexão com o DB

const knex = require('knex')
const configuration = require('../../knexfile') //esse comando retorna duas pastas para chegar na pasta raiz e acessar o 'knexfile'

const connection = knex(configuration.development) //configurações de "development do arquivo 'knexfile'"

module.exports = connection //exporta as configurações de desenvolvimento do knex para o arquivo 'routes'.