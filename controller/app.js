const express = require('express');
const bodyParser = require('body-parser');

const alunosRoutes = require('./routes/alunosController');
const materiasRoutes = require('./routes/materiasController');
const notasRoutes = require('./routes/notasController');
const professoresRoutes = require('./routes/professoresController');
const turmasRoutes = require('./routes/turmasController');
const usuariosRoutes = require('./routes/usuariosController');
const faltasRoutes = require('./routes/faltasController');
const aulasRoutes = require('./routes/aulasController');

const app = express();

app.use(express.json());

// Middleware para tratamento de erros
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Erro interno do servidor');
}

// Usar rotas separadas
app.use('/alunos', alunosRoutes);
app.use('/materias', materiasRoutes);
app.use('/notas', notasRoutes);
app.use('/professores', professoresRoutes);
app.use('/turmas', turmasRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/faltas', faltasRoutes);
app.use('/aulas', aulasRoutes);

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

module.exports = { app, fecharServidor };