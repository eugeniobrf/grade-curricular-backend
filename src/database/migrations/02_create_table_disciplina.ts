import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('disciplina',
        table=>{
            table.string('codigo',9).primary();
            table.string('nome',50).notNullable();
            table.integer('cargaHoraria').notNullable();
            table.string('departamento',3).notNullable();
            table.foreign('departamento').references('codigo').inTable('departamento').onUpdate('CASCADE').onDelete('RESTRICT');
        }
    );
}

export async function down(knex: Knex){
    return knex.schema.dropTable('disciplina');
}