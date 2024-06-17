let dialogoInicialSala1 = false;

function loadLevel1() {
    if(!dialogoInicialSala1){
        showDialog(25);
        dialogoInicialSala1 = true;
    }
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

    function drawMochila() {
        if (!mochila1.isPickedUp) {
            ctx.drawImage(Mochila1Image, mochila1.x, mochila1.y, mochila1.width, mochila1.height);
        }
    }

    function drawDoor() {
        ctx.drawImage(Sala1Door1Image, Sala1Door1.x, Sala1Door1.y, Sala1Door1.width, Sala1Door1.height);
    }

    let didOpen = false;

    function animateDoorOpening() {
        didOpen = true;
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

        timeLevel1 = timerElement.innerText;
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

        if(distance < doorOpenRadius && !key.isPickedUp && !Sala1Door1.isOpen && isKeyPressed('KeyF')) {
            isStop = true;
            isPaused = true;
            showDialog(15); 
        } 
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

    let mochilaRadius = 55;

    function checkMochilaInteraction() {
        if (!mochila1.isPickedUp) {
            let playerCenterX = player.x + player.width / 2;
            let playerCenterY = player.y + player.height / 2;
            let mochilaCenterX = mochila1.x + mochila1.width / 2;
            let mochilaCenterY = mochila1.y + mochila1.height / 2;

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
    
    // Mesas
    addObstacle(74, 218, 398, 27, '../assets/objects/Sala1-MesaGrande.png', { x: 74, y: 228, width: 398, height: 20 });
    addObstacle(74, 305, 398, 27, '../assets/objects/Sala1-MesaGrande.png', { x: 74, y: 315, width: 398, height: 20 });
    addObstacle(74, 392, 398, 27, '../assets/objects/Sala1-MesaGrande.png', { x: 74, y: 402, width: 398, height: 20 });
    
    // Mesa Professor
    addObstacle(378, 137, 94, 24, '../assets/objects/Sala1-MesaProfessor.png', { x: 377, y: 147, width: 95, height: 17 });
    
    // Bordas
    addObstacle(0, 75, 500, 10);
    addObstacle(0, 70, 15, 500);
    addObstacle(0, 480, 500, 20, '../assets/objects/BordaFundo.png', { x: 0, y: 500, width: 500, height: 10 });
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
                if (checkDoorInteraction() && !didOpen) {
                    animateDoorOpening();
                } 
                 else if (checkTicketInteraction() && !ticket.isPickedUp) {
                    ticket.isPickedUp = true;
                    addToInventory({ name: 'Bilhete', imageSrc: '../assets/inventory/Level1-Paper.png' });
                    showDialog(2);
                } else if (checkKeyInteraction() && !key.isPickedUp) {
                    key.isPickedUp = true;
                    addToInventory({ name: 'Chave', imageSrc: '../assets/inventory/Level1-Key.png' });
                }else if (checkMochilaInteraction() && !mochila1.isPickedUp) {
                    mochila1.isPickedUp = true;
                    addToInventory({ name: 'Mochila1', imageSrc: '../assets/inventory/Mochila1.png' });
                }
            }
        }

        if (checkDoorPassage() && levelLoad == 1) {
            clearGameObjects();
            player.x = CorredorSala1.x - 50;
            player.y = CorredorSala1.y - 123;
            loadLevel(0);
            return;
        }

        drawMochila();
        drawPlayer();
        drawObstacles();
        drawTicket();
        drawKey();
        drawDoor();
        drawDoorOpenArea();

        requestAnimationFrame(gameLoop);
    }

    gameLoop();
    
}