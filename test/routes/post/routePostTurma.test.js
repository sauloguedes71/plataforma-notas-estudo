// turma.test.js
const request = require('supertest');
const {app, fecharServidor} = require('../../../controller/app.js'); 
const Turma = require('../../../src/model/turma');

jest.mock('../../../src/model/turma');

afterAll(async () => {
    await fecharServidor(); 
    jest.resetAllMocks();
});

describe('POST /turmas', () => {
  it('deve adicionar uma nova turma', async () => {
    const mockTurma = 1;
    Turma.mockImplementationOnce(() => {
      return {
        adicionarTurma: jest.fn().mockResolvedValue(mockTurma)
      };
    });

    const response = await request(app)
      .post('/turmas')
      .send({ nome_turma: 'Turma 1' });

    // Verifique se a resposta está correta
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: 1 });
  });
});
