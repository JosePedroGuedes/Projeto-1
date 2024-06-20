// Obter que user está atualmente a jogar
const userInfo = JSON.parse(sessionStorage.getItem("loggedUser"));
if(!userInfo){
    window.location.href = '/html/login.html';
}
const username = userInfo.username;
const idUser = userInfo.id;
console.log("Bem vindo ao Escape Room " + username);

// Meter em variaveis os Id's de todos os menus e paineis para poderem serem modificados
const adminPainelContainer = document.getElementById("adminPainel");
const timerContainer = document.getElementById("timerContainer");
const canvaContainer = document.getElementById("gameContainer");
const inventoryContainer = document.getElementById("inventoryContainer");
const menuContainer = document.getElementById("menuContainer");
const spanUsername = document.getElementById("spanUsername");
const endGameContainer = document.getElementById("endGameContainer");
const leaderboardContainer = document.getElementById("leaderboardContainer");

window.onload = function () { //Ao iniciar a página, esconder tudo que não seja o menu principal
    timerContainer.style.display = "none";
    inventoryContainer.style.display = "none";
    adminPainelContainer.style.display = "none";
    canvaContainer.style.display = "none";
    endGameContainer.style.display = "none";
    spanUsername.innerText = username;
    clearInterval(timerInterval);
};

// Eventos de clique de botões dos menus
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

// Função usada para obter os valores para serem mostrados no Leaderboard
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

    // Adicionando os 10 melhores usuários ordenados
    users.slice(0, 10).forEach((user, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.username}</td>
            <td>${user.bestTime}</td>
        `;
        leaderboardTable.appendChild(row);
    });

    // Adicionando a linha para o recorde do usuário logado
    const userRecordRow = document.createElement("tr");
    userRecordRow.classList.add("user-record");
    userRecordRow.innerHTML = `
        <td>Teu recorde</td>
        <td>${userInfo.username}</td>
        <td>${userInfo.bestTime}</td>
    `;
    leaderboardTable.appendChild(userRecordRow);
}


// Função auxiliar para converter tempo em formato MM:SS para segundos inteiros
function timeToSeconds(timeString) {
    if (!timeString || timeString === "--:--") return 0; // Tratar tempos inválidos
    const [minutes, seconds] = timeString.split(":").map(num => parseInt(num));
    return minutes * 60 + seconds;
}

// Função que começa o escaoe room
function startEscapeRoom() {
    restartTimer();
    loadLevel(1);
    stopMovement = false;

    if (username == "Admin" || username == "admin") { // Mostrar o painel de Admin caso seja ele quem esteja logado
        adminPainelContainer.style.display = "block";
    }
    timerContainer.style.display = "block";
    canvaContainer.style.display = "block";
    inventoryContainer.style.display = "block";
    menuContainer.style.display = "none";
}

// Função que começa o escaoe room
function endEscapeRoom() {
    timerContainer.style.display = "none";
    canvaContainer.style.display = "none";
    inventoryContainer.style.display = "none";
    menuContainer.style.display = "none";
    endGameContainer.style.display = "block";
    timeEscapeRoom = timerElement.innerText;
    endGameTime = true;
    updateStats();
}

// FUnção responsável por trocar de níveis e apagar todos os objetos desenhados do nível anterior
let levelLoad = 1;
function loadLevel(levelNumber) {
    clearGameObjects();
    document.getElementById('mathQuizBox').style.display = "none"; //este texto deu problemas de aparecer onde não devia, e isto é para prevenir isso
    switch (levelNumber) {
        case 0:
            levelLoad = 0;
            corredor();
            if(username == "admin") console.log("Entrou no corredor");
            break;
        case 1:
            levelLoad = 1;
            loadLevel1();
            if(username == "admin") console.log("Entrou no nível 1");
            break;
        
        case 2:
            levelLoad = 2;
            loadLevel2();    
            if(username == "admin") console.log("Entrou no nível 2");
            break;
        case 3:
            levelLoad = 3;
            loadLevel3();
            if(username == "admin") console.log("Entrou no nível 3");
            break;
        case -1:
            levelLoad = -1;
            secretLevel();
            if(username == "admin") console.log("Descobriu o nível secreto");
            break;
        default:
            console.error("Nível não encontrado:", levelNumber);
            break;
    }
}