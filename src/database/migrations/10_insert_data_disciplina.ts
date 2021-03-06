import Knex from 'knex';

export async function up(knex: Knex){
    return knex.raw(`
        INSERT INTO disciplina ("codigo", "nome", "cargaHoraria", "departamento") VALUES
            ('DCC001', 'Analise e Projeto de Algoritmos', 60, 'DCC'),
            ('DCC003', 'Analise numerica I', 60, 'DCC'),
            ('DCC008', 'Calculo Numerico', 60, 'DCC'),
            ('DCC012', 'Estrutura de Dados II', 60, 'DCC'),
            ('DCC013', 'Estrutura de Dados', 60, 'DCC'),
            ('DCC019', 'Linguagem de programaÃ§Ã£o', 60, 'DCC'),
            ('DCC024', 'Programacao linear', 60, 'DCC'),
            ('DCC025', 'Orientacao a objetos', 60, 'DCC'),
            ('DCC042', 'Redes de Computadores', 60, 'DCC'),
            ('DCC045', 'Teoria dos compiladores', 60, 'DCC'),
            ('DCC055', 'Teoria da Computacao', 60, 'DCC'),
            ('DCC059', 'Teoria dos Grafos', 60, 'DCC'),
            ('DCC060', 'Banco de Dados', 60, 'DCC'),
            ('DCC061', 'Engenharia de Software', 60, 'DCC'),
            ('DCC062', 'Sistemas Operacionais', 60, 'DCC'),
            ('DCC063', 'Ling. Formais e Automatos', 60, 'DCC'),
            ('DCC064', 'Sistemas Distribuidos', 60, 'DCC'),
            ('DCC070', 'Organizacao de Computadores', 60, 'DCC'),
            ('DCC075', 'SeguranÃ§a em sistemas de computaÃ§Ã£o', 60, 'DCC'),
            ('DCC107', 'Lab. de Prog. II', 30, 'DCC'),
            ('DCC117', 'Modelagem de Sistemas', 60, 'DCC'),
            ('DCC119', 'Algoritmos', 60, 'DCC'),
            ('DCC120', 'Laboratorio de programacao', 30, 'DCC'),
            ('DCC122', 'Circuitos Digitais', 60, 'DCC'),
            ('DCC136', 'Inteligencia computacional', 60, 'DCC'),
            ('DCC160', 'Logica e fund. para a comp.', 60, 'DCC'),
            ('DCC179', 'Lab. de cienc. comp.', 30, 'DCC'),
            ('DCC191', 'Visualizacao Cientifica', 60, 'DCC'),
            ('EADDCC044', 'Informatica e sociedade', 30, 'DCC'),
            ('ESA002', 'Ec. e Pres. do Amb.', 30, 'ESA'),
            ('EST028', 'IntroduÃ§Ã£o a EstatÃ­stica', 60, 'EST'),
            ('ESTO29', 'Calculo de Probabilidades I', 60, 'EST'),
            ('FIS073', 'Fisica I', 60, 'FIS'),
            ('FIS074', 'Fisica II', 60, 'FIS'),
            ('FIS075', 'Fisica III', 60, 'FIS'),
            ('FIS077', 'Lab. de Fisica', 30, 'FIS'),
            ('FIS081', 'Fenomeno de Transportes', 60, 'FIS'),
            ('ICE001', 'Introducao a ciencias exatas', 30, 'ICE'),
            ('ICE002', 'Laboratorio de ciencias', 60, 'ICE'),
            ('MAC002', 'Resistencia dos Materiais I', 60, 'MAC'),
            ('MAC005', 'Mecanica dos Solidos I', 60, 'MAC'),
            ('MAC010', 'Mecanica', 60, 'MAC'),
            ('MAC011', 'Int. Eng. Comp.', 30, 'MAC'),
            ('MAC013', 'Repr. Grafica e Mod. Geometrica', 60, 'MAC'),
            ('MAC019', 'Fund. de Mecanica das Estruturas', 60, 'MAC'),
            ('MAC020', 'Trabalho Multidisciplinar', 60, 'MAC'),
            ('MAC021', 'Trabalho Final de Curso I', 60, 'MAC'),
            ('MAC022', 'Trabalho Final de Curso II', 60, 'MAC'),
            ('MAC023', 'Mecanica das Estruturas', 60, 'MAC'),
            ('MAC024', 'Int. a Modelagem Computacional', 60, 'MAC'),
            ('MAC026', 'Introducao aos Metodos Discretos', 60, 'MAC'),
            ('MAT029', 'Equacoes diferenciais I', 60, 'MAT'),
            ('MAT133', 'Fundamentos da Matematica Elementar', 60, 'MAT'),
            ('MAT143', 'Int. a Teoria dos Numeros', 60, 'MAT'),
            ('MAT154', 'Calculo I', 60, 'MAT'),
            ('MAT155', 'Geometria analitica', 60, 'MAT'),
            ('MAT156', 'Calculo II', 60, 'MAT'),
            ('MAT157', 'Calculo III', 60, 'MAT'),
            ('MAT158', 'Algebra Linear', 60, 'MAT'),
            ('QUI125', 'Quimica fundamental', 60, 'QUI'),
            ('QUI126', 'Lab. de Quimica', 30, 'QUI');
    `); 
}

export async function down(knex: Knex){
    return knex('disciplina').del();
}