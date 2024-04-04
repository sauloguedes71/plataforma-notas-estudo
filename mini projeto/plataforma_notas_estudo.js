class PlataformaNotasEstudo {
  constructor() {
    // Inicializa a lista de notas como vazia
    this.notas = [];
  }

  adicionarNota(titulo, conteudo) {
    // Adiciona uma nova nota à lista de notas
    const nota = { titulo, conteudo };
    this.notas.push(nota);
  }

  removerNota(titulo) {
    // Remove uma nota da lista de notas pelo título
    this.notas = this.notas.filter(nota => nota.titulo !== titulo);
  }

  listarNotas() {
    // Retorna uma lista dos títulos das notas
    return this.notas.map(nota => nota.titulo);
  }

  visualizarNota(titulo) {
    // Busca e retorna o conteúdo de uma nota pelo título
    const notaEncontrada = this.notas.find(nota => nota.titulo === titulo);
    if (notaEncontrada) {
      return notaEncontrada.conteudo;
    } else {
      return "Nota não encontrada.";
    }
  }
}

module.exports = PlataformaNotasEstudo;
