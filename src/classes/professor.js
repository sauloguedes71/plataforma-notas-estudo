const Conexao = require('../conexao')
class Professor {
    constructor(id_professor, nome_professor, data_nascimento_professor, cpf_professor, rg_professor, endereco_professor, telefone_fixo_professor, telefone_professor, email_professor, nivel_formacao, instituicao_formacao, cursos_complementares, areas_especializacao, data_admissao, carga_horaria, disciplinas_lecionadas, horario_trabalho){
        this.id_professor = id_professor;
        this.nome_professor = nome_professor;
        this.data_nascimento_professor = data_nascimento_professor;
        this.cpf_professor = cpf_professor;
        this.rg_professor = rg_professor;
        this.endereco_professor = endereco_professor;
        this.telefone_fixo_professor = telefone_fixo_professor;
        this.telefone_professor = telefone_professor;
        this.email_professor = email_professor;
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
    adiconarProfessor(){
        this.conexao.conectar()

        const sql = `insert into professor (nome_professor, data_nascimento, cpf, rg, endereco_residencial, telefone_fixo, telefone_celular, email, nivel_formacao, instituicao_formacao, cursos_complementares, areas_especializacao, data_admissao, carga_horaria, disciplinas_lecionadas, horario_trabalho) values ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)` 
        const valores = [
            this.nome_professor,
            this.cpf_professor,
            this.data_nascimento_professor,
            this.rg_professor,
            this.endereco_professor,
            this.telefone_fixo_professor,
            this.telefone_professor,
            this.email_professor,
            this.nivel_formacao,
            this.instituicao_formacao,
            this.cursos_complementares,
            this.areas_especializacao,
            this.data_admissao,
            this.carga_horaria,
            this.disciplinas_lecionadas,
            this.horario_trabalho,
        ]

        return new Promise((resolve, reject) => {
            this.conexao.query(sql, valores, (err, resultado) => {        
                if (err) {
                    console.error('Erro ao adicionar professor:', err);
                    reject(err);
                    return;
                }
                console.log('professor adicionado com sucesso. ID:', resultado.insertId);
      
                this.conexao.fecharConexao(); 
      
                resolve(resultado.insertId);
            });
          });
    }


}

module.exports = Professor