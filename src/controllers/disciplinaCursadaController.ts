import {Request, Response} from 'express';
import db from '../database/conexao';

export default class disciplinaCursadaController{
    static async atualizarDisciplinasCursada(request: Request, response: Response){
        const usuario = response.locals.matricula;
        const adicionar:Array<string> = request.body.adicionar;
        const remover:Array<string> = request.body.remover;
        if(!(adicionar || remover)){
            return response.status(400).json();
        }
        const trx = await db.transaction();
        try{
            if(adicionar){
                for(let disciplina of adicionar){
                    await trx('disciplinasCursadas').insert({usuario,disciplina});
                }
            }
            if(remover){
                for(let disciplina of remover){
                    await trx('disciplinasCursadas').where({disciplina,usuario}).del();
                }
            }
            trx.commit();
            return response.status(200).json();
        }catch(err){
            await trx.rollback();
            if(err.code==='23505' || err.code==='23503'){
                response.status(400).json();
            }else{
                response.status(500).json();
            }
        }
    }
}