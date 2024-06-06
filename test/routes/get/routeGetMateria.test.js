// materia.test.js
const request = require('supertest');
const {app, fecharServidor} = require('../../../controller/app.js'); 
const Materia = require('../../../src/model/materia.js');

jest.mock('../../../src/model/materia');

afterAll(async () => {
    await fecharServidor(); 
    jest.resetAllMocks();
});

describe('GET /materias', () => {
  it('deve retornar todas as matérias', async () => {
    const mockMaterias = [{ id_materia: 1, nome_materia: 'Matemática' }];
    Materia.mockImplementationOnce(() => {
      return {
        verMaterias: jest.fn().mockResolvedValue(mockMaterias)
      };
    });

    const response = await request(app)
      .get('/materias');

    // Verifique se a resposta está correta
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockMaterias);
  });
});
