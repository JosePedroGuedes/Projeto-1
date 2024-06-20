//Gerados fora da função para só serem usados 1 vez. Mostra o dialogo inicial da sala e os dialogos iniciais de cada minigame
let dialogoInicialSala2 = false;
let dialogoGamePuzzle = false;
let dialogoGameWord = false;

function loadLevel2() {
    if(!dialogoInicialSala2){//Mostra o dialogo inicial uma única vez
        showDialog(23);
        dialogoInicialSala2 = true;
    }
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    //Image de fundo
    let backgroundElement = document.getElementById("gameCanvas");
    backgroundElement.style.backgroundImage = "url('../assets/backgrounds/SalaDesign.png')";

    //Função que desenha a porta
    function drawDoor() {
        ctx.drawImage(Sala2Door1Image, Sala2Door1.x, Sala2Door1.y, Sala2Door1.width, Sala2Door1.height);
    }

    //Função que desenha a mochila
    function drawMochila() {
        if (!mochila3.isPickedUp) {
            ctx.drawImage(Mochila3Image, mochila3.x, mochila3.y, mochila3.width, mochila3.height);
        }
    }

    //Função que verifica se o jogador vai coletar a mochila

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

    //Inserção das bordas e objetos

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

    // Localização das áreas de interação dos computadores
    let pcRadius = [
        { x: 95, y: 300, minigame: 1, finish: false },
        { x: 410, y: 300, minigame: 2, finish: false }
    ];

    //Função que verifica se o jogador vai interagir com algum dos computadores

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

            // Desenhar limite de intereação dos computadores
            ctx.strokeStyle = 'blue';
            ctx.lineWidth = 2;
            for (let square of pcRadius) {
                ctx.beginPath();
                ctx.arc(square.x, square.y, interactionRadius, 0, 2 * Math.PI);
                ctx.stroke();
            }

            // Desenhar limite de coleta da mochila
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

    // Retangulo de passagem da porta
    const passageRect = {
        x: Sala2Door1.x + 20,
        y: Sala2Door1.y + 50,
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
    
        return distanceX < thresholdX && distanceY < thresholdY;//Retorna se o jogador está a querer sair ou não
    }

    //Função para verificar qual minigame o jogador está a escolher e seus dados
    document.addEventListener("keydown", function (event) {
        if (event.code === 'KeyF' && checkSquareInteraction() && !stopMovement && levelLoad == 2) {
            
            let minigame = checkSquareInteraction(); // Aqui verifica qual quadrado está sendo interagido

            // Verifica se ambos os minigames estão concluídos
            let isPuzzleComplete = pcRadius.find(square => square.minigame === 1 && !square.finish) === undefined;
            let isGuessWordComplete = pcRadius.find(square => square.minigame === 2 && !square.finish) === undefined;

            // Verifica e atualiza o estado dos minigames

            if (!isPuzzleComplete || !isGuessWordComplete) {
                if (checkPuzzleFinish()) {
                    let puzzleSquare = pcRadius.find(square => square.minigame === 1);
                    puzzleSquare.finish = true;
                    isPuzzleComplete = true;
                }

                if (!isGuessWordComplete) {
                    if (checkGuessFinish()) {
                        let guessSquare = pcRadius.find(square => square.minigame === 2);
                        guessSquare.finish = true;
                        isGuessWordComplete = true;
                    }
                }
            }

            // Se ambos os minigames estiverem concluídos, mostra o diálogo para a proxima sala
            if (isPuzzleComplete && isGuessWordComplete) {
                showDialog(12);
                return;
            }

            // Abre os minigames se ainda não estiverem concluídos

            if (minigame === 1) {
                if (!isPuzzleComplete) { //abre o jogo caso ainda não esteja concluido
                    openGamePuzzle();
                    if(!dialogoGamePuzzle) { //mostra o dialogo inicial do jogo caso ainda não tenha mostrado
                        showDialog(26);
                        dialogoGamePuzzle = true;
                    }
                } else { //Caso esteja concluido, mostra o dialogo a dize-lo
                    showDialog(10);
                }
            } else if (minigame === 2) {
                if (!isGuessWordComplete) { //abre o jogo caso ainda não esteja concluido
                    openGameGuessWord();
                    if(!dialogoGameWord) { //mostra o dialogo inicial do jogo caso ainda não tenha mostrado
                        showDialog(27);
                        dialogoGameWord = true;
                    }
                } else { //Caso esteja concluido, mostra o dialogo a dize-lo
                    showDialog(11);
                }
            }
        } 
        
        
    });

    //Loop do jogo
    function gameLoop() {
        if (levelLoad != 2) {
            return; // Se o jogo não estiver no respetivo nivel, não deixa o loop avançar
        }

        //Interação com a mochila, e a guarda no inventario caso seja verdade
        if (isKeyPressed('KeyF') && checkMochilaInteraction() && !mochila3.isPickedUp) {
            mochila3.isPickedUp = true;
            addToInventory({ name: 'Mochila3', imageSrc: '../assets/inventory/Mochila3.png' });
        }

        //Verifica se ambos os jogos estão finalizados
        if(minigamesOn == 2) {
           showDialog(12);
           if(timeLevel2 == "--:--") timeLevel2 = timerElement.innerText; //Guarda o tempo em que foram acabados nas estatisticas
           //Abre a proxima sala
           CorredorSala3.isOpen = true;
           CorredorSala3Image.src = '../assets/objects/LeftDoorStage3.png';
           CorredorSala3.x = 456.3;
           minigamesOn = 3; //para prevenir que não repita o condição
        } 

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

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

        //Verifica se o jogador esta a querer sair da sala. Se sim vai para o corredor
        if (checkPassageRectDoorCollision() && levelLoad == 2) {
            clearGameObjects();
            player.x = CorredorSala2.x + 50;
            player.y = CorredorSala2.y - 123;
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

    gameLoop();
}
