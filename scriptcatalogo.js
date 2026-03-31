let filmes = [];
let editandoId = null;

document.getElementById("formFilme").addEventListener("submit", salvarFilme);

document.getElementById("busca").addEventListener("input", (e) => {
  buscarFilmes(e.target.value);
});


function salvarFilme(e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const nota = document.getElementById("nota").value;
  const favorito = document.getElementById("favorito").checked;
  const critica = document.getElementById("critica").value;

  if (editandoId) {
    atualizarFilme(editandoId, { nome, nota, favorito, critica });
  } else {
    const filme = {
      id: Date.now(),
      nome,
      nota,
      favorito,
      critica
    };

    filmes.push(filme);
  }

  limparFormulario();
  renderizarFilmes();
}


function renderizarFilmes(lista = filmes) {
  const container = document.getElementById("listaFilmes");
  container.innerHTML = "";

  lista.forEach(filme => {
    const div = document.createElement("div");

    div.className = "bg-white p-3 rounded shadow";

    div.innerHTML = `
      <h3 class="font-bold text-lg">${filme.nome}</h3>
      <p>⭐ Nota: ${filme.nota}</p>
      <p>${filme.favorito ? "❤️ Favorito" : ""}</p>
      <p class="text-sm text-gray-600">${filme.critica || ""}</p>

      <div class="mt-2 flex gap-2">
        <button class="bg-yellow-400 px-2 py-1 rounded" onclick="editarFilme(${filme.id})">
          Editar
        </button>

        <button class="bg-red-500 text-white px-2 py-1 rounded" onclick="excluirFilme(${filme.id})">
          Excluir
        </button>
      </div>
    `;

    container.appendChild(div);
  });
}


function atualizarFilme(id, novosDados) {
  const index = filmes.findIndex(f => f.id === id);

  if (index !== -1) {
    filmes[index] = { ...filmes[index], ...novosDados };
  }

  editandoId = null;
}


function excluirFilme(id) {
  filmes = filmes.filter(f => f.id !== id);
  renderizarFilmes();
}


function editarFilme(id) {
  const filme = filmes.find(f => f.id === id);

  document.getElementById("nome").value = filme.nome;
  document.getElementById("nota").value = filme.nota;
  document.getElementById("favorito").checked = filme.favorito;
  document.getElementById("critica").value = filme.critica;

  editandoId = id;
}


function buscarFilmes(termo) {
  const filtrados = filmes.filter(f =>
    f.nome.toLowerCase().includes(termo.toLowerCase())
  );

  renderizarFilmes(filtrados);
}


function limparFormulario() {
  document.getElementById("formFilme").reset();
}