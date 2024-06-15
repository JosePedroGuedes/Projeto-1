
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
        default:
            console.error("Nível não encontrado:", levelNumber);
            break;
    }
}

const userInfo = JSON.parse(sessionStorage.getItem("loggedUser"));
const username = userInfo.username;
console.log(username);

const adminPainelContainer = document.getElementById("adminPainel");
const timerContainer = document.getElementById("timerContainer");
const canvaContainer = document.getElementById("gameContainer");
const inventoryContainer = document.getElementById("inventoryContainer");
const menuContainer = document.getElementById("menuContainer");


window.onload = function () {
    timerContainer.style.display = "none";
    inventoryContainer.style.display = "none";
    adminPainelContainer.style.display = "none";
    canvaContainer.style.display = "none";
};

document.getElementById('startGameBtn').addEventListener('click', function() {
    startEscapeRoom();
});

function startEscapeRoom() {
    restartTimer();
    loadLevel(1);
    stopMovement = false;

    if (username == "Admin" || username == "admin") {
        adminPainelContainer.style.display = "block";
    }
    timerContainer.style.display = "block";
    canvaContainer.style.display = "block";
    inventoryContainer.style.display = "block";
    menuContainer.style.display = "none";
}