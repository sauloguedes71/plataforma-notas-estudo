// professor.test.js
const request = require('supertest');
const {app, fecharServidor} = require('../../../controller/app.js'); 
const Professor = require('../../../src/model/professor');

jest.mock('../../../src/model/professor');

afterAll(async () => {
    await fecharServidor(); 
    jest.resetAllMocks();
});

describe('POST /professores', () => {
  it('deve adicionar um novo professor', async () => {
    const mockProfessor = 1;
    Professor.mockImplementationOnce(() => {
      return {
        adicionarProfessor: jest.fn().mockResolvedValue(mockProfessor)
      };
    });

    const response = await request(app)
      .post('/professores')
      .send({ id_professor: 1, nome_professor: 'João Silva', data_nascimento: '2000-01-01', cpf: '123.456.789-00', rg: 'MG-12.345.678', endereco_residencial: 'Rua A, 123', telefone_fixo: '(11) 1234-5678', telefone_celular: '(11) 91234-5678', email: 'joao.silva@gmail.com', nivel_formacao: 'Doutorado', instituicao_formacao: 'USP', cursos_complementares: 'Curso de Especialização em Educação', areas_especializacao: 'Matemática e Física', data_admissao: '2000-01-01', carga_horaria: 40, disciplinas_lecionadas: ['Matemática', 'Física'], horario_trabalho: 'Segunda a Sexta, 08:00 - 12:00' });

    // Verifique se a resposta está correta
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: 1 });
  });
});
