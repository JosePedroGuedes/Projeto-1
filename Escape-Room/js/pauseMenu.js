let isPaused = false; //para saber se o menu foi ativo
let isPopupOpen = false; //esta variavel é usada no quiz de matematica, mas como havia um bug que o jogador conseguia se mover depois de o menu estar fechado, teve que ser defenido aqui para o resolver

//Id´s do Menu de pausa
const pauseMenu = document.getElementById('pauseMenuContainer');
const controlsMenu = document.getElementById('controlsMenuContainer');
const continueButton = document.getElementById('continueButton');
const controlsButton = document.getElementById('controlsButton');
const exitButton = document.getElementById('exitButton');
const goBackButton = document.getElementById('goBackBtn');
const body = document.body;

// Função para pausar o jogo
function pauseGame() {
    //Fazer jogador não consiga andar
    isPaused = true;
    stopMovement = true;
    clearInterval(timerInterval); //Pausar tempo
    pauseMenu.style.display = 'block';
    controlsMenu.style.display = 'none';
    body.classList.add('menu-blur'); // Adiciona a classe para desfocar o fundo
    timerElement.classList.add("blink");  // Deixar o timer a piscar
}

// Função para continuar o jogo
function continueGame() {
    if(!isPopupOpen) {
        isPaused = false;
        stopMovement = false;
    }
    startTimer();

    pauseMenu.style.display = 'none';
    body.classList.remove('menu-blur'); // Remove a classe para desfocar o fundo
    timerElement.classList.remove("blink"); //Remover o piscar do timer
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
continueButton.addEventListener('click', continueGame);//botão para continuar o jogo

controlsButton.addEventListener('click', function() {//botão para ver o menu com os controlos
    pauseMenu.style.display = 'none';
    controlsMenu.style.display = 'block';

});
goBackButton.addEventListener('click', function() {//botão do menu de controlos para voltar para o menu de pausa
    pauseMenu.style.display = 'block';
    controlsMenu.style.display = 'none';
});
exitButton.addEventListener('click', function() {// Sair do escape room, que redireciona para a página inicial do site
    window.location.href = '/index.html';  
});
