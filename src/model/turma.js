const Conexao = require('../conexao')

class Turma {
    constructor(nome_turma){
        this.nome_turma = nome_turma
        this.conexao = new Conexao()
    }

    //adc uma turma ao banco de dados 
    async adicionarTurma(){
        this.conexao.conectar()
        const sql = `insert into turma (nome_turma) value (?);`
        const valor = [this.nome_turma]

        return new Promise((resolve, reject) => {
            this.conexao.query(sql, valor, (err, resultado) => {        
                if (err) {
                    console.error('Erro ao adicionar turma:', err);
                    reject(err);
                    return;
                }               
      
                this.conexao.fecharConexao(); 
      
                resolve(resultado.insertId);
            });
          });

    }

    //ADC um aluno axistente a uma turma existente no banco de dados
    async adicionarAlunoTurma(id_turma, N_matricula){
        this.conexao.conectar();
        const sql = `UPDATE aluno a SET a.id_turma = (SELECT t.id_turma FROM turma t WHERE t.id_turma = ? )  WHERE a.id_turma IS NULL AND a.N_matricula = ?;`;
        const valores = [id_turma, N_matricula];
   
        return new Promise((resolve, reject) => {
            this.conexao.query(sql, valores, (err, resultado) => {
                if (err) {
                    console.error('Erro ao adicionar aluno à turma:', err);
                    reject(err);
                    return;
                }
                this.conexao.fecharConexao();
                resolve();
            });
        });
    }
    // remove a chave estrangeira no banco de dados 
    async removerAlunoTurma(N_matricula){
        this.conexao.conectar();
        const sql = `UPDATE aluno SET id_turma = NULL WHERE N_matricula = ?;`;
        const valor = [N_matricula];

        console.log(sql)
        console.log(valor)

        return new Promise((resolve, reject) => {
            this.conexao.query(sql, valor, (err, resultado) => {
                if (err) {
                    console.error('Erro ao remover aluno da turma:', err);
                    reject(err);
                    return;
                }
                this.conexao.fecharConexao();
                resolve();
            });
        });
    }

    // ver todos os alunos que tem o id_turma correspondente
    async verAlunos(id_turma){
        this.conexao.conectar();
        const sql = `SELECT * FROM aluno WHERE id_turma = ?;`;
        const valor = [id_turma];

        return new Promise((resolve, reject) => {
            this.conexao.query(sql, valor, (err, resultado) => {
                if (err) {
                    console.error('Erro ao buscar alunos da turma:', err);
                    reject(err);
                    return;
                }
                this.conexao.fecharConexao();
                resolve(resultado);
            });
        });
    }
}

module.exports = Turma