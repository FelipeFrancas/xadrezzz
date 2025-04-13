const tabuleiro = document.querySelector(".tabuleiro");
let pecaSelecionada = null;
let origem = null;

// Selecionar uma peça ao clicar
function selecionarPeca(event) {
  event.stopPropagation();
  const peca = event.currentTarget;

  // Limpa qualquer seleção anterior
  limparSelecao();

  pecaSelecionada = peca;
  origem = peca.parentElement;
  origem.classList.add("selecionado");

  mostrarMovimentosSimples(origem);
}

// Mostrar casas válidas ao redor (adjacentes)
function mostrarMovimentosSimples(origem) {
  const linha = Math.floor([...tabuleiro.children].indexOf(origem) / 8);
  const coluna = [...tabuleiro.children].indexOf(origem) % 8;

  const direcoes = [
    [-1, 0], [1, 0], // cima e baixo
    [0, -1], [0, 1]  // esquerda e direita
  ];

  direcoes.forEach(([dx, dy]) => {
    const novaLinha = linha + dx;
    const novaColuna = coluna + dy;

    if (novaLinha >= 0 && novaLinha < 8 && novaColuna >= 0 && novaColuna < 8) {
      const index = novaLinha * 8 + novaColuna;
      const casaDestino = tabuleiro.children[index];
      if (casaDestino && casaDestino.children.length === 0) {
        casaDestino.classList.add("destino");
      }
    }
  });
}

// Mover peça se a casa for válida
function moverPara(casa) {
  if (casa.classList.contains("destino") && pecaSelecionada) {
    casa.appendChild(pecaSelecionada);
  }

  limparSelecao();
}

// Remover destaques e resets
function limparSelecao() {
  document.querySelectorAll(".selecionado").forEach(casa => casa.classList.remove("selecionado"));
  document.querySelectorAll(".destino").forEach(casa => casa.classList.remove("destino"));
  pecaSelecionada = null;
  origem = null;
}

// Adiciona eventos a todas as peças e casas
document.querySelectorAll(".peca").forEach(peca => {
  peca.addEventListener("click", selecionarPeca);
});

document.querySelectorAll(".casa").forEach(casa => {
  casa.addEventListener("click", () => moverPara(casa));
});
