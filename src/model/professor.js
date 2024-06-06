const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class Professor {
    constructor(id_professor, nome_professor, data_nascimento, cpf, rg, endereco_residencial, telefone_fixo, telefone_celular, email, nivel_formacao, instituicao_formacao, cursos_complementares, areas_especializacao, data_admissao, carga_horaria, disciplinas_lecionadas, horario_trabalho){
        this.id_professor = id_professor;
        this.nome_professor = nome_professor;
        this.data_nascimento = new Date (data_nascimento);
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
        this.data_admissao = new Date (data_admissao);
        this.carga_horaria = carga_horaria;
        this.disciplinas_lecionadas = disciplinas_lecionadas;
        this.horario_trabalho = horario_trabalho;
    }

    async adicionarProfessor() {
        try {
            const novoProfessor = await prisma.professor.create({
                data: {
                    nome_professor: this.nome_professor,
                    data_nascimento: this.data_nascimento,
                    cpf: this.cpf,
                    rg: this.rg,
                    endereco_residencial: this.endereco_residencial,
                    telefone_fixo: this.telefone_fixo,
                    telefone_celular: this.telefone_celular,
                    email: this.email,
                    nivel_formacao: this.nivel_formacao,
                    instituicao_formacao: this.instituicao_formacao,
                    cursos_complementares: this.cursos_complementares,
                    areas_especializacao: this.areas_especializacao,
                    data_admissao: this.data_admissao,
                    carga_horaria: this.carga_horaria,
                    disciplinas_lecionadas: this.disciplinas_lecionadas,
                    horario_trabalho: this.horario_trabalho,
                }
            });
            console.log('Professor adicionado com sucesso. ID:', novoProfessor.id_professor);
            return novoProfessor.id_professor;
        } catch (error) {
            console.error('Erro ao adicionar professor:', error);
            throw error;
        }
    }

    async verProfessores() {
        try {
            const professores = await prisma.professor.findMany();
            return professores;
        } catch (error) {
            console.error('Erro ao consultar professores:', error);
            throw error;
        }
    }
}

module.exports = Professor;
