let dialogoInicialSala2 = false;
let dialogoGamePuzzle = false;
let dialogoGameWord = false;

function loadLevel2() {
    if(!dialogoInicialSala2){
        showDialog(23);
        dialogoInicialSala2 = true;
    }
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    let backgroundElement = document.getElementById("gameCanvas");
    backgroundElement.style.backgroundImage = "url('../assets/backgrounds/SalaDesign.png')";

    function drawDoor() {
        ctx.drawImage(Sala2Door1Image, Sala2Door1.x, Sala2Door1.y, Sala2Door1.width, Sala2Door1.height);
    }

    function drawMochila() {
        if (!mochila3.isPickedUp) {
            ctx.drawImage(Mochila3Image, mochila3.x, mochila3.y, mochila3.width, mochila3.height);
        }
    }

    let mochilaRadius = 55;

    function checkMochilaInteraction() {
        if (!mochila3.isPickedUp) {
            let playerCenterX = player.x + player.width / 2;
            let playerCenterY = player.y + player.height / 2;
            let mochilaCenterX = mochila3.x + mochila3.width / 2;
            let mochilaCenterY = mochila3.y + mochila3.height / 2;

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
        }
    }

    // Bordas
    addObstacle(0, 105, 500, 10);
    addObstacle(0, 70, 15, 500);
    addObstacle(0, 480, 500, 20, '../assets/objects/BordaFundo.png', { x: 0, y: 500, width: 500, height: 10 });
    addObstacle(485, 70, 15, 500);

    // Mesa Professor
    addObstacle(205, 165, 94, 35, '../assets/objects/Sala2-MesaProfessor.png', { x: 205, y: 190, width: 94, height: 12 });

    // Mesa com Pc
    addObstacle(39, 262, 118, 28, '../assets/objects/Sala2-MesaPc.png', { x: 42, y: 285, width: 113, height: 8 });
    addObstacle(345, 262, 118, 28, '../assets/objects/Sala2-MesaPc.png', { x: 346, y: 285, width: 113, height: 8 });

    // Mesas
    addObstacle(192, 270, 118, 19, '../assets/objects/Sala2-Mesa.png', { x: 195, y: 285, width: 112, height: 8 });
    addObstacle(38, 372, 118, 19, '../assets/objects/Sala2-Mesa.png', { x: 42, y: 385, width: 112, height: 8 });
    addObstacle(191, 372, 118, 19, '../assets/objects/Sala2-Mesa.png', { x: 195, y: 385, width: 112, height: 8 });
    addObstacle(346, 372, 118, 19, '../assets/objects/Sala2-Mesa.png', { x: 348, y: 385, width: 112, height: 8 });

    // Adding interactive squares
    let pcRadius = [
        { x: 95, y: 300, minigame: 1, finish: false },
        { x: 410, y: 300, minigame: 2, finish: false }
    ];

    let interactionRadius = 80;

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

    function drawBorders() {
        if (bordas) {
            ctx.save();
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            for (let obstacle of obstacles) {
                if (obstacle.collisionArea) {
                    ctx.strokeRect(obstacle.collisionArea.x, obstacle.collisionArea.y, obstacle.collisionArea.width, obstacle.collisionArea.height);
                }
            }

            ctx.strokeStyle = 'yellow';
            ctx.lineWidth = 2;
            ctx.strokeRect(passageRect.x, passageRect.y, passageRect.width, passageRect.height);

            ctx.strokeStyle = 'blue';
            ctx.lineWidth = 2;
            for (let square of pcRadius) {
                ctx.beginPath();
                ctx.arc(square.x, square.y, interactionRadius, 0, 2 * Math.PI);
                ctx.stroke();
            }

            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
            if (!mochila3.isPickedUp) {
                ctx.beginPath();
                ctx.arc(mochila3.x + mochila3.width / 2, mochila3.y + mochila3.height / 2, mochilaRadius, 0, 2 * Math.PI);
                ctx.stroke();
            }
            ctx.restore();
        }
    }

    const passageRect = {
        x: Sala2Door1.x + 20, // Coordenada x do retângulo de passagem
        y: Sala2Door1.y + 50, // Coordenada y do retângulo de passagem
        width: 15, // Largura do retângulo de passagem
        height: 35, // Altura do retângulo de passagem
    };

    function checkPassageRectDoorCollision() {
        let playerCenterX = player.x + player.width / 2;
        let playerCenterY = player.y + player.height / 2;
        let passageRectCenterX = passageRect.x + passageRect.width / 2;
        let passageRectCenterY = passageRect.y + passageRect.height / 2;
    
        let distanceX = Math.abs(playerCenterX - passageRectCenterX);
        let distanceY = Math.abs(playerCenterY - passageRectCenterY);
    
        // Definindo um threshold menor para a largura e altura
        let thresholdX = (player.width / 2) + (passageRect.width / 2) - 20;
        let thresholdY = (player.height / 2) + (passageRect.height / 2) - 20;
    
        return distanceX < thresholdX && distanceY < thresholdY;
    }

    // Listener de eventos fora do loop de jogo
    document.addEventListener("keydown", function (event) {
        if (event.code === 'KeyF' && checkSquareInteraction() && !stopMovement && levelLoad == 2) {
            // Aqui você pode verificar qual quadrado está sendo interagido
            let minigame = checkSquareInteraction();

            // Verifica se ambos os minigames estão concluídos
            let isPuzzleComplete = pcRadius.find(square => square.minigame === 1 && !square.finish) === undefined;
            let isGuessWordComplete = pcRadius.find(square => square.minigame === 2 && !square.finish) === undefined;

            // Verifica e atualiza o estado dos minigames
            if (!isPuzzleComplete || !isGuessWordComplete) {
                if (checkPuzzleFinish()) {
                    let puzzleSquare = pcRadius.find(square => square.minigame === 1);
                    puzzleSquare.finish = true;
                    isPuzzleComplete = true; // Atualiza o estado localmente
                    
                }

                if (!isGuessWordComplete) {
                    if (checkGuessFinish()) {
                        let guessSquare = pcRadius.find(square => square.minigame === 2);
                        guessSquare.finish = true;
                        isGuessWordComplete = true; // Atualiza o estado localmente
                    }
                }
            }

            // Se ambos os minigames estiverem concluídos, mostra o diálogo 12
            if (isPuzzleComplete && isGuessWordComplete) {
                showDialog(12);
                return;
            }

            // Abre os minigames se ainda não estiverem concluídos
            if (minigame === 1) {
                if (!isPuzzleComplete) {
                    openGamePuzzle();
                    if(!dialogoGamePuzzle) {
                        console.log(12);
                        showDialog(26);
                        dialogoGamePuzzle = true;
                    }
                } else {
                    showDialog(10);
                }
            } else if (minigame === 2) {
                if (!isGuessWordComplete) {
                    openGameGuessWord();
                    if(!dialogoGameWord) {
                        showDialog(27);
                        dialogoGameWord = true;
                    }
                } else {
                    showDialog(11);
                }
            }
        } 
        
        
    });

    // Game loop
    function gameLoop() {
        if (levelLoad != 2) {
            return; // Se o jogo não estiver em execução, saia do loop
        }

        if (isKeyPressed('KeyF') && checkMochilaInteraction() && !mochila3.isPickedUp) {
            mochila3.isPickedUp = true;
            addToInventory({ name: 'Mochila3', imageSrc: '../assets/inventory/Mochila3.png' });
        }

        if(minigamesOn == 2) {
           showDialog(12);
           if(timeLevel2 == "--:--") timeLevel2 = timerElement.innerText;
           CorredorSala3.isOpen = true;
           CorredorSala3Image.src = '../assets/objects/LeftDoorStage3.png';
           CorredorSala3.x = 456.3;
           minigamesOn = 3;
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

        if (checkPassageRectDoorCollision() && levelLoad == 2) {
            clearGameObjects();
            player.x = CorredorSala2.x + 50;
            player.y = CorredorSala2.y - 123;
            loadLevel(0);
            return;
        }

        drawMochila();
        drawPlayer();
        drawObstacles();
        drawDoor();
        drawBorders();

        requestAnimationFrame(gameLoop);
    }

    gameLoop();
}
