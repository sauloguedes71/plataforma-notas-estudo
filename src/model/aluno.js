const Conexao = require('../conexao');
class Aluno {
    constructor(nome_aluno, data_nascimento, cpf_aluno, rg_aluno, sexo, endereco, telefone, matricula, nome_pai, cpf_pai, nome_mae, cpf_mae, certidao_nascimento, id_turma) {
      this.nome_aluno = nome_aluno;
      this.data_nascimento = data_nascimento;
      this.cpf_aluno = cpf_aluno;
      this.rg_aluno = rg_aluno;
      this.sexo = sexo;
      this.endereco = endereco;
      this.telefone = telefone;
      this.matricula = matricula;
      this.nome_pai = nome_pai;
      this.cpf_pai = cpf_pai;
      this.nome_mae = nome_mae
      this.cpf_mae = cpf_mae
      this.certidao_nascimento = certidao_nascimento;   
      this.id_turma = id_turma
      this.conexao = new Conexao()
    }


// adc o aluno ao banco de dados
  async adicionarAluno(){ 
    this.conexao.conectar(); 

    const sql = `INSERT INTO aluno (nome_aluno, data_nascimento, cpf, rg, sexo, endereco, telefone, N_matricula, nome_pai, cpf_pai, nome_mae, cpf_mae, certidao) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) `;

    const valores = [
      this.nome_aluno, this.data_nascimento, this.cpf_aluno, this.rg_aluno, this.sexo,
      this.endereco, this.telefone, this.matricula, this.nome_pai,
      this.cpf_pai, this.nome_mae, this.cpf_mae, this.certidao_nascimento
    ];

    return new Promise((resolve, reject) => {
      this.conexao.query(sql, valores, (err, resultado) => {        
          if (err) {
              console.error('Erro ao adicionar aluno:', err);
              reject(err);
              return;
          }

          this.conexao.fecharConexao(); 

          resolve(resultado.insertId);
      });
    });
  }

// faiz a consulta do aluno pelo nome 
  async consultarAluno(nome) { 
    this.conexao.conectar();

    const sql = `SELECT * FROM aluno WHERE nome_aluno LIKE ?`;
    const valor = [`%${nome}%`];

    return new Promise((resolve, reject) => {
        this.conexao.query(sql, valor, (err, resultados) => {            
            if (err) {
                console.error('Erro ao consultar aluno:', err);
                reject(err);
                return;
            }

            this.conexao.fecharConexao();
            
            resolve(resultados);
        });
    });
  }
}

  module.exports = Aluno;