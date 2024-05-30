const { PrismaClient } = require('@prisma/client');
const Materia = require('../../src/model/materia');

jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    materia: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
  };
  return {
    PrismaClient: jest.fn(() => mPrismaClient),
  };
});


describe('Materia', () => {
  let prisma;
  let materia;

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    prisma = new PrismaClient();
    materia = new Materia();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('verMaterias - retorna uma lista vazia quando não houver matérias', async () => {
    prisma.materia.findMany.mockResolvedValue([]);

    const result = await materia.verMaterias();

    expect(result).toEqual([]);
    expect(prisma.materia.findMany).toHaveBeenCalledTimes(1);
  });

  test('adicionarMateria - adiciona uma nova matéria', async () => {
    const mockNovaMateria = {
      id_materia: 1,
      nome_materia: 'Matemática',
      id_professor: 'id_do_professor',
    };

    prisma.materia.create.mockResolvedValue(mockNovaMateria);

    const result = await materia.adicionarMateria();

    expect(result).toBe(1);
    expect(prisma.materia.create).toHaveBeenCalledWith({
      data: {
        nome_materia: materia.nome_materia,
        id_professor: materia.id_professor,
      },
    });
  });

  test('adicionarMateria - lança um erro ao adicionar uma nova matéria', async () => {
    const errorMessage = 'Erro ao adicionar matéria';
    prisma.materia.create.mockRejectedValue(new Error(errorMessage));

    await expect(materia.adicionarMateria()).rejects.toThrow(errorMessage);

    expect(prisma.materia.create).toHaveBeenCalledWith({
      data: {
        nome_materia: materia.nome_materia,
        id_professor: materia.id_professor,
      },
    });
  });

  test('verMaterias - lança um erro ao consultar o banco de dados', async () => {
    const errorMessage = 'Erro ao consultar';
    prisma.materia.findMany.mockRejectedValue(new Error(errorMessage));

    await expect(materia.verMaterias()).rejects.toThrow(errorMessage);

    expect(prisma.materia.findMany).toHaveBeenCalledTimes(1);
  });
});
