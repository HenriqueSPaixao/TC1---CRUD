# EC02 – Sistema de Gestão de Funcionários (Startup de Tecnologia)

Sistema simples no navegador para **cadastrar, excluir, alterar e listar** funcionários e gerar
**relatórios com "streams" JS** (`map`, `filter`, `reduce` e `Set`). Feito com HTML e JavaScript puro;
os dados ficam em memória (array de objetos da classe `Funcionario`).

## Como executar com Docker (desenvolvimento)

Pré-requisito: Docker Desktop instalado e aberto.

```bash
docker compose up --build
```

Acesse **http://localhost:8081**.

A pasta `src/` é montada dentro do container, então ao alterar qualquer arquivo basta recarregar a página.
Para parar: `Ctrl + C` e depois `docker compose down`.

> Sem Docker também funciona: basta abrir `src/index.html` no navegador.

## Estrutura

```
EC02-Funcionarios/
├── src/
│   ├── index.html         # Formulário, busca, tabela e seção de relatórios
│   └── js/
│       ├── Funcionario.js # Classe Funcionario
│       └── app.js         # Eventos, manipulação do DOM e relatórios
├── Dockerfile             # Imagem nginx:alpine servindo a pasta src
├── docker-compose.yml     # Sobe o container na porta 8081 com a pasta src montada
├── nginx.conf             # UTF-8 e sem cache (desenvolvimento)
└── .gitignore
```

## Onde está cada exercício

| Exercício | O que foi feito | Arquivo |
|---|---|---|
| **1 – Cadastro e listagem** | Formulário com Nome, Idade, Cargo e Salário; botão **Cadastrar** adiciona ao array `funcionarios`; dados exibidos em uma `<table>`. Classe `Funcionario` com atributos privados, construtor, **get/set** (com validação), ID automático e `toString()` | `index.html`, `Funcionario.js`, `app.js` |
| **2 – Excluir e alterar** | Botões **Editar** e **Excluir** em cada linha; Editar carrega os dados no formulário e Salvar atualiza usando o método `atualizar()` da classe (que usa os setters); eventos `onclick` com funções anônimas | `app.js`, `Funcionario.js` |
| **3 – Funções anônimas e lambda** | Cliques com `onclick = function () { ... }`; busca (`buscarPorId`, `buscarPorNome`), inclusão, remoção e atualização escritas como **arrow functions**; campo **Buscar por nome**; comentário mostrando a troca de função anônima tradicional por arrow function (veja abaixo) | `app.js` |
| **4 – Relatórios** | Salário maior que R$ 5.000 (`filter`), média salarial (`reduce`), cargos únicos (`map` + `new Set()`), nomes em maiúsculo (`map`); atualizados automaticamente a cada alteração | `app.js` |

### Exercício 3 – de função anônima tradicional para arrow function

```js
// ANTES: função anônima tradicional
const buscarPorId = function (id) {
  return funcionarios.find(function (funcionario) {
    return funcionario.id === id;
  });
};

// DEPOIS: arrow function
const buscarPorId = (id) => funcionarios.find((funcionario) => funcionario.id === id);
```

- `function` sai e `=>` entra depois dos parâmetros.
- Com uma única expressão, as chaves `{ }` e o `return` podem ser omitidos.
- A arrow function não tem `this` próprio. Por isso os eventos de clique usam `function () { }`
  e as operações sobre o array usam arrow functions.

## Versionamento no GitHub

```bash
git init
git add .
git commit -m "EC02 - Gestão de Funcionários"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/ec02-funcionarios.git
git push -u origin main
```

Ou, com o GitHub CLI: `gh repo create ec02-funcionarios --public --source=. --push`
