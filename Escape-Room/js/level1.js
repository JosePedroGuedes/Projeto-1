function loadLevel1() {
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    let backgroundElement = document.getElementById("gameCanvas");
    backgroundElement.style.backgroundImage = "url('../assets/backgrounds/SalaAula.png')";

    function drawKey() {
        if (!key.isPickedUp) {
            ctx.drawImage(keyImage, key.x, key.y, key.width, key.height);
        }
    }

    function drawTicket() {
        if (!ticket.isPickedUp) {
            ctx.drawImage(ticketImage, ticket.x, ticket.y, ticket.width, ticket.height);
        }
    }

    function drawDoor() {
        ctx.drawImage(Sala1Door1Image, Sala1Door1.x, Sala1Door1.y, Sala1Door1.width, Sala1Door1.height);
    }

    function animateDoorOpening() {
        let frame = 1;
        const totalFrames = 3;

        const doorOpeningInterval = setInterval(() => {
            const doorImagePath = `../assets/objects/RightDoorStage${frame}.png`;
            Sala1Door1Image.src = doorImagePath;

            ctx.clearRect(Sala1Door1.x, Sala1Door1.y, Sala1Door1.width, Sala1Door1.height);
            ctx.drawImage(Sala1Door1Image, Sala1Door1.x, Sala1Door1.y, Sala1Door1.width, Sala1Door1.height);

            frame++;
            if (frame > totalFrames) {
                clearInterval(doorOpeningInterval);
                Sala1Door1.isOpen = true;
            }
        }, 200);
    }

    let keyRadius = 55;

    function checkKeyInteraction() {
        if (!key.isPickedUp) {
            let playerCenterX = player.x + player.width / 2;
            let playerCenterY = player.y + player.height / 2;
            let keyCenterX = key.x + key.width / 2;
            let keyCenterY = key.y + key.height / 2;

            let distance = Math.sqrt(Math.pow(playerCenterX - keyCenterX, 2) + Math.pow(playerCenterY - keyCenterY, 2));

            return distance < keyRadius;
        }
        return false;
    }

    let doorOpenRadius = 40;

    function checkDoorInteraction() {
        let playerCenterX = player.x + player.width / 2;
        let playerCenterY = player.y + player.height / 2;
        let doorCenterX = Sala1Door1.x + Sala1Door1.width / 2 + 20;
        let doorCenterY = Sala1Door1.y + Sala1Door1.height / 2;

        let distance = Math.sqrt(Math.pow(playerCenterX - doorCenterX, 2) + Math.pow(playerCenterY - doorCenterY, 2));

        return distance < doorOpenRadius && key.isPickedUp && !Sala1Door1.isOpen && isKeyPressed('KeyF');
    }

    function checkDoorPassage() {
        let playerCenterX = player.x + player.width / 2;
        let playerCenterY = player.y + player.height / 2;
        let doorCenterX = (Sala1Door1.x + Sala1Door1.width / 2) - 35;
        let doorCenterY = Sala1Door1.y + Sala1Door1.height / 2;

        let distance = Math.sqrt(Math.pow(playerCenterX - doorCenterX, 2) + Math.pow(playerCenterY - doorCenterY, 2));

        return distance < doorOpenRadius && Sala1Door1.isOpen;
    }

    function drawDoorOpenArea() {
        ctx.save();
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(Sala1Door1.x + Sala1Door1.width / 2 + 20, Sala1Door1.y + Sala1Door1.height / 2, doorOpenRadius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.restore();
    }

    let ticketRadius = 50;

    function checkTicketInteraction() {
        if (!ticket.isPickedUp) {
            let playerCenterX = player.x + player.width / 2;
            let playerCenterY = player.y + player.height / 2;
            let ticketCenterX = ticket.x + ticket.width / 2;
            let ticketCenterY = ticket.y + ticket.height / 2;

            let distance = Math.sqrt(Math.pow(playerCenterX - ticketCenterX, 2) + Math.pow(playerCenterY - ticketCenterY, 2));

            return distance < ticketRadius;
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
            // Draw collision areas for debugging
            ctx.save();
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            ctx.strokeRect(obstacle.collisionArea.x, obstacle.collisionArea.y, obstacle.collisionArea.width, obstacle.collisionArea.height);
            ctx.restore();
        }
    }
    
    // Mesas
    addObstacle(74, 218, 398, 80, '../assets/objects/Sala1-MesaGrande.png', { x: 74, y: 228, width: 398, height: 30 });
    addObstacle(74, 305, 398, 80, '../assets/objects/Sala1-MesaGrande.png', { x: 74, y: 315, width: 398, height: 30 });
    addObstacle(74, 392, 398, 80, '../assets/objects/Sala1-MesaGrande.png', { x: 74, y: 402, width: 398, height: 30 });
    
    // Mesa Professor
    addObstacle(377, 137, 95, 65, '../assets/objects/Sala1-MesaProfessor.png', { x: 377, y: 147, width: 95, height: 30 });
    
    // Bordas
    addObstacle(0, 75, 500, 10);
    addObstacle(0, 70, 15, 500);
    addObstacle(0, 480, 500, 20, '../assets/objects/BordaFundo.png'), { x: 0, y: 500, width: 500, height: 1 };
    addObstacle(485, 70, 15, 500);
    
    // Objetos
    addObstacle(103, 90, 20, 5);
    addObstacle(122, 80, 55, 15);

    function gameLoop() {
        if (levelLoad != 1) {
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

            if (isKeyPressed('KeyF') && !stopMovement) {
                if (checkDoorInteraction()) {
                    animateDoorOpening();
                } else if (checkTicketInteraction() && !ticket.isPickedUp) {
                    ticket.isPickedUp = true;
                    addToInventory({ name: 'Bilhete', imageSrc: '../assets/inventory/Level1-Paper.png' });
                    showDialog(2);
                } else if (checkKeyInteraction() && !key.isPickedUp) {
                    key.isPickedUp = true;
                    addToInventory({ name: 'Chave', imageSrc: '../assets/inventory/Level1-Key.png' });
                    localStorage.setItem('inventory', JSON.stringify(inventory));
                }
            }
        }

        if (checkDoorPassage() && levelLoad == 1) {
            clearGameObjects();
            player.x = CorredorSala1.x - 100;
            player.y = CorredorSala1.y - 123;
            loadLevel(0);
            return;
        }

        drawPlayer();
        drawObstacles();
        drawKey();
        drawTicket();
        drawDoor();
        drawDoorOpenArea();

        requestAnimationFrame(gameLoop);
    }

    gameLoop();
    
}