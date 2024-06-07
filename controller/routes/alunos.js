const express = require('express');
const Aluno = require('../../src/model/aluno');
const router = express.Router();

// Rotas para Alunos
router.post('/', (req, res) => {
    const { N_matricula, id_turma, nome_aluno, data_nascimento, sexo, telefone, cpf, rg, endereco, nome_pai, cpf_pai, nome_mae, cpf_mae, certidao } = req.body;
    const aluno = new Aluno(N_matricula, id_turma, nome_aluno, data_nascimento, sexo, telefone, cpf, rg, endereco, nome_pai, cpf_pai, nome_mae, cpf_mae, certidao);
    aluno.adicionarAluno()
      .then(id => res.status(201).json({ id }))
      .catch(err => res.status(500).send(err.message));
  });
  
  router.get('/:nome', (req, res) => {
    const nome = req.params.nome;
    const aluno = new Aluno();
    aluno.consultarAluno(nome)
      .then(alunos => res.status(200).json(alunos))
      .catch(err => res.status(500).send(err.message));
  });

  module.exports = router;