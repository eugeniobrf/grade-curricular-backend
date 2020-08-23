import {Request, Response} from 'express';
import crudBanco from '../database/crudBanco';

export default class disciplinaController{
    static async listarDisciplinasPorDeparamento(request: Request, response: Response){
        const {departamento} = request.params;
        const colunas = ['codigo','nome','cargaHoraria'];
        const {status, select} = await crudBanco.listar('disciplina',colunas,'',{},{departamento});
        return response.status(status).json(select);
    }
}