const Materia = require('../src/materia.js');

describe('Testes da classe Materia', () => {
  it('Deve criar uma nova matéria com sucesso', () => {
    const materia = new Materia('Matemática', 'Prof. Silva', 'Álgebra, geometria, cálculo');
    expect(materia.nome).toBe('Matemática');
    expect(materia.professor).toBe('Prof. Silva');
    expect(materia.conteudo).toBe('Álgebra, geometria, cálculo');
  });
});