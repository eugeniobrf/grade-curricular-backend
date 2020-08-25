import {Request, Response} from 'express';
import db from '../database/conexao';


export default class detalharGradeController{
    static async detalharGradeAluno(request: Request, response: Response){
        const matricula=response.locals.matricula;
        const grade=response.locals.grade;
        let retorno = <any>{};
        try{
            const dadosGrade = await db.raw(`
                select "horasObrigatorias", "horasEletivas", "horasComplementares", "horasAtividadesEletivas", "numPeriodos" from "grade" where "codigo"=${grade}
            `);
            retorno.numPeriodos = dadosGrade.rows[0].numPeriodos;
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
            `)
            retorno.obrigatorias = obrigatorias.rows;
            const eletivas = await db.raw(`
                select codigo,nome,"cargaHoraria" from "disciplinasGrade" 
                inner join "disciplina" on "disciplinasGrade".disciplina = "disciplina".codigo 
                inner join "disciplinasCursadas" on "disciplinasCursadas".disciplina="disciplina".codigo
                where "disciplinasGrade".tipo=1 and "disciplinasGrade".grade='${grade}' and "disciplinasCursadas".usuario='${matricula}'
                order by periodo
            `);
            retorno.eletivas = eletivas.rows;
            const complementares = await db.raw(`
                select codigo, nome, "cargaHoraria"
                from "disciplinasCursadas" 
                inner join "disciplina" on "disciplinasCursadas".disciplina = "disciplina".codigo
                where "disciplinasCursadas".usuario='${matricula}' and "disciplinasCursadas".disciplina not in (select disciplina from "disciplinasGrade" where grade=${grade})
            `);
            retorno.complementares = complementares.rows;
            const horasObrigatorias = await db.raw(`
                select sum("disciplina"."cargaHoraria") as cargaHoraria 
                from "disciplina"
                inner join "disciplinasGrade" on "disciplinasGrade".disciplina="disciplina".codigo
                inner join "disciplinasCursadas" on "disciplinasCursadas".disciplina="disciplina".codigo
                where "disciplinasGrade".tipo=0 and "disciplinasGrade".grade='${grade}' and "disciplinasCursadas".usuario='${matricula}'
            `);
            retorno.horasObrigatorias = dadosGrade.rows[0].horasObrigatorias-horasObrigatorias.rows[0].cargahoraria;
            const horasEletivas = await db.raw(`
                select sum("disciplina"."cargaHoraria") as cargaHoraria 
                from "disciplina"
                inner join "disciplinasGrade" on "disciplinasGrade".disciplina="disciplina".codigo
                inner join "disciplinasCursadas" on "disciplinasCursadas".disciplina="disciplina".codigo
                where "disciplinasGrade".tipo=1 and "disciplinasGrade".grade='${grade}' and "disciplinasCursadas".  usuario='${matricula}'
            `);
            retorno.horasEletivas = dadosGrade.rows[0].horasEletivas-horasEletivas.rows[0].cargahoraria;
            const horasComplementares = await db.raw(`
            select sum("cargaHoraria") as cargaHoraria
            from "disciplinasCursadas" 
            inner join "disciplina" on "disciplinasCursadas".disciplina = "disciplina".codigo
            where "disciplinasCursadas".usuario='${matricula}' and "disciplinasCursadas".disciplina not in (select disciplina from "disciplinasGrade" where grade=${grade});
            `);
            retorno.horasComplementares = dadosGrade.rows[0].horasComplementares-horasComplementares.rows[0].cargahoraria;
            const horasAtividadesEletivas = await db.raw(`
                select sum(horas) as "cargaHoraria" from "atividadeEletiva" where usuario='${matricula}'
            `)
            retorno.horasAtividadesEletivas = dadosGrade.rows[0].horasAtividadesEletivas-horasAtividadesEletivas.rows[0].cargaHoraria;
            return response.status(200).json(retorno);
        }catch(err){
            return response.status(500);
        }
    }
}