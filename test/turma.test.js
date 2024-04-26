const Conexao = require('../src/conexao');
const Turma = require('../src/model/turma');

jest.mock('../src/conexao');

beforeAll(() => { //remove msg de erros no console
    jest.spyOn(console, 'error').mockImplementation(() => {});
});
  
  afterAll(() => {
    console.error.mockRestore();
});

describe('Turma', () => {
  let turma;

  beforeEach(() => {
    Conexao.mockClear(); // Limpa todos os mocks antes de cada teste

    // Instanciando uma nova turma com nome de exemplo
    turma = new Turma('Turma A');
  });

  it('deve adicionar uma turma', async () => {
    const mockConectar = jest.fn();
    const mockQuery = jest.fn((sql, valores, callback) => {
      callback(null, { insertId: 1 });
    });

    turma.conexao.conectar = mockConectar;
    turma.conexao.query = mockQuery;

    const id = await turma.adicionarTurma();

    expect(id).toBe(1); // Verifica se o ID retornado é o esperado
    expect(mockConectar).toHaveBeenCalled(); // Verifica se conectar foi chamado
    expect(mockQuery).toHaveBeenCalled(); // Verifica se query foi chamado
  });

  it('deve adicionar um aluno à turma', async () => {
    const mockConectar = jest.fn();
    const mockQuery = jest.fn((sql, valores, callback) => {
      callback(null, {});
    });

    turma.conexao.conectar = mockConectar;
    turma.conexao.query = mockQuery;

    const alunoId = 1;
    await turma.adicionarAlunoTurma(alunoId);

    expect(mockConectar).toHaveBeenCalled(); // Verifica se conectar foi chamado
    expect(mockQuery).toHaveBeenCalled(); // Verifica se query foi chamado
  });

  it('deve remover um aluno da turma', async () => {
    const mockConectar = jest.fn();
    const mockQuery = jest.fn((sql, valores, callback) => {
      callback(null, {});
    });

    turma.conexao.conectar = mockConectar;
    turma.conexao.query = mockQuery;

    const alunoId = 1;
    await turma.removerAlunoTurma(alunoId);

    expect(mockConectar).toHaveBeenCalled(); // Verifica se conectar foi chamado
    expect(mockQuery).toHaveBeenCalled(); // Verifica se query foi chamado
  });

  it('deve ver os alunos da turma', async () => {
    const mockConectar = jest.fn();
    const mockQuery = jest.fn((sql, valores, callback) => {
      callback(null, [{ id_aluno: 1, nome_aluno: 'Fulano' }]);
    });

    turma.conexao.conectar = mockConectar;
    turma.conexao.query = mockQuery;

    const alunos = await turma.verAlunos();

    expect(alunos).toEqual([{ id_aluno: 1, nome_aluno: 'Fulano' }]); // Verifica os resultados
    expect(mockConectar).toHaveBeenCalled(); // Verifica se conectar foi chamado
    expect(mockQuery).toHaveBeenCalled(); // Verifica se query foi chamado
  });

  it('deve lidar com erros ao adicionar uma turma', async () => {
    const mockConectar = jest.fn();
    const mockQuery = jest.fn((sql, valores, callback) => {
      callback(new Error('Erro ao adicionar turma'));
    });

    turma.conexao.conectar = mockConectar;
    turma.conexao.query = mockQuery;

    await expect(turma.adicionarTurma()).rejects.toThrow('Erro ao adicionar turma');
    expect(mockConectar).toHaveBeenCalled(); // Verifica se conectar foi chamado
    expect(mockQuery).toHaveBeenCalled(); // Verifica se query foi chamado
  });

  it('deve lidar com erros ao adicionar um aluno à turma', async () => {
    const mockConectar = jest.fn();
    const mockQuery = jest.fn((sql, valores, callback) => {
      callback(new Error('Erro ao adicionar aluno à turma'));
    });

    turma.conexao.conectar = mockConectar;
    turma.conexao.query = mockQuery;

    const alunoId = 1;
    await expect(turma.adicionarAlunoTurma(alunoId)).rejects.toThrow('Erro ao adicionar aluno à turma');
    expect(mockConectar).toHaveBeenCalled(); // Verifica se conectar foi chamado
    expect(mockQuery).toHaveBeenCalled(); // Verifica se query foi chamado
  });

  it('deve lidar com erros ao remover um aluno da turma', async () => {
    const mockConectar = jest.fn();
    const mockQuery = jest.fn((sql, valores, callback) => {
      callback(new Error('Erro ao remover aluno da turma'));
    });

    turma.conexao.conectar = mockConectar;
    turma.conexao.query = mockQuery;

    const alunoId = 1;
    await expect(turma.removerAlunoTurma(alunoId)).rejects.toThrow('Erro ao remover aluno da turma');
    expect(mockConectar).toHaveBeenCalled(); // Verifica se conectar foi chamado
    expect(mockQuery).toHaveBeenCalled(); // Verifica se query foi chamado
  });

  it('deve lidar com erros ao ver os alunos da turma', async () => {
    const mockConectar = jest.fn();
    const mockQuery = jest.fn((sql, valores, callback) => {
      callback(new Error('Erro ao ver alunos da turma'));
    });

    turma.conexao.conectar = mockConectar;
    turma.conexao.query = mockQuery;

    await expect(turma.verAlunos()).rejects.toThrow('Erro ao ver alunos da turma');
    expect(mockConectar).toHaveBeenCalled(); // Verifica se conectar foi chamado
    expect(mockQuery).toHaveBeenCalled(); // Verifica se query foi chamado
  });
});
