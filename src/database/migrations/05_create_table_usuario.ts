import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('usuario',
        table=>{
            table.string('nome',150).notNullable();
            table.string('matricula',15).primary();
            table.string('email',150).notNullable().unique();
            table.string('curso',100).notNullable();
            table.string('senha',60).notNullable();//trocar pra nao deixar ser selecionada
            table.integer('grade').notNullable();
            table.foreign('grade').references('codigo').inTable('grade').onUpdate('CASCADE'). onDelete('RESTRICT');
            table.foreign('curso').references('nomeCurso').inTable('curso').onUpdate('CASCADE').onDelete('RESTRICT');
        }
    )
}

export async function down(knex: Knex){
    return knex.schema.dropTable('usuario');
}