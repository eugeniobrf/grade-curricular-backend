import {Request, Response} from 'express';
import crudBanco from '../database/crudBanco';

//status do suporte:
    //0: criado
    //1: em processamento
    //2: resolvido

export default class suporteController{
    static async addSuporte(request: Request, response: Response){
        const {descricao} = request.body;
        if(!descricao){
            return response.status(400).json();
        }else{
            let insert = <any> {};
            insert.descricao = descricao;
            const matricula = response.locals.matricula;
            if(matricula){
                insert.usuario = matricula;
            }
            const {inserido,status} = await crudBanco.adicionar('suporte',insert,['codigo','descricao']);
            return response.status(status).json(inserido);
        }
    }

    static async listarSuportes(request: Request, response: Response){
        const matricula = response.locals.matricula;
        let {select,status} = await crudBanco.listar('suporte',['codigo','descricao','status','resposta'],'',{},{'usuario':matricula});
        return response.status(status).json(select);
    }
}