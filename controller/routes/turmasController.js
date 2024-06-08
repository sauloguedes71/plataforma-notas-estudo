const express = require('express');
const Turma = require('../../src/model/turma');
const router = express.Router();

// Rotas para Turmas
router.post('/', (req, res) => {
    const { nome_turma } = req.body;
    const turma = new Turma(nome_turma);
    turma.adicionarTurma()
      .then(id => res.status(201).json({ id }))
      .catch(err => res.status(500).send(err.message));
  });
  
  router.post('/:id/alunos', (req, res) => {
    const  id_turma  = parseInt(req.params.id);
    const { N_matricula } = req.body;
    const turma = new Turma();
    turma.adicionarAlunoTurma(id_turma, N_matricula)
      .then(() => res.status(200).send('Aluno adicionado à turma com sucesso'))
      .catch(err => res.status(500).send(err.message));
  });
  
  router.delete('/:N_matricula', (req, res) => {
    const N_matricula  = parseInt(req.params.N_matricula);
    const turma = new Turma();
    turma.removerAlunoTurma(N_matricula)
      .then(() => res.status(200).send('Aluno removido da turma com sucesso'))
      .catch(err => res.status(500).send(err.message));
  });
  
  router.get('/:id/alunos', (req, res) => {
    const id_turma = parseInt(req.params.id);
    const turma = new Turma();
    turma.verAlunos(id_turma)
      .then(alunos => res.status(200).json(alunos))
      .catch(err => res.status(500).send(err.message));
  });

  module.exports = router;