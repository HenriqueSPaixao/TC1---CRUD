// =====================================================================
// Exercício 1: dados armazenados em memória (array de objetos Aluno)
// =====================================================================
let alunos = [];

// Aluno que está sendo editado no formulário (null = modo de cadastro).
let alunoEmEdicao = null;

const CURSOS = ['JavaScript', 'Python', 'Java'];

// Elementos da página
const form = document.getElementById('form-aluno');
const tituloForm = document.getElementById('titulo-form');
const campoNome = document.getElementById('nome');
const campoIdade = document.getElementById('idade');
const campoCurso = document.getElementById('curso');
const campoNota = document.getElementById('notaFinal');
const btnCadastrar = document.getElementById('btn-cadastrar');
const btnCancelar = document.getElementById('btn-cancelar');
const corpoTabela = document.getElementById('corpo-tabela');

const relAprovados = document.getElementById('rel-aprovados');
const relMediaNotas = document.getElementById('rel-media-notas');
const relMediaIdades = document.getElementById('rel-media-idades');
const relNomes = document.getElementById('rel-nomes');
const relPorCurso = document.getElementById('rel-por-curso');

// Formata um número no padrão brasileiro (vírgula como separador decimal).
const formatarNumero = (numero, casas) =>
  numero.toLocaleString('pt-BR', { minimumFractionDigits: casas, maximumFractionDigits: casas });

// =====================================================================
// Exercício 3: operações de manipulação dos dados com arrow functions
// =====================================================================
const adicionarAluno = (aluno) => alunos.push(aluno);

const atualizarAluno = (antigo, novo) => {
  alunos = alunos.map((aluno) => (aluno === antigo ? novo : aluno));
};

const removerAluno = (alvo) => {
  alunos = alunos.filter((aluno) => aluno !== alvo);
};

const lerFormulario = () =>
  new Aluno(campoNome.value, campoIdade.value, campoCurso.value, campoNota.value);

const entrarModoEdicao = (aluno) => {
  alunoEmEdicao = aluno;
  campoNome.value = aluno.nome;
  campoIdade.value = aluno.idade;
  campoCurso.value = aluno.curso;
  campoNota.value = aluno.notaFinal;
  tituloForm.textContent = `Editando aluno: ${aluno.nome}`;
  btnCadastrar.textContent = 'Salvar alterações';
  btnCancelar.hidden = false;
  campoNome.focus();
  console.log('Editando aluno:', aluno.toString());
};

const sairModoEdicao = () => {
  alunoEmEdicao = null;
  form.reset();
  tituloForm.textContent = 'Cadastrar aluno';
  btnCadastrar.textContent = 'Cadastrar';
  btnCancelar.hidden = true;
};

// =====================================================================
// Exercício 4: relatórios com filter, map, reduce, sort e forEach
// =====================================================================
const media = (valores) =>
  valores.length === 0 ? 0 : valores.reduce((soma, valor) => soma + valor, 0) / valores.length;

const listarAprovados = () => alunos.filter((aluno) => aluno.isAprovado());

const mediaNotas = () => media(alunos.map((aluno) => aluno.notaFinal));

const mediaIdades = () => media(alunos.map((aluno) => aluno.idade));

const nomesEmOrdemAlfabetica = () =>
  alunos.map((aluno) => aluno.nome).sort((a, b) => a.localeCompare(b, 'pt-BR'));

const quantidadePorCurso = () =>
  alunos.reduce(
    (contagem, aluno) => {
      contagem[aluno.curso] += 1;
      return contagem;
    },
    Object.fromEntries(CURSOS.map((curso) => [curso, 0])) // { JavaScript: 0, Python: 0, Java: 0 }
  );

// =====================================================================
// Renderização (manipulação do DOM)
// =====================================================================

// Preenche uma lista <ul> com textos; mostra uma mensagem se não houver itens.
const preencherLista = (lista, itens, textoSeVazia) => {
  lista.innerHTML = '';
  const textos = itens.length > 0 ? itens : [textoSeVazia];
  textos.forEach((texto) => {
    const item = document.createElement('li');
    item.textContent = texto;
    lista.appendChild(item);
  });
};

const renderizarTabela = () => {
  corpoTabela.innerHTML = '';

  if (alunos.length === 0) {
    const celula = corpoTabela.insertRow().insertCell();
    celula.colSpan = 6;
    celula.textContent = 'Nenhum aluno cadastrado.';
    return;
  }

  alunos.forEach((aluno) => {
    const linha = corpoTabela.insertRow();

    const valores = [
      aluno.nome,
      aluno.idade,
      aluno.curso,
      formatarNumero(aluno.notaFinal, 1),
      aluno.isAprovado() ? 'Aprovado' : 'Reprovado',
    ];
    valores.forEach((valor) => {
      linha.insertCell().textContent = valor;
    });

    const celulaAcoes = linha.insertCell();

    const btnEditar = document.createElement('button');
    btnEditar.type = 'button';
    btnEditar.textContent = 'Editar';
    // Exercício 3: addEventListener com função anônima no botão da tabela
    btnEditar.addEventListener('click', function () {
      entrarModoEdicao(aluno);
    });

    const btnExcluir = document.createElement('button');
    btnExcluir.type = 'button';
    btnExcluir.textContent = 'Excluir';
    // Exercício 3: addEventListener com função anônima no botão da tabela
    btnExcluir.addEventListener('click', function () {
      if (!confirm(`Deseja excluir o aluno "${aluno.nome}"?`)) {
        return;
      }

      removerAluno(aluno);
      if (alunoEmEdicao === aluno) {
        sairModoEdicao();
      }
      atualizarTela();

      console.log('Aluno excluído:', aluno.toString());
      alert(`Aluno "${aluno.nome}" excluído com sucesso!`);
    });

    celulaAcoes.append(btnEditar, ' ', btnExcluir);
  });
};

const renderizarRelatorios = () => {
  const semAlunos = 'Nenhum aluno cadastrado.';

  preencherLista(
    relAprovados,
    listarAprovados().map((aluno) => `${aluno.nome} (nota ${formatarNumero(aluno.notaFinal, 1)})`),
    'Nenhum aluno aprovado.'
  );

  relMediaNotas.textContent = alunos.length > 0 ? formatarNumero(mediaNotas(), 2) : semAlunos;

  relMediaIdades.textContent = alunos.length > 0 ? `${formatarNumero(mediaIdades(), 1)} anos` : semAlunos;

  preencherLista(relNomes, nomesEmOrdemAlfabetica(), semAlunos);

  preencherLista(
    relPorCurso,
    Object.entries(quantidadePorCurso()).map(([curso, quantidade]) => `${curso}: ${quantidade} aluno(s)`),
    semAlunos
  );
};

const atualizarTela = () => {
  renderizarTabela();
  renderizarRelatorios();
};

// =====================================================================
// Exercício 3: eventos dos botões do formulário (addEventListener +
// funções anônimas)
// =====================================================================
btnCadastrar.addEventListener('click', function () {
  // Usa a validação do próprio HTML (required, min, max, step...).
  if (!form.reportValidity()) {
    return;
  }

  const aluno = lerFormulario();
  let mensagem;

  if (alunoEmEdicao === null) {
    adicionarAluno(aluno);
    mensagem = 'Aluno cadastrado com sucesso!';
  } else {
    atualizarAluno(alunoEmEdicao, aluno);
    mensagem = 'Aluno editado com sucesso!';
  }

  sairModoEdicao();
  atualizarTela();

  console.log(mensagem, aluno.toString());
  alert(`${mensagem}\n\n${aluno.toString()}`);
});

btnCancelar.addEventListener('click', function () {
  sairModoEdicao();
  console.log('Edição cancelada.');
});

// Primeira renderização (tabela e relatórios vazios)
atualizarTela();
