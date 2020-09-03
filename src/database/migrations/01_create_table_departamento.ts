import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('departamento',
        table=>{
            table.string('codigo',7).primary();
            table.string('nome',60).notNullable();
        }
    );
}

export async function down(knex: Knex){
    return knex.schema.dropTable('departamento');
}