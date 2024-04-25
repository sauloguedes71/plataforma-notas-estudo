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
      if (err) throw err
       console.log('Conectado ao banco de dados MySQL')
    });
  }

  fecharConexao() {
    this.conexao.end((err) => {
      if (err) throw err;
      console.log('Conexão com o banco de dados fechada');
  });
  }

  query(sql, valores, callback) {
    this.conexao.query(sql, valores, callback);
}
}

module.exports = Conexao;
