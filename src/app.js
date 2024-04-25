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

const aluno = new Aluno(); // Criando um objeto Aluno

// Executando o método consultarAluno sem filtrar por nome
aluno.consultarAluno('').then(alunosConsultados => {
    // Exibindo os resultados da consulta
    console.log('Todos os alunos cadastrados:');
    alunosConsultados.forEach(aluno => {
        console.log(`ID: ${aluno.id_aluno}, Nome: ${aluno.nome_aluno}, Data de Nascimento: ${aluno.data_nascimento}, CPF: ${aluno.cpf}, RG: ${aluno.rg}, Sexo: ${aluno.sexo}, Endereço: ${aluno.endereco}, Telefone: ${aluno.telefone}, Matrícula: ${aluno.N_matricula}, Nome do Pai: ${aluno.nome_pai}, CPF do Pai: ${aluno.cpf_pai}, Nome da Mãe: ${aluno.nome_mae}, CPF da Mãe: ${aluno.cpf_mae}, Certidão de Nascimento: ${aluno.certidao}`);
    });
}).catch(error => {
    console.error('Erro ao consultar alunos:', error);
});