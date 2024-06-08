const express = require('express');
const Nota = require('../../src/model/nota');
const router = express.Router();

// Rotas para Notas 
router.post('/',  (req, res) => {
    const { id_nota, N_matricula, id_materia, nota, data_nota } = req.body;
    const  novaNota = new Nota(id_nota, N_matricula, id_materia, nota, data_nota);
    novaNota.adicionarNota()
      .then(id => res.status(201).json({ id }))
      .catch(err => res.status(500).send(err.message));
  });
  
  router.put('/', (req, res) => {
    const { id_nota, nota } = req.body;
    const notaatualizada = new Nota(id_nota, null, null, nota, null); 
    notaatualizada.mudarNota()
    .then(id => res.status(201).json(true))
    .catch(err => res.status(500).send(err.message));
  });
  
  router.get('/:materia', (req, res) => {
    const id_materia = req.params.materia;
    const nota = new Nota();
    nota.verNotas(id_materia)
      .then(notas => res.status(200).json(notas))
      .catch(err => res.status(500).send(err.message));
  });
  

  module.exports = router;