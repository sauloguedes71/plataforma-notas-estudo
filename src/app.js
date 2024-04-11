const Materia = require('./materia');
const Aluno = require('./aluno');

// Criando algumas matérias
const matematica = new Materia('Matemática', 'Prof. Thomas', 'Álgebra, geometria, cálculo');
const historia = new Materia('História', 'Prof. Pereira', 'Idade Média, Idade Moderna, Idade Contemporânea');

// Criando um aluno
const aluno1 = new Aluno('Solano');

// Adicionando matérias ao aluno
aluno1.adicionarMateria(matematica);
aluno1.adicionarMateria(historia);

// Adicionando notas
aluno1.adicionarNota('Matemática', 10);
aluno1.adicionarNota('História', 7.0);

// Exibindo as notas do aluno
console.log(`${aluno1.nome} - Notas:`);
aluno1.materias.forEach(materia => {
  console.log(`${materia.nome}: ${materia.nota || 'N/A'}`);
});