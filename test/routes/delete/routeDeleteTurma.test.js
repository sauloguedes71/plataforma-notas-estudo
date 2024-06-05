// turma.test.js
const request = require('supertest');
const {app, fecharServidor} = require('../../../controller/app.js'); 
const Turma = require('../../../src/model/turma');

jest.mock('../../../src/model/turma');

afterAll(async () => {
    await fecharServidor(); 
    jest.resetAllMocks();
});

describe('DELETE /turmas/:N_matricula', () => {
  it('deve remover um aluno da turma', async () => {
    Turma.mockImplementationOnce(() => {
      return {
        removerAlunoTurma: jest.fn().mockResolvedValue()
      };
    });

    const response = await request(app).delete('/turmas/1');

    // Verifique se a resposta está correta
    expect(response.status).toBe(200);
    expect(response.text).toBe('Aluno removido da turma com sucesso');
  });
});
