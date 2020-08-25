import {Request, Response} from 'express';
import crudBanco from '../database/crudBanco';

export default class disciplinaCursadaController{
    static async cadastrarDisciplinaCursada(request: Request, response: Response){
        const usuario = response.locals.matricula;
        const {disciplina} = request.body;
        if(!disciplina){
            return response.status(400).json();
        }
        let {inserido,status} = await crudBanco.adicionar('disciplinasCursadas',{usuario,disciplina},['disciplina']);
        return response.status(status).json(inserido);
    }
    static async excluirDisciplinaCursada(request: Request, response: Response){
        const usuario = response.locals.matricula;
        const {disciplina} = request.body;
        if(!disciplina){
            return response.status(400).json();
        }
        const status = await crudBanco.delete('disciplinasCursadas',{disciplina,usuario});
        return response.status(status).json();
    }
}