function updateStats() {
    document.getElementById("spanUsername").textContent = username;

    document.getElementById("timeFirstLevel").textContent = timeFirstLevel;
    document.getElementById("timeFirstLevel2").textContent = timeFirstLevel2;
    document.getElementById("timeFirstLevel3").textContent = timeFirstLevel3;
    document.getElementById("timeEscapeRoom").textContent = timeEscapeRoom;

    document.getElementById("numberFailsCode").textContent = numberFailsCode;
    document.getElementById("numberTriesPuzzle").textContent = numberTriesPuzzle;
    document.getElementById("numberFailsWord").textContent = numberFailsWord;
    document.getElementById("numberFailsMath").textContent = numberFailsMath;
    document.getElementById("acessSecretRoom").textContent = acessSecretRoom;
    document.getElementById("numberBackpacks").textContent = numberBackpacks;
}
