const Conexao = require("./conexao");

class Materia {
    constructor(id_materia, nome_materia, id_professor) {
      this.id_materia = id_materia
      this.nome_materia = nome_materia;     
      this.id_professor = id_professor
      this.conexao = new Conexao()
    }

    async verMateria(){ // ver a materia e seus alunos

    }

     async adicioanarMateria(){ //adc matéria ao banco de dados
      this.conexao.conectar()

      const sql = `insert into materia(nome_materia, id_professor) values ( ?, ?);`
      const valores = [this.nome_materia, this.id_professor]

      return new Promise((resolve, reject) => {
        this.conexao.query(sql, valores, (err, resultado) => {            
            if (err) {
                console.error('Erro ao adcionar matéria:', err);
                reject(err);
                return;
            }

            this.conexao.fecharConexao();
            
            resolve(resultado.insertId);
        })
      })
    }
  }
  module.exports = Materia;