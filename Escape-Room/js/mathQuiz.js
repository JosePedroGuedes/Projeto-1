let mathFinish = false; // Variável para saber quando o jogo foi finalizado
isPopupOpen = false; // Variável para rastrear o estado do popup
let currentQuestionIndex = 0;
let questions = [];

const popup = document.getElementById('mathQuestions');
const quadro = document.getElementById('mathQuizBox');

// Mudar o texto do quadro para o inicial
function changeBoard() {
    quadro.style.display = 'block';
    quadro.style.fontSize = '0.8rem';
    quadro.innerHTML = 'Quiz de Matemática';
    quadro.style.top = "calc(50% - 200px);";
}

function showQuadroPopup() {
    if (isPopupOpen) return; // Impedir que o popup seja aberto se já está aberto, para não abrir mais que uma vez

    isPopupOpen = true;
    popup.style.display = 'block';
    //mudar o estilo para a pergunta ficar bem no quadro
    quadro.style.fontSize = "0.6rem";
    quadro.style.top = "calc(50% - 205px)";
    stopMovement = true; //impedir que o jogador se mova
    currentQuestionIndex = 0;
    questions = [];
    generateMathQuestions(); //função que gera as perguntas

    resetAnswerButtons(); //apagar as respostas da pergunta anterior
}

//Função para fechar o quiz
function closeQuadroPopup() {
    popup.style.display = 'none'; // Esconder o popup
    stopMovement = false;
    isPopupOpen = false; // Marcar o popup como fechado

    // Resetar estado das perguntas
    resetQuiz();
}

function resetQuiz() {
    currentQuestionIndex = 0;
    questions = [];
    resetAnswerButtons();
}

//Local onde estão guardadas as perguntas e suas respostas + respostas erradas

const matrizesQuestions = [
    { question: 'Qual o componente (2,1) da matriz [[6, 5], [2, 3]]', answer: '2', wrong: ['5', '6', '3', '7', '1'] },
    { question: 'Qual é o determinante da matriz [[1, 2], [3, 4]]', answer: '-2', wrong: ['2', '0', '4', '-4', '1'] },
    { question: 'Qual é a transposta da matriz [[1, 3], [2, 4]]', answer: '[[1, 2], [3, 4]]', wrong: ['[[2, 1], [4, 3]]', '[[1, 3], [2, 4]]', '[[3, 1], [4, 2]]', '[[4, 3], [2, 1]]', '[[2, 4], [1, 3]]'] },
    { question: 'Qual é a matriz inversa de [[2, 0], [0, 2]]', answer: '[[0.5, 0], [0, 0.5]]', wrong: ['[[2, 0], [0, 2]]', '[[1, 0], [0, 1]]', '[[0, 0.5], [0.5, 0]]', '[[0.5, 0.5], [0.5, 0.5]]', '[[2, 2], [2, 2]]'] },
    { question: 'Qual é o traço da matriz [[1, 0], [0, 1]]', answer: '2', wrong: ['1', '0', '3', '-1', '4'] }
];

const vetoresQuestions = [
    { question: 'Qual é a magnitude do vetor [3, 4]', answer: '5', wrong: ['3', '4', '7', '6', '9'] },
    { question: 'Qual o produto escalar dos vetores [1, 2] e [3, 4]', answer: '11', wrong: ['8', '7', '6', '5', '12'] },
    { question: 'Qual o vetor soma de [1, 2] e [3, 4]', answer: '[4, 6]', wrong: ['[2, 6]', '[4, 2]', '[6, 8]', '[3, 5]', '[5, 7]'] },
    { question: 'Qual é o vetor oposto de [5, -3]', answer: '[-5, 3]', wrong: ['[5, 3]', '[-5, -3]', '[3, 5]', '[-3, 5]', '[0, 0]'] },
    { question: 'Qual a diferença dos vetores [7, 8] - [3, 4]', answer: '[4, 4]', wrong: ['[4, 3]', '[10, 12]', '[3, 4]', '[5, 4]', '[7, 4]'] }
];

const conjuntosQuestions = [
    { question: 'Qual a união dos conjuntos {1, 2} {2, 3}', answer: '{1, 2, 3}', wrong: ['{1, 2}', '{2, 3}', '{1, 3}', '{1, 2, 4}', '{2, 2, 3}'] },
    { question: 'Qual a interseção dos conjuntos {1, 2} {2, 3}', answer: '{2}', wrong: ['{1}', '{3}', '{1, 2}', '{2, 3}', '{1, 3}'] },
    { question: 'Qual o complemento do conjunto {1, 2} em relação {1, 2, 3}', answer: '{3}', wrong: ['{1}', '{2}', '{1, 3}', '{2, 3}', '{}'] },
    { question: 'Encontre a diferença dos conjuntos {1, 2} {2, 3}', answer: '{1}', wrong: ['{2}', '{3}', '{1, 2}', '{1, 3}', '{}'] },
    { question: 'Qual o resultado dos conjuntos: {1, 2, 3} - {2, 3, 4}', answer: '{1}', wrong: ['{2, 3}', '{1, 2}', '{3, 4}', '{1, 2, 3, 4}', '{1, 3}'] }
];


// Gerar aleatoriamente qual pergunta aparecerá
function generateMathQuestions() {
    const matrizIndex = Math.floor(Math.random() * matrizesQuestions.length);
    const vetorIndex = Math.floor(Math.random() * vetoresQuestions.length);
    const conjuntoIndex = Math.floor(Math.random() * conjuntosQuestions.length);

    questions = [
        matrizesQuestions[matrizIndex],
        vetoresQuestions[vetorIndex],
        conjuntosQuestions[conjuntoIndex]
    ];

    currentQuestionIndex = 0;
    displayQuestion();
}

//Mostrar a pegunta e as respostas
function displayQuestion() {
    if (currentQuestionIndex < questions.length) { //verificar se todas as perguntas já foram respondidas
        const currentQuestion = questions[currentQuestionIndex];
        const correctAnswer = currentQuestion.answer;

        // Mostrar a pergunta correta no console para o admin
        if(username == "admin") {
            console.log(`Pergunta correta: ${currentQuestion.question}`);
            console.log(`Resposta correta: ${correctAnswer}`);
        }

        document.getElementById('math-question').innerText = (currentQuestionIndex + 1) + ". " + currentQuestion.question; //Mostrar pergunta com o seu index atrás (Ex: 1. Qual a união dos conjuntos {1, 2} {2, 3})
        quadro.innerText = currentQuestion.question;

        // Gerar quatro opções de resposta
        const answerOptions = document.querySelectorAll('.answer-option');

        // Embaralhar as opções de resposta incorretas
        let incorrectAnswers = shuffleArray(currentQuestion.wrong.slice(0, 3));
        const correctAnswerIndex = Math.floor(Math.random() * 4);

        // Prefixos para as respostas
        const prefixes = ['a)', 'b)', 'c)', 'd)'];

        // Inserir a resposta correta na posição correta e as incorretas nas demais posições
        for (let i = 0; i < answerOptions.length; i++) {
            if (i === correctAnswerIndex) {
                answerOptions[i].innerText = prefixes[i] + " " + correctAnswer;
            } else {
                answerOptions[i].innerText = prefixes[i] + " " + incorrectAnswers.pop();
            }
        }
    } else { //caso o jogador tenha acertado ás 3 perguntas
        mathFinish = true;
        showDialog(9);
        closeQuadroPopup();
        quadro.innerHTML = 'Parabéns!! Passas-te a Matemática!';
        quadro.style.fontSize = "0.6rem";
        quadro.style.top = "calc(50% - 203px)";
        LeaveDoor.isOpen = true;
        timeLevel3 = timerElement.innerText;
    }
}

//Função que escolhe e baralha as respostas incorretas
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Resetar os botões de resposta
function resetAnswerButtons() {
    const answerButtons = document.querySelectorAll('.answer-option');
    answerButtons.forEach(button => {
        button.removeEventListener('click', handleAnswerClick);
        button.addEventListener('click', handleAnswerClick);
    });
}

function handleAnswerClick(event) {
    checkAnswer(event.target);
}

// Verificar resposta
function checkAnswer(button) {
    const userAnswer = button.innerText; // Obter a resposta do usuário
    const userAnswerText = userAnswer.substring(3); // Remover o prefixo a), b), c), d)

    if (currentQuestionIndex < questions.length) {
        const correctAnswer = questions[currentQuestionIndex].answer; // Obter a resposta correta

        // Comparar diretamente as respostas
        if (userAnswerText === correctAnswer) {
            currentQuestionIndex++;
            displayQuestion(); // Exibir próxima pergunta
        } else {
            numberFailsMath++;
            let randomDialog = Math.floor(Math.random() * 3) + 6;
            showDialog(randomDialog); // Mostrar um diálogo aleatório de erro
            closeQuadroPopup();
            changeBoard();
            quadro.innerHTML = 'Não tem mal, podes tentar outra vez!'; // Fechar o popup após resposta errada
        }
    }
}

