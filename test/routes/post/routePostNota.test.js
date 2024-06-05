// nota.test.js
const request = require('supertest');
const {app, fecharServidor} = require('../../../controller/app.js'); 
const Nota = require('../../../src/model/nota.js');

jest.mock('../../../src/model/nota');

afterAll(async () => {
    await fecharServidor(); 
    jest.resetAllMocks();
});

describe('POST /notas', () => {
  it('deve adicionar uma nova nota', async () => {
    const mockNota = { id: 1 };
    Nota.mockImplementationOnce(() => {
      return {
        adicionarNota: jest.fn().mockResolvedValue(mockNota)
      };
    });

    const response = await request(app)
      .post('/notas')
      .send({ id_nota: 1, N_matricula: 1, id_materia: 1, nota: 10, data_nota: '2000-01-01' });

    // Verifique se a resposta está correta
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: {id: 1} });
  });
});
