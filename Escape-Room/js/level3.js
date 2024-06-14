function loadLevel3() {
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    let backgroundElement = document.getElementById("gameCanvas");
    backgroundElement.style.backgroundImage = "url('../assets/backgrounds/SalaMatematica.png')";

    function drawDoor() {
        ctx.drawImage(Sala3Door1Image, Sala3Door1.x, Sala3Door1.y, Sala3Door1.width, Sala3Door1.height);
    }

    let doorOpenRadius = 50;

    function checkDoorInteraction() {
        let playerCenterX = player.x + player.width / 2;
        let playerCenterY = player.y + player.height / 2;
        let doorCenterX = Sala3Door1.x + Sala3Door1.width / 2 + 20;
        let doorCenterY = Sala3Door1.y + Sala3Door1.height / 2;

        let distance = Math.sqrt(Math.pow(playerCenterX - doorCenterX, 2) + Math.pow(playerCenterY - doorCenterY, 2));

        return distance < doorOpenRadius && key.isPickedUp && !Sala3Door1.isOpen && isKeyPressed('KeyF');
    }

    function checkDoorPassage() {
        let playerCenterX = player.x + player.width / 2;
        let playerCenterY = player.y + player.height / 2;
        let doorCenterX = (Sala3Door1.x + Sala3Door1.width / 2) - 35;
        let doorCenterY = Sala3Door1.y + Sala3Door1.height / 2;

        let distance = Math.sqrt(Math.pow(playerCenterX - doorCenterX, 2) + Math.pow(playerCenterY - doorCenterY, 2));

        return distance < doorOpenRadius && Sala3Door1.isOpen;
    }

    function drawDoorOpenArea() {
        ctx.save();
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(Sala3Door1.x + Sala3Door1.width / 2 + 20, Sala3Door1.y + Sala3Door1.height / 2, doorOpenRadius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.restore();
    }

    const interactionArea = {
        x: 155,
        y: 60,
        width: 200,
        height: 70
    };

    function checkInteractionArea() {
        let playerCenterX = player.x + player.width / 2;
        let playerCenterY = player.y + player.height / 2;

        return playerCenterX > interactionArea.x &&
            playerCenterX < interactionArea.x + interactionArea.width &&
            playerCenterY > interactionArea.y &&
            playerCenterY < interactionArea.height + interactionArea.y;
    }

    function drawInteractionArea() {
        ctx.save();
        ctx.strokeStyle = 'green';
        ctx.lineWidth = 2;
        ctx.strokeRect(interactionArea.x, interactionArea.y, interactionArea.width, interactionArea.height);
        ctx.restore();
    }

    function showQuadroPopup() {
        const popup = document.getElementById('mathQuestions');
        popup.style.display = 'block';
        stopMovement = true;
        generateMathQuestions();
    
        const answerButtons = document.querySelectorAll('.answer-option');
        answerButtons.forEach(button => {
            button.addEventListener('click', function () {
                checkAnswer(this);
            });
        });
    
        setTimeout(function() {
            document.addEventListener('keydown', handleKeyPressToAdvanceDialog);
        }, 500);
    }
    

    function closeQuadroPopup() {
        const popup = document.getElementById('mathQuestions');
        if (popup) {
            popup.style.display = 'none';
            document.removeEventListener('keydown', handleKeyPressToAdvanceDialog);
            stopMovement = false;
        }
    }


    function handleKeyPressToAdvanceDialog(event) {
        if (event.key === 'Enter') {
            closeQuadroPopup();
        }
    }

    let finish = false;

    const matrizesQuestions = [
        { question: "Qual o componente (2,1) da matriz [[6, 5] [2, 3]]", answer: "2", wrong: ["5", "6", "3", "7", "1"] },
        { question: "Qual é o determinante da matriz [[1, 2] [3, 4]]", answer: "-2", wrong: ["2", "0", "4", "-4", "1"] },
        { question: "Qual é a transposta da matriz [[1, 3] [2, 4]]", answer: "[[1, 2] [3, 4]]", wrong: ["[[2, 1] [4, 3]]", "[[1, 3] [2, 4]]", "[[3, 1] [4, 2]]", "[[4, 3] [2, 1]]", "[[2, 4] [1, 3]]"] },
        { question: "Qual é a matriz inversa de [[2, 0] [0, 2]]", answer: "[[0.5, 0] [0, 0.5]]", wrong: ["[[2, 0] [0, 2]]", "[[1, 0] [0, 1]]", "[[0, 0.5] [0.5, 0]]", "[[0.5, 0.5] [0.5, 0.5]]", "[[2, 2] [2, 2]]"] },
        { question: "Qual é o traço da matriz [[1, 0] [0, 1]]", answer: "2", wrong: ["1", "0", "3", "-1", "4"] }
    ];
    
    const vetoresQuestions = [
        { question: "Qual é a magnitude do vetor [3, 4]", answer: "5", wrong: ["3", "4", "7", "6", "9"] },
        { question: "Qual o produto escalar dos vetores [1, 2] e [3, 4]", answer: "11", wrong: ["8", "7", "6", "5", "12"] },
        { question: "Qual o vetor soma de [1, 2] e [3, 4]", answer: "[4, 6]", wrong: ["[2, 6]", "[4, 2]", "[6, 8]", "[3, 5]", "[5, 7]"] },
        { question: "Qual é o vetor oposto de [5, -3]", answer: "[-5, 3]", wrong: ["[5, 3]", "[-5, -3]", "[3, 5]", "[-3, 5]", "[0, 0]"] },
        { question: "Qual a diferença dos vetores [7, 8] - [3, 4]", answer: "[4, 4]", wrong: ["[4, 3]", "[10, 12]", "[3, 4]", "[5, 4]", "[7, 4]"] }
    ];
    
    const conjuntosQuestions = [
        { question: "Qual é a união dos conjuntos {1, 2} e {2, 3}", answer: "{1, 2, 3}", wrong: ["{1, 2}", "{2, 3}", "{1, 3}", "{1, 2, 4}", "{2, 2, 3}"] },
        { question: "Qual é a interseção dos conjuntos {1, 2} e {2, 3}", answer: "{2}", wrong: ["{1}", "{3}", "{1, 2}", "{2, 3}", "{1, 3}"] },
        { question: "Qual é o complemento do conjunto {1, 2} em relação a {1, 2, 3}", answer: "{3}", wrong: ["{1}", "{2}", "{1, 3}", "{2, 3}", "{}"] },
        { question: "Encontre a diferença dos conjuntos {1, 2} - {2, 3}", answer: "{1}", wrong: ["{2}", "{3}", "{1, 2}", "{1, 3}", "{}"] },
        { question: "Qual é a diferença simétrica dos conjuntos {1, 2, 3} e {2, 3, 4}", answer: "{1, 4}", wrong: ["{2, 3}", "{1, 2}", "{3, 4}", "{1, 2, 3, 4}", "{1, 3}"] }
    ];
    
    let currentQuestionIndex = 0;
    let questions = [];
    
    // Gerar e exibir perguntas
    function generateMathQuestions() {
        questions = [
            matrizesQuestions[Math.floor(Math.random() * matrizesQuestions.length)],
            vetoresQuestions[Math.floor(Math.random() * vetoresQuestions.length)],
            conjuntosQuestions[Math.floor(Math.random() * conjuntosQuestions.length)]
        ];
        currentQuestionIndex = 0;
        displayQuestion();
        document.getElementById('mathQuestions').style.display = 'block';
    }
    
    // Exibir pergunta atual com múltiplas opções
    function displayQuestion() {
        if (currentQuestionIndex < questions.length) {
            const currentQuestion = questions[currentQuestionIndex];
            document.getElementById('math-question').innerText = currentQuestion.question;
    
            // Gerar quatro opções de resposta
            const answerOptions = document.querySelectorAll('.answer-option');
            const correctAnswerIndex = Math.floor(Math.random() * 4);
            let incorrectAnswers = currentQuestion.wrong.slice(0, 3);
    
            for (let i = 0; i < answerOptions.length; i++) {
                if (i === correctAnswerIndex) {
                    answerOptions[i].innerText = currentQuestion.answer;
                } else {
                    answerOptions[i].innerText = incorrectAnswers.pop();
                }
            }
        } else {
            finish = true;
            showDialog(9);
            CorredorSala4Image.src = '../assets/objects/RightDoorStage3.png';
            CorredorSala4.isOpen = true;
            closePopup();
        }
    }
    
    // Fechar o quadro popup
    function closePopup() {
        document.getElementById('mathQuestions').style.display = 'none';
        
    }
    
    // Verificar resposta
    function checkAnswer(button) {
        const userAnswer = button.innerText;
        const correctAnswer = questions[currentQuestionIndex].answer;
    
        if (userAnswer === correctAnswer) {
            currentQuestionIndex++;
            displayQuestion();
        } else {
            let randomDialog = Math.floor(Math.random() * 3) + 6;
            showDialog(randomDialog) //Dialogo 6, 7 ou 8
            closePopup();
        }
    }
    
    document.addEventListener('DOMContentLoaded', function () {
        const answerButtons = document.querySelectorAll('.answer-option');
        answerButtons.forEach(button => {
            button.addEventListener('click', function () {
                checkAnswer(this);
            });
        });
    });
    

    // Fechar o quadro popup
    function closePopup() {
        document.getElementById('mathQuestions').style.display = 'none';
        stopMovement = false;
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
            obstacle.image.onload = function () {
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
            ctx.save();
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            ctx.strokeRect(obstacle.collisionArea.x, obstacle.collisionArea.y, obstacle.collisionArea.width, obstacle.collisionArea.height);
            ctx.restore();
        }
    }

    addObstacle(0, 75, 500, 10);
    addObstacle(0, 70, 15, 500);
    addObstacle(0, 480, 500, 10);
    addObstacle(485, 70, 15, 500);

    function gameLoop() {
        if (levelLoad != 3) {
            return; // Se o jogo não estiver em execução, saia do loop
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

            if (isKeyPressed('KeyF') && !stopMovement) {
                if (checkDoorInteraction()) {
                    animateDoorOpening();
                } else if (checkInteractionArea() && !stopMovement && !finish) {
                    showQuadroPopup();
                    generateMathQuestions();
                }
            }
        }

        if (checkDoorPassage() && levelLoad == 4) {
            clearGameObjects();
            player.x = ReturnSala3Door1.x - 100;
            player.y = ReturnSala3Door1.y - 123;
            loadLevel(2);
            return;
        }

        drawPlayer();
        drawObstacles();
        drawDoor();
        drawDoorOpenArea();
        drawInteractionArea(); // Desenha a área de interação

        requestAnimationFrame(gameLoop);
    }

    gameLoop();
}
