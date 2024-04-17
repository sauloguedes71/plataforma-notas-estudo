class nota {
    constructor(id_nota, id_materia, n_matricula, nota) {
        this.id_materia = id_materia
        this.id_nota = id_nota
        this.n_matricula = n_matricula
        this.nota = nota
    }
    getIdNotas() {
        return this.id_notas;
    }

    getIdMateria() {
        return this.id_materia;
    }

    getNumeroMatricula() {
        return this.Numero_matricula;
    }

    getNota() {
        return this.nota;
    }

    
    setIdNotas(id_notas) {
        this.id_notas = id_notas;
    }

    setIdMateria(id_materia) {
        this.id_materia = id_materia;
    }

    setNumeroMatricula(Numero_matricula) {
        this.Numero_matricula = Numero_matricula;
    }

    setNota(nota) {
        this.nota = nota;
    }

     adicionarNota() { //ainda vou fazer a função
        const idMateria = 0
        const nMatricula = 0
        const nota = 0
        
    }
    mudarNota() { //ainda vou fazer a função
        const idMateria = 0
        const nMatricula = 0
        const nota = 0 
    }
    verNotas(){
        //ainda vou fazer a função
    }
}