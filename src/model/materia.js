import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient();

export class Materia {
    constructor(id_materia, id_professor, nome_materia) {
        this.id_materia = id_materia;
        this.nome_materia = nome_materia;
        this.id_professor = id_professor;
    }

    async verMaterias() { // ver as materias
        try {
            const materias = await prisma.materia.findMany();
            return materias;
        } catch (err) {
            console.error('Erro ao consultar matéria:', err);
            throw err;
        }
    }

    async adicionarMateria() { // adc matéria ao banco de dados
        try {
            const novaMateria = await prisma.materia.create({
                data: {
                    nome_materia: this.nome_materia,
                    id_professor: this.id_professor,
                },
            });
            return novaMateria.id_materia;
        } catch (err) {
            console.error('Erro ao adicionar matéria:', err);
            throw err;
        }
    }
}


