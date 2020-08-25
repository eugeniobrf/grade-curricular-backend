import express from 'express';
import cursoController from './controllers/cursoController';
import gradeController from './controllers/gradeController';
import departamentoController from './controllers/departamentoController';
import disciplinaController from './controllers/disciplinaController';
import disciplinaGradeController from './controllers/disciplinaGradeController';
import usuarioController from './controllers/usuarioController';
import suporteController from './controllers/suporteController';
import verificaToken from './middleware/verificaToken';
import atividadeEletivaController from './controllers/atividadeEletivaController';
import disciplinaCursadaController from './controllers/disciplinaCursadaController';
import detalharGradeController from './controllers/detalharGradeController';


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
rotas.get('/suporte',[verificaToken],suporteController.listarSuportes);
rotas.post('/atividadeEletiva',[verificaToken],atividadeEletivaController.addAtividadeEletiva);
rotas.get('/atividadeEletiva',[verificaToken],atividadeEletivaController.listarAtividadesEletivas);
rotas.put('/atividadeEletiva/:codigo',[verificaToken],atividadeEletivaController.editarAtividadeEletiva);
rotas.delete('/atividadeEletiva/:codigo',[verificaToken],atividadeEletivaController.excluirAtividadeEletiva);
rotas.post('/disciplinaCursada',[verificaToken],disciplinaCursadaController.cadastrarDisciplinaCursada);
rotas.delete('/disciplinaCursada',[verificaToken],disciplinaCursadaController.excluirDisciplinaCursada);
rotas.get('/grade',[verificaToken],detalharGradeController.detalharGradeAluno);


//rotas de admins



export default rotas