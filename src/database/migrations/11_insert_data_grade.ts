import Knex from 'knex';

export async function up(knex: Knex){
    return knex.raw(`
        INSERT INTO grade ("ano", "curso", "horasObrigatorias", "horasEletivas", "horasComplementares", "numPeriodos") VALUES
            (2009, 'Engenharia Computacional', 2550, 480, 300, 10);
    
    `); 
}

export async function down(knex: Knex){
    return knex('grade').del();
}