let timeLevel1 = "--:--";
let timeLevel2 = "--:--";
let timeLevel3 = "--:--";
let timeEscapeRoom = "--:--";
let personalBestTime = "--:--"; // Adicione esta variável se for necessária

let numberFailsCode = 0;
let numberTriesPuzzle = 0;
let numberFailsWord = 0;
let numberFailsMath = 0;
let numberFinalFails = 0; // Adicione esta variável se for necessária

let accessSecretRoom = "Nao";
let numberBackpacks = 0;

let didWin = false;

function updateStats() {
    document.getElementById("spanUsername").innerText = username;

    document.getElementById("timeLevel1").innerText = timeLevel1;
    document.getElementById("timeLevel2").innerText = timeLevel2;
    document.getElementById("timeLevel3").innerText = timeLevel3;
    document.getElementById("timeEscapeRoom").innerText = timeEscapeRoom;
    document.getElementById("personalBestTime").innerText = personalBestTime; // Atualize esta linha se necessário

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

