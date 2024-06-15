//Informações usadas no final do jogo

let timeFirstLevel = "--:--";
let timeFirstLeve2 = "--:--";
let timeFirstLeve3 = "--:--";
let timeEscapeRoom = "--:--";

let numberFailsCode = 0;
let numberTriesPuzzle = 0;
let numberFailsWord = 0;

let numberFailsMath = 0;

let acessSecretRoom = "Nao";
let numberBackpacks = 0;

let didWin = "";

function loadLevelAdmin(levelIndex) {
    if(levelIndex != levelLoad){
        clearGameObjects();
        player.x = 100;
        player.y = 150;
        player.speed = playerSpeed;
        loadLevel(levelIndex);
    }
}

// Função para reiniciar o timer
function restartTimer() {

    // Resetar o total de segundos para o valor original (20 minutos em segundos)
    totalSeconds = 20 * 60;
    // Atualizar o elemento do timer para exibir o tempo original
    timerElement.innerText = "20:00"; // Ou qualquer valor padrão que você deseje
    startTimer();
}

let bordas = false;

// Adicionar event listeners para os botões
document.getElementById('corredorBtn').addEventListener('click', function() {
    loadLevelAdmin(0);
});

document.getElementById('nivel1Btn').addEventListener('click', function() {
    loadLevelAdmin(1);
});

document.getElementById('nivel2Btn').addEventListener('click', function() {
    loadLevelAdmin(2);
});

document.getElementById('nivel3Btn').addEventListener('click', function() {
    loadLevelAdmin(3);
});

document.getElementById('restartGameBtn').addEventListener('click', function() {
    window.location.href = "../html/EscapeRoom.html";
});

document.getElementById('restartTimerBtn').addEventListener('click', function() {
    restartTimer();
});

document.getElementById('acabarJogoBtn').addEventListener('click', function() {
    window.location.href = '../html/endGame.html';
});

document.getElementById('bordasOnOffBtn').addEventListener('click', function() {
    if(bordas) bordas = false;
    else bordas = true;
});
