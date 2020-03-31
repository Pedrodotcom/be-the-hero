const connection = require('../database/connection') //importa as configurações de desenvolvimento do knex para estabelecer a conexão com o DB
const crypto = require('crypto') // pacote de dentro do node para criptografia. Servirá para a criação da id da ONG

module.exports = {
    async index (request,response) { //lista os cadasstros realizados na tabela 'ongs'
        const ongs = await connection('ongs').select('*') //solicita que a conexão do DB retorne todos(*) os dados da tabela 'ongs'

        return response.json(ongs) //retorna um array com os dados solicitados
    },

    async create (request, response) { //define uma função assincrona -que é regida pelo "await", já que a inserção dos dados na ONG pode demorar; e o retorno confirmando essa inserção somente será feito após sua conclusão
        const { name, email, whatsapp, city, uf } = request.body //aqui, desestrutura-se a variável em mais de uma

        const id = crypto.randomBytes(4).toString('HEX') //criará uma string de 4 bites de valores hexadecimais "#xxxxxx"

        await connection('ongs').insert({ //o "await" denota que quando o node for rodar esse comando, ele aguardará a finalização de todo o "insert" para prosseguir
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })

        return response.json({ id }) //vai retornar para o usuário o "id" da ONG cadastrada, para que ela possa acessar a aplicação em seguida
    }
}