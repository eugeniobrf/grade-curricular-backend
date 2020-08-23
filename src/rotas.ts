import express from 'express';
import cursoController from './controllers/cursoController';
import gradeController from './controllers/gradeController';
import departamentoController from './controllers/departamentoController';
import disciplinaController from './controllers/disciplinaController';
import disciplinaGradeController from './controllers/disciplinaGradeController';
import usuarioController from './controllers/usuarioController';
import suporteController from './controllers/suporteController';

const rotas = express.Router();

//rotas publicas
rotas.get('/curso',cursoController.listarCursos);
rotas.get('/grade/:curso',gradeController.listarGradesPorCurso);
rotas.get('/departamento',departamentoController.listarDepartamentos);
rotas.get('/disciplina/:departamento',disciplinaController.listarDisciplinasPorDeparamento);
rotas.get('/disciplinasGrade/:grade',disciplinaGradeController.listarDisciplinasPorGrade);
rotas.post('/usuario',usuarioController.addUsuario);
rotas.post('/suporte',suporteController.addSuporteSemUsuario);
rotas.get('/login',usuarioController.login);
//rotas de usuarios comuns




//rotas de admins



export default rotas