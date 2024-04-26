const Professor = require('./professor'); // Atualize o caminho conforme necessário

// Crie uma instância da classe Professor com dados válidos
const novoProfessor = new Professor(
    null, // id_professor
    'João Silva',
    '1990-01-01',
    '123.456.789-00',
    '9876543',
    'Rua das Flores, 123',
    '11223344',
    '554499887766',
    'joao@email.com',
    'Graduação',
    'Universidade XYZ',
    'Curso de Programação',
    'Tecnologia',
    '2022-01-01',
    '40 horas',
    'Matemática',
    'Segunda a Sexta, 08:00 - 18:00'
);

// Adicione o professor ao banco de dados e trate os erros
novoProfessor.adiconarProfessor()
    .then((id) => {
        console.log(`Professor adicionado com sucesso! ID: ${id}`);
    })
    .catch((err) => {
        if (err.code === 'ER_DUP_ENTRY') {
            console.error('Erro ao adicionar professor: CPF duplicado.');
        } else {
            console.error('Erro ao adicionar professor:', err.message);
        }
        process.exit(1); // Termina a execução do processo com erro
    })

