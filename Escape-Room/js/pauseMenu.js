let isPaused = false;

// Menu de pausa
const pauseMenu = document.getElementById('pauseMenu');
const continueButton = document.getElementById('continueButton');
const controlsButton = document.getElementById('controlsButton');
const exitButton = document.getElementById('exitButton');
const closeButton = document.getElementById('closeButton');
// Função para pausar o jogo

function pauseGame() {
    isPaused = true;
    stopMovement = true;
    clearInterval(timerInterval);
    pauseMenu.style.display = 'block';
    timerElement.classList.add("blink");
}

// Função para continuar o jogo
function continueGame() {
    isPaused = false;
    stopMovement = false;
    startTimer();
    pauseMenu.style.display = 'none';
    timerElement.classList.remove("blink");
}

// Evento para pausar/continuar o jogo ao pressionar "Esc"
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && menuContainer.style.display == "none") {
        if (isPaused) {
            continueGame();
        } else {
            pauseGame();
        }
    }
});

// Eventos dos botões do menu de pausa
continueButton.addEventListener('click', continueGame);
controlsButton.addEventListener('click', function() {
    alert("Controles:\nWASD ou setas para mover\nEsc para pausar");
});
exitButton.addEventListener('click', function() {
    window.location.href = '/index.html';  // Redirecionar para a página inicial ou outra URL
});
closeButton.addEventListener('click', continueGame);