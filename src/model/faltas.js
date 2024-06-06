class Falta {
    constructor(id_falta, N_matricula, id_aula, data_falta, justificativa){
        this.id_falta = id_falta;
        this.N_matricula = N_matricula;
        this.id_aula = id_aula;
        this.data_falta = data_falta;
        this.justificativa = justificativa;
    }

    // Método para adicionar faltas
    static async adicionarFalta(falta) {
        try {
            // Aqui você pode adicionar o código para salvar a falta no banco de dados
            // Por exemplo: await db.save(falta);
            console.log(`Falta ${falta.id_falta} adicionada com sucesso.`);
        } catch (error) {
            console.error(`Erro ao adicionar a falta: ${error}`);
        }
    }

    // Método para visualizar faltas
    static async visualizarFaltas() {
        try {
            // Aqui você pode adicionar o código para buscar as faltas no banco de dados
            // Por exemplo: const faltas = await db.getFaltas();
            // E então, imprimir as faltas
            // faltas.forEach(falta => console.log(falta));
        } catch (error) {
            console.error(`Erro ao buscar as faltas: ${error}`);
        }
    }

    // Método para justificar faltas
    static async justificarFalta(id_falta, justificativa) {
        try {
            // Aqui você pode adicionar o código para atualizar a justificativa da falta no banco de dados
            // Por exemplo: await db.updateJustificativa(id_falta, justificativa);
            console.log(`Falta ${id_falta} justificada com sucesso.`);
        } catch (error) {
            console.error(`Erro ao justificar a falta: ${error}`);
        }
    }
}
