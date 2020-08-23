import {Request, Response} from 'express';
import crudBanco from '../database/crudBanco';

export default class departamentoController{
    static async listarDepartamentos(request: Request, response: Response){
        const {select,status} = await crudBanco.listar('departamento',['*']);
        return response.status(status).json(select);
    }
}