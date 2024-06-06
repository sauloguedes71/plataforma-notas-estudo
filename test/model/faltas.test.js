const { PrismaClient } = require('@prisma/client');
const Faltas = require('../../src/model/faltas'); // Supondo que este arquivo esteja na mesma pasta

jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    faltas: {
      create: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
    },
  };
  return {
    PrismaClient: jest.fn(() => mPrismaClient),
  };
});

describe('Faltas', () => {
  let prisma;
  let faltas;

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    prisma = new PrismaClient();
  });

  beforeEach(() => {
    faltas = new Faltas(
      1,
      1,
      1,
      '2024-06-06',
      'Sem justificativa'
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('adicionarFalta - adiciona uma nova falta', async () => {
    await faltas.adicionarFalta();

    expect(prisma.faltas.create).toHaveBeenCalledWith({
      data: {
        N_matricula: 1,
        id_aula: 1,
        data_faltas: new Date('2024-06-06'),
        justificativa: 'Sem justificativa',
      },
    });
  });

  test('visualizarFaltas - retorna todas as faltas', async () => {
    const mockFaltas = [
      { id_falta: 1, N_matricula: 1, id_aula: 1, data_falta: new Date('2024-06-06'), justificativa: 'Sem justificativa' },
      { id_falta: 2, N_matricula: 1, id_aula: 2, data_falta: new Date('2024-06-07'), justificativa: 'Sem justificativa' },
    ];
    prisma.faltas.findMany.mockResolvedValue(mockFaltas);

    const result = await faltas.visualizarFaltas();

    expect(result).toEqual(mockFaltas);
    expect(prisma.faltas.findMany).toHaveBeenCalledTimes(1);
  });

  test('justificarFalta - justifica uma falta existente', async () => {
    await faltas.justificarFalta(1, 'Falta justificada');

    expect(prisma.faltas.update).toHaveBeenCalledWith({
      where: { id_falta: 1 },
      data: { justificativa: 'Falta justificada' },
    });
  });
});
