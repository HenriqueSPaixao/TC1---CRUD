// =====================================================================
// Exercício 1: array de objetos da classe Funcionario
// =====================================================================
let funcionarios = [];

// ID do funcionário que está sendo editado (null = modo de cadastro).
let idEmEdicao = null;

// Elementos da página
const form = document.getElementById('form-funcionario');
const tituloForm = document.getElementById('titulo-form');
const campoNome = document.getElementById('nome');
const campoIdade = document.getElementById('idade');
const campoCargo = document.getElementById('cargo');
const campoSalario = document.getElementById('salario');
const btnCadastrar = document.getElementById('btn-cadastrar');
const btnCancelar = document.getElementById('btn-cancelar');
const mensagem = document.getElementById('mensagem');
const campoBusca = document.getElementById('busca');
const corpoTabela = document.getElementById('corpo-tabela');

const relSalarioAlto = document.getElementById('rel-salario-alto');
const relMediaSalarial = document.getElementById('rel-media-salarial');
const relCargos = document.getElementById('rel-cargos');
const relNomesMaiusculo = document.getElementById('rel-nomes-maiusculo');

const formatarMoeda = (valor) => valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

// Remove acentos e deixa em minúsculo, para a busca achar "João" digitando "joao".
const normalizar = (texto) =>
  texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

const mostrarMensagem = (texto) => {
  mensagem.textContent = texto;
};

// =====================================================================
// Exercício 3: funções de manipulação do array com arrow functions
// (busca, inclusão, remoção e atualização)
// =====================================================================
const buscarPorId = (id) => funcionarios.find((funcionario) => funcionario.id === id);

const buscarPorNome = (termo) =>
  funcionarios.filter((funcionario) => normalizar(funcionario.nome).includes(normalizar(termo)));

const adicionarFuncionario = (funcionario) => funcionarios.push(funcionario);

const removerFuncionario = (id) => {
  funcionarios = funcionarios.filter((funcionario) => funcionario.id !== id);
};

const atualizarFuncionario = (id, nome, idade, cargo, salario) => {
  const funcionario = buscarPorId(id);
  funcionario.atualizar(nome, idade, cargo, salario); // Exercício 2: usa os métodos da classe
  return funcionario;
};

/*
 * ---------------------------------------------------------------------
 * Exercício 3: como trocar uma função anônima tradicional por uma
 * arrow function
 * ---------------------------------------------------------------------
 *
 * ANTES (função anônima tradicional):
 *
 *   const buscarPorId = function (id) {
 *     return funcionarios.find(function (funcionario) {
 *       return funcionario.id === id;
 *     });
 *   };
 *
 * DEPOIS (arrow function, usada acima):
 *
 *   const buscarPorId = (id) => funcionarios.find((funcionario) => funcionario.id === id);
 *
 * O que muda:
 *   1. A palavra "function" sai e a seta "=>" entra depois dos parâmetros.
 *   2. Se o corpo é uma única expressão, as chaves { } e o "return" podem
 *      ser omitidos: o valor da expressão já é retornado.
 *   3. A arrow function não tem o próprio "this" (usa o "this" de onde foi
 *      criada). Por isso os eventos de clique abaixo usam function () { },
 *      e as operações sobre o array usam arrow functions.
 */

// =====================================================================
// Exercício 4: relatórios com filter, map, reduce e new Set()
// =====================================================================
const funcionariosComSalarioMaiorQue = (valor) =>
  funcionarios.filter((funcionario) => funcionario.salario > valor);

const mediaSalarial = () =>
  funcionarios.length === 0
    ? 0
    : funcionarios.reduce((soma, funcionario) => soma + funcionario.salario, 0) / funcionarios.length;

const cargosUnicos = () => [...new Set(funcionarios.map((funcionario) => funcionario.cargo))];

const nomesEmMaiusculo = () => funcionarios.map((funcionario) => funcionario.nome.toUpperCase());

// =====================================================================
// Formulário: modo de cadastro x modo de edição
// =====================================================================
const entrarModoEdicao = (id) => {
  const funcionario = buscarPorId(id);
  idEmEdicao = id;

  campoNome.value = funcionario.nome;
  campoIdade.value = funcionario.idade;
  campoCargo.value = funcionario.cargo;
  campoSalario.value = funcionario.salario;

  tituloForm.textContent = `Editando funcionário #${funcionario.id}`;
  btnCadastrar.textContent = 'Salvar alterações';
  btnCancelar.hidden = false;
  campoNome.focus();
  mostrarMensagem(`Editando: ${funcionario.toString()}`);
};

const sairModoEdicao = () => {
  idEmEdicao = null;
  form.reset();
  tituloForm.textContent = 'Cadastrar funcionário';
  btnCadastrar.textContent = 'Cadastrar';
  btnCancelar.hidden = true;
};

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
  const termo = campoBusca.value;
  const lista = termo.trim() === '' ? funcionarios : buscarPorNome(termo);

  corpoTabela.innerHTML = '';

  if (lista.length === 0) {
    const celula = corpoTabela.insertRow().insertCell();
    celula.colSpan = 6;
    celula.textContent =
      funcionarios.length === 0 ? 'Nenhum funcionário cadastrado.' : 'Nenhum funcionário encontrado com esse nome.';
    return;
  }

  lista.forEach((funcionario) => {
    const linha = corpoTabela.insertRow();

    const valores = [
      funcionario.id,
      funcionario.nome,
      funcionario.idade,
      funcionario.cargo,
      funcionario.salarioFormatado,
    ];
    valores.forEach((valor) => {
      linha.insertCell().textContent = valor;
    });

    const celulaAcoes = linha.insertCell();

    const btnEditar = document.createElement('button');
    btnEditar.type = 'button';
    btnEditar.textContent = 'Editar';
    // Exercícios 2 e 3: evento onclick com função anônima
    btnEditar.onclick = function () {
      entrarModoEdicao(funcionario.id);
    };

    const btnExcluir = document.createElement('button');
    btnExcluir.type = 'button';
    btnExcluir.textContent = 'Excluir';
    // Exercícios 2 e 3: evento onclick com função anônima
    btnExcluir.onclick = function () {
      if (!confirm(`Deseja excluir o funcionário "${funcionario.nome}"?`)) {
        return;
      }

      removerFuncionario(funcionario.id);
      if (idEmEdicao === funcionario.id) {
        sairModoEdicao();
      }
      atualizarTela();

      const texto = `Funcionário excluído: ${funcionario.toString()}`;
      console.log(texto);
      mostrarMensagem(texto);
    };

    celulaAcoes.append(btnEditar, ' ', btnExcluir);
  });
};

const renderizarRelatorios = () => {
  const semFuncionarios = 'Nenhum funcionário cadastrado.';

  preencherLista(
    relSalarioAlto,
    funcionariosComSalarioMaiorQue(5000).map(
      (funcionario) => `${funcionario.nome} (${funcionario.cargo}) - ${funcionario.salarioFormatado}`
    ),
    'Nenhum funcionário com salário maior que R$ 5.000,00.'
  );

  relMediaSalarial.textContent = funcionarios.length > 0 ? formatarMoeda(mediaSalarial()) : semFuncionarios;

  preencherLista(relCargos, cargosUnicos(), semFuncionarios);

  preencherLista(relNomesMaiusculo, nomesEmMaiusculo(), semFuncionarios);
};

const atualizarTela = () => {
  renderizarTabela();
  renderizarRelatorios();
};

// =====================================================================
// Exercício 3: eventos de clique com funções anônimas
// =====================================================================
btnCadastrar.onclick = function () {
  // Usa a validação do próprio HTML (required, min, max, step...).
  if (!form.reportValidity()) {
    return;
  }

  try {
    let texto;

    if (idEmEdicao === null) {
      const funcionario = new Funcionario(campoNome.value, campoIdade.value, campoCargo.value, campoSalario.value);
      adicionarFuncionario(funcionario);
      texto = `Funcionário cadastrado: ${funcionario.toString()}`;
    } else {
      const funcionario = atualizarFuncionario(
        idEmEdicao,
        campoNome.value,
        campoIdade.value,
        campoCargo.value,
        campoSalario.value
      );
      texto = `Funcionário atualizado: ${funcionario.toString()}`;
    }

    sairModoEdicao();
    atualizarTela();
    console.log(texto);
    mostrarMensagem(texto);
  } catch (erro) {
    // Erros de validação lançados pelos setters da classe Funcionario
    mostrarMensagem(`Erro: ${erro.message}`);
    alert(erro.message);
  }
};

btnCancelar.onclick = function () {
  sairModoEdicao();
  mostrarMensagem('Edição cancelada.');
};

// A busca filtra a tabela a cada letra digitada.
campoBusca.oninput = function () {
  renderizarTabela();
};

// Primeira renderização (tabela e relatórios vazios)
atualizarTela();
