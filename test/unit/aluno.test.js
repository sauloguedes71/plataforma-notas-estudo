const { PrismaClient } = require('@prisma/client');
const Aluno = require('../../src/model/aluno');

jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    aluno: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
  };
  return {
    PrismaClient: jest.fn(() => mPrismaClient),
  };
});


describe('Aluno', () => {
  let prisma;
  let aluno;

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    prisma = new PrismaClient();
  });

  beforeEach(() => {
    aluno = new Aluno(
      1, 
      'turma1', 
      'João Silva', 
      '2000-01-01', 
      'M', 
      '123456789', 
      '123.456.789-00', 
      'MG-12.345.678', 
      'Rua A, 123', 
      'Pai Silva', 
      '123.456.789-11', 
      'Mãe Silva', 
      '123.456.789-22', 
      'certidao1'
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('adicionarAluno - adiciona um novo aluno', async () => {
    const mockNovoAluno = { N_matricula: 1 };
    prisma.aluno.create.mockResolvedValue(mockNovoAluno);

    const result = await aluno.adicionarAluno();

    expect(result).toBe(1);
    expect(prisma.aluno.create).toHaveBeenCalledWith({
      data: {
        nome_aluno: aluno.nome_aluno,
        data_nascimento: aluno.data_nascimento,
        cpf: aluno.cpf,
        rg: aluno.rg,
        sexo: aluno.sexo,
        endereco: aluno.endereco,
        telefone: aluno.telefone,
        nome_pai: aluno.nome_pai,
        cpf_pai: aluno.cpf_pai,
        nome_mae: aluno.nome_mae,
        cpf_mae: aluno.cpf_mae,
        certidao: aluno.certidao,
        id_turma: aluno.id_turma,
      },
    });
  });

  test('adicionarAluno - lança um erro ao adicionar um novo aluno', async () => {
    const errorMessage = 'Erro ao adicionar aluno';
    prisma.aluno.create.mockRejectedValue(new Error(errorMessage));

    await expect(aluno.adicionarAluno()).rejects.toThrow(errorMessage);

    expect(prisma.aluno.create).toHaveBeenCalledWith({
      data: {
        nome_aluno: aluno.nome_aluno,
        data_nascimento: aluno.data_nascimento,
        cpf: aluno.cpf,
        rg: aluno.rg,
        sexo: aluno.sexo,
        endereco: aluno.endereco,
        telefone: aluno.telefone,
        nome_pai: aluno.nome_pai,
        cpf_pai: aluno.cpf_pai,
        nome_mae: aluno.nome_mae,
        cpf_mae: aluno.cpf_mae,
        certidao: aluno.certidao,
        id_turma: aluno.id_turma,
      },
    });
  });

  test('consultarAluno - retorna alunos com o nome especificado', async () => {
    const mockAlunos = [
      { nome_aluno: 'João Silva', N_matricula: 1 },
      { nome_aluno: 'Maria Silva', N_matricula: 2 },
    ];
    prisma.aluno.findMany.mockResolvedValue(mockAlunos);

    const result = await aluno.consultarAluno('João');

    expect(result).toEqual([{ nome_aluno: 'João Silva', N_matricula: 1 }]);
    expect(prisma.aluno.findMany).toHaveBeenCalledTimes(1);
  });

  test('consultarAluno - lança um erro ao consultar alunos pelo nome', async () => {
    const errorMessage = 'Erro ao consultar';
    prisma.aluno.findMany.mockRejectedValue(new Error(errorMessage));

    await expect(aluno.consultarAluno('João')).rejects.toThrow(errorMessage);

    expect(prisma.aluno.findMany).toHaveBeenCalledTimes(1);
  });
});
