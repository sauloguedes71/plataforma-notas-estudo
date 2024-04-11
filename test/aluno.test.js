const Aluno = require('../src/aluno.js');
const Materia = require('../src/materia.js');

describe('Testes da classe Aluno', () => {
  it('Deve criar um novo aluno com sucesso', () => {
    const aluno = new Aluno('Solano');
    expect(aluno.nome).toBe('Solano');
    expect(aluno.materias).toEqual([]);
  });

  it('Deve adicionar uma nova matéria ao aluno', () => {
    const aluno = new Aluno('Solano');
    const materia = new Materia('Matemática', 'Prof. Thomas', 'Álgebra, geometria, cálculo');
    aluno.adicionarMateria(materia);
    expect(aluno.materias.length).toBe(1);
    expect(aluno.materias[0]).toBe(materia);
  });

  it('Deve adicionar uma nota a uma matéria do aluno', () => {
    const aluno = new Aluno('Solano');
    const materia = new Materia('Matemática', 'Prof. Pereira', 'Álgebra, geometria, cálculo');
    aluno.adicionarMateria(materia);
    aluno.adicionarNota('Matemática', 8.5);
    expect(aluno.materias[0].nota).toBe(8.5);
  });

});