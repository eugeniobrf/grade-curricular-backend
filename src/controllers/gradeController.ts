import {Request,Response} from 'express';
import crudBanco from '../database/crudBanco';

export default class gradeController{
    static async listarGradesPorCurso(request: Request, response: Response){
        const {curso} = request.params; 
        const colunas = ["codigo", "ano", "horasObrigatorias", "horasEletivas", "horasComplementares", "horasAtividadesEletivas", "numPeriodos"];
        const {status, select} = await crudBanco.listar('grade', colunas,'',{},{curso});
        return response.status(status).json(select);
    }

}