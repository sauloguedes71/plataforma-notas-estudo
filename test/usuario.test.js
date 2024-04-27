const Usuario = require('../src/model/usuario');
const Conexao = require('../src/conexao');

jest.mock('../src/conexao');

beforeAll(() => { //remove msg de erros no console
    jest.spyOn(console, 'error').mockImplementation(() => {});
});
  
  afterAll(() => {
    console.error.mockRestore();
});

describe('Usuario', () => {
  let usuario;

  beforeEach(() => {
    Conexao.mockClear(); // Limpa todos os mocks antes de cada teste

    // Instanciando um novo usuário com informações de exemplo
    usuario = new Usuario('usuario@example.com', 'Usuário Teste', 'senha123', 'admin');
  });

  it('deve realizar login com sucesso', async () => {
    const mockConectar = jest.fn();
    const mockQuery = jest.fn((sql, valores, callback) => {
      callback(null, [{ email: 'usuario@example.com', nome: 'Usuário Teste', permissao: 'admin' }]);
    });

    usuario.conexao.conectar = mockConectar;
    usuario.conexao.query = mockQuery;

    await expect(usuario.login()).resolves.toEqual([{ email: 'usuario@example.com', nome: 'Usuário Teste', permissao: 'admin' }]);
    expect(mockConectar).toHaveBeenCalled(); // Verifica se conectar foi chamado
    expect(mockQuery).toHaveBeenCalled(); // Verifica se query foi chamado
  });

  it('deve falhar ao realizar login com informações incorretas', async () => {
    const mockConectar = jest.fn();
    const mockQuery = jest.fn((sql, valores, callback) => {
      callback(null, []); // Simulando resultado vazio
    });
  
    usuario.conexao.conectar = mockConectar;
    usuario.conexao.query = mockQuery;
  
    try {
      await usuario.login();
      // Se não houver exceção, o teste falhará
      expect(true).toBeFalsy(); // Garante que o teste falhe se não houver exceção
    } catch (error) {
      expect(error).toEqual("Nome de usuário ou senha incorretos.");
      expect(mockConectar).toHaveBeenCalled(); // Verifica se conectar foi chamado
      expect(mockQuery).toHaveBeenCalled(); // Verifica se query foi chamado
    }
  });
  

  it('deve lidar com erros ao realizar login', async () => {
    const mockConectar = jest.fn();
    const mockQuery = jest.fn((sql, valores, callback) => {
      callback(new Error('Erro ao consultar banco de dados')); // Simulando erro no banco de dados
    });

    usuario.conexao.conectar = mockConectar;
    usuario.conexao.query = mockQuery;

    await expect(usuario.login()).rejects.toThrow('Erro ao consultar banco de dados');
    expect(mockConectar).toHaveBeenCalled(); // Verifica se conectar foi chamado
    expect(mockQuery).toHaveBeenCalled(); // Verifica se query foi chamado
  });
});
