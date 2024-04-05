const Aluno = require('../mini_projeto/aluno.js');
const Materia = require('../mini_projeto/materia.js');

describe('Testes da classe Aluno', () => {
  it('Deve criar um novo aluno com sucesso', () => {
    const aluno = new Aluno('João');
    expect(aluno.nome).toBe('João');
    expect(aluno.materias).toEqual([]);
  });

  it('Deve adicionar uma nova matéria ao aluno', () => {
    const aluno = new Aluno('João');
    const materia = new Materia('Matemática', 'Prof. Silva', 'Álgebra, geometria, cálculo');
    aluno.adicionarMateria(materia);
    expect(aluno.materias.length).toBe(1);
    expect(aluno.materias[0]).toBe(materia);
  });

  it('Deve adicionar uma nota a uma matéria do aluno', () => {
    const aluno = new Aluno('João');
    const materia = new Materia('Matemática', 'Prof. Silva', 'Álgebra, geometria, cálculo');
    aluno.adicionarMateria(materia);
    aluno.adicionarNota('Matemática', 8.5);
    expect(aluno.materias[0].nota).toBe(8.5);
  });

});