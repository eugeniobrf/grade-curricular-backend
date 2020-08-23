# Grade Curricular Interativa (backend)

Visando atender alunos a organizar melhor sua vida acadêmica, o sistema Grade Curricular Interativa visa permitir que estudantes de diversos cursos possam organizar sua progressão na graduação.

Para isto, foi desenvolvido em nodeJS e armazenado neste repositório o backend desta aplicação, contendo os seguintes endpoints, divididos em endpoints públicos, os quais qualquer pessoa pode acessar, endpoints privados para usuários logados e endpoints privados para usuários logados como admin. Segue abaixo a descrição para cada um deles:


## EndPoints públicos



*   **[x] login:**
    *   Tipo: POST
    *   Rota: /login
    *   Parâmetro: body contendo json com os campos {matricula,senha}
    *   Retorno: Dados básicos do usuário logado e o token criado: {nome, matricula, email, curso, grade, token}
*   **[x] criar suporte anônimo:**
    *   Tipo: POST
    *   Rota: /suporte
    *   Parâmetro: body contendo json com o campo {descricao}
    *   Retorno: Dados do suporte criado {codigo,descricao}
    *   
*   **[x] criar usuário:**
    *   Tipo: POST
    *   Rota: /usuario
    *   Parâmetro: body contendo json com os campos {nome, matricula, email, curso, senha, grade}
    *   Retorno: Dados do usuario criado {nome, matricula, email, curso, grade}
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
*   **[] esqueci a senha (decidir como vai ser):**


## Endpoints que apenas usuários logados podem acessar:



*   **[] editar usuário:**
*   **[] cadastrar atividade eletiva:**
*   **[] editar atividade eletiva:**
*   **[] excluir atividade eletiva:**
*   **[] listar atividades eletivas cursadas (retornar junto horas de atividades eletivas que faltam cursar):**
*   **[] criar suporte:**
*   **[] listar suportes criados:**
*   **[] cadastrar disciplina cursada:**
*   **[] listar disciplinas cursadas:**
*   **[] excluir disciplina cursada:**
*   **[] listar disciplinas obrigatórias com marcação de cursada ou não (retornar junto horas obrigatórias que faltam cursar):**
*   **[] listar disciplinas eletivas cursadas (retornar junto horas eletivas que faltam cursar):**
*   **[] listar disciplinas complementares cursadas (retornar junto horas complementares que faltam cursar):**


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