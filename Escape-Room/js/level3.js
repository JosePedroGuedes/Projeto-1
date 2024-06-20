let dialogoInicialSala3 = false;

function loadLevel3() {
    if(!dialogoInicialSala3){
        showDialog(24);
        dialogoInicialSala3 = true;
    }
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    let backgroundElement = document.getElementById("gameCanvas");
    backgroundElement.style.backgroundImage = "url('../assets/backgrounds/SalaMatematica.png')";

    changeBoard();
    
    function drawDoor() {
        ctx.drawImage(Sala3Door1Image, Sala3Door1.x, Sala3Door1.y, Sala3Door1.width, Sala3Door1.height);
    }

    let doorOpenRadius = 50;

    function checkDoorPassage() {
        let playerCenterX = player.x + player.width / 2;
        let playerCenterY = player.y + player.height / 2 - 40;
        let doorCenterX = (Sala3Door1.x + Sala3Door1.width / 2) - 45;
        let doorCenterY = Sala3Door1.y + Sala3Door1.height / 2;

        let distance = Math.sqrt(Math.pow(playerCenterX - doorCenterX, 2) + Math.pow(playerCenterY - doorCenterY, 2));

        return distance < doorOpenRadius && Sala3Door1.isOpen;
    }

    const interactionArea = {
        x: 155,
        y: 60,
        width: 200,
        height: 70
    };

    function checkInteractionArea() {
        let playerCenterX = player.x + player.width / 2;
        let playerCenterY = player.y + player.height / 2;

        return playerCenterX > interactionArea.x &&
            playerCenterX < interactionArea.x + interactionArea.width &&
            playerCenterY > interactionArea.y &&
            playerCenterY < interactionArea.height + interactionArea.y;
    }

    function drawInteractionArea() {
        if(bordas){  
            ctx.save();
            ctx.strokeStyle = 'green';
            ctx.lineWidth = 2;
            ctx.strokeRect(interactionArea.x, interactionArea.y, interactionArea.width, interactionArea.height);
            ctx.restore();
        }
    }

    function drawMochila() {
        if (!mochila4.isPickedUp) {
            ctx.drawImage(Mochila4Image, mochila4.x, mochila4.y, mochila4.width, mochila4.height);
        }
    }

    let mochilaRadius = 55;

    function checkMochilaInteraction() {
        if (!mochila4.isPickedUp) {
            let playerCenterX = player.x + player.width / 2;
            let playerCenterY = player.y + player.height / 2;
            let mochilaCenterX = mochila4.x + mochila4.width / 2;
            let mochilaCenterY = mochila4.y + mochila4.height / 2;

            let distance = Math.sqrt(Math.pow(playerCenterX - mochilaCenterX, 2) + Math.pow(playerCenterY - mochilaCenterY, 2));

            return distance < mochilaRadius;
        }
        return false;
    }

    function addObstacle(x, y, width, height, imagePath, collisionArea) {
        const obstacle = { x, y, width, height, imagePath };

        if (collisionArea) {
            obstacle.collisionArea = collisionArea;
        } else {
            obstacle.collisionArea = { x, y, width, height };
        }

        if (imagePath) {
            obstacle.image = new Image();
            obstacle.image.onload = function() {
                drawObstacles(); // Chama a função para desenhar os obstáculos após o carregamento da imagem
            };
            obstacle.image.onerror = function() {
                console.error("Erro ao carregar imagem:", imagePath);
            };
            obstacle.image.src = imagePath; // Define o src da imagem
        }

        obstacles.push(obstacle);
    }

    function drawObstacles() {

        for (let obstacle of obstacles) {
            if (obstacle.image) {
                ctx.drawImage(obstacle.image, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
            }
            // Draw collision areas for debugging
            if (bordas) {
                ctx.save();
                ctx.strokeStyle = 'red';
                ctx.lineWidth = 2;
                ctx.strokeRect(obstacle.collisionArea.x, obstacle.collisionArea.y, obstacle.collisionArea.width, obstacle.collisionArea.height);
                ctx.restore();
            }
        }
    }

    //Bordas
    addObstacle(0, 75, 500, 10);
    addObstacle(0, 70, 15, 500);
    addObstacle(0, 480, 500, 20, '../assets/objects/BordaFundo.png', { x: 0, y: 500, width: 500, height: 10 });
    addObstacle(485, 70, 15, 500);

    // Mesa Professor
    addObstacle(378, 138, 94, 21, '../assets/objects/Sala3-MesaProfessor.png', { x: 378, y: 153, width: 94, height: 10 });

    //Mesas
    addObstacle(290, 222, 182, 18, '../assets/objects/Sala3-Mesa.png', { x: 290, y: 232, width: 182, height: 10 });
    addObstacle(290, 305, 182, 18, '../assets/objects/Sala3-Mesa.png', { x: 290, y: 315, width: 182, height: 10 });
    addObstacle(290, 388, 182, 18, '../assets/objects/Sala3-Mesa.png', { x: 290, y: 398, width: 182, height: 10 });
    addObstacle(38, 222, 182, 18, '../assets/objects/Sala3-Mesa.png', { x: 38, y: 232, width: 182, height: 10 });
    addObstacle(38, 305, 182, 18, '../assets/objects/Sala3-Mesa.png', { x: 38, y: 315, width: 182, height: 10 });
    addObstacle(38, 388, 182, 18, '../assets/objects/Sala3-Mesa.png', { x: 38, y: 398, width: 182, height: 10 });

    //Lixo
    addObstacle(15, 90, 22, 10);



    function gameLoop() {
        if (levelLoad != 3) {
            document.getElementById("mathQuizBox").style.display = "none";
            return; // Se o jogo não estiver em execução, saia do loop
        }
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

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

            if (isKeyPressed('KeyF') && !stopMovement && !isPaused && levelLoad == 3) {
                if (checkInteractionArea() && !stopMovement && !isPaused && !mathFinish && !isPopupOpen) {
                    showQuadroPopup();
                    generateMathQuestions();
                } else if (checkMochilaInteraction() && !mochila4.isPickedUp) {
                    mochila4.isPickedUp = true;
                    addToInventory({ name: 'Mochila4', imageSrc: '../assets/inventory/Mochila4.png' });
                }
            }
        }

        if (checkDoorPassage() && levelLoad == 3) {
            clearGameObjects();
            player.x = CorredorSala3.x - 50;
            player.y = CorredorSala3.y;
            loadLevel(0);
            return;
        }

        drawMochila();
        drawPlayer();
        drawObstacles();
        drawDoor();
        drawInteractionArea(); // Desenha a área de interação

        requestAnimationFrame(gameLoop);
    }

    gameLoop();

}