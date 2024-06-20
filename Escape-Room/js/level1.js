let dialogoInicialSala1 = false; //Gerada fora da função para só ser usada 1 vez. Mostra o dialogo inicial da sala

function loadLevel1() {
    if (!dialogoInicialSala1) {//Mostra o dialogo inicial uma única vez
        showDialog(25);
        dialogoInicialSala1 = true;
    }

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    //Image de fundo
    let backgroundElement = document.getElementById("gameCanvas");
    backgroundElement.style.backgroundImage = "url('../assets/backgrounds/SalaAula.png')";

    //Função que desenha a chave
    function drawKey() {
        if (!key.isPickedUp) {
            ctx.drawImage(keyImage, key.x, key.y, key.width, key.height);
        }
    }

    //Função que desenha o bilhete
    function drawTicket() {
        if (!ticket.isPickedUp) {
            ctx.drawImage(ticketImage, ticket.x, ticket.y, ticket.width, ticket.height);
        }
    }

    //Função que desenha a mochila
    function drawMochila() {
        if (!mochila1.isPickedUp) {
            ctx.drawImage(Mochila1Image, mochila1.x, mochila1.y, mochila1.width, mochila1.height);
        }
    }

    //Função que desenha a porta
    function drawDoor() {
        ctx.drawImage(Sala1Door1Image, Sala1Door1.x, Sala1Door1.y, Sala1Door1.width, Sala1Door1.height);
    }

    //Função responsável por criar a animação da porta a abrir
    let didOpen = false;
    function animateDoorOpening() {
        didOpen = true;
        let frame = 1;
        const totalFrames = 3;

        const doorOpeningInterval = setInterval(() => {//Desenha os 3 frames um de cada vez e apaga e repoe a porta com um novo frame
            const doorImagePath = `../assets/objects/RightDoorStage${frame}.png`; //Muda a imagem da porta conforme o frame
            Sala1Door1Image.src = doorImagePath;

            ctx.clearRect(Sala1Door1.x, Sala1Door1.y, Sala1Door1.width, Sala1Door1.height);
            ctx.drawImage(Sala1Door1Image, Sala1Door1.x, Sala1Door1.y, Sala1Door1.width, Sala1Door1.height);

            frame++;
            if (frame > totalFrames) {
                clearInterval(doorOpeningInterval);
                Sala1Door1.isOpen = true;
            }
        }, 200);//Deixa um pequeno intervalo entre frames

        timeLevel1 = timerElement.innerText; //Quando a porta se abre, guarda o tempo nas estatisticas
    }

    //Função que verifica se o jogador vai coletar a chave

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

    //Função que verifica se o jogador está a tentar interagir com a porta

    let doorOpenRadius = 40;
    function checkDoorInteraction() {
        let playerCenterX = player.x + player.width / 2;
        let playerCenterY = player.y + player.height / 2;
        let doorCenterX = Sala1Door1.x + Sala1Door1.width / 2 + 20;
        let doorCenterY = Sala1Door1.y + Sala1Door1.height / 2;

        let distance = Math.sqrt(Math.pow(playerCenterX - doorCenterX, 2) + Math.pow(playerCenterY - doorCenterY, 2));

        if (distance < doorOpenRadius && !key.isPickedUp && !Sala1Door1.isOpen && isKeyPressed('KeyF')) { //Se o jogador ainda não  tiver apanhado a chave, mostra um dialogo a dize-lo
            isStop = true;
            isPaused = true;
            showDialog(15); 
        }
        return distance < doorOpenRadius && key.isPickedUp && !Sala1Door1.isOpen && isKeyPressed('KeyF');  //Retorna verdadeiro ou falso se o jogador esta na área de interação, se a chave foi apanhada, se a porta está fechada e se tentou intereagir com a porta
    }

    //Função que verifica se o jogador vai coletar o bilhete

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

    //Função que verifica se o jogador vai coletar a mochila

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

    //Função que adiciona as bordas e os objetos com imagem
    function addObstacle(x, y, width, height, imagePath, collisionArea) {//recebe a posição, tamanho, se tem imagem ou não, e se tem uma área de colisão própria
        const obstacle = { x, y, width, height, imagePath };
        if (collisionArea) {
            obstacle.collisionArea = collisionArea;
        } else {//caso não tenha área de colisão propria, ela se torna os valores originais
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

    //Função que desenha as bordas e os objetos
    function drawObstacles() {
        for (let obstacle of obstacles) {
            if (obstacle.image) {
                ctx.drawImage(obstacle.image, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
            }
        }
    }

    //Função que desenha as bordas de todos os objetos, áreas de interação e de colisão
    function drawBorders() {
        if (bordas) {
            ctx.save();
            //Desenhar as bordas da sala e dos objetos
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            for (let obstacle of obstacles) {
                if (obstacle.collisionArea) {
                    ctx.strokeRect(obstacle.collisionArea.x, obstacle.collisionArea.y, obstacle.collisionArea.width, obstacle.collisionArea.height);
                }
            }
            // Desenhar o limite de passagem da porta
            ctx.strokeStyle = 'yellow';
            ctx.lineWidth = 2;
            ctx.strokeRect(passageRect.x, passageRect.y, passageRect.width, passageRect.height);
    
            // Desenhar limite de intereação da porta
            if (!Sala1Door1.isOpen) {
                ctx.strokeStyle = 'blue';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(Sala1Door1.x + Sala1Door1.width / 2 + 20, Sala1Door1.y + Sala1Door1.height / 2, doorOpenRadius, 0, 2 * Math.PI);
                ctx.stroke();
            }
    
            // Desenhar círculos para a chave, bilhete e mochila
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
    
            if (!key.isPickedUp) {
                ctx.beginPath();
                ctx.arc(key.x + key.width / 2, key.y + key.height / 2, keyRadius, 0, 2 * Math.PI);
                ctx.stroke();
            }
            if (!ticket.isPickedUp) {
                ctx.beginPath();
                ctx.arc(ticket.x + ticket.width / 2, ticket.y + ticket.height / 2, ticketRadius, 0, 2 * Math.PI);
                ctx.stroke();
            }
            if (!mochila1.isPickedUp) {
                ctx.beginPath();
                ctx.arc(mochila1.x + mochila1.width / 2, mochila1.y + mochila1.height / 2, mochilaRadius, 0, 2 * Math.PI);
                ctx.stroke();
            }
    
            ctx.restore();
        }
    }

    //Inserção das bordas e objetos

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

    // Retangulo de passagem da porta
    const passageRect = {
        x: Sala1Door1.x,
        y: Sala1Door1.y + 40,
        width: 15,
        height: 35,
    };

    //Verificar se o jogador está a colidir com o retangulo de passagem para avançar para o proximo nível
    function checkPassageRectDoorCollision() {
        let playerCenterX = player.x + player.width / 2;
        let playerCenterY = player.y + player.height / 2;
        let passageRectCenterX = passageRect.x + passageRect.width / 2;
        let passageRectCenterY = passageRect.y + passageRect.height / 2;
    
        let distanceX = Math.abs(playerCenterX - passageRectCenterX);
        let distanceY = Math.abs(playerCenterY - passageRectCenterY);
    
        let thresholdX = (player.width / 2) + (passageRect.width / 2) - 20;
        let thresholdY = (player.height / 2) + (passageRect.height / 2) - 20;
    
        return distanceX < thresholdX && distanceY < thresholdY; //Retorna se o jogador está a querer sair ou não
    }

    //Loop do jogo
    function gameLoop() {
        if (levelLoad != 1) {
            return; // Se o jogo não estiver no respetivo nivel, não deixa o loop avançar
        }

        //Verificar se o jogador está a colidir com algo
        if (player && player.dx !== undefined && player.dy !== undefined) {
            let nextX = player.x + player.dx;
            let nextY = player.y + player.dy;
    
            //Verifica a colisão do jogador
            let collidesX = checkCollision(player.dx, 0);
            let collidesY = checkCollision(0, player.dy);
    
            //Deixa o jogador se mover caso não houver colisão
            if (!collidesX) {
                player.x = nextX;
            }
            if (!collidesY) {
                player.y = nextY;
            }
    
        }

        //Verificações para caso o jogador clique no botão de interagir se esta a tentar interagir com a porta, bilhete, chave ou mochila
        if (isKeyPressed('KeyF') && !stopMovement) {
            
            if (checkDoorInteraction() && !didOpen) {//Interação com a porta, e a abre caso seja verdade
                animateDoorOpening();

            } else if (checkTicketInteraction() && !ticket.isPickedUp) {//Interação com o bilhete, e o guarda no inventario caso seja verdade
                ticket.isPickedUp = true;
                addToInventory({ name: 'Bilhete', imageSrc: '../assets/inventory/Level1-Paper.png' });
                showDialog(2);

                const decimalValue = parseInt(ticket.binarycode, 2);
                if(username == "admin") console.log("Código descodificado: " + decimalValue);//mostrar a resposta ao admin

            } else if (checkKeyInteraction() && !key.isPickedUp) {//Interação com a chave, e a guarda no inventario caso seja verdade
                key.isPickedUp = true;
                addToInventory({ name: 'Chave', imageSrc: '../assets/inventory/Level1-Key.png' });

            } else if (checkMochilaInteraction() && !mochila1.isPickedUp) {//Interação com a mochila, e a guarda no inventario caso seja verdade
                mochila1.isPickedUp = true;
                addToInventory({ name: 'Mochila1', imageSrc: '../assets/inventory/Mochila1.png' });
            }
        }
        
        //Verificação se o jogador quer sair da sala
        if (Sala1Door1.isOpen && checkPassageRectDoorCollision()) {
            clearGameObjects();
            player.x = CorredorSala1.x - 50;
            player.y = CorredorSala1.y - 123;
            loadLevel(0);
            return;
        }

        //Desenha o jogador, objetos e bordas
        drawMochila();
        drawPlayer();
        drawObstacles();
        drawTicket();
        drawKey();
        drawDoor();
        drawBorders();

        //Reiniciar o loop
        requestAnimationFrame(gameLoop);
    }

    gameLoop();
}
