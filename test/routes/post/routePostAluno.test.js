// aluno.test.js
const request = require('supertest');
const {app, fecharServidor} = require('../../../controller/app.js'); 
const Aluno = require('../../../src/model/aluno.js');

jest.mock('../../../src/model/aluno');

afterAll(async () => {
    await fecharServidor(); 
    jest.resetAllMocks();
});

describe('POST /alunos', () => {
  it('deve adicionar um novo aluno', async () => {
    const mockAluno = { id: 1 };
    Aluno.mockImplementationOnce(() => {
      return {
        adicionarAluno: jest.fn().mockResolvedValue(mockAluno)
      };
    });

    const response = await request(app)
      .post('/alunos')
      .send({ N_matricula: null, id_turma: 1, nome_aluno: 'João Silva', data_nascimento: '2000-01-01', sexo: 'M', telefone: '(11) 1234-5678', cpf: '123.456.789-00', rg: 'MG-12.345.678', endereco: 'Rua A, 123', nome_pai: 'Pai Silva', cpf_pai: '123.456.789-11', nome_mae: 'Mãe Silva', cpf_mae: '123.456.789-22', certidao: 'certidao1' });

    // Verifique se a resposta está correta
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: {id: 1} });
  });
});
