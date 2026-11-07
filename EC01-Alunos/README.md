# EC01 – Gerenciamento de Alunos (DevTech Academy)

Sistema simples no navegador para **cadastrar, listar, editar e excluir** alunos e gerar **relatórios**,
feito com HTML (sem CSS) e JavaScript puro. Os dados ficam em memória (array de objetos).

## Como executar com Docker (desenvolvimento)

Pré-requisito: Docker Desktop instalado e aberto.

```bash
docker compose up --build
```

Acesse **http://localhost:8080**.

A pasta `src/` é montada dentro do container, então ao alterar qualquer arquivo basta recarregar a página.
Para parar: `Ctrl + C` e depois `docker compose down`.

> Sem Docker também funciona: basta abrir `src/index.html` no navegador.

## Estrutura

```
EC01-Alunos/
├── src/
│   ├── index.html       # Formulário, tabela e seção de relatórios
│   └── js/
│       ├── Aluno.js     # Classe Aluno
│       └── app.js       # Eventos, manipulação do DOM e relatórios
├── Dockerfile           # Imagem nginx:alpine servindo a pasta src
├── docker-compose.yml   # Sobe o container na porta 8080 com a pasta src montada
├── nginx.conf           # UTF-8 e sem cache (desenvolvimento)
└── .gitignore
```

## Onde está cada exercício

| Exercício | O que foi feito | Arquivo |
|---|---|---|
| **1 – CRUD com formulário e tabela** | Formulário com Nome, Idade, Curso (select: JavaScript, Python, Java) e Nota Final; botão **Cadastrar**; tabela com botões **Editar** e **Excluir** em cada linha; dados no array `alunos` | `index.html`, `app.js` |
| **2 – Classe Aluno** | Atributos `nome`, `idade`, `curso`, `notaFinal`; construtor; `isAprovado()` (nota ≥ 7); `toString()` | `Aluno.js` |
| **3 – Eventos, funções anônimas e arrow functions** | `addEventListener` com **funções anônimas** nos botões do formulário e da tabela; **arrow functions** em `adicionarAluno`, `atualizarAluno`, `removerAluno` etc.; `alert()` e `console.log()` ao salvar, editar e excluir | `app.js` |
| **4 – Relatórios** | Aprovados (`filter`), média das notas e das idades (`map` + `reduce`), nomes em ordem alfabética (`map` + `sort`), quantidade por curso (`reduce`); listas montadas com `forEach`; atualizados automaticamente a cada alteração | `app.js` |

## Versionamento no GitHub

```bash
git init
git add .
git commit -m "EC01 - Gerenciamento de Alunos"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/ec01-alunos.git
git push -u origin main
```

Ou, com o GitHub CLI: `gh repo create ec01-alunos --public --source=. --push`
