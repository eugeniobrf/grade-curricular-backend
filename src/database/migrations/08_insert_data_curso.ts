import Knex from 'knex';

export async function up(knex: Knex){
    return knex.raw(`
        INSERT INTO curso ("nomeCurso") VALUES
            ('Bacharelado em Ciencia da Computacao - Diurno'),
            ('Bacharelado em Ciencia da Computacao - noturno'),
            ('Bacharelado em Ciencias Exatas'),
            ('Bacharelado em Fisica'),
            ('Bacharelado em Quimica'),
            ('Engenharia Ambiental e Sanitaria'),
            ('Engenharia Civil'),
            ('Engenharia Computacional'),
            ('Engenharia de Producao'),
            ('Engenharia Eletrica -  Robotica e Automacao Industrial'),
            ('Engenharia Eletrica - Energia'),
            ('Engenharia Eletrica - Sistemas de Potencia'),
            ('Engenharia eletrica - sistemas eletronicos'),
            ('Engenharia Eletrica - telecomunicacoes'),
            ('Engenharia Mecanica'),
            ('Estatistica'),
            ('Licenciatura em Fisica - diurno'),
            ('Licenciatura em Fisica - noturno'),
            ('Licenciatura em Matematica - Diurno'),
            ('Licenciatura em Matematica - Noturno'),
            ('Licenciatura em Quimica - Diurno'),
            ('Licenciatura em Quimica - Noturno'),
            ('Sistemas de Informacao')
    `);
}

export async function down(knex: Knex){
    return knex('curso').del();
}