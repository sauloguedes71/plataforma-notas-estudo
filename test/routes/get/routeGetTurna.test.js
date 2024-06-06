// turma.test.js
const request = require('supertest');
const {app, fecharServidor} = require('../../../routes/app.js'); 
const Turma = require('../../../src/model/turma');

jest.mock('../../../src/model/turma');

afterAll(async () => {
    await fecharServidor(); 
    jest.resetAllMocks();
});

describe('GET /turmas/:id/alunos', () => {
  it('deve retornar alunos da turma especificada', async () => {
    const mockAlunos = [{ N_matricula: 1, nome_aluno: 'João Silva' }];
    Turma.mockImplementationOnce(() => {
      return {
        verAlunos: jest.fn().mockResolvedValue(mockAlunos)
      };
    });

    const response = await request(app).get('/turmas/1/alunos');

    // Verifique se a resposta está correta
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockAlunos);
  });
});
