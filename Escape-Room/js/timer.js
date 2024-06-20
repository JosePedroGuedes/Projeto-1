let timerElement = document.getElementById("timer");
let timerInterval;
let totalSeconds = 20 * 60;  // 20 minutos em segundos
let endGameTime = false;

// Função para iniciar o timer
function startTimer() {
    if (timerInterval) clearInterval(timerInterval);  // Limpar qualquer intervalo existente
    timerInterval = setInterval(updateTimer, 1000);
}

// Função para atualizar o timer a cada segundo
function updateTimer() {
    if(endGameTime) return;
    if (!isPaused) {
        if (totalSeconds > 0) {
            totalSeconds--;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = totalSeconds % 60;
            timerElement.innerText = pad(minutes) + ":" + pad(seconds);
        } else {
            endGameTime = true;
            clearInterval(timerInterval);
            didWin = false;
            endEscapeRoom();
            timerElement.innerText = "00:00";
        }
    }
}

// Função para adicionar um zero à esquerda de números menores que 10
function pad(val) {
    let valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}

// Função para adicionar tempo extra ao tempo existente
function addTime(minutesToAdd, secondsToAdd) {
    let additionalSeconds = minutesToAdd * 60 + secondsToAdd;
    totalSeconds += additionalSeconds;

    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    timerElement.innerText = pad(minutes) + ":" + pad(seconds);
}