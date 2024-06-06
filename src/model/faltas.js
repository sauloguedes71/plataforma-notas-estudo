const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class Faltas {
  constructor(id_falta, N_matricula, id_aula, data_falta, justificativa) {
    this.id_falta = id_falta;
    this.N_matricula = N_matricula;
    this.id_aula = id_aula;
    this.data_falta = new Date(data_falta);
    this.justificativa = justificativa;
  }

  // Método para adicionar faltas
    async adicionarFalta() {
    try {
      await prisma.faltas.create({
        data: {
          N_matricula: this.N_matricula,
          id_aula: this.id_aula,
          data_faltas: this.data_falta,
          justificativa: this.justificativa,
        },
      });
      console.log(`Falta adicionada com sucesso.`);
    } catch (error) {
      console.error(`Erro ao adicionar a falta: ${error}`);
      throw error;
    }
  }

  // Método para visualizar faltas
  async visualizarFaltas() {
    try {
        const faltas = await prisma.faltas.findMany();
        return faltas;
    } catch (error) {
        console.error('Erro ao consultar professores:', error);
        throw error;
    }
}

  // Método para justificar faltas
  async justificarFalta(id_falta, justificativa) {
    try {
      await prisma.faltas.update({
        where: { id_falta },
        data: { justificativa },
      });
      console.log(`Falta ${id_falta} justificada com sucesso.`);
    } catch (error) {
      console.error(`Erro ao justificar a falta: ${error}`);
      throw error;
    }
  }  
}

module.exports = Faltas;
