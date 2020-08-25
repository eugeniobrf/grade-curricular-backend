import {Request, Response} from 'express';
import crudBanco from '../database/crudBanco';

export default class atividadeEletivaController{
    static async addAtividadeEletiva(request: Request, response: Response){
        const {nome,descricao,horas} = request.body;
        if(!(nome && descricao && horas)){
            return response.status(400).json();
        }else{
            const usuario = response.locals.matricula;
            const {inserido,status} = await crudBanco.adicionar('atividadeEletiva',{usuario,nome,descricao,horas},['codigo','nome','descricao','horas']);
            return response.status(status).json(inserido);
        }
    }
    static async listarAtividadesEletivas(request: Request, response: Response){
        const usuario = response.locals.matricula;
        let {select,status} = await crudBanco.listar('atividadeEletiva',['codigo','nome','descricao','horas'],'',{},{usuario});
        return response.status(status).json(select);
    }
    static async editarAtividadeEletiva(request: Request, response: Response){
        const usuario = response.locals.matricula;
        const {codigo} = request.params;
        const {nome,descricao,horas} = request.body;
        if(!(nome || descricao || horas)){
            return response.status(400).json();
        }
        let editar = <any>{};
        if(nome){
            editar.nome=nome;
        }
        if(descricao){
            editar.descricao=descricao;
        }
        if(horas){
            editar.horas=horas;
        }
        let {editado,status} = await crudBanco.editar('atividadeEletiva',{usuario,codigo},editar,['codigo','nome','descricao','horas']);
        return response.status(status).json(editado);
    }
    static async excluirAtividadeEletiva(request: Request, response: Response){
        const usuario = response.locals.matricula;
        const {codigo} = request.params;
        let status = await crudBanco.delete('atividadeEletiva',{codigo,usuario});
        return response.status(status).json();
    }
}