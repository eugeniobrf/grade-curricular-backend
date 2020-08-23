import {Request, Response} from 'express';
import crudBanco from '../database/crudBanco';

export default class suporteController{
    static async addSuporteSemUsuario(request: Request, response: Response){
        const {descricao} = request.body;
        const {inserido,status} = await crudBanco.adicionar('suporte',{descricao},['codigo','descricao']);
        return response.status(status).json(inserido);
    }
}