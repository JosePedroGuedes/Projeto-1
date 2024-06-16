function secretLevel() {
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    let backgroundElement = document.getElementById("gameCanvas");
    backgroundElement.style.backgroundImage = "url('../assets/backgrounds/SalaSecreta.png')";


    function drawDoor() {
        ctx.drawImage(Sala1Door1Image, Sala1Door1.x, Sala1Door1.y, Sala1Door1.width, Sala1Door1.height);
    }

    let doorOpenRadius = 40;

    function checkDoorPassage() {
        let playerCenterX = player.x + player.width / 2;
        let playerCenterY = player.y + player.height / 2;
        let doorCenterX = (Sala1Door1.x + Sala1Door1.width / 2) - 35;
        let doorCenterY = Sala1Door1.y + Sala1Door1.height / 2;

        let distance = Math.sqrt(Math.pow(playerCenterX - doorCenterX, 2) + Math.pow(playerCenterY - doorCenterY, 2));

        return distance < doorOpenRadius && Sala1Door1.isOpen;
    }

    function drawDoorOpenArea() {
        if(bordas){  
            ctx.save();
            ctx.strokeStyle = 'blue';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(Sala1Door1.x + Sala1Door1.width / 2 + 20, Sala1Door1.y + Sala1Door1.height / 2, doorOpenRadius, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.restore();
        }
    }


    function gameLoop() {
        if (levelLoad != -1) {
            return; // Se o jogo não estiver em execução, saia do loop
        }

        if (player && player.dx !== undefined && player.dy !== undefined) {
            let nextX = player.x + player.dx;
            let nextY = player.y + player.dy;

            let collidesX = checkCollision(player.dx, 0);
            let collidesY = checkCollision(0, player.dy);

            if (collidesX || collidesY) {
                if (!collidesX) {
                    player.x = nextX;
                }
                if (!collidesY) {
                    player.y = nextY;
                }
            } else {
                player.x = nextX;
                player.y = nextY;
            }

        }

        if (checkDoorPassage() && levelLoad == -1) {
            clearGameObjects();
            player.x = CorredorSala4.x - 50;
            player.y = CorredorSala4.y - 123;
            loadLevel(0);
            return;
        }

        drawPlayer();
        drawDoor();

        requestAnimationFrame(gameLoop);
    }

    gameLoop();
    
}