
let levelLoad = 1;
// Função para carregar o nível desejado
function loadLevel(levelNumber) {
    // Limpa os objetos do jogo
    clearGameObjects();
    // Carrega o nível específico
    switch (levelNumber) {
        case 0:
            levelLoad = 0;
            corredor();
            console.log("Entrou no corredor");
            break;
        case 1:
            levelLoad = 1;
            loadLevel1();
            console.log("Entrou no nível 1");
            break;
        
        case 2:
            levelLoad = 2;
            loadLevel2();    
            console.log("Entrou no nível 2");
            break;
        case 3:
            levelLoad = 3;
            loadLevel3();
            console.log("Entrou no nível 3");
            break;
        case 4:
            levelLoad = 4;
            loadLevel4();   
            console.log("Entrou no nível 4");
            break;
        default:
            console.error("Nível não encontrado:", levelNumber);
            break;
    }
}

window.onload = function() {
    startTimer();
    loadLevel(1);
};

function clearGameObjects() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    obstacles = [];
}