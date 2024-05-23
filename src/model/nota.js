const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class Nota {
    constructor(id_nota, N_matricula, id_materia, nota, data_nota) {
        this.id_nota = id_nota;
        this.N_matricula = N_matricula;
        this.id_materia = id_materia;
        this.nota = nota;
        this.data_nota = new Date (data_nota);
    }

    // Adicionar nota do aluno ao banco de dados
    async adicionarNota() {
        try {
            const novaNota = await prisma.nota.create({
                data: {
                    N_matricula: this.N_matricula,
                    id_materia: this.id_materia,
                    nota: this.nota,
                    data_nota: new Date(this.data_nota),
                },
            });
            console.log('Nota adicionada com sucesso. ID:', novaNota.id_nota);
            return novaNota.id_nota;
        } catch (error) {
            console.error('Erro ao adicionar nota:', error);
            throw error;
        }
    }

    // Alterar a nota no banco de dados
    async mudarNota() {
        try {
            const notaAtualizada = await prisma.nota.update({
                where: {
                    id_nota: this.id_nota,
                },
                data: {
                    nota: this.nota,
                },
            });
            console.log('Nota atualizada com sucesso.');
            return true;
        } catch (error) {
            if (error.code === 'P2025') {
                console.log('Nenhuma nota encontrada para atualizar.');
                return false;
            } else {
                console.error('Erro ao atualizar nota:', error);
                throw error;
            }
        }
    }

    // Consultar notas de materias no banco de dados
    async verNotas(id_materia) {
        try {
            const notas = await prisma.nota.findMany({
                where: {
                    id_materia: parseInt(id_materia),
                },
            });
            return notas;
        } catch (error) {
            console.error('Erro ao consultar notas:', error);
            throw error;
        }
    }
}

module.exports = Nota;