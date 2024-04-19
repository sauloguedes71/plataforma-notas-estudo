const mysql = require('mysql');

class Conexao {
  constructor() {
    this.conexao = mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'escola'
    });
  }

  conectar() {
    this.conexao.connect((err) => {
      if (err) {
        console.error('Erro ao conectar: ' + err.stack);
        return;
      }
      console.log('Conectado como ID ' + this.conexao.threadId);
      
    });
  }

  fecharConexao() {
    this.conexao.end();
  }
}

module.exports = Conexao;
