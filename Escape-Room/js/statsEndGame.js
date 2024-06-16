let timeLevel1 = "--:--";
let timeLevel2 = "--:--";
let timeLevel3 = "--:--";
let timeEscapeRoom = "--:--";

let numberFailsCode = 0;
let numberTriesPuzzle = 0;
let numberFailsWord = 0;
let numberFailsMath = 0;
let numberFinalFails = 0; // Adicione esta variável se for necessária

let accessSecretRoom = "Nao";
let numberBackpacks = 0;

let didWin = false;

// Obtém usuário logado e todos os usuários do localStorage
let userLoggedSession = JSON.parse(sessionStorage.getItem("loggedUser"));
let userLoggedLocal = JSON.parse(localStorage.getItem("loggedUser"));
let allUsers = JSON.parse(localStorage.getItem("users"));

function updateStats() {
    document.getElementById("spanUsernameEnd").innerText = userLoggedSession.username;

    document.getElementById("timeLevel1").innerText = timeLevel1;
    document.getElementById("timeLevel2").innerText = timeLevel2;
    document.getElementById("timeLevel3").innerText = timeLevel3;
    document.getElementById("timeEscapeRoom").innerText = timeEscapeRoom;

    if(updateBestTime(timeEscapeRoom) == timeEscapeRoom) {
        document.getElementById("personalBestTime").innerText = updateBestTime(timeEscapeRoom) + " Novo Recorde!!";
        document.getElementById("personalBestTime").style.color = "red";
    } else {
        document.getElementById("personalBestTime").innerText = updateBestTime(timeEscapeRoom);
        document.getElementById("personalBestTime").style.color = "black";
    }

    document.getElementById("numberFailsCode").innerText = numberFailsCode;
    document.getElementById("numberTriesPuzzle").innerText = numberTriesPuzzle;
    document.getElementById("numberFailsWord").innerText = numberFailsWord;
    document.getElementById("numberFailsMath").innerText = numberFailsMath;
    document.getElementById("numberFinalFails").innerText = numberFinalFails; // Atualize esta linha se necessário
    document.getElementById("accessSecretRoom").innerText = accessSecretRoom;
}

document.getElementById('exitGameBtn').addEventListener('click', function () {
    window.location.href = '/index.html';
});

document.getElementById('replayGameBtn').addEventListener('click', function () {
    window.location.href = "../html/EscapeRoom.html";
});

function updateBestTime(currentTime) {
    const parseTime = (timeString) => {
        const [minutes, seconds] = timeString.split(":").map(Number);
        return minutes * 60 + seconds;
    };

    if (userLoggedSession && userLoggedSession.bestTime !== undefined) {
        const currentBestTotalSeconds = userLoggedSession.bestTime === "--:--" ? Infinity : parseTime(userLoggedSession.bestTime);
        const currentTotalSeconds = parseTime(currentTime);

        if (currentTotalSeconds > currentBestTotalSeconds) {
            userLoggedSession.bestTime = currentTime;
            sessionStorage.setItem("loggedUser", JSON.stringify(userLoggedSession));

            if (userLoggedLocal) {
                userLoggedLocal.bestTime = currentTime;
                localStorage.setItem("loggedUser", JSON.stringify(userLoggedLocal));
            }
            
            if (Array.isArray(allUsers)) {
                const userToUpdate = allUsers.find(u => u.id === userLoggedSession.id);
                userToUpdate.bestTime = currentTime;
                localStorage.setItem("users", JSON.stringify(allUsers));
                
            }
        }
    }

    // Atualiza o usuário no array allUsers, se existir
    

    return userLoggedSession.bestTime;
}


