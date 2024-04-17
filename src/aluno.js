class Aluno {
    constructor(nome_aluno, data_nascimento, cpf_aluno, rg_aluno, sexo, endereco, telefone, matricula, id_turma, nome_pais, cpf_pais, certidao_nascimento, comprovante_residencia) {
      this.nome_aluno = nome_aluno;
      this.data_nascimento = data_nascimento;
      this.cpf_aluno = cpf_aluno;
      this.rg_aluno = rg_aluno;
      this.sexo = sexo;
      this.endereco = endereco;
      this.telefone = telefone;
      this.matricula = matricula;
      this.id_turma = id_turma;
      this.nome_pais = nome_pais;
      this.cpf_pais = cpf_pais;
      this.certidao_nascimento = certidao_nascimento;
      this.comprovante_residencia = comprovante_residencia;
    }

    
  get nome_aluno() {
      return this._nome_aluno;
  }

  get data_nascimento() {
      return this._data_nascimento;
  }

  get cpf() {
      return this._cpf;
  }

  get rg() {
      return this._rg;
  }

  get sexo() {
      return this._sexo;
  }

  get endereco() {
      return this._endereco;
  }

  get telefone() {
      return this._telefone;
  }

  get matricula() {
      return this._matricula;
  }

  get id_turma() {
      return this._id_turma;
  }

  get nome_pais() {
      return this._nome_pais;
  }

  get cpf_pais() {
      return this._cpf_pais;
  }

  get certidao_nascimento() {
      return this._certidao_nascimento;
  }

  get comprovante_residencia() {
      return this._comprovante_residencia;
  }

  set nome_aluno(value) {
      this._nome_aluno = value;
  }

  set data_nascimento(value) {
      this._data_nascimento = value;
  }

  set cpf(value) {
      this._cpf = value;
  }

  set rg(value) {
      this._rg = value;
  }

  set sexo(value) {
      this._sexo = value;
  }

  set endereco(value) {
      this._endereco = value;
  }

  set telefone(value) {
      this._telefone = value;
  }

  set matricula(value) {
      this._matricula = value;
  }

  set id_turma(value) {
      this._id_turma = value;
  }

  set nome_pais(value) {
      this._nome_pais = value;
  }

  set cpf_pais(value) {
      this._cpf_pais = value;
  }

  set certidao_nascimento(value) {
      this._certidao_nascimento = value;
  }

  set comprovante_residencia(value) {
      this._comprovante_residencia = value;
  }

  adicionarAluno(){
    //ainda vou fazer a função
  }
  verDadosAluno(){
    //ainda vou fazer a função
  }
  }

  module.exports = Aluno;