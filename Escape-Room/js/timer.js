let timerElement = document.getElementById("timer");
let timerInterval;
let totalSeconds = 20 * 60;  // 20 minutes in seconds

// Função para iniciar o timer
function startTimer() {
    if (timerInterval) clearInterval(timerInterval);  // Limpar qualquer intervalo existente
    timerInterval = setInterval(updateTimer, 1000);
}

// Função para atualizar o timer a cada segundo
function updateTimer() {
    if (!isPaused) {
        if (totalSeconds > 0) {
            totalSeconds--;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = totalSeconds % 60;
            timerElement.innerText = pad(minutes) + ":" + pad(seconds);
        } else {
            clearInterval(timerInterval);
            alert("O tempo acabou!");
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

function addTime(minutesToAdd, secondsToAdd) {
    let additionalSeconds = minutesToAdd * 60 + secondsToAdd;
    totalSeconds += additionalSeconds;

    // Atualizar a exibição do timer imediatamente
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    timerElement.innerText = pad(minutes) + ":" + pad(seconds);
}