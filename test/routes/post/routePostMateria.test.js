// materia.test.js
const request = require('supertest');
const {app, fecharServidor} = require('../../../routes/app.js'); 
const Materia = require('../../../src/model/materia.js');

jest.mock('../../../src/model/materia');

afterAll(async () => {
    await fecharServidor(); 
    jest.resetAllMocks();
});

describe('POST /materias', () => {
  it('deve adicionar uma nova matéria', async () => {
    const mockMateria = { id: 1 };
    Materia.mockImplementationOnce(() => {
      return {
        adicionarMateria: jest.fn().mockResolvedValue(mockMateria)
      };
    });

    const response = await request(app)
      .post('/materias')
      .send({ id_materia: 1, id_professor: 1, nome_materia: 'Matemática' });

    // Verifique se a resposta está correta
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: {id: 1} });
  });
});
