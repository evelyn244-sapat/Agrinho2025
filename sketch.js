// Definindo variáveis globais
let biologo;
let plantas = [];
let temperatura = 10;
let totalArvores = 0;
let arvoresParaGanhar = 50; // Defina aqui o número de árvores para ganhar
let jogoGanho = false;

// Emojis
let emojiBiologo = '🧑‍🌾';
let emojiArvore = '🌱';

class Biologo {
  constructor(x, y) {
    this.posicao = createVector(x, y);
    this.raio = 15;
    this.velocidade = createVector(0, 0);
  }

  mostrar() {
    textSize(this.raio * 2); // Define o tamanho do emoji
    textAlign(CENTER, CENTER);
    text(emojiBiologo, this.posicao.x, this.posicao.y);
  }

  atualizar() {
    this.posicao.add(this.velocidade);
    this.velocidade.mult(0.9); // Adiciona um atrito para o movimento parar gradualmente

    // Manter o biólogo dentro da tela
    this.posicao.x = constrain(this.posicao.x, this.raio, width - this.raio);
    this.posicao.y = constrain(this.posicao.y, this.raio, height - this.raio);
  }

  mover(direcao) {
    this.velocidade.add(direcao);
  }

  plantarArvore() {
    plantas.push(new Arvore(this.posicao.x, this.posicao.y));
    totalArvores++;
  }
}

class Arvore {
  constructor(x, y) {
    this.posicao = createVector(x, y);
    this.raio = 10;
  }

  mostrar() {
    textSize(this.raio * 2); // Define o tamanho do emoji
    textAlign(CENTER, CENTER);
    text(emojiArvore, this.posicao.x, this.posicao.y);
  }
}

function setup() {
  createCanvas(600, 400);
  biologo = new Biologo(width / 2, height - 50);
}

function draw() {
  // Usando map() para ajustar a cor de fundo de forma mais controlada
  let corFundo = lerpColor(color(217, 112, 26), color(219, 239, 208),
    map(totalArvores, 0, arvoresParaGanhar, 0, 1)); // Mudança no map para ir até o número de vitória

  background(corFundo);

  mostrarInformacoes();

  if (!jogoGanho) {
    temperatura += 0.05;

    biologo.atualizar();
    biologo.mostrar();

    // Usando forEach para exibir as árvores plantadas
    plantas.forEach(arvore => arvore.mostrar());

    // Verifica se o jogador ganhou
    if (totalArvores >= arvoresParaGanhar) {
      jogoGanho = true;
    }
  } else {
    mostrarMensagemVitoria();
  }
}

// Função para mostrar as informações na tela
function mostrarInformacoes() {
  textSize(16); // Correção: adicionado um valor para o tamanho do texto
  fill(0);
  text(`Temperatura: ${nf(temperatura, 1)}°C`, 10, 20);
  text(`Total de Árvores: ${totalArvores}`, 10, 40);
  text(`Árvores para Vitória: ${arvoresParaGanhar}`, 10, 60);
}

function keyPressed() {
  if (!jogoGanho) {
    if (keyCode === UP_ARROW) {
      biologo.mover(createVector(0, -2));
    } else if (keyCode === DOWN_ARROW) {
      biologo.mover(createVector(0, 2));
    } else if (keyCode === LEFT_ARROW) {
      biologo.mover(createVector(-2, 0));
    } else if (keyCode === RIGHT_ARROW) {
      biologo.mover(createVector(2, 0));
    } else if (key === ' ') {
      biologo.plantarArvore();
    }
  }
}

function mostrarMensagemVitoria() {
  textSize(32);
  fill(0, 150, 0);
  textAlign(CENTER, CENTER);
  text("Você Ganhou!", width / 2, height / 2);
  textSize(16);
  fill(0);
  text(`Você plantou ${totalArvores} árvores!`, width / 2, height / 2 + 30);
  noLoop(); // Para o loop de draw quando o jogo é ganho
}