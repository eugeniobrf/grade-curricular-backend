import express from 'express';
import cursoController from './controllers/cursoController';
import gradeController from './controllers/gradeController';
import departamentoController from './controllers/departamentoController';
import disciplinaController from './controllers/disciplinaController';
import disciplinaGradeController from './controllers/disciplinaGradeController';
import usuarioController from './controllers/usuarioController';
import suporteController from './controllers/suporteController';
import verificaToken from './middleware/verificaToken';

const rotas = express.Router();

//rotas publicas
rotas.get('/curso',cursoController.listarCursos);
rotas.get('/grade/:curso',gradeController.listarGradesPorCurso);
rotas.get('/departamento',departamentoController.listarDepartamentos);
rotas.get('/disciplina/:departamento',disciplinaController.listarDisciplinasPorDeparamento);
rotas.get('/disciplinasGrade/:grade',disciplinaGradeController.listarDisciplinasPorGrade);
rotas.post('/usuario',usuarioController.addUsuario);
rotas.post('/suporteAnonimo',suporteController.addSuporte);
rotas.get('/login',usuarioController.login);

//rotas de usuarios comuns
rotas.put('/usuario',[verificaToken],usuarioController.editarUsuario);
rotas.put('/senhaUsuario',[verificaToken],usuarioController.editarSenhaUsuario);
rotas.delete('/usuario',[verificaToken],usuarioController.excluirUsuario);
rotas.post('/suporte',[verificaToken],suporteController.addSuporte);

// cadastrar atividade eletiva:
// editar atividade eletiva:
// excluir atividade eletiva:
// listar atividades eletivas cursadas (retornar junto horas de atividades eletivas que faltam cursar):
// criar suporte:
// listar suportes criados:
// cadastrar disciplina cursada:
// listar disciplinas cursadas:
// excluir disciplina cursada:
// listar disciplinas obrigatórias com marcação de cursada ou não (retornar junto horas obrigatórias que faltam cursar):
// listar disciplinas eletivas cursadas (retornar junto horas eletivas que faltam cursar):
// listar disciplinas complementares cursadas (retornar junto horas complementares que faltam cursar):





//rotas de admins



export default rotas