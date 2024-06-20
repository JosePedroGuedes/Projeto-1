function secretLevel() {
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    let backgroundElement = document.getElementById("gameCanvas");
    backgroundElement.style.backgroundImage = "url('../assets/backgrounds/SalaSecreta.png')";

    gameLoop();
    drawPlayer();
    accessSecretRoom = "Sim";
    secretDialog = true;
    

    function gameLoop() {
        if (levelLoad != -1) {
            return; // Se o jogo não estiver em execução, saia do loop
        }

        drawPlayer();

        requestAnimationFrame(gameLoop);
    }

    gameLoop();
    showDialog(19);
    
}