// nota.test.js
const request = require('supertest');
const {app, fecharServidor} = require('../../../controller/app.js'); 
const Nota = require('../../../src/model/nota');

jest.mock('../../../src/model/nota');

afterAll(async () => {
    await fecharServidor(); 
    jest.resetAllMocks();
});

describe('PUT /notas', () => {
  it('deve atualizar uma nota existente', async () => {
    Nota.mockImplementationOnce(() => {
      return {
        mudarNota: jest.fn().mockResolvedValue()
      };
    });

    const response = await request(app)
      .put('/notas')
      .send({ id_nota: 1, nota: 10 });

    // Verifique se a resposta está correta
    expect(response.status).toBe(201);
    expect(response.body).toEqual(true);
  });
});
