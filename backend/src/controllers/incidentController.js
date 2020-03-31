const connection = require("../database/connection") // solicita conexão com o banco de dados

module.exports = {
    async index (request, response) {
        const { page = 1 } = request.query //são os Query Params

        const [count] = await connection('incidents').count() //informa ao front-end o número de casos existentes (informa apenas um resultado)

        const incidents = await connection("incidents")
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id') //une os dados da tabela 'ongs' sobre a ONG a qual o caso pertença
            .limit(5) //limita a 5 elementos por página, ou seja, por busca no bancode dados
            .offset((page - 1) * 5) //define a partir de qual registro começará a pagina. ex: a página 1, iniciará a partir do registro 0, a página 2 a partir do 5º, etc.
            .select([ //seleciona todos os elementos da tabela 'incidents' e também os elementos selecionados da tabela 'ongs'
                'incidents.*', 
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city', 
                'ongs.uf'
            ])

        response.header('X-Total-Count', count['count(*)']) //retorna o número de casos contabilizados no header da resposta a requisição

        return response.json(incidents)
    },

    async create (request, response) {
        const { title, description, value } = request.body
        const ong_id = request.headers.authorization //é o cabeçalho da requisição, que armazena informações acerca do context da requisição, como referentes à autenticação, localização, idioma, etc

        const [id] = await connection("incidents").insert({
            title,
            description,
            value,
            ong_id
        })

        return response.json({ id })
    },

    async delete (request, response) { //rota para que a ONG possa apagar um de seus casos
        const { id } = request.params //cria uma variável com o id do caso
        const ong_id = request.headers.authorization

        const incident = await connection('incidents') //conecte-se à tabela 'incidents'
            .where('id', id) //procure um 'id' que seja igual ao id informado entre os parâmetros da requisição
            .select('ong_id') //selecione o id da ONG que fez a requisição
            .first() //retornará o primeiro resultado da busca

        if (incident.ong_id != ong_id) { //se o id da ONG que fez a requisição for diferente do id da ONG autorizada, não permita que a delecção seja feita
            return response.status(401).json({ error: 'Operation not permitted.' })
        }

        await connection('incidents').where('id', id).delete() //conecte-se à tabela 'incidents' e, onde o 'id' for igual ao id da requisição, delete o caso

        return response.status(204).send()
    }
}