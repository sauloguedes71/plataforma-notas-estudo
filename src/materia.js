class Materia {
    constructor(id_materia, nome_materia, id_professor) {
      this.id_materia = id_materia
      this.nome_materia = nome_materia;     
      this.id_professor = id_professor
    }
    getIdMateria(){
      return this.id_materia
    }

    getNomeMateria(){
      return this.nome_materia
    }

    getIdProfessor(){
      return this.id_professor
    }

    setIdMaterias(id_materia){
      this.id_materia = id_materia
    }

    setNomeMateria(nome_materia){
      this.nome_materia = nome_materia
    }

    setIdProfessor(id_professor){
      this.id_professor = id_professor
    }

    verMateria(){
      //ainda vou fazer a função
    }

    adicioanarMateria(){ //ainda vou fazer a função
      const nome = 0
      const id_professor = 0
    }
  }
  module.exports = Materia;