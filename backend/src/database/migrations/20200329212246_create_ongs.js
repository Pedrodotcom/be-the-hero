
exports.up = function(knex) { //método "up", dentro de uma migration, sempre é responsável pela criação da tabela
    return knex.schema.createTable('ongs', function(table) {
        table.string('id').primary() // esse comando é para que o id, no cadastro da ONG seja diferente de uma sequência numérica 1, 2, 3, 4...
        table.string('name').notNullable() //a função ".notNullable()" indica que o campo não pode ser nulo"
        table.string('email').notNullable() 
        table.string('whatsapp').notNullable() 
        table.string('city').notNullable() 
        table.string('uf', 2).notNullable() // nesse caso, "2" indica o número dde caracteres que deverá ter o dado
    })
};

exports.down = function(knex) { //método "down" vai receber o comando do que se fazer caso haja algum erro, nesse caso, a deleção da tabela
    return knex.schema.dropTable('ongs')
};

/*
para rodar, utiliza-se o comando no terminal: " npx knex migrate:latest "

em seguida, para a criação dos casos, "npx knex migrate:make create_incidents"

*/