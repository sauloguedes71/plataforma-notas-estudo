// aluno.test.js
const request = require('supertest');
const {app, fecharServidor} = require('../../../controller/app.js'); 
const Aluno = require('../../../src/model/aluno.js');

jest.mock('../../../src/model/aluno');

afterAll(async () => {
    await fecharServidor(); 
    jest.resetAllMocks();
});

describe('GET /alunos/:nome', () => {
  it('deve retornar alunos com o nome especificado', async () => {
    const mockAlunos = [{ nome_aluno: 'João Silva', N_matricula: 1 }];
    Aluno.mockImplementationOnce(() => {
      return {
        consultarAluno: jest.fn().mockResolvedValue(mockAlunos)
      };
    });

    const response = await request(app)
      .get('/alunos/João');

    // Verifique se a resposta está correta
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockAlunos);
  });
});
