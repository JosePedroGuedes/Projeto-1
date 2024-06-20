//Defenir variáveis

//Numero de linhas e colunas do puzzle
var rows = 3;
var columns = 3;

//Qual peça esta a ser "agarrada" e a peça que está a ser tentada arrastar
var currTile;
var otherTile;

var turns = 0; // Contador do número de tentativas
var imgOrder; // Ordem atual das imagens no tabuleiro do puzzle
var gameStarted = false; // Saber se o jogo está inicializado ou não
var gameFinishedPuzzle = false; // Saber se o jogo já acabou

let minigamesOn = 0; // Contador de quantos mini-jogos foram completados

const predefinedOrders = [ //A três possivéis combinações das peças, sendo que a peça "9" é a peça vazia
    ["4", "1", "3", "7", "2", "6", "9", "5", "8"],
    ["4", "3", "6", "7", "8", "5", "1", "2", "9"],
    ["8", "7", "2", "4", "1", "3", "5", "6", "9"]
];

// Função para verificar se o puzzle foi concluído
function checkPuzzleFinish() {
    return gameFinishedPuzzle;
}

// Função para iniciar o jogo do puzzle
function initializeGame() {
    document.getElementById("board").innerHTML = ""; // Limpa o tabuleiro atual

    if (!gameStarted) { // Se o jogo não tiver começado, embaralha a ordem das imagens. Para prevenir que não resete depois de ele ser fechado
        imgOrder = predefinedOrders[Math.floor(Math.random() * predefinedOrders.length)];
        gameStarted = true; // Marca que o jogo começou
    }

    //função que colocará as imagens nos respetivos sítios
    let index = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "../assets/challenges/Esmad-Logo/" + imgOrder[index] + ".png";
            tile.draggable = true;
            index++;

            // Adiciona event listeners para todas as possibilidades que a peça pode ser arrastada
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile); // Adiciona a peça de puzzle ao tabuleiro
        }
    }

    document.getElementById("turns").innerText = `Tentativas: ${turns}`; // Atualiza o contador de tentativas na interface
}

// Função para abrir o jogo do puzzle
function openGamePuzzle() {
    if (!gameStarted) { // Se o jogo ainda não começou, inicializa o jogo
        initializeGame();
        gameStarted = true;
    } else {
        initializeGame(); // Se o jogo já começou, apenas reinicializa
    }

    document.getElementById("minigamePuzzle").style.display = "block";
    stopMovement = true; // Para o movimento do jogador enquanto o puzzle está ativo
}

// Função para fechar o jogo do puzzle
function closeGamePuzzle(movement) {
    document.getElementById("minigamePuzzle").style.display = "none";
    stopMovement = movement; // Restaura o movimento do jogador baseado no parâmetro
    removeEventListeners(); // Remove os event listeners das peças de puzzle
    if (gameFinishedPuzzle) minigamesOn++; // Se o puzzle foi completado, aumenta o contador de minigames completados
}

// Função para remover event listeners das peças de puzzle
function removeEventListeners() {
    let tiles = document.getElementById("board").getElementsByTagName("img");
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].removeEventListener("dragstart", dragStart);
        tiles[i].removeEventListener("dragover", dragOver);
        tiles[i].removeEventListener("dragenter", dragEnter);
        tiles[i].removeEventListener("drop", dragDrop);
        tiles[i].removeEventListener("dragend", dragEnd);
    }
}

// Event listener para quando a peça começa a ser arrastada
function dragStart() {
    currTile = this;
}

var dragOverTimeout = null;
var dragOverDelay = 50; //Defenir um pequeno tempo para arrastar as peças

// Event listener para quando o cursor está sobre uma peça que pode ser arrastada
function dragOver(e) {
    e.preventDefault();
    if (dragOverTimeout) return;
    dragOverTimeout = setTimeout(() => {
        dragOverTimeout = null;
    }, dragOverDelay);
}

// Event listener para quando uma peça entra num espaço válido para poder ser arrastado
function dragEnter(e) {
    e.preventDefault();
}

// Event listener para quando uma peça de puzzle é solta
function dragDrop() {
    otherTile = this;
}

// Event listener que trata de ver se a peça será arrastada, para onde será arrastada e se todas as peças já estão no devido local
function dragEnd() {
    if (gameFinishedPuzzle) return; // Condição que não deixa as peças serem mudadas de lugar caso o jogo já tenha acabado

    if (!otherTile) return; // Verifica se otherTile está definido

    const blankTileSrc = "9.png";
    const otherTileSrc = otherTile.src.split("/").pop();

    if (otherTileSrc !== blankTileSrc) {
        return; // Retorna se a peça de puzzle não for o espaço em branco
    }

    // Obtém as coordenadas da peça de puzzle atual e da peça de puzzle vazia
    let currCoords = currTile.id.split("-");
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    // Todas as mudanças possíveis que uma peça pode fazer
    let moveLeft = r == r2 && c2 == c - 1;
    let moveRight = r == r2 && c2 == c + 1;
    let moveUp = c == c2 && r2 == r - 1;
    let moveDown = c == c2 && r2 == r + 1;
    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) { // Verifica se realizou alguma delas
        setTimeout(() => {
            let currImg = currTile.src;
            let otherImg = otherTile.src;

            currTile.src = otherImg; // Troca as imagens entre as peças de puzzle
            otherTile.src = currImg;

            updateImgOrder(); // Atualiza a ordem das imagens no tabuleiro
            // Aumenta o número de tentativas
            turns += 1; 
            document.getElementById("turns").innerText = `Movimentos: ${turns}`;

            checkCompletion(); // Verifica se o puzzle foi completado após o movimento
        }, 100);
    }
}


// Função para atualizar a ordem das imagens no tabuleiro
function updateImgOrder() {
    let tiles = document.getElementById("board").getElementsByTagName("img");
    imgOrder = [];
    for (let i = 0; i < tiles.length; i++) {
        let src = tiles[i].src.split("/").pop().split(".")[0];
        imgOrder.push(src);
    }
}
//Função que verifica se a ordem das iamgens está correta
function checkCompletion() {
    let correctOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let tiles = document.getElementById("board").getElementsByTagName("img");

    for (let i = 0; i < tiles.length; i++) {
        let src = tiles[i].src.split("/").pop().split(".")[0];
        if (src !== correctOrder[i]) {
            return; //caso alguma esteje fora do sitio, sai da função
        }
    }

    //Mudar certas variaveis por o jogo ter acabado
    gameFinishedPuzzle = true;
    document.getElementById("turns").innerHTML = `Parabéns!! Acabaste o puzzle<br> em ${turns} movimentos!`;
    numberTriesPuzzle = turns;
}

//defenir os elementos quando o ficheiro é gerado
document.addEventListener("DOMContentLoaded", () => {
    const openPuzzleBtn = document.getElementById("openPuzzleBtn");
    const closePuzzleBtn = document.getElementById("closePuzzleBtn");

    if (openPuzzleBtn) {
        openPuzzleBtn.addEventListener("click", openGamePuzzle);
    }

    if (closePuzzleBtn) {
        closePuzzleBtn.addEventListener("click", closeGamePuzzle(false));
    }

    // Adicionando um event listener global para a tecla Esc
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && document.getElementById("minigamePuzzle").style.display === "block") {
            isPaused = true;
            closeGamePuzzle(true);
        }
    });
});
