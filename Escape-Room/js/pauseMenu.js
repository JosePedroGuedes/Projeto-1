let isPaused = false;

// Menu de pausa
const pauseMenu = document.getElementById('pauseMenuContainer');
const controlsMenu = document.getElementById('controlsMenuContainer');
const continueButton = document.getElementById('continueButton');
const controlsButton = document.getElementById('controlsButton');
const exitButton = document.getElementById('exitButton');
const goBackButton = document.getElementById('goBackBtn');
const body = document.body;

// Função para pausar o jogo
function pauseGame() {
    isPaused = true;
    stopMovement = true;
    clearInterval(timerInterval);
    pauseMenu.style.display = 'block';
    controlsMenu.style.display = 'none';
    body.classList.add('menu-blur'); // Adiciona a classe para desfocar o fundo
    timerElement.classList.add("blink");
}

// Função para continuar o jogo
function continueGame() {
    isPaused = false;
    stopMovement = false;
    startTimer();

    pauseMenu.style.display = 'none';
    body.classList.remove('menu-blur'); // Remove a classe para desfocar o fundo
    timerElement.classList.remove("blink");
}

// Evento para pausar/continuar o jogo ao pressionar "Esc"
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && pauseMenu.style.display === 'block') {
        continueGame();
    } else if (event.key === 'Escape') {
        pauseGame();
    }
});

// Eventos dos botões do menu de pausa
continueButton.addEventListener('click', continueGame);
controlsButton.addEventListener('click', function() {
    pauseMenu.style.display = 'none';
    controlsMenu.style.display = 'block';

});

goBackButton.addEventListener('click', function() {
    pauseMenu.style.display = 'block';
    controlsMenu.style.display = 'none';
});

exitButton.addEventListener('click', function() {
    window.location.href = '/index.html';  // Redirecionar para a página inicial ou outra URL
});
