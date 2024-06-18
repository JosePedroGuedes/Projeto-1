const playerImage = new Image();
playerImage.src = '../assets/characters/walkCicle.png';

const currentWidth = window.innerWidth; // Largura atual da tela
let playerSpeed;

if (currentWidth < 850) {
  playerSpeed = 2;
} else {
  playerSpeed = 1.3; // Velocidade fixa para telas maiores ou iguais a 850px
}

let player = {
  x: 20,
  y: 250,
  width: 58, // Largura do jogador
  height: 58, // Altura do jogador
  speed: playerSpeed, // Velocidade do jogador ajustada dinamicamente
  dx: 0,
  dy: 0,
  row: 0, // Linha atual da animação
  col: 0, // Coluna atual da animação
  lastFrameChangeTime: 0 // Tempo da última mudança de frame
};

// Define as dimensões de cada frame na imagem (64x64 pixels)
const FRAME_WIDTH = 64;
const FRAME_HEIGHT = 64;
// Define o número total de frames (16 frames no total)
const TOTAL_FRAMES = 16;
// Define o número de frames por direção (4 frames por direção)
const FRAMES_PER_DIRECTION = 4;
// Define o tempo de mudança de frame (em milissegundos)
const FRAME_CHANGE_TIME = 100; // Altere conforme necessário

const pressedKeys = {};

function isKeyPressed(key) {
    return !!pressedKeys[key];
}

// Função para desenhar o jogador
function drawPlayer() {
    // Desenha o frame atual da imagem do jogador no contexto do canvas
    ctx.drawImage(playerImage, player.col * FRAME_WIDTH, player.row * FRAME_HEIGHT, FRAME_WIDTH, FRAME_HEIGHT, player.x, player.y, player.width, player.height);
}

// Função para atualizar a animação do jogador
function updatePlayerAnimation(timestamp) {
    // Verifica se é hora de mudar para o próximo frame com base no tempo decorrido
    if (timestamp - player.lastFrameChangeTime >= FRAME_CHANGE_TIME) {
        // Atualiza o tempo da última mudança de frame
        player.lastFrameChangeTime = timestamp;

        // Atualiza o índice do frame para o próximo frame
        player.col = (player.col + 1) % FRAMES_PER_DIRECTION;
    }

    // Atualiza a linha com base na direção do movimento
    if (player.dy < 0) { // Movimento para cima
        player.row = 3;
    } else if (player.dy > 0) { // Movimento para baixo
        player.row = 0;
    } else if (player.dx < 0) { // Movimento para a esquerda
        player.row = 1;
    } else if (player.dx > 0) { // Movimento para a direita
        player.row = 2;
    }

    // Desenha o jogador
    drawPlayer();
}

// Variável para controlar se o jogador está se movendo
let isMoving = false;

let isStop = false; // Variável para controlar se o jogador está parado

// Função para mover o jogador
function movePlayer(event) {
    const key = event.key.toLowerCase(); // Converte a tecla para minúsculas

    if (!isStop && !stopMovement) { // Verifica se o jogador não está parado
        switch (key) {
            case 'arrowup':
            case 'w':
                player.dy = -player.speed;
                isMoving = true;
                break;
            case 'arrowdown':
            case 's':
                player.dy = player.speed;
                isMoving = true;
                break;
            case 'arrowleft':
            case 'a':
                player.dx = -player.speed;
                isMoving = true;
                break;
            case 'arrowright':
            case 'd':
                player.dx = player.speed;
                isMoving = true;
                break;
        }
    }
}

// Função para parar o movimento do jogador quando a tecla é solta
function stopPlayer(event) {
    const key = event.key.toLowerCase(); // Converte a tecla para minúsculas

    if (!isStop && !stopMovement) { // Verifica se o jogador não está parado
        switch (key) {
            case 'arrowup':
            case 'w':
                if (player.dy < 0) player.dy = 0;
                break;
            case 'arrowdown':
            case 's':
                if (player.dy > 0) player.dy = 0;
                break;
            case 'arrowleft':
            case 'a':
                if (player.dx < 0) player.dx = 0;
                break;
            case 'arrowright':
            case 'd':
                if (player.dx > 0) player.dx = 0;
                break;
        }

        // Verifica se o jogador parou de se mover
        if (player.dx === 0 && player.dy === 0) {
            isMoving = false;
            player.col = 0;
            drawPlayer();
        }
    }
}

// Adiciona eventos de teclado para mover o jogador
window.addEventListener('keydown', function(event) {
    pressedKeys[event.code] = true;
    movePlayer(event);
});

window.addEventListener('keyup', function(event) {
    pressedKeys[event.code] = false;
    stopPlayer(event);
});

function animate(timestamp) {
    // Limpa o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Atualiza a animação do jogador apenas se estiver se movendo e não estiver parado
    if (isMoving && !isStop && !stopMovement) {
        updatePlayerAnimation(timestamp);
    } else {
        // Se o movimento estiver parado, redefine dx e dy
        player.dx = 0;
        player.dy = 0;
        isMoving = false;
        player.col = 0;
        drawPlayer();
    }

    // Solicita uma nova animação
    requestAnimationFrame(animate);
}

// Inicia a animação
animate();
