// =====================================================================
// Exercício 1: classe Funcionario com atributos, construtor,
// métodos de acesso (get/set) e toString()
// =====================================================================
class Funcionario {
  // Contador compartilhado por todas as instâncias, usado para gerar IDs únicos.
  static #proximoId = 1;

  // Atributos privados: só podem ser lidos/alterados pelos get/set abaixo.
  #id;
  #nome;
  #idade;
  #cargo;
  #salario;

  constructor(nome, idade, cargo, salario) {
    // Os setters validam cada valor antes de guardá-lo.
    this.nome = nome;
    this.idade = idade;
    this.cargo = cargo;
    this.salario = salario;
    this.#id = Funcionario.#proximoId++;
  }

  // O ID só tem get: é gerado automaticamente e não pode ser alterado.
  get id() {
    return this.#id;
  }

  get nome() {
    return this.#nome;
  }

  set nome(valor) {
    const nome = String(valor).trim();
    if (nome === '') {
      throw new Error('O nome é obrigatório.');
    }
    this.#nome = nome;
  }

  get idade() {
    return this.#idade;
  }

  set idade(valor) {
    const idade = Number(valor);
    if (String(valor).trim() === '' || !Number.isInteger(idade) || idade < 14 || idade > 100) {
      throw new Error('A idade deve ser um número inteiro entre 14 e 100.');
    }
    this.#idade = idade;
  }

  get cargo() {
    return this.#cargo;
  }

  set cargo(valor) {
    const cargo = String(valor).trim();
    if (cargo === '') {
      throw new Error('O cargo é obrigatório.');
    }
    this.#cargo = cargo;
  }

  get salario() {
    return this.#salario;
  }

  set salario(valor) {
    const salario = Number(valor);
    if (String(valor).trim() === '' || !Number.isFinite(salario) || salario < 0) {
      throw new Error('O salário deve ser um número maior ou igual a zero.');
    }
    this.#salario = salario;
  }

  // Salário formatado em reais, ex.: "R$ 5.500,00".
  get salarioFormatado() {
    return this.#salario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  // Exercício 2: atualiza os dados do funcionário usando os setters da classe.
  atualizar(nome, idade, cargo, salario) {
    this.nome = nome;
    this.idade = idade;
    this.cargo = cargo;
    this.salario = salario;
  }

  toString() {
    return `#${this.#id} - ${this.#nome}, ${this.#idade} anos - ${this.#cargo} - ${this.salarioFormatado}`;
  }
}
