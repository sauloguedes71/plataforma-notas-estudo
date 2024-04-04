const PlataformaNotasEstudo = require('./plataforma_notas_estudo');

function testeAdicionarNota() {
  const plataforma = new PlataformaNotasEstudo();
  plataforma.adicionarNota('Matemática', 'Fórmulas de geometria.');
  plataforma.adicionarNota('História', 'Eventos importantes do século XX.');
  // Verifica se as notas foram adicionadas corretamente
  return plataforma.notas.length === 2 && plataforma.notas[0].titulo === 'Matemática' && plataforma.notas[1].titulo === 'História';
}

function testeRemoverNota() {
  const plataforma = new PlataformaNotasEstudo();
  plataforma.adicionarNota('Biologia', 'Ciclo de vida das plantas.');
  plataforma.adicionarNota('Química', 'Tabela periódica dos elementos.');
  plataforma.removerNota('Biologia');
  // Verifica se a nota 'Biologia' foi removida corretamente
  return plataforma.notas.length === 1 && plataforma.notas[0].titulo === 'Química';
}

function testeVisualizarNota() {
  const plataforma = new PlataformaNotasEstudo();
  plataforma.adicionarNota('Geografia', 'Capitais de países da América do Sul.');
  plataforma.adicionarNota('Literatura', 'Principais obras de Machado de Assis.');
  // Verifica se é possível visualizar o conteúdo das notas corretamente
  return plataforma.visualizarNota('Literatura') === 'Principais obras de Machado de Assis.' &&
         plataforma.visualizarNota('Geografia') === 'Capitais de países da América do Sul.' &&
         plataforma.visualizarNota('Matemática') === 'Nota não encontrada.';
}

console.log("Teste adicionar nota:", testeAdicionarNota() ? "Passou" : "Falhou");
console.log("Teste remover nota:", testeRemoverNota() ? "Passou" : "Falhou");
console.log("Teste visualizar nota:", testeVisualizarNota() ? "Passou" : "Falhou");
