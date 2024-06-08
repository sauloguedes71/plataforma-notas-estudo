const express = require('express');
const Professor = require('../../src/model/professor');
const router = express.Router();

// Rotas para Professores
router.post('/', (req, res) => {
    const { id_professor, nome_professor, data_nascimento, cpf, rg, endereco_residencial, telefone_fixo, telefone_celular, email, nivel_formacao, instituicao_formacao, cursos_complementares, areas_especializacao, data_admissao, carga_horaria, disciplinas_lecionadas, horario_trabalho } = req.body;
    const professor = new Professor(id_professor, nome_professor, data_nascimento, cpf, rg, endereco_residencial, telefone_fixo, telefone_celular, email, nivel_formacao, instituicao_formacao, cursos_complementares, areas_especializacao, data_admissao, carga_horaria, disciplinas_lecionadas, horario_trabalho);
    professor.adicionarProfessor()
      .then(id => res.status(201).json({ id }))
      .catch(err => res.status(500).send(err.message));
  });
  
  router.get('/', (req, res) => {
    const professor = new Professor();
    professor.verProfessores()
      .then(professores => res.status(200).json(professores))
      .catch(err => res.status(500).send(err.message));
  });

  module.exports = router;