// =====================================================================
// Exercício 2: classe Aluno com atributos, construtor e métodos
// =====================================================================
class Aluno {
  // Construtor: inicializa os atributos nome, idade, curso e notaFinal.
  constructor(nome, idade, curso, notaFinal) {
    this.nome = String(nome).trim();
    this.idade = Number(idade);
    this.curso = curso;
    this.notaFinal = Number(notaFinal);
  }

  // Retorna true se o aluno foi aprovado (nota final maior ou igual a 7).
  isAprovado() {
    return this.notaFinal >= 7;
  }

  // Retorna os dados do aluno formatados em uma linha de texto.
  toString() {
    const nota = this.notaFinal.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    const situacao = this.isAprovado() ? 'Aprovado' : 'Reprovado';
    return `${this.nome} | ${this.idade} anos | Curso: ${this.curso} | Nota final: ${nota} | ${situacao}`;
  }
}
