function loadLevel2() {
    
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    let backgroundElement = document.getElementById("gameCanvas");
    backgroundElement.style.backgroundImage = "url('../assets/backgrounds/SalaDesign.png')";

    function drawDoor() {
        ctx.drawImage(Sala2Door1Image, Sala2Door1.x, Sala2Door1.y, Sala2Door1.width, Sala2Door1.height);
    }

    let doorOpenRadius = 40;

    function checkDoorPassage() {
        let playerCenterX = player.x + player.width / 2;
        let playerCenterY = player.y + player.height / 2 + 30;
        let doorCenterX = (Sala2Door1.x + Sala2Door1.width / 2);
        let doorCenterY = Sala2Door1.y + Sala2Door1.height / 2 + 10;

        let distance = Math.sqrt(Math.pow(playerCenterX - doorCenterX, 2) + Math.pow(playerCenterY - doorCenterY, 2));

        return distance < doorOpenRadius && Sala2Door1.isOpen;
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
                drawObstacles();
            };
            obstacle.image.src = imagePath;
        }
        obstacles.push(obstacle);
    }

    function drawObstacles() {
        for (let obstacle of obstacles) {
            if (obstacle.image) {
                ctx.drawImage(obstacle.image, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
            }
            ctx.save();
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            ctx.strokeRect(obstacle.collisionArea.x, obstacle.collisionArea.y, obstacle.collisionArea.width, obstacle.collisionArea.height);
            ctx.restore();
        }
    }

    // Adding borders
    addObstacle(0, 105, 500, 10);
    addObstacle(0, 70, 15, 500);
    addObstacle(0, 480, 500, 10);
    addObstacle(485, 70, 15, 500);

    addObstacle(205, 165, 94, 46, '../assets/objects/Sala2-MesaProfessor.png', { x: 205, y: 190, width: 94, height: 20 });

    addObstacle(39, 262, 118, 38, '../assets/objects/Sala2-MesaPc.png', { x: 42, y: 285, width: 113, height: 20 });
    addObstacle(345, 262, 118, 38, '../assets/objects/Sala2-MesaPc.png', { x: 346, y: 285, width: 113, height: 20 });
    
    addObstacle(192, 270, 118, 35, '../assets/objects/Sala2-Mesa.png', { x: 195, y: 285, width: 112, height: 20 });
    addObstacle(38, 372, 118, 35, '../assets/objects/Sala2-Mesa.png', { x: 42, y: 385, width: 112, height: 20 });
    addObstacle(191, 372, 118, 35, '../assets/objects/Sala2-Mesa.png', { x: 195, y: 385, width: 112, height: 20 });
    addObstacle(346, 372, 118, 35, '../assets/objects/Sala2-Mesa.png', { x: 348, y: 385, width: 112, height: 20 });

    // Adding interactive squares
    let pcRadius = [
        { x: 95, y: 300, minigame: 1, finish: false},
        { x: 410, y: 300, minigame: 2 , finish: false}
    ];

    let interactionRadius = 80;
    let activeMinigame = null;

    function drawPcRadius() {
        ctx.save();
        ctx.fillStyle = 'blue';
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 2;
        for (let square of pcRadius) {
            ctx.fillRect(square.x, square.y, 0, 0);
            ctx.beginPath();
            ctx.arc(square.x, square.y, interactionRadius, 0, 2 * Math.PI);
            ctx.stroke();
        }
        ctx.restore();
    }

    function checkSquareInteraction() {
        for (let square of pcRadius) {
            let playerCenterX = player.x + player.width / 2;
            let playerCenterY = player.y + player.height / 2;
            let squareCenterX = square.x;
            let squareCenterY = square.y;

            let distance = Math.sqrt(Math.pow(playerCenterX - squareCenterX, 2) + Math.pow(playerCenterY - squareCenterY, 2));

            if (distance < interactionRadius && square.finish == false) {
                activeMinigame = square.minigame;
                return square.minigame;
            }
        }
        return null;
    }

    // Game loop
    function gameLoop() {
        if (levelLoad != 2) {
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
        }



        if (checkDoorPassage() && levelLoad == 2) {
            clearGameObjects();
            player.x = Sala2Door1.x - 50;
            player.y = Sala2Door1.y;
            loadLevel(0);
            return;
        }
        

        document.addEventListener("keydown", function(event) {
            if (event.code === 'KeyF' && checkSquareInteraction() && !stopMovement) {
                // Aqui você pode verificar qual quadrado está sendo interagido
                let minigame = checkSquareInteraction();
                
                // Verifica se ambos os minigames estão concluídos
                const isPuzzleComplete = pcRadius.find(square => square.minigame === 1 && !square.finish) === undefined;
                const isGuessWordComplete = pcRadius.find(square => square.minigame === 2 && !square.finish) === undefined;

                if (!isPuzzleComplete && !isGuessWordComplete) {
                    // Verifica se o minigame do quebra-cabeça foi concluído
                    if (checkPuzzleFinish()) {
                        // Altera o estado finish do primeiro minigame para true
                        const puzzleSquare = pcRadius.find(square => square.minigame === 1);
                        puzzleSquare.finish = true;
                    }
            
                    // Verifica se o minigame de adivinhação de palavras foi concluído
                    if (checkGuessFinish()) {
                        // Altera o estado finish do segundo minigame para true
                        const guessSquare = pcRadius.find(square => square.minigame === 2);
                        guessSquare.finish = true;
                    }
                }
                
                // Se ambos os minigames estiverem concluídos, mostra o diálogo 12
                if (isPuzzleComplete && isGuessWordComplete) {
                    showDialog(12);
                    return;
                }
        
                if (minigame === 1) {
                    // Verifique se o minigame do quebra-cabeça ainda não foi concluído
                    if (!isPuzzleComplete) {
                        openGamePuzzle();
                    } else {
                        // Se o minigame já estiver concluído, você pode adicionar uma mensagem ou lógica de tratamento aqui
                        showDialog(10);
                    }
                } else if (minigame === 2) {
                    // Verifique se o minigame de adivinhação de palavras ainda não foi concluído
                    if (!isGuessWordComplete) {
                        openGameGuessWord();
                    } else {
                        // Se o minigame já estiver concluído, você pode adicionar uma mensagem ou lógica de tratamento aqui
                        showDialog(11);
                    }
                }
            }
        });      

        drawPlayer();
        drawObstacles();
        drawDoor();
        drawPcRadius();

        requestAnimationFrame(gameLoop);
    }

    gameLoop();
}
