import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient();

export class Turma {
    constructor(nome_turma) {
        this.nome_turma = nome_turma;
    }

    // Adicionar uma turma ao banco de dados
    async adicionarTurma() {
        try {
            const novaTurma = await prisma.turma.create({
                data: {
                    nome_turma: this.nome_turma,
                },
            });
            console.log('Turma adicionada com sucesso. ID:', novaTurma.id_turma);
            return novaTurma.id_turma;
        } catch (error) {
            console.error('Erro ao adicionar turma:', error);
            throw error;
        }
    }

    // Adicionar um aluno existente a uma turma existente no banco de dados
    async adicionarAlunoTurma(id_turma, N_matricula) {
        try {
            const alunoAtualizado = await prisma.aluno.update({
                where: { N_matricula: N_matricula },
                data: { id_turma: id_turma },
            });
            console.log('Aluno adicionado à turma com sucesso.');
            return alunoAtualizado;
        } catch (error) {
            console.error('Erro ao adicionar aluno à turma:', error);
            throw error;
        }
    }

    // Remover a chave estrangeira no banco de dados
    async removerAlunoTurma(N_matricula) {
        try {
            const alunoAtualizado = await prisma.aluno.update({
                where: { N_matricula: N_matricula },
                data: { id_turma: null },
            });
            console.log('Aluno removido da turma com sucesso.');
            return alunoAtualizado;
        } catch (error) {
            console.error('Erro ao remover aluno da turma:', error);
            throw error;
        }
    }

    // Ver todos os alunos que têm o id_turma correspondente
    async verAlunos(id_turma) {
        try {
            const alunos = await prisma.aluno.findMany({
                where: { id_turma: id_turma },
            });
            return alunos;
        } catch (error) {
            console.error('Erro ao buscar alunos da turma:', error);
            throw error;
        }
    }
}

