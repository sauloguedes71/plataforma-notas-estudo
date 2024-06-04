const { PrismaClient } = require('@prisma/client');
const Professor = require('../../src/model/professor');

jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    professor: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
  };
  return {
    PrismaClient: jest.fn(() => mPrismaClient),
  };
});

describe('Professor', () => {
  let prisma;
  let professor;

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    prisma = new PrismaClient();
  });

  beforeEach(() => {
    professor = new Professor(
      null, 
      'João Silva', 
      '2000-01-01', 
      '123.456.789-00', 
      'MG-12.345.678', 
      'Rua A, 123', 
      '(11) 1234-5678', 
      '(11) 91234-5678', 
      'joao.silva@gmail.com', 
      'Doutorado', 
      'USP', 
      'Curso de Especialização em Educação', 
      'Matemática e Física', 
      '2000-01-01', 
      40, 
      ['Matemática', 'Física'], 
      'Segunda a Sexta, 08:00 - 12:00'
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('adicionarProfessor - adiciona um novo professor', async () => {
    const mockNovoProfessor = { id_professor: 1 };
    prisma.professor.create.mockResolvedValue(mockNovoProfessor);

    const result = await professor.adicionarProfessor();

    expect(result).toBe(1);
    expect(prisma.professor.create).toHaveBeenCalledWith({
      data: {
        nome_professor: professor.nome_professor,
        data_nascimento: professor.data_nascimento,
        cpf: professor.cpf,
        rg: professor.rg,
        endereco_residencial: professor.endereco_residencial,
        telefone_fixo: professor.telefone_fixo,
        telefone_celular: professor.telefone_celular,
        email: professor.email,
        nivel_formacao: professor.nivel_formacao,
        instituicao_formacao: professor.instituicao_formacao,
        cursos_complementares: professor.cursos_complementares,
        areas_especializacao: professor.areas_especializacao,
        data_admissao: professor.data_admissao,
        carga_horaria: professor.carga_horaria,
        disciplinas_lecionadas: professor.disciplinas_lecionadas,
        horario_trabalho: professor.horario_trabalho,
      },
    });
  });

  test('adicionarProfessor - lança um erro ao adicionar um novo professor', async () => {
    const errorMessage = 'Erro ao adicionar professor';
    prisma.professor.create.mockRejectedValue(new Error(errorMessage));

    await expect(professor.adicionarProfessor()).rejects.toThrow(errorMessage);

    expect(prisma.professor.create).toHaveBeenCalledWith({
      data: {
        nome_professor: professor.nome_professor,
        data_nascimento: professor.data_nascimento,
        cpf: professor.cpf,
        rg: professor.rg,
        endereco_residencial: professor.endereco_residencial,
        telefone_fixo: professor.telefone_fixo,
        telefone_celular: professor.telefone_celular,
        email: professor.email,
        nivel_formacao: professor.nivel_formacao,
        instituicao_formacao: professor.instituicao_formacao,
        cursos_complementares: professor.cursos_complementares,
        areas_especializacao: professor.areas_especializacao,
        data_admissao: professor.data_admissao,
        carga_horaria: professor.carga_horaria,
        disciplinas_lecionadas: professor.disciplinas_lecionadas,
        horario_trabalho: professor.horario_trabalho,
      },
    });
  });

  test('verProfessores - retorna professores', async () => {
    const mockProfessores = [
      { nome_professor: 'João Silva', id_professor: 1 },
      { nome_professor: 'Maria Silva', id_professor: 2 },
    ];
    prisma.professor.findMany.mockResolvedValue(mockProfessores);

    const result = await professor.verProfessores();

    expect(result).toEqual(mockProfessores);
    expect(prisma.professor.findMany).toHaveBeenCalledTimes(1);
  });

  test('verProfessores - lança um erro ao consultar professores', async () => {
    const errorMessage = 'Erro ao consultar';
    prisma.professor.findMany.mockRejectedValue(new Error(errorMessage));

    await expect(professor.verProfessores()).rejects.toThrow(errorMessage);

    expect(prisma.professor.findMany).toHaveBeenCalledTimes(1);
  });
});
