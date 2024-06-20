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
    
    const adjustedPlayerX = player.x;
    const adjustedPlayerY = player.y - cameraY;            
    
    const LeaveDoorAdjustedX = LeaveDoor.x + 30;
    const LeaveDoorAdjustedY = LeaveDoor.y - 100;

    if (isKeyPressed('KeyF') && !stopMovement) {
        if (adjustedPlayerX < LeaveDoorAdjustedX + LeaveDoor.width - 50 &&
            adjustedPlayerX + player.width > LeaveDoorAdjustedX  &&
            adjustedPlayerY < LeaveDoorAdjustedY + LeaveDoor.height + 100 &&
            adjustedPlayerY + player.height > LeaveDoorAdjustedY + 100) {
                if(!LeaveDoor.isOpen) showDialog(16);
                else if(!didFinalDoorOpen) {
                    animateDoorOpening(LeaveDoor, LeaveDoorImage, "Double");
                    didFinalDoorOpen = true;
                }
            }
    }

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
    
    if (isKeyPressed('KeyF') && checkMochilaInteraction() && !mochila2.isPickedUp && !stopMovement) {
            mochila2.isPickedUp = true;
            addToInventory({ name: 'Mochila2', imageSrc: '../assets/inventory/Mochila2.png' });
        }

    // Check interaction with return door
    const returnDoorAdjustedX = CorredorSala1.x;
    const returnDoorAdjustedY = CorredorSala1.y - 123 - cameraY;

    if (adjustedPlayerX < returnDoorAdjustedX + CorredorSala1.width + 40 &&
        adjustedPlayerX + player.width > returnDoorAdjustedX + 40 &&
        adjustedPlayerY < returnDoorAdjustedY + CorredorSala1.height - 90 &&
        adjustedPlayerY + player.height > returnDoorAdjustedY + 50) {
        if (levelLoad == 0 && !stopMovement) {
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
            if (levelLoad == 0 && !stopMovement) {
                clearGameObjects();
                player.x = Sala2Door1.x - 80;
                player.y = Sala2Door1.y + 50;
                loadLevel(2);
                return;
            }
        }
    }

    const CloseDoorAdjustedX = 415;
    const CloseDoorAdjustedY = CorredorSala3.y + 60;

    if (
        adjustedPlayerX < CloseDoorAdjustedX + CorredorSala3.width + 40 &&
        adjustedPlayerX + player.width > CloseDoorAdjustedX + 40 &&
        adjustedPlayerY <
        CloseDoorAdjustedY + CorredorSala3.height - 90 &&
        adjustedPlayerY + player.height > CloseDoorAdjustedY
    ) {
        if (
        levelLoad == 0 &&
        isKeyPressed("KeyF") &&
        CorredorSala3.isOpen == false && !stopMovement
        ) {
        showDialog(16);
        }
    }

    const nextDoorAdjustedX = CorredorSala3.x;
    const nextDoorAdjustedY = CorredorSala3.y + 80;

    if (
        adjustedPlayerX < nextDoorAdjustedX + CorredorSala3.width + 40 &&
        adjustedPlayerX + player.width > nextDoorAdjustedX + 40 &&
        adjustedPlayerY <
        nextDoorAdjustedY + CorredorSala3.height - 120 &&
        adjustedPlayerY + player.height > nextDoorAdjustedY
    ) {
        if (levelLoad == 0 && CorredorSala3.isOpen == true && !stopMovement) {
            clearGameObjects();
            player.x = Sala3Door1.x + 30;
            player.y = Sala3Door1.y + 20;
            loadLevel(3);
            return;
        }
    }
    

    if (CorredorSala4.isOpen) {
        const nextDoorAdjustedX = CorredorSala4.x;
        const nextDoorAdjustedY = CorredorSala4.y + 50;

        if (adjustedPlayerX < nextDoorAdjustedX + CorredorSala4.width - 40 &&
            adjustedPlayerX + player.width > nextDoorAdjustedX - 40 &&
            adjustedPlayerY < nextDoorAdjustedY + CorredorSala4.height - 90 &&
            adjustedPlayerY + player.height > nextDoorAdjustedY + 50) {
            if (levelLoad == 0 && !stopMovement) {
                clearGameObjects();
                player.x = Sala2Door1.x - 30;
                player.y = Sala2Door1.y;
                loadLevel(-1);
                return;
            }
        }
    } else if (!CorredorSala4.isOpen && isKeyPressed('KeyF')) {
        const SecretDoorAdjustedX = 70;
        const SecretDoorAdjustedY = CorredorSala4.y - 20;

        if (adjustedPlayerX < SecretDoorAdjustedX + CorredorSala4.width - 40 &&
            adjustedPlayerX + player.width > SecretDoorAdjustedX - 40 &&
            adjustedPlayerY < SecretDoorAdjustedY + CorredorSala4.height &&
            adjustedPlayerY + player.height > SecretDoorAdjustedY + 50) {
            if (levelLoad == 0 && numberBackpacks != 4 && !stopMovement) {
                showDialog(18);
            }
        }
    }

    if(player.y <= 15) {
        didWin = true;
        endEscapeRoom();
    }
    
    requestAnimationFrame(gameLoop);
}