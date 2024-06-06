const express = require('express');
const bodyParser = require('body-parser');
const Aluno = require('../src/model/aluno');
const Materia = require('../src/model/materia');
const Nota = require('../src/model/nota');
const Professor = require('../src/model/professor');
const Turma = require('../src/model/turma');
const Usuario = require('../src/model/usuario');
const Faltas = require('../src/model/faltas');
const Aulas = require('../src/model/aulas');

const app = express();

app.use(express.json());

// Middleware para tratamento de erros
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Erro interno do servidor');
}

// Rotas para Alunos
app.post('/alunos', (req, res) => {
  const { N_matricula, id_turma, nome_aluno, data_nascimento, sexo, telefone, cpf, rg, endereco, nome_pai, cpf_pai, nome_mae, cpf_mae, certidao } = req.body;
  const aluno = new Aluno(N_matricula, id_turma, nome_aluno, data_nascimento, sexo, telefone, cpf, rg, endereco, nome_pai, cpf_pai, nome_mae, cpf_mae, certidao);
  aluno.adicionarAluno()
    .then(id => res.status(201).json({ id }))
    .catch(err => res.status(500).send(err.message));
});

app.get('/alunos/:nome', (req, res) => {
  const nome = req.params.nome;
  const aluno = new Aluno();
  aluno.consultarAluno(nome)
    .then(alunos => res.status(200).json(alunos))
    .catch(err => res.status(500).send(err.message));
});

// Rotas para Matérias
app.post('/materias', (req, res) => {
  const { id_materia, id_professor, nome_materia } = req.body;
  const materia = new Materia(id_materia, id_professor, nome_materia);
  materia.adicionarMateria()
    .then(id => res.status(201).json({ id }))
    .catch(err => res.status(500).send(err.message));
});

app.get('/materias', (req, res) => {
  const materia = new Materia();
  materia.verMaterias()
    .then(materias => res.status(200).json(materias))
    .catch(err => res.status(500).send(err.message));
});

// Rotas para Notas 
app.post('/notas',  (req, res) => {
  const { id_nota, N_matricula, id_materia, nota, data_nota } = req.body;
  const  novaNota = new Nota(id_nota, N_matricula, id_materia, nota, data_nota);
  novaNota.adicionarNota()
    .then(id => res.status(201).json({ id }))
    .catch(err => res.status(500).send(err.message));
});

app.put('/notas', (req, res) => {
  const { id_nota, nota } = req.body;
  const notaatualizada = new Nota(id_nota, null, null, nota, null); 
  notaatualizada.mudarNota()
  .then(id => res.status(201).json(true))
  .catch(err => res.status(500).send(err.message));
});

app.get('/notas/:materia', (req, res) => {
  const id_materia = req.params.materia;
  const nota = new Nota();
  nota.verNotas(id_materia)
    .then(notas => res.status(200).json(notas))
    .catch(err => res.status(500).send(err.message));
});


// Rotas para Professores
app.post('/professores', (req, res) => {
  const { id_professor, nome_professor, data_nascimento, cpf, rg, endereco_residencial, telefone_fixo, telefone_celular, email, nivel_formacao, instituicao_formacao, cursos_complementares, areas_especializacao, data_admissao, carga_horaria, disciplinas_lecionadas, horario_trabalho } = req.body;
  const professor = new Professor(id_professor, nome_professor, data_nascimento, cpf, rg, endereco_residencial, telefone_fixo, telefone_celular, email, nivel_formacao, instituicao_formacao, cursos_complementares, areas_especializacao, data_admissao, carga_horaria, disciplinas_lecionadas, horario_trabalho);
  professor.adicionarProfessor()
    .then(id => res.status(201).json({ id }))
    .catch(err => res.status(500).send(err.message));
});

app.get('/professores', (req, res) => {
  const professor = new Professor();
  professor.verProfessores()
    .then(professores => res.status(200).json(professores))
    .catch(err => res.status(500).send(err.message));
});

// Rotas para Turmas
app.post('/turmas', (req, res) => {
  const { nome_turma } = req.body;
  const turma = new Turma(nome_turma);
  turma.adicionarTurma()
    .then(id => res.status(201).json({ id }))
    .catch(err => res.status(500).send(err.message));
});

app.post('/turmas/:id/alunos', (req, res) => {
  const  id_turma  = parseInt(req.params.id);
  const { N_matricula } = req.body;
  const turma = new Turma();
  turma.adicionarAlunoTurma(id_turma, N_matricula)
    .then(() => res.status(200).send('Aluno adicionado à turma com sucesso'))
    .catch(err => res.status(500).send(err.message));
});

app.delete('/turmas/:N_matricula', (req, res) => {
  const N_matricula  = parseInt(req.params.N_matricula);
  const turma = new Turma();
  turma.removerAlunoTurma(N_matricula)
    .then(() => res.status(200).send('Aluno removido da turma com sucesso'))
    .catch(err => res.status(500).send(err.message));
});

app.get('/turmas/:id/alunos', (req, res) => {
  const id_turma = parseInt(req.params.id);
  const turma = new Turma();
  turma.verAlunos(id_turma)
    .then(alunos => res.status(200).json(alunos))
    .catch(err => res.status(500).send(err.message));
});

// Rotas para Usuários 
app.post('/login',(req, res) => {
  const { email, senha} = req.body;
  const usuario = new Usuario();
  usuario.login(email, senha)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).send(err.message));
});


// Middleware para lidar com erros
app.use(errorHandler);

const PORTA = 3000;
const servidor = app.listen(PORTA, () => {
  console.log(`Servidor Express rodando na porta ${PORTA}`);
});


function fecharServidor() {
  return new Promise((resolve, reject) => {
    servidor.close((err) => {
      if (err) {
        return reject(err);
      }
      resolve(); 
    });
  });
}

// Rota para adicionar uma falta
app.post('/faltas', async (req, res) => {
  const { id_falta, N_matricula, id_aula, data_falta, justificativa } = req.body;
  
  const falta = new Faltas(id_falta, N_matricula, id_aula, data_falta, justificativa);

  try {
    await falta.adicionarFalta();
    res.status(201).json({ message: `Falta  adicionada com sucesso.` });
  } catch (error) {
    res.status(500).json({ error: `Erro ao adicionar a falta: ${error.message}` });
  }
});

// Rota para visualizar todas as faltas
app.get('/faltas', async (req, res) => {
  try {
    const falta = new Faltas();
    const faltas = await falta.visualizarFaltas();
    res.json(faltas);
  } catch (error) {
    res.status(500).json({ error: `Erro ao buscar as faltas: ${error.message}` });
  }
});


// Rota para justificar uma falta
app.put('/faltas/:id_falta/justificar', async (req, res) => {
  const { id_falta } = req.params;
  const { justificativa } = req.body;

  try {
    await Faltas.justificarFalta(id_falta, justificativa);
    res.json({ message: `Falta ${id_falta} justificada com sucesso.` });
  } catch (error) {
    res.status(500).json({ error: `Erro ao justificar a falta: ${error.message}` });
  }
});

app.post('/aulas', async (req, res) => {
  const { id_aula, data_aulas, horario_inicio, horario_termino, id_materia, id_turma } = req.body;
  const aula = new Aulas(id_aula, data_aulas, horario_inicio, horario_termino, id_materia, id_turma);
  try {
    await aula.adicionarAulas();
    res.status(201).json({ message: `Aula adicionada com sucesso.` });
  } catch (error) {
    res.status(500).json({ error: `Erro ao adicionar a aula: ${error.message}` });
  }
});

app.get('/aulas', async (req, res) => {
  try {
    const aula = new Aulas();
    const aulas = await aula.verAulas();
    res.json(aulas);
  } catch (error) {
    res.status(500).json({ error: `Erro ao buscar as aulas: ${error.message}` });
  }
});



module.exports = { app, fecharServidor };