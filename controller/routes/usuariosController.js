const express = require('express');
const Usuario = require('../../src/model/usuario');
const router = express.Router();

// Rotas para Usuários 
router.post('/login',(req, res) => {
    const { email, senha} = req.body;
    const usuario = new Usuario();
    usuario.login(email, senha)
      .then(user => res.status(200).json(user))
      .catch(err => res.status(500).send(err.message));
  });

  module.exports = router;