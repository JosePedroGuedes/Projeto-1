const userInfo = JSON.parse(sessionStorage.getItem("loggedUser"));
if(!userInfo){
    window.location.href = '/index.html';
}
const username = userInfo.username;
const idUser = userInfo.id;
console.log("Bem vindo ao Escape Room " + username);

const adminPainelContainer = document.getElementById("adminPainel");
const timerContainer = document.getElementById("timerContainer");
const canvaContainer = document.getElementById("gameContainer");
const inventoryContainer = document.getElementById("inventoryContainer");
const menuContainer = document.getElementById("menuContainer");
const spanUsername = document.getElementById("spanUsername");
const endGameContainer = document.getElementById("endGameContainer");
const leaderboardContainer = document.getElementById("leaderboardContainer");

window.onload = function () {
    timerContainer.style.display = "none";
    inventoryContainer.style.display = "none";
    adminPainelContainer.style.display = "none";
    canvaContainer.style.display = "none";
    endGameContainer.style.display = "none";
    spanUsername.innerText = username;
    clearInterval(timerInterval);
};

document.getElementById('startGameBtn').addEventListener('click', function() {
    startEscapeRoom();
});

document.getElementById('exitGameBtn').addEventListener('click', function() {
    window.location.href = '/index.html';
});

document.getElementById('leaderBoardBtn').addEventListener('click', function() {
    showLeaderBoard();
});

document.getElementById('leaderBoardEndBtn').addEventListener('click', function() {
    showLeaderBoard();
});

document.getElementById('LeaderGoBackeBtn').addEventListener('click', function() {
    leaderboardContainer.style.display = "none";
    if(timeEscapeRoom != "--:--") {
        menuContainer.style.display = "none";
        endGameContainer.style.display = "block";
    }
    else {
        menuContainer.style.display = "block";
        endGameContainer.style.display = "none";
    }
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

function endEscapeRoom() {
    timerContainer.style.display = "none";
    canvaContainer.style.display = "none";
    inventoryContainer.style.display = "none";
    menuContainer.style.display = "none";
    endGameContainer.style.display = "block";
    timeEscapeRoom = timerElement.innerText;
    updateStats();
}

function showLeaderBoard() {
    leaderboardContainer.style.display = "block";
    menuContainer.style.display = "none";
    endGameContainer.style.display = "none";

    // Obtendo usuários do localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Filtrando usuários válidos e ordenando pelo tempo (menor para maior)
    users = users.filter(user => user.username.toLowerCase() !== "admin" && user.bestTime !== "--:--" && user.bestTime)
                 .sort((a, b) => {
                     // Convertendo para segundos apenas se bestTime for uma string válida
                     const timeA = timeToSeconds(a.bestTime);
                     const timeB = timeToSeconds(b.bestTime);
                     return timeB - timeA;
                 });

    // Selecionando a tabela no HTML
    const leaderboardTable = document.querySelector("#leaderboardContainer table tbody");

    // Limpando o conteúdo existente da tabela
    leaderboardTable.innerHTML = "";

    // Preenchendo a tabela com os 10 melhores usuários ordenados
    users.slice(0, 10).forEach((user, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.username}</td>
            <td>${user.bestTime}</td>
        `;
        leaderboardTable.appendChild(row);
    });
}

// Função auxiliar para converter tempo em formato MM:SS para segundos inteiros
function timeToSeconds(timeString) {
    if (!timeString || timeString === "--:--") return 0; // Tratar tempos inválidos
    const [minutes, seconds] = timeString.split(":").map(num => parseInt(num));
    return minutes * 60 + seconds;
}

let levelLoad = 1;
function loadLevel(levelNumber) {
    clearGameObjects();
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
        case -1:
            levelLoad = -1;
            secretLevel();
            console.log("Descobriu o nível secreto");
            break;
        default:
            console.error("Nível não encontrado:", levelNumber);
            break;
    }
}