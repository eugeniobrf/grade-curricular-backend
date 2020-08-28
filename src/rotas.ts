import express from 'express';
import cursoController from './controllers/cursoController';
import gradeController from './controllers/gradeController';
import departamentoController from './controllers/departamentoController';
import disciplinaController from './controllers/disciplinaController';
import usuarioController from './controllers/usuarioController';
import suporteController from './controllers/suporteController';
import disciplinaCursadaController from './controllers/disciplinaCursadaController';
import verificaToken from './middleware/verificaToken';
import verificaTokenEsqueciSenha from './middleware/verificaTokenEsqueciSenha';

const rotas = express.Router();

//rotas publicas
rotas.post('/usuario',usuarioController.addUsuario);
rotas.get('/login',usuarioController.login);
rotas.post('/suporteAnonimo',suporteController.addSuporte);
rotas.get('/curso',cursoController.listarCursos);
rotas.get('/grade/:curso',gradeController.listarGradesPorCurso);
rotas.get('/departamento',departamentoController.listarDepartamentos);
rotas.get('/disciplina/:departamento',disciplinaController.listarDisciplinasPorDeparamento);
rotas.get('/detalhaGrade/:grade',gradeController.detalharGrade);
rotas.get('/esqueciSenha',usuarioController.esqueciSenha);
rotas.get('/esqueciSenha/:token',[verificaTokenEsqueciSenha],usuarioController.esqueciSenhaModificaSenha);

//rotas de usuarios comuns
rotas.put('/usuario',[verificaToken],usuarioController.editarUsuario);
rotas.put('/senhaUsuario',[verificaToken],usuarioController.editarSenhaUsuario);
rotas.delete('/usuario',[verificaToken],usuarioController.excluirUsuario);
rotas.post('/suporte',[verificaToken],suporteController.addSuporte);
rotas.get('/suporte',[verificaToken],suporteController.listarSuportes);
rotas.get('/disciplinaCursada',[verificaToken],disciplinaCursadaController.atualizarDisciplinasCursada);
rotas.get('/detalhaGradeLogado/:grade',[verificaToken],gradeController.detalharGradeAluno);

//rotas de admins



export default rotas