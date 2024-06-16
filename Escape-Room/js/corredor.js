function corredor() {
    clearGameObjects();
    const canvasWidth = 500;
    const canvasHeight = 500;
    const gameWidth = 500;
    const gameHeight = 700;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const ctx = canvas.getContext('2d');
    let backgroundElement = document.getElementById("gameCanvas");
    backgroundElement.style.backgroundImage = "none";
    
    let backgroundImage = new Image();
    backgroundImage.src = '../assets/backgrounds/Corredor.png';

    let isPasswordPanelActive = false;

    let playerenterposition = CorredorSala1.y - 123;

    let cameraY = playerenterposition; // Start at the bottom of the game area

    function showPasswordPanel() {
        document.getElementById('passwordPanel').style.display = 'block';
        isPasswordPanelActive = true;
        stopMovement = true;
    }

    document.getElementById('confirmButton').addEventListener('click', function() {
        const userInput = document.getElementById('passwordInput').value;
        if (userInput === CorredorSala2.code.toString()) {
            CorredorSala2.isOpen = true;
            animateDoorOpening(CorredorSala2, CorredorSala2Image, "Right");
            drawDoors();
            hidePasswordPanel();
        } else {
            numberFailsCode++;
            showDialog(3);
            hidePasswordPanel();
        }
    });

    document.getElementById('cancelButton').addEventListener('click', function() {
        hidePasswordPanel();
    });

    function hidePasswordPanel() {
        document.getElementById('passwordPanel').style.display = 'none';
        isPasswordPanelActive = false;
        stopMovement = false;
    }

    document.getElementById('passwordInput').addEventListener('keydown', function(event) {
        if (!((event.keyCode > 47 && event.keyCode < 58) || (event.keyCode > 95 && event.keyCode < 106) || event.keyCode === 8 || event.keyCode === 46)) {
            event.preventDefault();
        }
    });

    function animateDoorOpening(door, doorimage, side) {
        let frame = 1;
        const totalFrames = 3;

        const doorOpeningInterval = setInterval(() => {
            if (frame <= totalFrames) {
                const doorImagePath = `../assets/objects/${side}DoorStage${frame}.png`;
                doorimage.src = doorImagePath;
                ctx.clearRect(door.x, door.y - cameraY, door.width, door.height);
                ctx.drawImage(doorimage, door.x, door.y - cameraY, door.width, door.height);
                
                if (frame === totalFrames) {
                    drawPlayer();
                }
                frame++;
            } else {
                clearInterval(doorOpeningInterval);
            }
        }, 200);
    }

    function addObstacle(x, y, width, height, imagePath, collisionArea) {
        const obstacle = { x, y, width, height, imagePath };
        if (collisionArea) {
            // Ajuste as coordenadas da área de colisão de acordo com a posição da câmera
            obstacle.collisionArea = {
                x: collisionArea.x,
                y: collisionArea.y - cameraY,
                width: collisionArea.width,
                height: collisionArea.height
            };
        } else {
            obstacle.collisionArea = {
                x: x,
                y: y - cameraY,
                width: width,
                height: height
            };
        }
        if (imagePath) {
            obstacle.image = new Image();
            obstacle.image.onload = function() {
                drawObstacles();
            };
            obstacle.image.src = imagePath;
            // Verificar se a imagem está carregada antes de desenhá-la
            if (obstacle.image.complete) {
                drawObstacles();
            }
        }
        obstacles.push(obstacle);
    }
    

    function clearPreviousFrame() {
        ctx.clearRect(0, 0, gameWidth, gameHeight);
    }

    function drawObstacles() {

        for (let obstacle of obstacles) {
            if (obstacle.image) {
                ctx.drawImage(obstacle.image, obstacle.x, obstacle.y - cameraY, obstacle.width, obstacle.height);
                // Se não houver imagem definida, desenhe apenas a área de colisão para depuração

            }
            if (bordas) {
                ctx.save();
                ctx.strokeStyle = 'red';
                ctx.lineWidth = 2;
                let collisionX = obstacle.collisionArea.x;
                let collisionY = obstacle.collisionArea.y - cameraY;
                if(obstacle.collisionArea.y > 400) collisionY += 175;
                ctx.strokeRect(collisionX, collisionY, obstacle.collisionArea.width, obstacle.collisionArea.height * 2.05);
                ctx.restore();
            }
        }
    }
    
    function drawBackground() {
        ctx.drawImage(backgroundImage, 0 , 0 - cameraY, gameWidth, gameHeight);
    }

    // Bordas
    addObstacle(0, 70 + playerenterposition, canvasWidth, 15); // Borda superior
    addObstacle(0, 670, canvasWidth, 20, '../assets/objects/BordaFundo.png', { x: 0, y: 495 + playerenterposition, width: canvasWidth, height: 10 });
    addObstacle(0, 0 + playerenterposition, 15, canvasHeight); // Borda esquerda
    addObstacle(canvasWidth - 15, 0 + playerenterposition, 15, canvasHeight); // Borda direita

    addObstacle(0, 260 + playerenterposition, 100, 105); // Borda esquerda meio
    addObstacle(400, 260 + playerenterposition, 100, 105); // Borda direita meio

    //Centro
    addObstacle(180, 250, 140, 39, '../assets/objects/CorredorCentro.png', { x: 180, y: 280 + playerenterposition, width: 140, height: 85 });

    //objetos
    addObstacle(15, 90 + playerenterposition, 145, 5);
    addObstacle(345, 90 + playerenterposition, 140, 5);

    //Plantas
    addObstacle(18, 224, 67, 39, '../assets/objects/Corredor-Plantas.png');
    addObstacle(414, 224, 67, 39, '../assets/objects/Corredor-Plantas.png');
    addObstacle(16, 650, 34, 19, '../assets/objects/Corredor-PlantasPequenas.png', { x: 16, y: 488 + playerenterposition, width: 30, height: 3 });
    addObstacle(450, 650, 34, 19, '../assets/objects/Corredor-PlantasPequenas.png', { x: 452, y: 488 + playerenterposition, width: 30, height: 3 });

    function drawDoors() {
        ctx.drawImage(CorredorSala1Image, CorredorSala1.x, CorredorSala1.y - cameraY, CorredorSala1.width, CorredorSala1.height);
        ctx.drawImage(CorredorSala2Image, CorredorSala2.x, CorredorSala2.y - cameraY, CorredorSala2.width, CorredorSala2.height);
        ctx.drawImage(CorredorSala3Image, CorredorSala3.x, CorredorSala3.y - cameraY, CorredorSala3.width, CorredorSala3.height);
        ctx.drawImage(CorredorSala4Image, CorredorSala4.x, CorredorSala4.y - cameraY, CorredorSala4.width, CorredorSala4.height);
    }

    function drawLeaveDoor() {
        ctx.drawImage(LeaveDoorImage, LeaveDoor.x, LeaveDoor.y - cameraY, LeaveDoor.width, LeaveDoor.height);
    }
    
    function gameLoop() {
        if (levelLoad != 0) {
            return; // Se o jogo não estiver em execução, saia do loop
        }
        clearPreviousFrame();
    
        if (!isPasswordPanelActive && player && player.dx !== undefined && player.dy !== undefined) {
            let nextX = player.x + player.dx;
            let nextY = player.y + player.dy;
    
            // Check collisions with obstacles
            let collidesX = checkCollision(player.dx, 0);
            let collidesY = checkCollision(0, player.dy);
    
            // Move the player only if there are no collisions
            if (!collidesX) {
                player.x = nextX;
            }
            if (!collidesY) {
                player.y = nextY;
            }
    
            // Limit player movement within the game boundaries
            player.x = Math.max(0, Math.min(gameWidth - player.width, player.x));
            player.y = Math.max(0, Math.min(gameHeight - player.height, player.y));
        }
    
        // Update camera position based on player's position
        cameraY = Math.max(0, Math.min(gameHeight - canvasHeight, player.y - canvasHeight / 2));
    
        // Draw game elements
        drawBackground();
        drawLeaveDoor();
        drawPlayer();
        drawObstacles();
        drawDoors();        
        
    
        const adjustedPlayerX = player.x;
        const adjustedPlayerY = player.y - cameraY;
    
        // Check interaction with CorredorSala2
        if (!isPasswordPanelActive && isKeyPressed('KeyF') && !stopMovement) {
            const LeaveDoorAdjustedX = LeaveDoor.x;
            const LeaveDoorAdjustedY = LeaveDoor.y - cameraY;
        
            if (adjustedPlayerX < LeaveDoorAdjustedX + LeaveDoor.width &&
                adjustedPlayerX + player.width > LeaveDoorAdjustedX  &&
                adjustedPlayerY < LeaveDoorAdjustedY + LeaveDoor.height + 100 &&
                adjustedPlayerY + player.height > LeaveDoorAdjustedY + 100 ) {
                animateDoorOpening(LeaveDoor, LeaveDoorImage, "Double");
            }
        }

        if (isKeyPressed('KeyF') && !CorredorSala2.isOpen && !stopMovement) {
            const CorredorSala2AdjustedX = CorredorSala2.x + 30;
            const CorredorSala2AdjustedY = CorredorSala2.y - 123 - cameraY;
        
            if (adjustedPlayerX < CorredorSala2AdjustedX + CorredorSala2.width &&
                adjustedPlayerX + player.width > CorredorSala2AdjustedX  &&
                adjustedPlayerY < CorredorSala2AdjustedY + CorredorSala2.height &&
                adjustedPlayerY + player.height > CorredorSala2AdjustedY ) {
                showPasswordPanel();
            }
        }
    
        // Check interaction with return door
        const returnDoorAdjustedX = CorredorSala1.x;
        const returnDoorAdjustedY = CorredorSala1.y - 123 - cameraY;
    
        if (adjustedPlayerX < returnDoorAdjustedX + CorredorSala1.width + 40 &&
            adjustedPlayerX + player.width > returnDoorAdjustedX + 40 &&
            adjustedPlayerY < returnDoorAdjustedY + CorredorSala1.height - 90 &&
            adjustedPlayerY + player.height > returnDoorAdjustedY + 50) {
            if (levelLoad == 0) {
                clearGameObjects();
                player.x = Sala1Door1.x + 40;
                player.y = Sala1Door1.y;
                loadLevel(1);
                return;
            }
        }
    
        // Check interaction with next door (CorredorSala2)
        if (CorredorSala2.isOpen) {
            const nextDoorAdjustedX = CorredorSala2.x;
            const nextDoorAdjustedY = CorredorSala2.y - 123 - cameraY;
    
            if (adjustedPlayerX < nextDoorAdjustedX + CorredorSala2.width - 40 &&
                adjustedPlayerX + player.width > nextDoorAdjustedX - 40 &&
                adjustedPlayerY < nextDoorAdjustedY + CorredorSala2.height - 90 &&
                adjustedPlayerY + player.height > nextDoorAdjustedY + 50) {
                if (levelLoad == 0) {
                    clearGameObjects();
                    player.x = Sala2Door1.x - 80;
                    player.y = Sala2Door1.y + 50;
                    loadLevel(2);
                    return;
                }
            }
        }
    
        requestAnimationFrame(gameLoop);
    }
    
    gameLoop();
    
}    