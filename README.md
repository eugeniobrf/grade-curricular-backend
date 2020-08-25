# Grade Curricular Interativa (backend)

Visando atender alunos a organizar melhor sua vida acadêmica, o sistema Grade Curricular Interativa visa permitir que estudantes de diversos cursos possam organizar sua progressão na graduação.

Para isto, foi desenvolvido em nodeJS e armazenado neste repositório o backend desta aplicação, contendo os seguintes endpoints, divididos em endpoints públicos, os quais qualquer pessoa pode acessar, endpoints privados para usuários logados e endpoints privados para usuários logados como admin. Segue abaixo a descrição para cada um deles:


## EndPoints públicos



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
*   **[x] criar usuário:**
    *   Tipo: POST
    *   Rota: /usuario
    *   Parâmetro: body contendo json com os campos {nome, matricula, email, curso, senha, grade}
    *   Retorno: Dados do usuário criado {nome, matricula, email, curso, grade}
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
*   **[x] listar disciplinas de uma grade:**
    *   Tipo: GET
    *   Rota: /disciplinasGrade/:grade
    *   Parâmetro: grade na rota é o código da grade da qual se deseja listar as disciplinas
    *   Retorno: { obrigatorias: [{codigo, nome, cargaHoraria, periodo}, ...], eletivas:  [{codigo, nome, cargaHoraria, periodo}, ...] }
*   **[] esqueci a senha (decidir como vai ser feito):**


## Endpoints que apenas usuários logados podem acessar (passando o token no campo token do header da requisição):



*   **[x] editar usuário:**
    *   Tipo: put
    *   Rota: /usuario
    *   Parâmetro: body contendo json com os campos {nome, matricula, email, curso, grade}, sendo todos opcionais, ou seja, pode se passar apenas um desses campos 
    *   Retorno: Dados do usuário editado {nome, matricula, email, curso, grade}
*   **[x] editar senha usuário:**
    *   Tipo: put
    *   Rota: /senhaUsuario
    *   Parâmetro: body contendo json com os campos {senhaAntiga, senhaNova}
    *   Retorno:  Dados do usuário editado {nome, matricula, email, curso, grade}
*   **[x] excluir usuário:**
    *   Tipo: delete
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
*   **[x] cadastrar atividade eletiva:**
    *   Tipo: POST
    *   Rota: /atividadeEletiva
    *   Parâmetro: body contendo JSON com campos {nome,descricao,horas}
    *   Retorno: body contento os dados da atividade eletiva criada: {codigo, nome, descricao, horas}
*   **[x] listar atividades eletivas cursadas:**
    *   Tipo: GET
    *   Rota: /atividadeEletiva
    *   Parâmetro: nenhum
    *   Retorno: body contento os dados das atividades eletivas cursadas: [{codigo, nome, descricao, horas},...]
*   **[x] editar atividade eletiva:**
    *   Tipo: PUT
    *   Rota: /atividadeEletiva/:codigo
    *   Parâmetro: body contendo os novos dados da atividade eletiva: {nome,descricao,horas} e codigo da rota é o código da disciplina a ser editada
    *   Retorno: body contento os dados da atividades eletiva editada: {codigo, nome, descricao, horas}
*   **[x] excluir atividade eletiva:**
    *   Tipo: DELETE
    *   Rota: /atividadeEletiva/:codigo
    *   Parâmetro: codigo da rota é o código da disciplina a ser editada
    *   Retorno: nenhum
*   **[x] cadastrar disciplina cursada:**
    *   Tipo: POST
    *   Rota: /disciplinaCursada
    *   Parâmetro: body contendo o código da disciplina {disciplina}
    *   Retorno: disciplina cursada cadastrada {disciplina}
*   **[x] excluir disciplina cursada:**
    *   Tipo: DELETE
    *   Rota: /disciplinaCursada
    *   Parâmetro: body contendo o código da disciplina {disciplina}
    *   Retorno: disciplina cursada cadastrada {disciplina}
*   **[x] detalhar grade:**
    *   Tipo: GET
    *   Rota: /grade
    *   Parâmetro: nenhum
    *   Retorno: body contendo os dados da grade: {numPeriodos, obrigatorias: [{codigo, nome, cargaHoraria, periodo, cursada},...], eletivas: [{codigo, nome, cargaHoraria},...], complementares: [{codigo, nome, cargaHoraria}, ...], horasObrigatorias, horasEletivas, horasComplementares, horasAtividadesEletivas }


## Endpoints que apenas usuários logados como admin podem acessar:



*   **[] Criar cursos:**
*   **[] Excluir cursos:**
*   **[] Editar cursos:**
*   **[] Criar departamento:**
*   **[] Editar departamento:**
*   **[] Excluir departamento:**
*   **[] Criar disciplina:**
*   **[] Editar disciplina:**
*   **[] Excluir disciplina:**
*   **[] Adicionar disciplina na grade:**
*   **[] Excluir disciplina da grade:**
*   **[] Editar disciplina na grade (mudar período recomendado, ...):**
*   **[] Criar grade (dados básicos como num períodos, horas obrigatórias, ...):**
*   **[] Editar grade:**