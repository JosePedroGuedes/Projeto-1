function secretLevel() {
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    let backgroundElement = document.getElementById("gameCanvas");
    backgroundElement.style.backgroundImage = "url('../assets/backgrounds/SalaSecreta.png')";

    gameLoop();
    drawPlayer(); //Desenha o player

    //Guarda nas estatistica que entraste no nivel secreto
    accessSecretRoom = "Sim";
    secretDialog = true;
    

    function gameLoop() {
        if (levelLoad != -1) {
            return; // Se o jogo não estiver no respetivo nivel, não deixa o loop avançar
        }

        //Desenha o player
        drawPlayer();

        requestAnimationFrame(gameLoop);
    }

    gameLoop();
    showDialog(19); //Mostrar dialogo da sala
    
}