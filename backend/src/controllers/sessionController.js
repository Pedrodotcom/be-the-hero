// será responsável pelo gerenciamento dos perfis dentro da aplicação
const connection = require("../database/connection") // solicita conexão com o banco de dados

module.exports = {
    async create (request, response) { //verificar se o cadastro da ONG existe, para validar sua conexão
        const { id } = request.body //indica que o ID da ONG virá no corpo da requisição
        
        const ong = await connection('ongs') //conecte-se à tabela 'ongs'
        .where('id', id) //onde o campo 'id' tiver o mesmo valor que a id informada na requisição
        .select('name') //selecione o campo nome
        .first() //retorne apenas o primeiro resultado

        if (!ong) { //se não existir a ONG requisitada no cadastro, retornar o erro 400
            return response.status(400).json({ error: 'No ONG found with this ID.' })
        }

        return response.json(ong) //retorna o dado solicitado pela requisição, nesse caso, o nome
    }
}