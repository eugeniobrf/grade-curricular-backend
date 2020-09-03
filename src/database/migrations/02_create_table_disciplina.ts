import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('disciplina',
        table=>{
            table.string('codigo',15).primary();
            table.string('nome',100).notNullable();
            table.integer('cargaHoraria').notNullable();
            table.string('departamento',7).notNullable();
            table.foreign('departamento').references('codigo').inTable('departamento').onUpdate('CASCADE').onDelete('RESTRICT');
        }
    );
}

export async function down(knex: Knex){
    return knex.schema.dropTable('disciplina');
}