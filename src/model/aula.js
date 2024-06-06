class Aula {
    constructor(id_aula, data, horario_inicio, horario_termino, id_materia, id_turma){
        this.id_aula = id_aula;
        this.data = data;
        this.horario_inicio = horario_inicio;
        this.horario_termino = horario_termino;
        this.id_materia = id_materia;
        this.id_turma = id_turma;
    }

    // Método para adicionar aulas
    static async adicionarAulas(aula) {
        try {
            // Adicionando o código para salvar a aula no banco de dados
            await db.save(aula);
            console.log(`Aula ${aula.id_aula} adicionada com sucesso.`);
        } catch (error) {
            console.error(`Erro ao adicionar a aula: ${error}`);
        }
    }

    // Método para ver aulas
    static async verAulas() {
        try {
            // Adicionando o código para buscar as aulas no banco de dados
            const aulas = await db.getAulas();
            // Imprimindo as aulas
            aulas.forEach(aula => console.log(aula));
        } catch (error) {
            console.error(`Erro ao buscar as aulas: ${error}`);
        }
    }
}
