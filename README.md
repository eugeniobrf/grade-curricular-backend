# Grade Curricular Interativa (backend)

Visando atender alunos a organizar melhor sua vida acadêmica, o sistema Grade Curricular Interativa visa permitir que estudantes de diversos cursos possam organizar sua progressão na graduação.

Para isto, foi desenvolvido em nodeJS e armazenado neste repositório o backend desta aplicação, contendo os seguintes endpoints, divididos em endpoints públicos, os quais qualquer pessoa pode acessar, endpoints privados para usuários logados e endpoints privados para usuários logados como admin. Segue abaixo a descrição para cada um deles:


## EndPoints públicos



*   **[x] cadastrar usuário:**
    *   Tipo: POST
    *   Rota: /usuario
    *   Parâmetro: body contendo json com os campos {nome, matricula, email, curso, senha, grade}
    *   Retorno: Dados do usuário criado {nome, matricula, email, curso, grade}
*   **[x] login:**
    *   Tipo: POST
    *   Rota: /login
    *   Parâmetro: body contendo json com os campos {matricula,senha}
    *   Retorno: Dados básicos do usuário logado no body: {nome, matricula, email, curso, grade} e token gerado no header: {Token}
*   **[x] criar suporte anônimo:**
    *   Tipo: POST
    *   Rota: /suporteAnonimo
    *   Parâmetro: body contendo json com o campo {descricao}
    *   Retorno: Dados do suporte criado {codigo,descricao}
*   **[x] listar cursos:**
    *   Tipo: GET
    *   Rota: /cursos
    *   Parâmetro: não tem
    *   Retorno: [ {curso}, ...]
*   **[x] listar grades por curso:**
    *   Tipo: GET
    *   Rota: /grades/:curso
    *   Parâmetro: curso na rota é o nome do curso do qual se deseja listar as grades
    *   Retorno: [ {codigo, ano, horasObrigatorias, horasEletivas, horasComplementares, horasAtividadesEletivas, numPeriodos},...] 
*   **[x] listar departamentos:**
    *   Tipo: GET
    *   Rota: /departamento
    *   Parâmetro: não tem
    *   Retorno: [ {codigo,nome}, ...]
*   **[x] listar disciplinas por departamento**:
    *   Tipo: GET
    *   Rota: /disciplina/:departamento
    *   Parâmetro: departamento na rota é o código do departamento do qual se deseja listar as disciplinas
    *   Retorno: [ {codigo,nome,cargaHoraria}, ...]
*   **[x] detalhar grade:**
    *   Tipo: GET
    *   Rota: /detalharGrade/:grade
    *   Parâmetro: grade na rota é o código da grade da qual se deseja listar as disciplinas
    *   Retorno: { obrigatorias: [{codigo, nome, cargaHoraria, periodo}, ...], eletivas:  [{codigo, nome, cargaHoraria, periodo}, ...], horasObrigatorias, horasEletivas, horasComplementares }
*   **[+-] esqueci a senha: **
    *   Tipo: GET
    *   Rota: /detalharGrade/:grade
    *   Parâmetro: grade na rota é o código da grade da qual se deseja listar as disciplinas
    *   Retorno: { obrigatorias: [{codigo, nome, cargaHoraria, periodo}, ...], eletivas:  [{codigo, nome, cargaHoraria, periodo}, ...], horasObrigatorias, horasEletivas, horasComplementares }
    *   


## Endpoints que apenas usuários logados podem acessar (passando o token no campo token do header da requisição):



*   **[x] editar usuário:**
    *   Tipo: PUT
    *   Rota: /usuario
    *   Parâmetro: body contendo json com os campos {nome, matricula, email, curso, grade}, sendo todos opcionais, ou seja, pode se passar apenas um desses campos 
    *   Retorno: Dados do usuário editado {nome, matricula, email, curso, grade}
*   **[x] mudar senha usuário:**
    *   Tipo: PUT
    *   Rota: /senhaUsuario
    *   Parâmetro: body contendo json com os campos {senhaAntiga, senhaNova}
    *   Retorno:  Dados do usuário editado {nome, matricula, email, curso, grade}
*   **[x] excluir usuário:**
    *   Tipo: DELETE
    *   Rota: /usuario
    *   Parâmetro: body contendo json com o campo {senha}
    *   Retorno: nenhum
*   **[x] criar suporte:**
    *   Tipo: POST
    *   Rota: /suporte
    *   Parâmetro: body contendo json com o campo {descricao}
    *   Retorno: Dados do suporte criado {codigo,descricao}
*   **[x] listar suportes criados pelo usuário:**
    *   Tipo: GET
    *   Rota: /suporte
    *   Parâmetro: nenhum
    *   Retorno: Dados dos suportes criados  [{codigo,descricao,status},...]
*   **[x] atualizar disciplinas cursadas:**
    *   Tipo: GET
    *   Rota: /disciplinaCursada
    *   Parâmetro: body contendo {remover: [“disciplina1”,”disciplina2”,...], adicionar: [“disciplina3”,”disciplina4”,...]} sendo que pode-se passar apenas remover ou apenas adicionar
    *   Retorno: nenhum
*   **[x] detalhar grade:**
    *   Tipo: GET
    *   Rota: /detalhaGrade/:codigo
    *   Parâmetro: codigo na rota é o código da grade a qual se deseja comparar com as matérias feitas
    *   Retorno: body contendo os dados da grade: {numPeriodos, obrigatorias: [{codigo, nome, cargaHoraria, periodo, cursada},...], eletivas: [{codigo, nome, cargaHoraria},...], complementares: [{codigo, nome, cargaHoraria}, ...], horasObrigatorias, horasEletivas, horasComplementares}