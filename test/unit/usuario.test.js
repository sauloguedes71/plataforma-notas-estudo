const { PrismaClient } = require('@prisma/client');
const Usuario = require('../../src/model/usuario'); 

jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    usuario: {
      findUnique: jest.fn(),
    },
  };
  return {
    PrismaClient: jest.fn(() => mPrismaClient),
  };
});

beforeAll(() => { //remove msg de erros no console
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

describe('Usuario', () => {
  let prisma;
  let usuario;

  beforeAll(() => {
    prisma = new PrismaClient();
    usuario = new Usuario();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('login bem-sucedido', async () => {
    const mockUser = {
      email: 'teste@exemplo.com',
      nome: 'Teste',
      permissao: 'admin',
    };

    prisma.usuario.findUnique.mockResolvedValue(mockUser);

    const result = await usuario.login('teste@exemplo.com', 'senha123');

    expect(result).toEqual(mockUser);
    expect(prisma.usuario.findUnique).toHaveBeenCalledWith({
      where: {
        email: 'teste@exemplo.com',
        senha: 'senha123',
      },
      select: {
        email: true,
        nome: true,
        permissao: true,
      },
    });
  });

  test('login falhou devido a credenciais incorretas', async () => {
    prisma.usuario.findUnique.mockResolvedValue(null);

    await expect(usuario.login('teste@exemplo.com', 'senha123')).rejects.toThrow(
      'Nome de usuário ou senha incorretos.'
    );

    expect(prisma.usuario.findUnique).toHaveBeenCalledWith({
      where: {
        email: 'teste@exemplo.com',
        senha: 'senha123',
      },
      select: {
        email: true,
        nome: true,
        permissao: true,
      },
    });
  });

  test('erro ao consultar o banco de dados', async () => {
    const errorMessage = 'Erro ao consultar';
    prisma.usuario.findUnique.mockRejectedValue(new Error(errorMessage));

    await expect(usuario.login('teste@exemplo.com', 'senha123')).rejects.toThrow(
      errorMessage
    );

    expect(prisma.usuario.findUnique).toHaveBeenCalledWith({
      where: {
        email: 'teste@exemplo.com',
        senha: 'senha123',
      },
      select: {
        email: true,
        nome: true,
        permissao: true,
      },
    });
  });
});
