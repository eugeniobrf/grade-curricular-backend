import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('disciplinasCursadas',table=>{
            table.string('usuario',15).notNullable;
            table.string('disciplina',9).notNullable;
            table.primary(['usuario','disciplina']);
            table.foreign('usuario').references('matricula').inTable('usuario').onUpdate('CASCADE').onDelete('CASCADE');
            table.foreign('disciplina').references('codigo').inTable('disciplina').onUpdate('CASCADE').onDelete('RESTRICT');
        }
    )
}

export async function down(knex: Knex){
    return knex.schema.dropTable('disciplinasCursadas');
}