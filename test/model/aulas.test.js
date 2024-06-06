const { PrismaClient } = require('@prisma/client');
const Aulas = require('../../src/model/aulas');

jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    aulas: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  };
  return {
    PrismaClient: jest.fn(() => mPrismaClient),
  };
});

describe('Aulas', () => {
  let prisma;
  let aulas;

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    prisma = new PrismaClient();
  });

  beforeEach(() => {
    aulas = new Aulas(
      1,
      '2024-06-06',
      '08:00:00',
      '10:00:00',
      1,
      1
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('adicionarAulas - adiciona uma nova aula', async () => {
    await aulas.adicionarAulas();

    expect(prisma.aulas.create).toHaveBeenCalledWith({
      data: {
        data_aulas: new Date('2024-06-06'),
        horario_inicio: new Date('2024-06-06T08:00:00'),
        horario_termino: new Date('2024-06-06T10:00:00'),
        id_materia: 1,
        id_turma: 1
      },
    });
  });

  test('verAulas - retorna todas as aulas', async () => {
    const mockAulas = [
      {
        id_aula: 1,
        data_aulas: new Date('2024-06-06'),
        horario_inicio: new Date('2024-06-06T08:00:00'),
        horario_termino: new Date('2024-06-06T10:00:00'),
        id_materia: 1,
        id_turma: 1,
      },
      {
        id_aula: 2,
        data_aulas: new Date('2024-06-07'),
        horario_inicio: new Date('2024-06-07T08:00:00'),
        horario_termino: new Date('2024-06-07T10:00:00'),
        id_materia: 1,
        id_turma: 1,
      },
    ];
    prisma.aulas.findMany.mockResolvedValue(mockAulas);

    const result = await aulas.verAulas();

    expect(result).toEqual(mockAulas);
    expect(prisma.aulas.findMany).toHaveBeenCalledTimes(1);
  });
});
