import {Request,Response} from 'express';
import crudBanco from '../database/crudBanco';

export default class cursoController{
    static async listarCursos(request: Request, response: Response){
        const {status, select} = await crudBanco.listar('curso',['nomeCurso as curso']);
        return response.status(status).json(select);
    }
}