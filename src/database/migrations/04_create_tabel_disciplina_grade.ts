import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('disciplinasGrade',table=>
        {
            table.string('disciplina',9).notNullable();
            table.integer('grade').notNullable();
            table.integer('periodo').notNullable();
            table.integer('tipo').notNullable();
            table.primary(['disciplina','grade']);
            table.foreign('disciplina').references('codigo').inTable('disciplina').onUpdate('CASCADE'). onDelete('RESTRICT');
            table.foreign('grade').references('codigo').inTable('grade').onUpdate('CASCADE').onDelete   ('RESTRICT');
        }
    );
}

export async function down(knex: Knex){
    return knex.schema.dropTable('disciplinasGrade')
}