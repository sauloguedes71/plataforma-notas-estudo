const Conexao = require('../conexao')
class Professor {
    constructor(id_professor, nome_professor, data_nascimento, cpf, rg, endereco_residencial, telefone_fixo, telefone_celular, email, nivel_formacao, instituicao_formacao, cursos_complementares, areas_especializacao, data_admissao, carga_horaria, disciplinas_lecionadas, horario_trabalho){
        this.id_professor = id_professor;
        this.nome_professor = nome_professor;
        this.data_nascimento = data_nascimento;
        this.cpf = cpf;
        this.rg = rg;
        this.endereco_residencial = endereco_residencial;
        this.telefone_fixo = telefone_fixo;
        this.telefone_celular = telefone_celular;
        this.email = email;
        this.nivel_formacao = nivel_formacao;
        this.instituicao_formacao = instituicao_formacao;
        this.cursos_complementares = cursos_complementares;
        this.areas_especializacao = areas_especializacao;
        this.data_admissao = data_admissao;
        this.carga_horaria = carga_horaria;
        this.disciplinas_lecionadas = disciplinas_lecionadas;
        this.horario_trabalho = horario_trabalho;
        this.conexao = new Conexao()
    }


    //adc professor ao banco de dados
    async adicionarProfessor() {
      this.conexao.conectar();
  
      const sql = `INSERT INTO professor (nome_professor, data_nascimento, cpf, rg, endereco_residencial, telefone_fixo, telefone_celular, email, nivel_formacao, instituicao_formacao, cursos_complementares, areas_especializacao, data_admissao, carga_horaria, disciplinas_lecionadas, horario_trabalho) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
      const valores = [
          this.nome_professor,
          this.data_nascimento,
          this.cpf,
          this.rg,
          this.endereco_residencial,
          this.telefone_fixo,
          this.telefone_celular,
          this.email,
          this.nivel_formacao,
          this.instituicao_formacao,
          this.cursos_complementares,
          this.areas_especializacao,
          this.data_admissao,
          this.carga_horaria,
          this.disciplinas_lecionadas,
          this.horario_trabalho,
      ];
  
      return new Promise((resolve, reject) => {
          this.conexao.query(sql, valores, (err, resultado) => {
              if (err) {
                  console.error('Erro ao adicionar professor:', err);
                  reject(err);
                  return;
              }
              console.log('Professor adicionado com sucesso. ID:', resultado.insertId);
  
              this.conexao.fecharConexao();
  
              resolve(resultado.insertId);
          });
      });
  }


    async verProfessores(){

    this.conexao.conectar()

      const sql = `select * from professor;`

      return new Promise((resolve, reject) => 
        this.conexao.query(sql, (err, resultados) => {
          if (err) {
            console.error('Erro ao consultar professor:', err)
            reject(err)
            return
          }

          this.conexao.fecharConexao();         
          resolve(resultados)
        })
      )     
    }

}

module.exports = Professor