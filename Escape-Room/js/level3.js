let dialogoInicialSala3 = false; // Gerada fora da função para só ser usada uma vez. Mostra o diálogo inicial da sala

function loadLevel3() {
    if(!dialogoInicialSala3) { // Mostra o diálogo inicial uma única vez
        showDialog(24);
        dialogoInicialSala3 = true;
    }

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Imagem de fundo
    let backgroundElement = document.getElementById("gameCanvas");
    backgroundElement.style.backgroundImage = "url('../assets/backgrounds/SalaMatematica.png')";

    changeBoard(); // Função defenida no MathQuiz.js para redefenir o texto e tamanho do quadro

    // Função que desenha a porta
    function drawDoor() {
        ctx.drawImage(Sala3Door1Image, Sala3Door1.x, Sala3Door1.y, Sala3Door1.width, Sala3Door1.height);
    }

    // Área de interação do quadro do quiz
    const interactionArea = {
        x: 155,
        y: 60,
        width: 200,
        height: 70
    };

    // Função que verifica se o jogador está na área de interação
    function checkInteractionArea() {
        let playerCenterX = player.x + player.width / 2;
        let playerCenterY = player.y + player.height / 2;

        return playerCenterX > interactionArea.x &&
            playerCenterX < interactionArea.x + interactionArea.width &&
            playerCenterY > interactionArea.y &&
            playerCenterY < interactionArea.height + interactionArea.y;
    }

    // Função que desenha a mochila
    function drawMochila() {
        if (!mochila4.isPickedUp) {
            ctx.drawImage(Mochila4Image, mochila4.x, mochila4.y, mochila4.width, mochila4.height);
        }
    }

    // Função que verifica se o jogador está a interagir com a mochila
    
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

    // Função que adiciona as bordas e os objetos com imagem
    function addObstacle(x, y, width, height, imagePath, collisionArea) {
        const obstacle = { x, y, width, height, imagePath };

        if (collisionArea) {
            obstacle.collisionArea = collisionArea;
        } else { // Caso não tenha área de colisão própria, ela se torna os valores originais
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

    // Função que desenha as bordas e os objetos
    function drawObstacles() {
        for (let obstacle of obstacles) {
            if (obstacle.image) {
                ctx.drawImage(obstacle.image, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
            }
        }
    }

    // Inserção das bordas e objetos

    // Bordas
    addObstacle(0, 75, 500, 10);
    addObstacle(0, 70, 15, 500);
    addObstacle(0, 480, 500, 20, '../assets/objects/BordaFundo.png', { x: 0, y: 500, width: 500, height: 10 });
    addObstacle(485, 70, 15, 500);

    // Mesa Professor
    addObstacle(378, 138, 94, 21, '../assets/objects/Sala3-MesaProfessor.png', { x: 378, y: 153, width: 94, height: 10 });

    // Mesas
    addObstacle(290, 222, 182, 18, '../assets/objects/Sala3-Mesa.png', { x: 290, y: 232, width: 182, height: 10 });
    addObstacle(290, 305, 182, 18, '../assets/objects/Sala3-Mesa.png', { x: 290, y: 315, width: 182, height: 10 });
    addObstacle(290, 388, 182, 18, '../assets/objects/Sala3-Mesa.png', { x: 290, y: 398, width: 182, height: 10 });
    addObstacle(38, 222, 182, 18, '../assets/objects/Sala3-Mesa.png', { x: 38, y: 232, width: 182, height: 10 });
    addObstacle(38, 305, 182, 18, '../assets/objects/Sala3-Mesa.png', { x: 38, y: 315, width: 182, height: 10 });
    addObstacle(38, 388, 182, 18, '../assets/objects/Sala3-Mesa.png', { x: 38, y: 398, width: 182, height: 10 });

    // Lixo
    addObstacle(15, 90, 22, 10);

    // Função que desenha as bordas de todos os objetos, áreas de interação e de colisão
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

            // Desenhar limite de intereação do quadro
            ctx.strokeStyle = 'blue';
            ctx.lineWidth = 2;
            ctx.strokeRect(interactionArea.x, interactionArea.y, interactionArea.width, interactionArea.height);
    
            // Desenhar círculos para a mochila
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
    
            if (!mochila4.isPickedUp) {
                ctx.beginPath();
                ctx.arc(mochila4.x + mochila4.width / 2, mochila4.y + mochila4.height / 2, mochilaRadius, 0, 2 * Math.PI);
                ctx.stroke();
            }
    
            ctx.restore();
        }
    }    

    // Retângulo de passagem da porta
    const passageRect = {
        x: Sala3Door1.x, 
        y: Sala3Door1.y + 50,
        width: 15,
        height: 35,
    };

    // Função que verifica se o jogador está a colidir com o retângulo de passagem para avançar para o próximo nível
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
    
        return distanceX < thresholdX && distanceY < thresholdY; // Retorna se o jogador está a querer sair ou não
    }

    // Loop do jogo
    function gameLoop() {
        if (levelLoad != 3) {
            document.getElementById("mathQuizBox").style.display = "none";
            return; // Se o jogo não estiver no respetivo nivel, não deixa o loop avançar
        }
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        //Verificar se o jogador está a colidir com algo
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

            //Verificar se o jogador está a interagir com o quadro ou com a mochila
            if (isKeyPressed('KeyF') && !stopMovement && !isPaused && levelLoad == 3) {
                if (checkInteractionArea() && !stopMovement && !isPaused && !mathFinish && !isPopupOpen) {//Interação com o quadro
                    showQuadroPopup();
                    generateMathQuestions();

                } else if (checkMochilaInteraction() && !mochila4.isPickedUp) {//Interação com a mochila, e a guarda no inventario caso seja verdade
                    mochila4.isPickedUp = true;
                    addToInventory({ name: 'Mochila4', imageSrc: '../assets/inventory/Mochila4.png' });
                }
            }
        }

        //Verificação se o jogador quer sair da sala
        if (checkPassageRectDoorCollision() && levelLoad == 3) {
            clearGameObjects();
            player.x = CorredorSala3.x - 50;
            player.y = CorredorSala3.y;
            loadLevel(0);
            return;
        }

        //Desenha o jogador, objetos e bordas
        drawMochila();
        drawPlayer();
        drawObstacles();
        drawDoor();
        drawBorders();

        //Reiniciar o loop
        requestAnimationFrame(gameLoop);
    }

    gameLoop(); // Inicia o loop do jogo
}