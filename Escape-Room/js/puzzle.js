var rows = 3;
var columns = 3;

var currTile;
var otherTile;

var turns = 0;
var imgOrder = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];

var gameStarted = false, gameFinishedPuzzle = false;

function checkPuzzleFinish() {
    return gameFinishedPuzzle;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function initializeGame() {
    document.getElementById("board").innerHTML = "";

    if (!gameStarted) {
        imgOrder = shuffleArray(imgOrder);
        gameStarted = true;
    }

    let index = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "../assets/challenges/Esmad-Logo/" + imgOrder[index] + ".png";
            tile.draggable = true;
            index++;

            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);
        }
    }

    document.getElementById("turns").innerText = `Tentativas: ${turns}`;
}

function openGamePuzzle() {

    if (!gameStarted) {
        initializeGame();
        gameStarted = true;
    } else {
        initializeGame();
    }

    document.getElementById("minigamePuzzle").style.display = "block";
    stopMovement = true;

}

function closeGamePuzzle(movement) {
    document.getElementById("minigamePuzzle").style.display = "none";
    stopMovement = movement;
    removeEventListeners();

}

function removeEventListeners() {
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
    currTile = this;
}

var dragOverTimeout = null;
var dragOverDelay = 50;

function dragOver(e) {
    e.preventDefault();
    if (dragOverTimeout) return;
    dragOverTimeout = setTimeout(() => {
        dragOverTimeout = null;
    }, dragOverDelay);
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() { }

function dragDrop() {
    otherTile = this;
}

function dragEnd() {
    if (gameFinishedPuzzle) return; // Não permitir mover se o jogo estiver concluído

    const blankTileSrc = "9.png";
    const otherTileSrc = otherTile.src.split("/").pop();

    if (otherTileSrc !== blankTileSrc) {
        return;
    }

    let currCoords = currTile.id.split("-");
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
            let currImg = currTile.src;
            let otherImg = otherTile.src;

            currTile.src = otherImg;
            otherTile.src = currImg;

            updateImgOrder();

            turns += 1;
            document.getElementById("turns").innerText = `Tentativas: ${turns}`;

            checkCompletion();
        }, 100);
    }
}

function updateImgOrder() {
    let tiles = document.getElementById("board").getElementsByTagName("img");
    imgOrder = [];
    for (let i = 0; i < tiles.length; i++) {
        let src = tiles[i].src.split("/").pop().split(".")[0];
        imgOrder.push(src);
    }
}

function checkCompletion() {
    let correctOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let tiles = document.getElementById("board").getElementsByTagName("img");

    for (let i = 0; i < tiles.length; i++) {
        let src = tiles[i].src.split("/").pop().split(".")[0];
        if (src !== correctOrder[i]) {
            return;
        }
    }

    gameFinishedPuzzle = true;
    document.getElementById("turns").innerText = `Parabéns! Fizeste o puzzle em ${turns} tentativas!`;
    numberTriesPuzzle = turns;
}

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
