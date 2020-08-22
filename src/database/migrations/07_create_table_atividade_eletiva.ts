import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('atividadeEletiva',table=>
        {
            table.increments('codigo').primary();
            table.string('nome',100).notNullable();
            table.string('descricao',500).notNullable();
            table.integer('horas').notNullable();
            table.string('usuario',15).notNullable();
            table.foreign('usuario').references('matricula').inTable('usuario').onUpdate('CASCADE').onDelete('CASCADE');
        }
    );
}

export async function down(knex: Knex){
    return knex.schema.dropTable('atividadeEletiva')
}