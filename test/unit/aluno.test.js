const Aluno = require('../../src/model/aluno');
const Conexao = require('../../src/conexao'); 

// Mock para Conexao
jest.mock('../../src/conexao');

beforeAll(() => { //remove msg de erros no console
    jest.spyOn(console, 'error').mockImplementation(() => {});
});
  
  afterAll(() => {
    console.error.mockRestore();
});
  
describe('Aluno', () => {
  let aluno;

  beforeEach(() => {
    // Limpa todos os mocks antes de cada teste
    Conexao.mockClear();

    aluno = new Aluno(
      'Fulano de Tal',
      '1990-01-01',
      '12345678901',
      '1234567',
      'M',
      'Rua Teste, 123',
      '123456789',
      'M12345',
      'Pai do Fulano',
      '12345678900',
      'Mãe do Fulano',
      '09876543210',
      '123456',
      1
    );
  });

  it('deve adicionar um aluno', async () => {
    // Mock para o método conectar
    Conexao.prototype.conectar.mockImplementationOnce(() => {});

    // Mock para o método query com retorno de sucesso
    Conexao.prototype.query.mockImplementationOnce((sql, valores, callback) => {
      callback(null, { insertId: 1 });
    });

    const id = await aluno.adicionarAluno();

    expect(id).toBe(1);
    expect(Conexao.prototype.query).toHaveBeenCalledTimes(1);
  });

  it('deve consultar alunos pelo nome', async () => {
    const nome = 'Fulano';

    Conexao.prototype.query.mockClear();

    // Mock para o método conectar
    Conexao.prototype.conectar.mockImplementationOnce(() => {});

    // Mock para o método query com retorno de sucesso
    Conexao.prototype.query.mockImplementationOnce((sql, valor, callback) => {
      callback(null, [{ nome_aluno: 'Fulano de Tal', id: 1 }]);
    });

    const resultados = await aluno.consultarAluno(nome);

    expect(resultados).toEqual([{ nome_aluno: 'Fulano de Tal', id: 1 }]);
    expect(Conexao.prototype.query).toHaveBeenCalledTimes(1);
  });

  it('deve lidar com erros ao adicionar aluno', async () => {
    // Mock para o método conectar
    Conexao.prototype.conectar.mockImplementationOnce(() => {});

    // Mock para o método query com retorno de erro
    Conexao.prototype.query.mockImplementationOnce((sql, valores, callback) => {
      callback(new Error('Erro no banco de dados'));
    });

    await expect(aluno.adicionarAluno()).rejects.toThrow('Erro no banco de dados');
  });

  it('deve lidar com erros ao consultar aluno', async () => {
    const nome = 'Fulano';

    // Mock para o método conectar
    Conexao.prototype.conectar.mockImplementationOnce(() => {});

    // Mock para o método query com retorno de erro
    Conexao.prototype.query.mockImplementationOnce((sql, valor, callback) => {
      callback(new Error('Erro no banco de dados'));
    });

    await expect(aluno.consultarAluno(nome)).rejects.toThrow('Erro no banco de dados');
  });
});
