const Aluno = require('../../src/model/aluno');

beforeAll(() => { //remove msg de erros no console
  jest.spyOn(console, 'error').mockImplementation(() => {});
}); 

describe('Testes da classe Aluno', () => {
    test('Deve adicionar um novo aluno ao banco de dados', async () => {    
        const novoAluno = new Aluno(
            1234567890, 
            1,         
            'João Silva', 
            '2000-01-01',
            'M',          
            '1234567890', 
            '12345678900',
            '1234567',   
            'Rua A, 123', 
            'Pai do João',
            '09876543210',
            'Mãe do João',
            '01234567890',
            '1234567890'  
        );    
        const idAluno = await novoAluno.adicionarAluno();
        expect(typeof idAluno).toBe('number');
    });

    test('Deve lidar com erro ao adicionar aluno', async () => {     
        const alunoInvalido = new Aluno(        
        );
        await expect(alunoInvalido.adicionarAluno()).rejects.toThrow();
    });

    test('Deve consultar um aluno pelo nome', async () => {     
        const aluno = new Aluno();   
        const resultadoConsulta = await aluno.consultarAluno('João');     
        expect(Array.isArray(resultadoConsulta)).toBe(true);
        expect(resultadoConsulta.length).toBeGreaterThan(0);
    });

    test('Deve lidar com erro ao consultar aluno', async () => {
        const aluno = new Aluno();
        await expect(aluno.consultarAluno(null)).rejects.toThrow();
    });
});
