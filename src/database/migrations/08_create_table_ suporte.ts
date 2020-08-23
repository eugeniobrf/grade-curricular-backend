import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('suporte',table=>
        {
            table.increments('codigo').primary();
            table.string('usuario',15).defaultTo(null);
            table.string('descricao',1000).notNullable();
            table.integer('status').defaultTo(0);
            table.foreign('usuario').references('matricula').inTable('usuario').onUpdate('cascade').onDelete('cascade');
        });
}

export async function down(knex: Knex){
    return knex.schema.dropTable('suporte');
}