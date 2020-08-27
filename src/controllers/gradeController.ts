import {Request,Response} from 'express';
import crudBanco from '../database/crudBanco';
import db from '../database/conexao';

export default class gradeController{
    static async listarGradesPorCurso(request: Request, response: Response){
        const {curso} = request.params; 
        const colunas = ["codigo", "ano", "horasObrigatorias", "horasEletivas", "horasComplementares", "numPeriodos"];
        const {status, select} = await crudBanco.listar('grade', colunas,'',{},{curso});
        return response.status(status).json(select);
    }

    static async detalharGrade(request: Request, response: Response){
        const {grade} = request.params;
        console.log(grade);
        const colunas = ['codigo', 'nome','cargaHoraria','periodo'];
        const resultObrigatoria = await crudBanco.listar('disciplinasGrade',colunas,'disciplina',{'disciplina.codigo':'disciplinasGrade.disciplina'},{grade,'tipo':0},['periodo']);
        const statusObrigatoria = resultObrigatoria.status;
        const selectObrigadoria = resultObrigatoria.select;
        const resultEletiva = await crudBanco.listar('disciplinasGrade',colunas,'disciplina',{'disciplina.codigo':'disciplinasGrade.disciplina'},{grade,'tipo':1},['periodo']);
        console.log("1");
        const statusEletiva = resultEletiva.status;
        const selectEletiva = resultEletiva.select;
        const detalhesGrade = await crudBanco.listar('grade',['horasObrigatorias','horasEletivas','horasComplementares'],'',{},{'codigo':grade});
        console.log("2");
        const statusGrade = detalhesGrade.status;
        const [selectGrade] = detalhesGrade.select;
        const select = {"obrigatorias":{},"eletivas":{}, "horasObrigatorias":0,"horasEletivas":0,"horasComplementares":0};
        let status;
        if(statusObrigatoria===200 && statusEletiva===200 && statusGrade===200){
            select.eletivas=selectEletiva;
            select.obrigatorias=selectObrigadoria;
            select.horasComplementares=selectGrade.horasComplementares;
            select.horasEletivas=selectGrade.horasEletivas;
            select.horasObrigatorias=selectGrade.horasObrigatorias;
            status=200;
        }else{
            status=500;
        }
        response.status(status).json(select);
    }

    static async detalharGradeAluno(request: Request, response: Response){
        const matricula=response.locals.matricula;
        const {grade}=request.params;
        try{
            const dadosGrade = await db.raw(`
                select "horasObrigatorias", "horasEletivas", "horasComplementares", "numPeriodos" from "grade" where "codigo"=${grade}
            `);
            const obrigatorias = await db.raw(`
                select "disciplina".codigo, "disciplina".nome, "disciplina"."cargaHoraria", "disciplinasGrade".periodo, 
                CASE "cursadas".usuario 
                    WHEN '${matricula}'
                        THEN 'true'
                    ELSE 'false'
                END as cursada
                from "disciplina"
                inner join "disciplinasGrade" on "disciplinasGrade".disciplina="disciplina".codigo
                left join (select * from "disciplinasCursadas" where usuario='${matricula}') as cursadas on "cursadas".disciplina="disciplina".codigo
                where "disciplinasGrade".tipo=0 and "disciplinasGrade".grade='${grade}'
                order by periodo
            `);
            const eletivas = await db.raw(`
                select codigo,nome,"cargaHoraria" from "disciplinasGrade" 
                inner join "disciplina" on "disciplinasGrade".disciplina = "disciplina".codigo 
                inner join "disciplinasCursadas" on "disciplinasCursadas".disciplina="disciplina".codigo
                where "disciplinasGrade".tipo=1 and "disciplinasGrade".grade='${grade}' and "disciplinasCursadas".usuario='${matricula}'
                order by periodo
            `);
            const complementares = await db.raw(`
                select codigo, nome, "cargaHoraria"
                from "disciplinasCursadas" 
                inner join "disciplina" on "disciplinasCursadas".disciplina = "disciplina".codigo
                where "disciplinasCursadas".usuario='${matricula}' and "disciplinasCursadas".disciplina not in (select disciplina from "disciplinasGrade" where grade=${grade})
            `);


            return response.status(200).json(
                {
                    "numPeriodos": dadosGrade.rows[0].numPeriodos,
                    "obrigatorias": obrigatorias.rows,
                    "eletivas": eletivas.rows,
                    "complementares": complementares.rows,
                    "horasObrigatorias": dadosGrade.rows[0].horasObrigatorias,
                    "horasEletivas": dadosGrade.rows[0].horasEletivas,
                    "horasComplementares": dadosGrade.rows[0].horasComplementares,
                }
            );
        }catch(err){
            return response.status(500);
        }
    }

}