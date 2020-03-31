
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table) {
        table.increments() // esse comando criará uma sequência numérica para identificar os casos da ONG

        table.string('title').notNullable() //a função ".notNullable()" indica que o campo não pode ser nulo"
        table.string('description').notNullable() 
        table.decimal('value').notNullable() 
        
        table.string('ong_id').notNullable() //identificará a qual ONG o caso pertence

        table.foreign('ong_id').references('id').inTable('ongs') //"chave estrangeira", dirá que todo caso que or atribuído a uma ONG, deverá pertencer a uma ONG cadastrada no banco de dados
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents')
};

// em seguida, roda-se o comando 'npx knex migrate:latest' para criar uma nova tabela com os casos

//para desfazer a ultima migração, utiliza-se " npx knex migrate:rollback ". Para ver outros comandos, digite no terminal "npx knex"