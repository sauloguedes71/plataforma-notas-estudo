// login.test.js
const request = require('supertest');
const {app, fecharServidor} = require('../../app.js'); 

// Mock da classe Usuario
jest.mock('../../src/model/usuario', () => {
  return jest.fn().mockImplementation(() => {
    return {
      login: jest.fn().mockResolvedValue({
        email: 'test@example.com',
        nome: 'Test User',
        permissao: 'admin'
      })
    };
  });
});

afterAll(async () => {
    await fecharServidor(); 
    jest.resetAllMocks();
});

describe('POST /login', () => {
  it('deve fazer login como usuário', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'test@example.com', senha: 'password123' });

    // Verifique se a resposta está correta
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      email: 'test@example.com',
      nome: 'Test User',
      permissao: 'admin'
    });
  });

  it('deve lidar com falha de login', async () => {
    // Modificando o mock para simular um erro de login
    require('../../src/model/usuario.js').mockImplementationOnce(() => {
      return {
        login: jest.fn().mockRejectedValue(new Error('Nome de usuário ou senha incorretos.'))
      };
    });

    const response = await request(app)
      .post('/login')
      .send({ email: 'test@example.com', senha: 'password123' });

    // Verifique se a resposta está correta
    expect(response.status).toBe(500);
    expect(response.text).toBe('Nome de usuário ou senha incorretos.');
  });
});
