const Aluno = require('./aluno');

class TestarAluno {
  static testarInserirAluno() {
    
    const aluno = new Aluno(
      'Solano',
      '2004-10-29',
      '098.750.835-00',
      '1234567',
      'M',
      'Rua São josé, 123',
      '(77) 999530087',
      '20220001',
      'gilvando',
      '987.654.321-00',
      'Arizete',
      '987.654.321-01',
      'Certidão 123'
    );

    // Chamar o método adicionarAluno() para inserir o aluno no banco de dados
    aluno.adicionarAluno();
  }
}

// Chamar a função para testar a inserção de um aluno
TestarAluno.testarInserirAluno()

const aluno = new Aluno();

aluno.consultarAluno('solano', (err, resultados) => {
    if (err) {
        console.error('Erro ao consultar aluno:', err);
        return;
    }

    console.log('Resultados da consulta:', resultados);
});
