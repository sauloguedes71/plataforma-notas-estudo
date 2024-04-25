const Materia = require('../src/classes/materia');
const Conexao = require('../src/conexao');

// Mock para Conexao
jest.mock('../src/conexao');

// Espionar console.error para evitar logs durante os testes
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
});

describe('Materia', () => {
  let materia;

  beforeEach(() => {
    // Limpa todos os mocks antes de cada teste
    Conexao.mockClear();

    materia = new Materia(
      1,
      'Matemática',
      1
    );
  });

  it('deve consultar as matérias', async () => {
    // Mock para o método conectar
    Conexao.prototype.conectar.mockImplementationOnce(() => {});

    // Mock para o método query com retorno de sucesso
    Conexao.prototype.query.mockImplementationOnce((sql, callback) => {
      callback(null, [{ id_materia: 1, nome_materia: 'Matemática', id_professor: 1 }]);
    });

    const resultados = await materia.verMaterias();

    expect(resultados).toEqual([{ id_materia: 1, nome_materia: 'Matemática', id_professor: 1 }]);
    expect(Conexao.prototype.query).toHaveBeenCalledTimes(1); // Garantindo que seja chamado apenas uma vez
  });

  it('deve adicionar uma matéria', async () => {

    Conexao.prototype.query.mockClear();
    // Mock para o método conectar
    Conexao.prototype.conectar.mockImplementationOnce(() => {});

    // Mock para o método query com retorno de sucesso
    Conexao.prototype.query.mockImplementationOnce((sql, valores, callback) => {
      callback(null, { insertId: 1 });
    });

    const id = await materia.adicioanarMateria();

    expect(id).toBe(1);
    expect(Conexao.prototype.query).toHaveBeenCalledTimes(1); // Garantindo que seja chamado apenas uma vez
  });

  it('deve lidar com erros ao consultar matérias', async () => {
    // Mock para o método conectar
    Conexao.prototype.conectar.mockImplementationOnce(() => {});

    // Mock para o método query com retorno de erro
    Conexao.prototype.query.mockImplementationOnce((sql, callback) => {
      callback(new Error('Erro no banco de dados'));
    });

    await expect(materia.verMaterias()).rejects.toThrow('Erro no banco de dados');
  });

  it('deve lidar com erros ao adicionar matéria', async () => {
    // Mock para o método conectar
    Conexao.prototype.conectar.mockImplementationOnce(() => {});

    // Mock para o método query com retorno de erro
    Conexao.prototype.query.mockImplementationOnce((sql, valores, callback) => {
      callback(new Error('Erro no banco de dados'));
    });

    await expect(materia.adicioanarMateria()).rejects.toThrow('Erro no banco de dados');
  });
});