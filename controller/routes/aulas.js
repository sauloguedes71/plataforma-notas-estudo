const express = require('express');
const Aulas = require('../../src/model/aulas');
const router = express.Router();

router.post('/', async (req, res) => {
    const { id_aula, data_aulas, horario_inicio, horario_termino, id_materia, id_turma } = req.body;
    const aula = new Aulas(id_aula, data_aulas, horario_inicio, horario_termino, id_materia, id_turma);
    try {
      await aula.adicionarAulas();
      res.status(201).json({ message: `Aula adicionada com sucesso.` });
    } catch (error) {
      res.status(500).json({ error: `Erro ao adicionar a aula: ${error.message}` });
    }
  });
  
  router.get('/', async (req, res) => {
    try {
      const aula = new Aulas();
      const aulas = await aula.verAulas();
      res.json(aulas);
    } catch (error) {
      res.status(500).json({ error: `Erro ao buscar as aulas: ${error.message}` });
    }
  });

  module.exports = router;