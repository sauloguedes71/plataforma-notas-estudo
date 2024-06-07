const express = require('express');
const Materia = require('../../src/model/materia');
const router = express.Router();

// Rotas para Matérias
router.post('/', (req, res) => {
    const { id_materia, id_professor, nome_materia } = req.body;
    const materia = new Materia(id_materia, id_professor, nome_materia);
    materia.adicionarMateria()
      .then(id => res.status(201).json({ id }))
      .catch(err => res.status(500).send(err.message));
  });
  
  router.get('/', (req, res) => {
    const materia = new Materia();
    materia.verMaterias()
      .then(materias => res.status(200).json(materias))
      .catch(err => res.status(500).send(err.message));
  });

  module.exports = router;