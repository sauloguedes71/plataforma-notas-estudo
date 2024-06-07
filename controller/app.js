const express = require('express');
const bodyParser = require('body-parser');

const alunosRoutes = require('./routes/alunos');
const materiasRoutes = require('./routes/materias');
const notasRoutes = require('./routes/notas');
const professoresRoutes = require('./routes/professores');
const turmasRoutes = require('./routes/turmas');
const usuariosRoutes = require('./routes/usuarios');
const faltasRoutes = require('./routes/faltas');
const aulasRoutes = require('./routes/aulas');

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