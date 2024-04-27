const Conexao = require('../conexao')

class Usuario {
    constructor(email, nome, senha, permissao){
        this.email = email
        this.nome = nome 
        this.senha = senha
        this.permissao = permissao
        this.conexao = new Conexao()
    }

    async login(){ 
        this.conexao.conectar()

        const sql = `select email, nome, permissao from usuario where email = ? and senha = ? `
        const valores = [this.email, this.senha]

        return new Promise((resolve, reject) => {
            this.conexao.query(sql, valores, (err, resultado) => {        
                if (err) {
                    console.error('Erro ao consultar:', err);
                    reject(err);
                    return;
                }               
                if (resultado.length > 0) {
                    console.log("Login bem-sucedido!");
                    resolve(resultado);
                } else {
                    console.log("Nome de usuário ou senha incorretos.");
                    reject("Nome de usuário ou senha incorretos.");
                }
                
                this.conexao.fecharConexao(); 
      
                
            });
        });


    }
    
}

module.exports = Usuario