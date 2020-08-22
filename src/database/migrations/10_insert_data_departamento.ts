import Knex from 'knex';

export async function up(knex: Knex){
    return knex.raw(`
        INSERT INTO departamento ("codigo", "nome") VALUES
            ('CCI', 'Construcao Civil'),
            ('CEL', 'Circuitos Eletricos'),
            ('DCC', 'Ciencia da Computacao'),
            ('ENE', 'Energia Eletrica'),
            ('EPD', 'Engenharia de Producao e Mecanica'),
            ('ESA', 'Engenharia Sanitaria e Ambiental'),
            ('EST', 'Estatistica'),
            ('ETU', 'Estruturas'),
            ('FIS', 'Fisica'),
            ('ICE', 'Coordenacao do curso de ciencias exatas'),
            ('MAC',  'Mecanica Aplicada e Computacional'),
            ('MAT', 'Matematica'),
            ('QUI', 'Quimica'),
            ('TRN', 'Transportes e Geotecnia')
    `);
}

export async function down(knex: Knex){
    return knex('departamento').del();
}