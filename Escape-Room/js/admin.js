
function loadLevelAdmin(levelIndex) {
    if(levelIndex != levelLoad){
        clearGameObjects();
        player.x = 100;
        player.y = 150;
        player.speed = playerSpeed;
        loadLevel(levelIndex);
    }
}

function restartTimer() {
    // Parar o intervalo existente, se houver
    clearInterval(timerInterval);
    // Resetar o total de segundos para o valor original (20 minutos em segundos)
    totalSeconds = 20 * 60;
    // Atualizar o elemento do timer para exibir o tempo original
    timerElement.innerText = "20:00"; // Ou qualquer valor padrão que você deseje
    startTimer();
}