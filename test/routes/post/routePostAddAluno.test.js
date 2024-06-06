// turma.test.js
const request = require('supertest');
const {app, fecharServidor} = require('../../../controller/app.js'); 
const Turma = require('../../../src/model/turma');

jest.mock('../../../src/model/turma');

afterAll(async () => {
    await fecharServidor(); 
    jest.resetAllMocks();
});

describe('POST /turmas/:id/alunos', () => {
  it('deve adicionar um novo aluno à turma', async () => {
    Turma.mockImplementationOnce(() => {
      return {
        adicionarAlunoTurma: jest.fn().mockResolvedValue()
      };
    });

    const response = await request(app)
      .post('/turmas/1/alunos')
      .send({ N_matricula: 1 });

    // Verifique se a resposta está correta
    expect(response.status).toBe(200);
    expect(response.text).toBe('Aluno adicionado à turma com sucesso');
  });
});
