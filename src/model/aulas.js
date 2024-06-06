const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class Aulas {
    constructor(id_aula, data_aulas, horario_inicio, horario_termino, id_materia, id_turma) {
        this.id_aula = id_aula;
        this.data_aulas = new Date(data_aulas);
        this.horario_inicio = new Date(`${data_aulas}T${horario_inicio}`);
        this.horario_termino = new Date(`${data_aulas}T${horario_termino}`);        
        this.id_materia = id_materia;
        this.id_turma = id_turma;
    }

    // Método para adicionar aulas
    async adicionarAulas() {
        try {     
            await prisma.aulas.create({
                data: {
                    data_aulas: this.data_aulas,
                    horario_inicio: this.horario_inicio,
                    horario_termino: this.horario_termino,
                    id_materia: this.id_materia,
                    id_turma: this.id_turma
                }
            });           
            console.log(`Aula adicionada com sucesso.`);
        } catch (error) {           
            console.error(`Erro ao adicionar a aula: ${error}`);
            throw error;
        }
    }

    // Método para ver aulas
     async verAulas() {
        try {
            const aulas = await prisma.aulas.findMany();
            console.log(aulas);
            return aulas;
        } catch (error) {
            console.error(`Erro ao buscar as aulas: ${error}`);
            throw error;
        }
    }
}

module.exports = Aulas;
