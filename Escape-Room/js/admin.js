function loadLevelAdmin(levelIndex) {// FUnção para mudar de nivel com o admin
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

//Botões de mudar para outros níves 

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

//Reniciar Escape Room
document.getElementById('restartGameBtn').addEventListener('click', function() {
    window.location.href = "../html/EscapeRoom.html";
});

//Reniciar Timer
document.getElementById('restartTimerBtn').addEventListener('click', function() {
    restartTimer();
});

//Acabar o jogo
document.getElementById('acabarJogoBtn').addEventListener('click', function() {
    didWin = true;
    endEscapeRoom();
});

//Ativar/desativar as bordas
document.getElementById('bordasOnOffBtn').addEventListener('click', function() {
    if(bordas) bordas = false;
    else bordas = true;
});
