const express = require('express');
const Faltas = require('../../src/model/faltas');
const router = express.Router();

// Rota para adicionar uma falta
router.post('/', async (req, res) => {
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
  router.get('/', async (req, res) => {
    try {
      const falta = new Faltas();
      const faltas = await falta.visualizarFaltas();
      res.json(faltas);
    } catch (error) {
      res.status(500).json({ error: `Erro ao buscar as faltas: ${error.message}` });
    }
  });
  
  
  // Rota para justificar uma falta
  router.put('/:id_falta/justificar', async (req, res) => {
    const { id_falta } = req.params;
    const { justificativa } = req.body;
  
    try {
      await Faltas.justificarFalta(id_falta, justificativa);
      res.json({ message: `Falta ${id_falta} justificada com sucesso.` });
    } catch (error) {
      res.status(500).json({ error: `Erro ao justificar a falta: ${error.message}` });
    }
  });

  module.exports = router;