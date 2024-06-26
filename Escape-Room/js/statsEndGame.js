// Variáveis de estatísticas que serão usadas no menu final
let timeLevel1 = "--:--";
let timeLevel2 = "--:--";
let timeLevel3 = "--:--";
let timeEscapeRoom = "--:--";

let numberFailsCode = 0;
let numberTriesPuzzle = 0;
let numberFailsWord = 0;
let numberFailsMath = 0;

let accessSecretRoom = "Nao";
let numberBackpacks = 0;

let didWin = false;

// Obtém usuário logado e todos os usuários do localStorage
let userLogged = JSON.parse(sessionStorage.getItem("loggedUser"));
let allUsers = JSON.parse(localStorage.getItem("users"));

// Atualiza as estatísticas da interface do menu final
function updateStats() {
    if(didWin) document.getElementById("titleEndGame").innerText = "Muitos Parabéns!! Chegaste ao fim do jogo!";
    else document.getElementById("titleEndGame").innerText = "O tempo acabou. Para a próxima corre melhor!!";
    
    document.getElementById("spanUsernameEnd").innerText = userLogged.username;

    document.getElementById("timeLevel1").innerText = timeLevel1;
    document.getElementById("timeLevel2").innerText = timeLevel2;
    document.getElementById("timeLevel3").innerText = timeLevel3;
    document.getElementById("timeEscapeRoom").innerText = timeEscapeRoom;

    let bestTimeStorage = updateBestTime(timeEscapeRoom);

    if(timeEscapeRoom === bestTimeStorage) {
        document.getElementById("personalBestTime").innerText = timeEscapeRoom + " Novo Recorde!!";
        document.getElementById("personalBestTime").style.color = "red";
    } else {
        document.getElementById("personalBestTime").innerText = bestTimeStorage;
        document.getElementById("personalBestTime").style.color = "black";
    }

    document.getElementById("numberFailsCode").innerText = numberFailsCode;
    document.getElementById("numberTriesPuzzle").innerText = numberTriesPuzzle;
    document.getElementById("numberFailsWord").innerText = numberFailsWord;
    document.getElementById("numberFailsMath").innerText = numberFailsMath;
    document.getElementById("accessSecretRoom").innerText = accessSecretRoom;
}

// Event listeners para os botões
document.getElementById('exitEndGameBtn').addEventListener('click', function () {
    window.location.href = '/index.html';
});

document.getElementById('replayGameBtn').addEventListener('click', function () {
    window.location.href = "../html/EscapeRoom.html";
});

// Função para obter o melhor tempo do utilizador como também atuaizá-lo caso seja melhor
function updateBestTime(currentTime) {

    const parseTime = (timeString) => { // Converter a string do bestTime para segundos
        if (timeString === "--:--") return 0; 
        const [minutes, seconds] = timeString.split(":").map(Number);
        if (isNaN(minutes) || isNaN(seconds)) {
            return 0;
        }
        return minutes * 60 + seconds;
    };

    if (userLogged && userLogged.bestTime !== undefined) {
        const currentBestTotalSeconds = parseTime(userLogged.bestTime);
        const currentTotalSeconds = parseTime(currentTime);

        if (currentTotalSeconds > currentBestTotalSeconds ) { // Atualizar o tempo recorde do utilizador na localStorage caso seja maior que a guardada
            userLogged.bestTime = currentTime;
            sessionStorage.setItem("loggedUser", JSON.stringify(userLogged));

            if (Array.isArray(allUsers)) {
                // Encontrar o usuário no array allUsers pelo ID
                const userToUpdate = allUsers.find(u => u.id === userLogged.id);
                if (userToUpdate) {
                    userToUpdate.bestTime = currentTime;
                    localStorage.setItem("users", JSON.stringify(allUsers));
                }
            }
        }
    }

    return userLogged.bestTime;
}

