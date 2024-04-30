const express = require('express');
const bodyParser = require('body-parser');
const Conexao = require('./src/conexao');
const Aluno = require('./src/model/aluno');
const Materia = require('./src/model/materia');
const Nota = require('./src/model/nota');
const Professor = require('./src/model/professor');
const Turma = require('./src/model/turma');
const Usuario = require('./src/model/usuario');

const app = express();
const conexao = new Conexao();

app.use(bodyParser.json());

// Middleware para tratamento de erros
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Erro interno do servidor');
}

// Rotas para Alunos
app.post('/alunos', (req, res) => {
  const aluno = new Aluno(req.body);
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
  const materia = new Materia(req.body);
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
  const nota = new Nota(req.body);
  nota.adicionarNota()
    .then(id => res.status(201).json({ id }))
    .catch(err => res.status(500).send(err.message));
});

app.get('/notas/:materia', (req, res) => {
  const materia = req.params.materia;
  const nota = new Nota();
  nota.verNotas(materia)
    .then(notas => res.status(200).json(notas))
    .catch(err => res.status(500).send(err.message));
});

// Rotas para Professores
app.post('/professores', (req, res) => {
  const professor = new Professor(req.body);
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
  const turma = new Turma(req.body);
  turma.adicionarTurma()
    .then(id => res.status(201).json({ id }))
    .catch(err => res.status(500).send(err.message));
});

app.post('/turmas/:id/alunos', (req, res) => {
  const { id } = req.params;
  const { alunoId } = req.body;
  const turma = new Turma();
  turma.adicionarAlunoTurma(id, alunoId)
    .then(() => res.status(200).send('Aluno adicionado à turma com sucesso'))
    .catch(err => res.status(500).send(err.message));
});

app.delete('/turmas/:id/alunos/:alunoId', (req, res) => {
  const { id, alunoId } = req.params;
  const turma = new Turma();
  turma.removerAlunoTurma(id, alunoId)
    .then(() => res.status(200).send('Aluno removido da turma com sucesso'))
    .catch(err => res.status(500).send(err.message));
});

app.get('/turmas/:id/alunos', (req, res) => {
  const { id } = req.params;
  const turma = new Turma();
  turma.verAlunos(id)
    .then(alunos => res.status(200).json(alunos))
    .catch(err => res.status(500).send(err.message));
});

// Rotas para Usuários (exemplo de autenticação)
app.post('/login',(req, res) => {
  const { email, senha } = req.body;
  const usuario = new Usuario(email, senha);
  usuario.login()
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).send(err.message));
});


// Middleware para lidar com erros
app.use(errorHandler);

const PORTA = 3000;
app.listen(PORTA, () => {
  console.log(`Servidor Express rodando na porta ${PORTA}`);
});
