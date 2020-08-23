import {Request, Response} from 'express'
import crudBanco from '../database/crudBanco';

export default class disciplinaGradeController{
    static async listarDisciplinasPorGrade(request: Request, response: Response){
        let {grade} = request.params;
        const colunas = ['codigo', 'nome','cargaHoraria','periodo'];
        const resultObrigatoria = await crudBanco.listar('disciplinasGrade',colunas,'disciplina',{'disciplina.codigo':'disciplinasGrade.disciplina'},{grade,'tipo':0},['periodo']);
        const statusObrigatoria = resultObrigatoria.status;
        const selectObrigadoria = resultObrigatoria.select;
        const resultEletiva = await crudBanco.listar('disciplinasGrade',colunas,'disciplina',{'disciplina.codigo':'disciplinasGrade.disciplina'},{grade,'tipo':1},['periodo']);
        const statusEletiva = resultEletiva.status;
        const selectEletiva = resultEletiva.select;
        const select = {"obrigatorias":{},"eletivas":{}};
        let status;
        if(statusObrigatoria===200 && statusEletiva===200){
            select.eletivas=selectEletiva;
            select.obrigatorias=selectObrigadoria;
            status=200;
        }else{
            status=500;
        }
        response.status(status).json(select);
    }
}