import {Request, Response} from 'express';
import crudBanco from '../database/crudBanco';

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
}