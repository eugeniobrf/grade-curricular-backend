import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('curso',
        (table)=>{
            table.string('nomeCurso',100).primary()
        }
    );
}

export async function down(knex: Knex){
    return knex.schema.dropTable('curso');
}