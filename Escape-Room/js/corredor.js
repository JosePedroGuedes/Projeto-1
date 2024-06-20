let didFinalDoorOpen = false; //Gerada fora da função para não ser resetada

function corredor() {
    clearGameObjects();
    //Como o corredor tem uma camara, é defenido o tmanho do canvas como o tamanho máximo que pode ter
    const canvasWidth = 500;
    const canvasHeight = 500;
    const gameWidth = 500;
    const gameHeight = 700;
    
    let addFinalObjects = false; //variavel que será usada para prevenir que as bordas de quando a porta final se abra só são alteradas uma unica vez

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    //local onde será desenhado s objetos
    const ctx = canvas.getContext('2d');
    let backgroundElement = document.getElementById("gameCanvas");
    backgroundElement.style.backgroundImage = "none";
    
    //Image de fundo
    let backgroundImage = new Image();
    backgroundImage.src = '../assets/backgrounds/Corredor.png';

    let isPasswordPanelActive = false; //Painel do código binário

    let playerenterposition = CorredorSala1.y - 123; //Redefenir a posição do jogador por causa da posição onde a camara nasce

    let cameraY = playerenterposition; // Defenir a camara na mesma posição que o jogador

    //Função que mostra o painel para submeter o código binario
    function showPasswordPanel() {
        if(ticket.isPickedUp == false) showDialog(13); //caso não tenha coletado o bilhete, não deixa avançar
        else {
            document.getElementById('passwordPanel').style.display = 'block';
            isPasswordPanelActive = true; //não deixar o jogador se mexer
            stopMovement = true; 
        }
        
    }

    //Botão de confirmação do painel
    document.getElementById('confirmButton').addEventListener('click', function() {
        const userInput = document.getElementById('passwordInput').value;
        if (userInput === CorredorSala2.code.toString()) { //caso o código esteje correto
            CorredorSala2.isOpen = true;
            animateDoorOpening(CorredorSala2, CorredorSala2Image, "Right");
            drawDoors();
            hidePasswordPanel();
        } else { //caso o código esteje errado
            numberFailsCode++; //adicionar ás estatisticas
            showDialog(3);
            hidePasswordPanel();
        }
    });

    //botão de cancelar o codigo/fechar o painel
    document.getElementById('cancelButton').addEventListener('click', function() { 
        hidePasswordPanel();
    });
 
    //Função que esonde o painel
    function hidePasswordPanel() { 
        document.getElementById('passwordPanel').style.display = 'none';
        isPasswordPanelActive = false;
        stopMovement = false;
    }

    //Código que faz com que so seja possivel escrever numeros apartir do teclado
    document.getElementById('passwordInput').addEventListener('keydown', function(event) {
        if (!((event.keyCode > 47 && event.keyCode < 58) || (event.keyCode > 95 && event.keyCode < 106) || event.keyCode === 8 || event.keyCode === 46)) {
            event.preventDefault();
        }
    });

    //Função responsável por criar a animação da porta a abrir
    function animateDoorOpening(door, doorimage, side) { //recebe qual a porta, a sua imagem, e se é uma porta do lado esquerdo ou direito
        let frame = 1;
        const totalFrames = 3;

        const doorOpeningInterval = setInterval(() => {//Desenha os 3 frames um de cada vez e apaga e repoe a porta com um novo frame
            if (frame <= totalFrames) {
                const doorImagePath = `../assets/objects/${side}DoorStage${frame}.png`; //Muda a imagem da porta conforme o frame
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
        }, 200);//Deixa um pequeno intervalo entre frames
    }

    //Função que desenha a mochila
    function drawMochila() {
        if (!mochila2.isPickedUp) {
            ctx.drawImage(Mochila2Image, mochila2.x, mochila2.y - cameraY, mochila2.width, mochila2.height);
        }
    }

    //Função que verifica se o jogador quer coletar a mochila

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

    //Função que adiciona as bordas e os objetos com imagem
    function addObstacle(x, y, width, height, imagePath, collisionArea) {//recebe a posição, tamanho, se tem imagem ou não, e se tem uma área de colisão própria
        const obstacle = { x, y, width, height, imagePath };
        if (collisionArea) {
            // Ajuste as coordenadas da área de colisão de acordo com a posição da câmera
            obstacle.collisionArea = {
                x: collisionArea.x,
                y: collisionArea.y - cameraY,
                width: collisionArea.width,
                height: collisionArea.height
            };
        } else { //caso não tenha área de colisão propria, ela se torna os valores originais
            obstacle.collisionArea = {
                x: x,
                y: y - cameraY,
                width: width,
                height: height
            };
        }
        if (imagePath) { //guardar caso tenha imagem
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
    
    //Função que desenha as bordas e os objetos
    function drawObstacles() {
        for (let obstacle of obstacles) {
            if (obstacle.image) {
                ctx.drawImage(obstacle.image, obstacle.x, obstacle.y - cameraY, obstacle.width, obstacle.height);
            }
        }
    }
    
    //Função que desenha o cenário
    function drawBackground() {
        ctx.drawImage(backgroundImage, 0 , 0 - cameraY, gameWidth, gameHeight);
    }

    //Inserção das bordas e objetos

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

    //Função que desenha as portas
    function drawDoors() {
        ctx.drawImage(CorredorSala1Image, CorredorSala1.x, CorredorSala1.y - cameraY, CorredorSala1.width, CorredorSala1.height);
        ctx.drawImage(CorredorSala2Image, CorredorSala2.x, CorredorSala2.y - cameraY, CorredorSala2.width, CorredorSala2.height);
        ctx.drawImage(CorredorSala3Image, CorredorSala3.x, CorredorSala3.y - cameraY, CorredorSala3.width, CorredorSala3.height);
        ctx.drawImage(CorredorSala4Image, CorredorSala4.x, CorredorSala4.y - cameraY, CorredorSala4.width, CorredorSala4.height);
    }

    //Função que desenha a porta final
    function drawLeaveDoor() {
        ctx.drawImage(LeaveDoorImage, LeaveDoor.x, LeaveDoor.y - cameraY, LeaveDoor.width, LeaveDoor.height);
    }

    //Função que desenha as bordas de todos os objetos, áreas de interação e de colisão
    function drawBorders(obstacles, doorCircles, mochila2, cameraY, bordas, doorOpenRadius, passageRects) {
        if (bordas) {
            ctx.save();
            //Desenhar as bordas da sala e dos objetos
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            
            for (let obstacle of obstacles) {
                let collisionX = obstacle.collisionArea.x;
                let collisionY = obstacle.collisionArea.y - cameraY;
                if (obstacle.collisionArea.y > 400) collisionY += 175;
                ctx.strokeRect(collisionX, collisionY, obstacle.collisionArea.width, obstacle.collisionArea.height * 2.05);
            }
    
            // Desenhar os limites de passagem para cada porta
            ctx.strokeStyle = 'yellow';
            ctx.lineWidth = 2;
            ctx.strokeRect(passageRects[0].x, passageRects[0].y - cameraY, passageRects[0].width, passageRects[0].height);
            ctx.strokeRect(passageRects[1].x, passageRects[1].y - cameraY, passageRects[1].width, passageRects[1].height);
            ctx.strokeRect(passageRects[2].x, passageRects[2].y - cameraY, passageRects[2].width, passageRects[2].height);
            ctx.strokeRect(passageRects[3].x, passageRects[3].y - cameraY, passageRects[3].width, passageRects[3].height);
    
            // Desenhar limite de intereação de cada porta
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
    
            //Desenhar limite de interação da mochila
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

    //Representações da área de passagem de cada porta, menos a final que não tem

    const passageRectSala1 = { x: CorredorSala1.x + 20, y: CorredorSala1.y + 65, width: 15, height: 35 };
    const passageRectSala2 = { x: CorredorSala2.x, y: CorredorSala2.y + 65, width: 15, height: 35 };
    const passageRectSala3 = { x: CorredorSala3.x - 10, y: CorredorSala3.y + 58, width: 15, height: 35 };
    const passageRectSala4 = { x: CorredorSala4.x, y: CorredorSala4.y + 58, width: 15, height: 35 };

    if(CorredorSala3.isOpen == true) passageRectSala3.x = 470;

    // Raios das interações de cada porta
    const doorOpenRadius = 55; 
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
                if(door != LeaveDoor) {// Verificar se o jogador está próximo de qualquer porta sem ser a final
                    if (playerRect.x < doorX + door.width &&
                        playerRect.x + playerRect.width > doorX &&
                        playerRect.y < doorY + door.height &&
                        playerRect.y + playerRect.height > doorY) {
                        
                        if (door === CorredorSala4 && !CorredorSala4.isOpen) {//Caso a porta secreta estar fechada, mostra dialogo
                            showDialog(18);
                        } else if (door === CorredorSala3 && !CorredorSala3.isOpen) {//Caso a porta da sala 3 estar fechada, mostra dialogo
                            showDialog(16);
                        } else if (door === CorredorSala2 && !CorredorSala2.isOpen) {//Caso seja a porta 2 e ainda nao esteja aberta, mostra o painel
                            showPasswordPanel();
                        }
                    }
                } else { //Caso a porta seja a final. Esta condição existe por causa de a porta ser frontal enquanto que as outras são laterais
                    if (playerRect.x < (doorX - 60) + door.width &&
                        playerRect.x + playerRect.width > doorX - 60 &&
                        playerRect.y < doorY + door.height &&
                        playerRect.y + playerRect.height > doorY) {

                        if (door === LeaveDoor && !LeaveDoor.isOpen) {//Caso a porta final esta fechada, mostra dialogo
                            showDialog(16);
                        } else if (door === LeaveDoor && LeaveDoor.isOpen && !didFinalDoorOpen) {//caso ela esteje aberta
                            animateDoorOpening(LeaveDoor, LeaveDoorImage, "Double");
                            didFinalDoorOpen = true;
                        }
                    }

                }
            
            }
        }
    }
    
    //Verificar se o jogador passou numa determinada porta, para avançar de nível
    function checkDoorPassage() {
        const adjustedPlayerX = player.x;
        const adjustedPlayerY = player.y - cameraY;
    
        // Verificar se passou pela porta da Sala1
        const returnDoorAdjustedX = CorredorSala1.x;
        const returnDoorAdjustedY = CorredorSala1.y - 123 - cameraY;
    
        if (adjustedPlayerX < returnDoorAdjustedX + CorredorSala1.width + 40 &&
            adjustedPlayerX + player.width > returnDoorAdjustedX + 40 &&
            adjustedPlayerY < returnDoorAdjustedY + CorredorSala1.height - 90 &&
            adjustedPlayerY + player.height > returnDoorAdjustedY + 50) {
            
            //Gerar nível 1
            clearGameObjects();
            player.x = Sala1Door1.x + 40;
            player.y = Sala1Door1.y;
            loadLevel(1);
            return;
        }
    
        // Verificar se passou pela porta da Sala2
        if (CorredorSala2.isOpen) {
            const nextDoorAdjustedX = CorredorSala2.x;
            const nextDoorAdjustedY = CorredorSala2.y - 123 - cameraY;
    
            if (adjustedPlayerX < nextDoorAdjustedX + CorredorSala2.width - 40 &&
                adjustedPlayerX + player.width > nextDoorAdjustedX - 40 &&
                adjustedPlayerY < nextDoorAdjustedY + CorredorSala2.height - 90 &&
                adjustedPlayerY + player.height > nextDoorAdjustedY + 50) {
    
                // Gerar nível 2
                clearGameObjects();
                player.x = Sala2Door1.x - 80;
                player.y = Sala2Door1.y + 50;
                loadLevel(2);
                return;
            }
        }
    
        // Verificar se passou pela porta da Sala3
        const nextDoorAdjustedX = CorredorSala3.x;
        const nextDoorAdjustedY = CorredorSala3.y + 80;
    
        if (adjustedPlayerX < nextDoorAdjustedX + CorredorSala3.width + 40 &&
            adjustedPlayerX + player.width > nextDoorAdjustedX + 40 &&
            adjustedPlayerY < nextDoorAdjustedY + CorredorSala3.height - 120 &&
            adjustedPlayerY + player.height > nextDoorAdjustedY) {
    
            // Gerar nível 3
            clearGameObjects();
            player.x = Sala3Door1.x + 30;
            player.y = Sala3Door1.y + 20;
            loadLevel(3);
            return;
        }
    
        // Verificar se passou pela porta Secreta
        if (CorredorSala4.isOpen) {
            const nextDoorAdjustedX = CorredorSala4.x;
            const nextDoorAdjustedY = CorredorSala4.y + 50;
    
            if (adjustedPlayerX < nextDoorAdjustedX + CorredorSala4.width - 40 &&
                adjustedPlayerX + player.width > nextDoorAdjustedX - 40 &&
                adjustedPlayerY < nextDoorAdjustedY + CorredorSala4.height - 90 &&
                adjustedPlayerY + player.height > nextDoorAdjustedY + 50) {
    
                // Gerar nivel sevreto
                clearGameObjects();
                player.x = Sala2Door1.x - 30;
                player.y = Sala2Door1.y;
                loadLevel(-1);
                return;
            }
        }
    }

    //Funçao que limpa o loop
    function clearPreviousFrame() {
        ctx.clearRect(0, 0, gameWidth, gameHeight);
    }
   
    //Loop do jogo
    function gameLoop() {
        if (levelLoad != 0) {
            return; // Se o jogo não estiver no respetivo nivel, não deixa o loop avançar
        }
        clearPreviousFrame();
    
        //Verificar se o jogador está a colidir com algo
        if (!isPasswordPanelActive && player && player.dx !== undefined && player.dy !== undefined) {
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
    
            //Não deixar o jogador ultrapassar o limite do canvas
            player.x = Math.max(0, Math.min(gameWidth - player.width, player.x));
            player.y = Math.max(0, Math.min(gameHeight - player.height, player.y));
        }
    
        //Atualizar a posição da camara conforme a posição do jogador
        cameraY = Math.max(0, Math.min(gameHeight - canvasHeight, player.y - canvasHeight / 2));

        //Desenha o cenário, jogador, objetos e bordas
        drawBackground();
        drawLeaveDoor();
        drawMochila();
        drawPlayer();
        drawObstacles();
        drawDoors();
        drawBorders(obstacles, doorCircles, mochila2, cameraY, bordas, doorOpenRadius, [passageRectSala1, passageRectSala2, passageRectSala3, passageRectSala4]);        
        
        //Verificações para saber se o jogador esta a tentar interagir com algo ou a tentar passar para outro nível
        checkDoorInteraction();
        checkDoorPassage();

        //Função para caso a porta final se abra, remove a borda que a bloqueava e adiciona 2 novas com um espaço para o jogador poder passar pela porta
        if(didFinalDoorOpen == true && !addFinalObjects) {
            addFinalObjects = true;

            setTimeout(function() {
                obstacles.splice(0, 1); //Remove a barreira que tapava a porta
                //adiciona as 2 barreiras, mas 2 barreiras dentro da porta para não deixar o jogador escapar dos limites desejados
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
            }, 1000);

        }
        
        //verificar se o jogador quer coletar a mochila
        if (isKeyPressed('KeyF') && checkMochilaInteraction() && !mochila2.isPickedUp && !stopMovement) {
            mochila2.isPickedUp = true;
            addToInventory({ name: 'Mochila2', imageSrc: '../assets/inventory/Mochila2.png' });
        }

        //Como no final o jogador anda por dentro da porta, ultrapassando as barreiras, esta é a unica situação onde o jogador consegue chegar a esse y, indicando que o jogador passou a porta final e que o jogo vai acabar
        if(player.y <= 15) {
            didWin = true;
            endEscapeRoom();
        }
        
        //Reiniciar o loop
        requestAnimationFrame(gameLoop);
    }
    
    gameLoop();
    
}    