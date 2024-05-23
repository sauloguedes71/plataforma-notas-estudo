const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class Aluno {
    constructor(N_matricula, id_turma, nome_aluno, data_nascimento, sexo, telefone, cpf, rg, endereco, nome_pai, cpf_pai, nome_mae, cpf_mae, certidao) {
        this.N_matricula = N_matricula;
        this.id_turma = id_turma;
        this.nome_aluno = nome_aluno;
        this.data_nascimento = new Date(data_nascimento);
        this.sexo = sexo;
        this.telefone = telefone;
        this.cpf = cpf;
        this.rg = rg;
        this.endereco = endereco;
        this.nome_pai = nome_pai;
        this.cpf_pai = cpf_pai;
        this.nome_mae = nome_mae;
        this.cpf_mae = cpf_mae;
        this.certidao = certidao;
    }

    // Adicionar o aluno ao banco de dados
    async adicionarAluno() {
        try {
            const novoAluno = await prisma.aluno.create({
                data: {
                    nome_aluno: this.nome_aluno,
                    data_nascimento: this.data_nascimento,
                    cpf: this.cpf,
                    rg: this.rg,
                    sexo: this.sexo,
                    endereco: this.endereco,
                    telefone: this.telefone,
                    nome_pai: this.nome_pai,
                    cpf_pai: this.cpf_pai,
                    nome_mae: this.nome_mae,
                    cpf_mae: this.cpf_mae,
                    certidao: this.certidao,
                    id_turma: this.id_turma,
                },
            });
            console.log('Aluno adicionado com sucesso. ID:', novoAluno.N_matricula);
            return novoAluno.N_matricula;
        } catch (error) {
            console.error('Erro ao adicionar aluno:', error);
            throw error;
        }
    }

    // Consulta do aluno pelo nome
    async consultarAluno(nome) {
      try {
        const alunos = await prisma.aluno.findMany();
        const filteredAlunos = alunos.filter(aluno =>
            aluno.nome_aluno.toLowerCase().includes(nome.toLowerCase())
        );
        return filteredAlunos;
      } 
      catch (error) {
        console.error(error);
        throw error;
      }
}
    }


module.exports = Aluno;