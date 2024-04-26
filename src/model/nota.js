const Conexao = require('../conexao')

class nota {
    constructor(id_nota, id_materia, n_matricula, nota, data_nota) {
        this.id_materia = id_materia
        this.id_nota = id_nota
        this.n_matricula = n_matricula
        this.nota = nota
        this.data_nota = data_nota
        this.conexao = new Conexao()
    }
    //adc nota do aluno ao banco de dados
     async adicionarNota() { 
        this.conexao.conectar()
        
        const sql = `isert into (N_matricula, id_materia, nota, data_nota) values (?, ?, ?, ?)`
        const valores = [
            this.n_matricula,
            this.id_materia,
            this.nota,
            this.data_nota
        ]
        
        return new Promise((resolve, reject) => {
            this.conexao.query(sql, valores, (err, resultado) => {        
                if (err) {
                    console.error('Erro ao adicionar nota:', err);
                    reject(err);
                    return;
                }
                console.log('nota adicionada com sucesso. ID:', resultado.insertId);
      
                this.conexao.fecharConexao(); 
      
                resolve(resultado.insertId);
            });
          });

    }
    
    // altera a nota no banco de dados 
    mudarNota() { 
        this.conexao.conectar();

        const sql = `UPDATE nota SET nota = ? WHERE id_materia = ? AND N_matricula = ?`;
        const valores = [
            this.nota,
            this.id_materia,
            this.n_matricula
        ];
    
        return new Promise((resolve, reject) => {
            this.conexao.query(sql, valores, (err, resultado) => {
                if (err) {
                    console.error('Erro ao atualizar nota:', err);
                    reject(err);
                    return;
                }
    
                if (resultado.affectedRows > 0) {
                    console.log('Nota atualizada com sucesso.');
                    this.conexao.fecharConexao();
                    resolve(true);
                } else {
                    console.log('Nenhuma nota encontrada para atualizar.');
                    this.conexao.fecharConexao();
                    resolve(false);
                }
            });
        }); 
    }

    //consultar notas de materias no banco de dados 
    async verNotas(materia){
        this.conexao.conectar()

        const sql = `SELECT * FROM nota WHERE id_materia LIKE ?`
        const valor = [`%${materia}%`]

        return new Promise((resolve, reject) => {
            this.conexao.query(sql, valor, (err, resultados) => {            
                if (err) {
                    console.error('Erro ao consultar notas:', err);
                    reject(err);
                    return;
                }
    
                this.conexao.fecharConexao();
                
                resolve(resultados);
            });
        });
    }
}