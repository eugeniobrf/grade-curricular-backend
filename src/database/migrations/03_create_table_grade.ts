import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('grade',table=>{
        table.increments('codigo').primary();
        table.integer('ano').notNullable();
        table.string('curso',100).notNullable();
        table.integer('horasObrigatorias').notNullable();
        table.integer('horasEletivas').notNullable();
        table.integer('horasComplementares').notNullable();
        table.integer('horasAtividadesEletivas').notNullable();
        table.integer('numPeriodos').notNullable();
        table.unique(['ano','curso']);
        table.foreign('curso').references('nomeCurso').inTable('curso').onUpdate('CASCADE').onDelete('CASCADE')
    });
}

export async function down(knex: Knex){
    return knex.schema.dropTable('grade');
}