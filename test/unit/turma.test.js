const { PrismaClient } = require('@prisma/client');
const Turma = require('../../src/model/turma');

jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    turma: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
    aluno: { // Adicionando a propriedade aluno aqui
      findMany: jest.fn(), // Definindo findMany para aluno
      update: jest.fn(),
    },
  };
  return {
    PrismaClient: jest.fn(() => mPrismaClient),
  };
});

beforeAll(() => { //remove msg de erros no console
  jest.spyOn(console, 'error').mockImplementation(() => {});
});
  
afterAll(() => {
  console.error.mockRestore();
});

describe('Turma', () => {
  let prisma;
  let turma;

  beforeEach(() => {
    prisma = new PrismaClient();
    turma = new Turma('Turma A');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('deve adicionar uma turma', async () => {
    prisma.turma.create.mockResolvedValue({ id_turma: 1 });

    const id = await turma.adicionarTurma();

    expect(id).toBe(1); 
    expect(prisma.turma.create).toHaveBeenCalledWith({
      data: {
        nome_turma: 'Turma A',
      },
    });
  });

  test('deve adicionar um aluno à turma', async () => {
    prisma.aluno.update.mockResolvedValue({});

    const alunoId = 1;
    await turma.adicionarAlunoTurma(1, alunoId);

    expect(prisma.aluno.update).toHaveBeenCalledWith({
      where: { N_matricula: alunoId },
      data: { id_turma: 1 },
    });
  });

  test('deve remover um aluno da turma', async () => {
    prisma.aluno.update.mockResolvedValue({});

    const alunoId = 1;
    await turma.removerAlunoTurma(alunoId);

    expect(prisma.aluno.update).toHaveBeenCalledWith({
      where: { N_matricula: alunoId },
      data: { id_turma: null },
    });
  });

  test('deve ver os alunos da turma', async () => {
    const mockAlunos = [{ id_aluno: 1, nome_aluno: 'Fulano' }];
    prisma.aluno.findMany.mockResolvedValue(mockAlunos);

    const alunos = await turma.verAlunos(1);

    expect(alunos).toEqual(mockAlunos); 
    expect(prisma.aluno.findMany).toHaveBeenCalledWith({
      where: { id_turma: 1 },
    });
  });
});
