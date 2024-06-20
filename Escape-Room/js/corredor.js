let didFinalDoorOpen = false;

function corredor() {
    clearGameObjects();
    const canvasWidth = 500;
    const canvasHeight = 500;
    const gameWidth = 500;
    const gameHeight = 700;
    
    let addFinalObjects = false;

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
        if(ticket.isPickedUp == false) showDialog(13);
        else {
            document.getElementById('passwordPanel').style.display = 'block';
            isPasswordPanelActive = true;
            stopMovement = true; 
        }
        
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

    function drawMochila() {
        if (!mochila2.isPickedUp) {
            ctx.drawImage(Mochila2Image, mochila2.x, mochila2.y - cameraY, mochila2.width, mochila2.height);
        }
    }

    let mochilaRadius = 55;

    function checkMochilaInteraction() {
        if (!mochila2.isPickedUp) {
            let playerCenterX = player.x + player.width / 2;
            let playerCenterY = player.y + player.height / 2;
            let mochilaCenterX = mochila2.x + mochila2.width / 2;
            let mochilaCenterY = mochila2.y + mochila2.height / 2;

            let distance = Math.sqrt(Math.pow(playerCenterX - mochilaCenterX, 2) + Math.pow(playerCenterY - mochilaCenterY, 2));

            return distance < mochilaRadius;
        }
        return false;
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
            }
            if (bordas) {
                ctx.save();
                ctx.strokeStyle = 'red';
                ctx.lineWidth = 2;
                let collisionX = obstacle.collisionArea.x;
                let collisionY = obstacle.collisionArea.y - cameraY;
                if (obstacle.collisionArea.y > 400) collisionY += 175;
                ctx.strokeRect(collisionX, collisionY, obstacle.collisionArea.width, obstacle.collisionArea.height * 2.05);
                ctx.restore();
                
            }
        }
    }
    
    function drawBackground() {
        ctx.drawImage(backgroundImage, 0 , 0 - cameraY, gameWidth, gameHeight);
    }

    // Bordas
    addObstacle(0, 70 + playerenterposition, canvasWidth, 15);
    addObstacle(0, 670, canvasWidth, 20, '../assets/objects/BordaFundo.png', { x: 0, y: 495 + playerenterposition, width: canvasWidth, height: 10 });
    addObstacle(0, 0 + playerenterposition, 15, canvasHeight); // Borda esquerda
    addObstacle(canvasWidth - 15, 0 + playerenterposition, 15, canvasHeight); // Borda direita

    addObstacle(0, 260 + playerenterposition, 100, 105); // Borda esquerda meio
    addObstacle(400, 260 + playerenterposition, 100, 105); // Borda direita meio
    
    addObstacle(0, 1, 500, 58, '../assets/objects/Corredor-CimaPorta.png', { x: 0, y: 0 + playerenterposition, width: 0, height: 0 });

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

    function drawBorders(obstacles, doorCircles, mochila2, cameraY, bordas, doorOpenRadius, passageRects) {
        if (bordas) {
            ctx.save();
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            
            for (let obstacle of obstacles) {
                let collisionX = obstacle.collisionArea.x;
                let collisionY = obstacle.collisionArea.y - cameraY;
                if (obstacle.collisionArea.y > 400) collisionY += 175;
                ctx.strokeRect(collisionX, collisionY, obstacle.collisionArea.width, obstacle.collisionArea.height * 2.05);
            }
    
            // Desenhar passageRect para cada porta
            ctx.strokeStyle = 'yellow';
            ctx.lineWidth = 2;
            ctx.strokeRect(passageRects[0].x, passageRects[0].y - cameraY, passageRects[0].width, passageRects[0].height);
            ctx.strokeRect(passageRects[1].x, passageRects[1].y - cameraY, passageRects[1].width, passageRects[1].height);
            ctx.strokeRect(passageRects[2].x, passageRects[2].y - cameraY, passageRects[2].width, passageRects[2].height);
            ctx.strokeRect(passageRects[3].x, passageRects[3].y - cameraY, passageRects[3].width, passageRects[3].height);
    
            // Desenhar círculo azul para LeaveDoor
            for (let circle of doorCircles) {
                if (!circle.door.isOpen || (!didFinalDoorOpen && circle.door == LeaveDoor)) {
                    ctx.strokeStyle = 'blue';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    if(circle.door == LeaveDoor) ctx.arc(circle.x, circle.y + 40 - cameraY, doorOpenRadius, 0, 2 * Math.PI);
                    else ctx.arc(circle.x, circle.y - cameraY, doorOpenRadius, 0, 2 * Math.PI);
                    ctx.stroke();
                    
                }
            }
    
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
    
            if (!mochila2.isPickedUp) {
                ctx.beginPath();
                ctx.arc(mochila2.x + mochila2.width / 2, mochila2.y + mochila2.height / 2 - cameraY, mochilaRadius, 0, 2 * Math.PI);
                ctx.stroke();
            }
            
            ctx.restore();
        }
    }

    const passageRectSala1 = { x: CorredorSala1.x + 20, y: CorredorSala1.y + 65, width: 15, height: 35 };
    const passageRectSala2 = { x: CorredorSala2.x, y: CorredorSala2.y + 65, width: 15, height: 35 };
    const passageRectSala3 = { x: CorredorSala3.x - 10, y: CorredorSala3.y + 58, width: 15, height: 35 };
    const passageRectSala4 = { x: CorredorSala4.x, y: CorredorSala4.y + 58, width: 15, height: 35 };

    if(CorredorSala3.isOpen == true) passageRectSala3.x = 470;
        
    const doorOpenRadius = 55; // Raio do círculo azul

    const doorCircles = [
        { door: CorredorSala2, x: CorredorSala2.x + CorredorSala2.width / 2, y: CorredorSala2.y + CorredorSala2.height / 2 },
        { door: CorredorSala3, x: CorredorSala3.x + CorredorSala3.width / 2, y: CorredorSala3.y + CorredorSala3.height / 2 },
        { door: CorredorSala4, x: CorredorSala4.x + CorredorSala4.width / 2, y: CorredorSala4.y + CorredorSala4.height / 2 },
        { door: LeaveDoor, x: LeaveDoor.x + LeaveDoor.width / 2, y: LeaveDoor.y + LeaveDoor.height / 2 - 30 }
    ];

    // Função para verificar a interação com as portas
    function checkDoorInteraction() {
        const playerRect = {
            x: player.x,
            y: player.y,
            width: player.width,
            height: player.height
        };
    
        // Verificar interação com cada porta
        for (const doorCircle of doorCircles) {
            const door = doorCircle.door;
            const doorX = doorCircle.x;
            const doorY = doorCircle.y - cameraY;
    
            if (isKeyPressed('KeyF') && !stopMovement) {
                if(door != LeaveDoor) {
                // Verificar se o jogador está próximo o suficiente da porta
                    if (playerRect.x < doorX + door.width &&
                        playerRect.x + playerRect.width > doorX &&
                        playerRect.y < doorY + door.height &&
                        playerRect.y + playerRect.height > doorY) {
                        
                        // Determinar ação com base na porta específica
                        if (door === CorredorSala4 && !CorredorSala4.isOpen) {
                            showDialog(18);
                        } else if (door === CorredorSala3 && !CorredorSala3.isOpen) {
                            showDialog(16);
                        } else if (door === CorredorSala2 && !CorredorSala2.isOpen) {
                            showPasswordPanel();
                        }
                    }
                } else {
                    if (playerRect.x < (doorX - 60) + door.width &&
                        playerRect.x + playerRect.width > doorX - 60 &&
                        playerRect.y < doorY + door.height &&
                        playerRect.y + playerRect.height > doorY) {

                        // Determinar ação com base na porta específica
                        if (door === LeaveDoor && !LeaveDoor.isOpen) {
                            showDialog(16);
                        } else if (door === LeaveDoor && LeaveDoor.isOpen && !didFinalDoorOpen) {
                            animateDoorOpening(LeaveDoor, LeaveDoorImage, "Double");
                            didFinalDoorOpen = true;
                        }
                    }

                }
            
            }
        }
    }
    
    function checkDoorPassage() {
        const adjustedPlayerX = player.x;
        const adjustedPlayerY = player.y - cameraY;
    
        // Check interaction with return door (CorredorSala1)
        const returnDoorAdjustedX = CorredorSala1.x;
        const returnDoorAdjustedY = CorredorSala1.y - 123 - cameraY;
    
        if (adjustedPlayerX < returnDoorAdjustedX + CorredorSala1.width + 40 &&
            adjustedPlayerX + player.width > returnDoorAdjustedX + 40 &&
            adjustedPlayerY < returnDoorAdjustedY + CorredorSala1.height - 90 &&
            adjustedPlayerY + player.height > returnDoorAdjustedY + 50) {
            
            // Load level 1 when player passes through CorredorSala1 door
            clearGameObjects();
            player.x = Sala1Door1.x + 40;
            player.y = Sala1Door1.y;
            loadLevel(1);
            return;
        }
    
        // Check interaction with next door (CorredorSala2)
        if (CorredorSala2.isOpen) {
            const nextDoorAdjustedX = CorredorSala2.x;
            const nextDoorAdjustedY = CorredorSala2.y - 123 - cameraY;
    
            if (adjustedPlayerX < nextDoorAdjustedX + CorredorSala2.width - 40 &&
                adjustedPlayerX + player.width > nextDoorAdjustedX - 40 &&
                adjustedPlayerY < nextDoorAdjustedY + CorredorSala2.height - 90 &&
                adjustedPlayerY + player.height > nextDoorAdjustedY + 50) {
    
                // Load level 2 when player passes through CorredorSala2 door
                clearGameObjects();
                player.x = Sala2Door1.x - 80;
                player.y = Sala2Door1.y + 50;
                loadLevel(2);
                return;
            }
        }
    
        // Check interaction with next door (CorredorSala3)
        const nextDoorAdjustedX = CorredorSala3.x;
        const nextDoorAdjustedY = CorredorSala3.y + 80;
    
        if (adjustedPlayerX < nextDoorAdjustedX + CorredorSala3.width + 40 &&
            adjustedPlayerX + player.width > nextDoorAdjustedX + 40 &&
            adjustedPlayerY < nextDoorAdjustedY + CorredorSala3.height - 120 &&
            adjustedPlayerY + player.height > nextDoorAdjustedY) {
    
            // Load level 3 when player passes through CorredorSala3 door
            clearGameObjects();
            player.x = Sala3Door1.x + 30;
            player.y = Sala3Door1.y + 20;
            loadLevel(3);
            return;
        }
    
        // Check interaction with next door (CorredorSala4)
        if (CorredorSala4.isOpen) {
            const nextDoorAdjustedX = CorredorSala4.x;
            const nextDoorAdjustedY = CorredorSala4.y + 50;
    
            if (adjustedPlayerX < nextDoorAdjustedX + CorredorSala4.width - 40 &&
                adjustedPlayerX + player.width > nextDoorAdjustedX - 40 &&
                adjustedPlayerY < nextDoorAdjustedY + CorredorSala4.height - 90 &&
                adjustedPlayerY + player.height > nextDoorAdjustedY + 50) {
    
                // Load level -1 when player passes through CorredorSala4 door (assuming it leads to a previous level)
                clearGameObjects();
                player.x = Sala2Door1.x - 30;
                player.y = Sala2Door1.y;
                loadLevel(-1);
                return;
            }
        }
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

        drawBackground();
        drawLeaveDoor();
        drawMochila();
        drawPlayer();
        drawObstacles();
        drawDoors();
        drawBorders(obstacles, doorCircles, mochila2, cameraY, bordas, doorOpenRadius, [passageRectSala1, passageRectSala2, passageRectSala3, passageRectSala4]);        
        
        checkDoorInteraction();
        checkDoorPassage();

        if(didFinalDoorOpen == true && !addFinalObjects) {
            addFinalObjects = true;

            setTimeout(function() {
                obstacles.splice(0, 1);
                obstacles.push(
                    { x: 0, y: 70 + playerenterposition, width: 210, height: 15, imagePath: undefined, collisionArea: {
                        x: 0,
                        y: 70 - cameraY,
                        width: 210,
                        height: 15
                    }},
                    { x: 290, y: 70 + playerenterposition, width: 220, height: 15, imagePath: undefined, collisionArea: {
                        x: 290,
                        y: 70 - cameraY,
                        width: 220,
                        height: 15
                    }},
                    { x: 200, y: 0 + playerenterposition, width: 10, height: 45, imagePath: undefined, collisionArea: {
                        x: 200, 
                        y: 0 - cameraY, 
                        width: 10, 
                        height: 45
                    }},
                    { x: 288, y: 0 + playerenterposition, width: 10, height: 45, imagePath: undefined, collisionArea: {
                        x: 288, 
                        y: 0 - cameraY, 
                        width: 10, 
                        height: 45
                    }}
                );
            }, 1000); // 500 ms delay

        }
        
        if (isKeyPressed('KeyF') && checkMochilaInteraction() && !mochila2.isPickedUp && !stopMovement) {
            mochila2.isPickedUp = true;
            addToInventory({ name: 'Mochila2', imageSrc: '../assets/inventory/Mochila2.png' });
        }

        if(player.y <= 15) {
            didWin = true;
            endEscapeRoom();
        }
        
        requestAnimationFrame(gameLoop);
    }
    
    gameLoop();
    
}    