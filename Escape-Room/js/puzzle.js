var rows = 3;
var columns = 3;

var currTile;
var otherTile; // Peça vazia

var turns = 0;
var imgOrder = ["4", "2", "8", "5", "1", "6", "7", "9", "3"]; // Ordem inicial das peças

var gameStarted = false, gameFinishedPuzzle = false; // Variável de controle para verificar se o jogo já foi aberto

function checkPuzzleFinish(){
    return gameFinishedPuzzle;
}

function shuffleArray(array) {
    // Embaralhar o array e retornar o resultado
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function initializeGame() {
    console.log("Inicializando o jogo...");
    document.getElementById("board").innerHTML = "";

    // Embaralhar as peças somente na primeira vez que o jogo é aberto
    if (!gameStarted) {
        console.log("Embaralhando peças...");
        imgOrder = shuffleArray(imgOrder);
        gameStarted = true;
    }

    let index = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "../assets/challenges/Esmad-Logo/" + imgOrder[index] + ".png"; // Ajustando o caminho da imagem
            tile.draggable = true; // Tornar as imagens arrastáveis
            index++;

            // DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart); // Clicar em uma imagem para arrastar
            tile.addEventListener("dragover", dragOver); // Mover a imagem enquanto clicada
            tile.addEventListener("dragenter", dragEnter); // Arrastar a imagem sobre outra
            tile.addEventListener("dragleave", dragLeave); // Imagem arrastada saindo de outra imagem
            tile.addEventListener("drop", dragDrop); // Arrastar uma imagem sobre outra, soltar a imagem
            tile.addEventListener("dragend", dragEnd); // Após soltar o arraste, trocar as duas peças

            document.getElementById("board").append(tile);
        }
    }

    // Atualizar o número de movimentos
    document.getElementById("turns").innerText = `Tentativas: ${turns}`;
}

function openGamePuzzle() {
    console.log("Abrindo o jogo de quebra-cabeça...");

    // Carrega o script puzzle.js dinamicamente se ainda não estiver carregado
    if (!gameStarted) {
        initializeGame();
        gameStarted = true;
    } else {
        initializeGame();
    }

    document.getElementById("minigamePuzzle").style.display = "block";
    stopMovement = true;

    // Adicionar ouvinte de evento para a tecla Esc
    document.addEventListener("keydown", handleEscKey);
}


function closeGamePuzzle() {
    console.log("Fechando o jogo de quebra-cabeça...");
    document.getElementById("minigamePuzzle").style.display = "none";
    stopMovement = false;

    // Remove os event listeners de drag quando o jogo é fechado
    removeEventListeners();

    // Remover ouvinte de evento para a tecla Esc
    document.removeEventListener("keydown", handleEscKey);
}


// Função para remover os eventos de drag
function removeEventListeners() {
    console.log("Removendo event listeners...");
    let tiles = document.getElementById("board").getElementsByTagName("img");
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].removeEventListener("dragstart", dragStart);
        tiles[i].removeEventListener("dragover", dragOver);
        tiles[i].removeEventListener("dragenter", dragEnter);
        tiles[i].removeEventListener("dragleave", dragLeave);
        tiles[i].removeEventListener("drop", dragDrop);
        tiles[i].removeEventListener("dragend", dragEnd);
    }
}

function dragStart() {
    console.log("Iniciando o arraste...");
    currTile = this; // A peça de origem
}

var dragOverTimeout = null;
var dragOverDelay = 50; // Tempo de atraso em milissegundos

function dragOver(e) {
    console.log("Arraste sobre...");
    e.preventDefault();

    // Verifica se já existe um timeout em execução, se sim, não faz nada
    if (dragOverTimeout) return;

    // Aguarda um pequeno atraso para executar o processamento
    dragOverTimeout = setTimeout(() => {
        // Lógica de processamento aqui
        // Por exemplo, você pode adicionar uma classe de destaque ou executar outras ações
        dragOverTimeout = null; // Limpa o timeout para permitir o próximo processamento
    }, dragOverDelay);
}


function dragEnter(e) {
    console.log("Entrando no alvo de arraste...");
    e.preventDefault();
}

function dragLeave() {
    console.log("Saindo do alvo de arraste...");
}

function dragDrop() {
    console.log("Soltando o arraste...");
    otherTile = this; // A peça vazia
}

function dragEnd() {
    console.log("Finalizando o arraste...");
    const blankTileSrc = "9.png"; // Apenas o nome da imagem da peça vazia
    const otherTileSrc = otherTile.src.split("/").pop(); // Apenas o nome da imagem da outra peça

    if (otherTileSrc !== blankTileSrc) {
        console.log("A outra peça não é a peça vazia. Cancelando...");
        return;
    }

    let currCoords = currTile.id.split("-"); // Coordenadas da peça de origem
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = r == r2 && c2 == c - 1;
    let moveRight = r == r2 && c2 == c + 1;

    let moveUp = c == c2 && r2 == r - 1;
    let moveDown = c == c2 && r2 == r + 1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        setTimeout(() => {
            console.log("Movimento válido. Trocando peças...");
            let currImg = currTile.src;
            let otherImg = otherTile.src;

            currTile.src = otherImg;
            otherTile.src = currImg;

            // Atualizar a ordem das imagens
            updateImgOrder();

            turns += 1;
            document.getElementById("turns").innerText = `Tentativas: ${turns}`;

            checkCompletion();
        }, 100); // Adiciona um atraso de 100ms
    } else {
        console.log("Movimento inválido. Cancelando...");
    }
}

// Função para atualizar a ordem das imagens
function updateImgOrder() {
    console.log("Atualizando a ordem das imagens...");
    let tiles = document.getElementById("board").getElementsByTagName("img");
    imgOrder = [];
    for (let i = 0; i < tiles.length; i++) {
        let src = tiles[i].src.split("/").pop().split(".")[0];
        imgOrder.push(src);
    }
}

// Função para verificar se o puzzle foi completado
function checkCompletion() {
    console.log("Verificando a conclusão do quebra-cabeça...");
    let correctOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let tiles = document.getElementById("board").getElementsByTagName("img");
    
    for (let i = 0; i < tiles.length; i++) {
        let src = tiles[i].src.split("/").pop().split(".")[0];
        if (src !== correctOrder[i]) {
            console.log("O quebra-cabeça ainda não foi completado.");
            return;
        }
    }
    
    alert("Parabéns! Você completou o puzzle!");
    gameFinishedPuzzle = true;
}

// Função para lidar com a tecla Esc
function handleEscKey(event) {
    console.log("Tecla Esc pressionada...");
    if (event.key === "Escape" && document.getElementById("minigamePuzzle").style.display === "block") {
        closeGamePuzzle();
    }
}

// Inicializar o jogo apenas quando o minigame estiver ativo
document.addEventListener("DOMContentLoaded", () => {
    const openPuzzleBtn = document.getElementById("openPuzzleBtn");
    const closePuzzleBtn = document.getElementById("closePuzzleBtn");

    if (openPuzzleBtn) {
        openPuzzleBtn.addEventListener("click", openGamePuzzle);
    }

    if (closePuzzleBtn) {
        closePuzzleBtn.addEventListener("click", closeGamePuzzle);
    }
});
