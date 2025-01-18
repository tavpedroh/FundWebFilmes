// Função para carregar os dados da URL
async function carregarDados() {
  try {
    const resposta = await fetch('https://rafaelescalfoni.github.io/desenv_web/filmes.json');
    const dados = await resposta.json();
    console.log(dados); // Verificar os dados retornados
    exibirCatalogo(dados);
  } catch (erro) {
    console.error('Erro ao carregar os dados:', erro);
  }
}

// Função para exibir o catálogo
function exibirCatalogo(filmes) {
  const catalogo = document.getElementById('catalogo');
  filmes.forEach(filme => {
    const ficha = document.createElement('div');
    ficha.classList.add('ficha');

    // Definir a cor da faixa etária
    let corFaixa = 'verde';
    if (filme.classificacao > 14 && filme.classificacao < 18) {
      corFaixa = 'amarelo';
    } else if (filme.classificacao >= 18) {
      corFaixa = 'vermelho';
    }

    // Criar estrelas para a classificação
    const estrelas = '★'.repeat(filme.opinioes[0]?.rating || 0);

    ficha.innerHTML = `
      <img src="${filme.figura}" alt="${filme.titulo}">
      <h2>${filme.titulo}</h2>
      <span class="faixa-etaria ${corFaixa}">${filme.classificacao}</span>
      <p><strong>Elenco:</strong> ${filme.elenco.join(', ')}</p>
      <p>${filme.resumo}</p>
      <p><strong>Gêneros:</strong> ${filme.generos.join(', ')}</p>
      <p class="rating">${estrelas}</p>
    `;

    catalogo.appendChild(ficha);
  });
}

// Carregar os dados ao abrir a página
carregarDados();
