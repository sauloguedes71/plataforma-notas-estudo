// nota.test.js
const request = require('supertest');
const {app, fecharServidor} = require('../../../controller/app.js'); 
const Nota = require('../../../src/model/nota');

jest.mock('../../../src/model/nota');

afterAll(async () => {
    await fecharServidor(); 
    jest.resetAllMocks();
});

describe('GET /notas/:materia', () => {
  it('deve retornar notas da matéria especificada', async () => {
    const mockNotas = [{ id_nota: 1, nota: 10 }];
    Nota.mockImplementationOnce(() => {
      return {
        verNotas: jest.fn().mockResolvedValue(mockNotas)
      };
    });

    const response = await request(app).get('/notas/1');

    // Verifique se a resposta está correta
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockNotas);
  });
});
