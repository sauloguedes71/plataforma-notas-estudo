const { PrismaClient } = require('@prisma/client');
const Nota = require('../../src/model/nota');

jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    nota: {
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  };
  return {
    PrismaClient: jest.fn(() => mPrismaClient),
  };
});

describe('Nota', () => {
  let prisma;
  let nota;

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    prisma = new PrismaClient();
  });

  beforeEach(() => {
    nota = new Nota(
      null, 
      1, 
      1, 
      10, 
      '2000-01-01'
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('adicionarNota - adiciona uma nova nota', async () => {
    const mockNovaNota = { id_nota: 1 };
    prisma.nota.create.mockResolvedValue(mockNovaNota);

    const result = await nota.adicionarNota();

    expect(result).toBe(1);
    expect(prisma.nota.create).toHaveBeenCalledWith({
      data: {
        N_matricula: nota.N_matricula,
        id_materia: nota.id_materia,
        nota: nota.nota,
        data_nota: nota.data_nota,
      },
    });
  });

  test('adicionarNota - lança um erro ao adicionar uma nova nota', async () => {
    const errorMessage = 'Erro ao adicionar nota';
    prisma.nota.create.mockRejectedValue(new Error(errorMessage));

    await expect(nota.adicionarNota()).rejects.toThrow(errorMessage);

    expect(prisma.nota.create).toHaveBeenCalledWith({
      data: {
        N_matricula: nota.N_matricula,
        id_materia: nota.id_materia,
        nota: nota.nota,
        data_nota: nota.data_nota,
      },
    });
  });

  test('mudarNota - atualiza uma nota existente', async () => {
    prisma.nota.update.mockResolvedValue(true);

    const result = await nota.mudarNota();

    expect(result).toBe(true);
    expect(prisma.nota.update).toHaveBeenCalledWith({
      where: {
        id_nota: nota.id_nota,
      },
      data: {
        nota: nota.nota,
      },
    });
  });

  test('mudarNota - lança um erro ao atualizar uma nota', async () => {
    const errorMessage = 'Erro ao atualizar nota';
    prisma.nota.update.mockRejectedValue(new Error(errorMessage));

    await expect(nota.mudarNota()).rejects.toThrow(errorMessage);

    expect(prisma.nota.update).toHaveBeenCalledWith({
      where: {
        id_nota: nota.id_nota,
      },
      data: {
        nota: nota.nota,
      },
    });
  });

  test('verNotas - retorna notas da matéria especificada', async () => {
    const mockNotas = [
      { id_nota: 1, nota: 10 },
      { id_nota: 2, nota: 8 },
    ];
    prisma.nota.findMany.mockResolvedValue(mockNotas);

    const result = await nota.verNotas(1);

    expect(result).toEqual(mockNotas);
    expect(prisma.nota.findMany).toHaveBeenCalledWith({
      where: {
        id_materia: 1,
      },
    });
  });

  test('verNotas - lança um erro ao consultar notas', async () => {
    const errorMessage = 'Erro ao consultar';
    prisma.nota.findMany.mockRejectedValue(new Error(errorMessage));

    await expect(nota.verNotas(1)).rejects.toThrow(errorMessage);

    expect(prisma.nota.findMany).toHaveBeenCalledWith({
      where: {
        id_materia: 1,
      },
    });
  });
});
