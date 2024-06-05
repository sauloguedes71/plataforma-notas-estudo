// professor.test.js
const request = require('supertest');
const {app, fecharServidor} = require('../../../controller/app.js'); 
const Professor = require('../../../src/model/professor');

jest.mock('../../../src/model/professor');

afterAll(async () => {
    await fecharServidor(); 
    jest.resetAllMocks();
});

describe('GET /professores', () => {
  it('deve retornar todos os professores', async () => {
    const mockProfessores = [{ id_professor: 1, nome_professor: 'João Silva' }];
    Professor.mockImplementationOnce(() => {
      return {
        verProfessores: jest.fn().mockResolvedValue(mockProfessores)
      };
    });

    const response = await request(app).get('/professores');

    // Verifique se a resposta está correta
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockProfessores);
  });
});
