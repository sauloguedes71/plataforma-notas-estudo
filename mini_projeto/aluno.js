class Aluno {
    constructor(nome) {
      this.nome = nome;
      this.materias = [];
    }
  
    adicionarMateria(materia) {
      this.materias.push(materia);
    }
  
    adicionarNota(nomeMateria, nota) {
      const materia = this.materias.find(materia => materia.nome === nomeMateria);
      if (materia) {
        materia.nota = nota;
      } else {
        console.log(`A matéria ${nomeMateria} não foi encontrada.`);
      }
    }
  }

  module.exports = Aluno;