// Lista das palavras possíveis e suas dicas
var wordList = [
    { word: "tipografia", hint: "a arte de dispor o texto" },
    { word: "grelha", hint: "estrutura usada para alinhar elementos" },
    { word: "maquete", hint: "um modelo ou réplica de um design" },
    { word: "protótipo", hint: "um exemplo inicial de um produto" },
    { word: "paleta", hint: "conjunto de cores usado num design" },
    { word: "pixel", hint: "a menor unidade de uma imagem digital" },
    { word: "layout", hint: "disposição de elementos numa página" },
    { word: "branding", hint: "processo de criação de uma marca" },
    { word: "logotipo", hint: "símbolo ou design usado por uma empresa" },
    { word: "interface", hint: "ponto de interação entre utilizador e sistema" },
    { word: "mockup", hint: "representação visual de um design" },
    { word: "proporção", hint: "relação entre tamanhos de elementos" },
    { word: "tipografia", hint: "estudo e uso de fontes" },
    { word: "fotografia", hint: "arte de capturar imagens" },
    { word: "ilustração", hint: "desenho ou imagem criada para complementar texto" },
    { word: "ícone", hint: "pequena imagem representativa" },
    { word: "resolução", hint: "qualidade de uma imagem digital" },
    { word: "animação", hint: "criação de movimento através de imagens" },
    { word: "designer", hint: "profissional que cria designs" },
    { word: "ilustrador", hint: "artista que cria ilustrações" },
    { word: "contraste", hint: "diferença entre elementos visuais" },
    { word: "harmonia", hint: "equilíbrio visual entre elementos" },
    { word: "composição", hint: "arranjo de elementos visuais" }
];

let usedWords = []; // Array onde serão guardadas as palavras usadas para evitar repetições

// Buscar os IDs dos elementos do jogo
const inputs = document.querySelector("#wordInputs"),
      hintTag = document.querySelector(".hint span"),
      guessLeft = document.querySelector(".guessesLeft span"),
      wrongLetter = document.querySelector(".wrongLetters span"),
      rightWords = document.querySelector(".rightWords span"),
      resetBtn = document.querySelector("#guessWordGame .reset-btn"),
      typingInput = document.querySelector("#letterInput"); 

// Variáveis do jogo
let wordListIndex, // Índice da palavra atual na lista de palavras
    word, // Palavra atual a ser adivinhada
    maxGuesses, // Número máximo de tentativas
    incorrectLetters = [], // Array para armazenar letras incorretas
    correctLetters = [], // Array para armazenar letras corretas
    correctWords = 0, // Contador de palavras corretas
    gameInitialized = false, // Indica se o jogo foi inicializado
    gameFinishedGuess = false; // Indica se o jogo foi concluído

// Função para verificar se o jogo de adivinhar palavras foi concluído
function checkGuessFinish() {
    return gameFinishedGuess;
}

// Função para normalizar uma string removendo acentos e transformando em minúsculas
function normalizeString(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// Função para escolher uma palavra aleatória que não tenha sido utilizada
function randomWord() {
    resetBtn.style.display = "none";
    resetBtn.innerText = "Tentar novamente";
    resetBtn.removeEventListener("click", closeGameGuessWord); // Remove event listener do botão de reset
    resetBtn.addEventListener("click", restartGame); // Adiciona event listener para reiniciar o jogo

    // Escolhe uma palavra aleatória que ainda não foi utilizada
    do {
        wordListIndex = Math.floor(Math.random() * wordList.length);
        word = normalizeString(wordList[wordListIndex].word);
    } while (usedWords.includes(word)); // Repete até encontrar uma palavra nova

    usedWords.push(word); // Adiciona a palavra utilizada ao array de utilizadas

    let ranItem = wordList[wordListIndex];
    maxGuesses = word.length >= 5 ? 6 : 6; // Define o número máximo de tentativas baseado no tamanho da palavra
    correctLetters = []; 
    incorrectLetters = []; 
    hintTag.innerText = ranItem.hint; // Define a dica da palavra
    guessLeft.innerText = maxGuesses; 
    wrongLetter.innerText = incorrectLetters.join(" "); // Exibe as letras incorretas
    rightWords.innerText = correctWords + "/3"; // Exibe o número de palavras corretas

    if(username == "admin") console.log("Palavra a ser adivinhada:", word);

    // Exibe a palavra como inputs para letras
    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" id="eachLetter" disabled>`;
    }
    inputs.innerHTML = html;
    typingInput.disabled = false;
    typingInput.focus(); // Coloca o foco no input
}

// Função para inicializar o jogo de adivinhar palavras
function initGame(e) {
    // Verifica se o jogo foi inicializado, se o jogo está visível e se há tentativas restantes
    if (!gameInitialized || document.getElementById("guessWordGame").style.display === "none" || maxGuesses < 1) return;
    let key = normalizeString(e.target.value);
    key = key.toLowerCase(); // Transforma em minúsculas

    if (key.match(/^[a-z]+$/) && !incorrectLetters.includes(` ${key}`)) { // Verifica se é uma letra válida e se não foi já usada
        if (word.includes(key)) { // Se a letra está na palavra
            for (let i = 0; i < word.length; i++) {
                if (word[i] === key) {
                    inputs.querySelectorAll("input")[i].value = key; // Preenche o input correspondente à letra correta
                    if (!correctLetters.includes(key + i)) {
                        correctLetters.push(key + i); // Adiciona a letra correta ao array
                    }
                }
            }
        } else { // Se a letra não pertence à palavra
            maxGuesses--;
            incorrectLetters.push(` ${key}`); // Adiciona a letra incorreta ao array
        }
        guessLeft.innerText = maxGuesses; // Atualiza o número de tentativas restantes
        wrongLetter.innerText = incorrectLetters.join(" "); // Exibe as letras incorretas
    }
    typingInput.value = "";

    //Verificar se todas as letras estão no local correto
    let allCorrect = true;
    for (let i = 0; i < word.length; i++) {
        if (!correctLetters.includes(word[i] + i)) {
            allCorrect = false;
            break; //Se alguma não tiver, sai da função
        }
    }

    if (allCorrect) { // Se todas as letras foram corretamente adivinhadas
        correctWords++;
        rightWords.innerText = correctWords + "/3"; // Atualiza o contador de palavras corretas

        if (correctWords === 3) { // Se acertou 3 palavras
            completeGame(); // Completa o jogo
        } else { // Se ainda não acertou as 3 palavras ainda, volta a gerar mais uma palavra
            correctLetters = [];
            incorrectLetters = [];
            maxGuesses = word.length >= 5 ? 6 : 6;
            setTimeout(randomWord, 100); // Escolhe uma nova palavra após um pequeno intervalo
        }
    } else if (maxGuesses < 1) { // Se acabaram as tentativas
        numberFailsWord++; 

        guessLeft.innerText = 0;
        resetBtn.style.display = "block";
        
        correctLetters = [];
        incorrectLetters = [];
        maxGuesses = 0;
        let wordInputs = document.querySelectorAll("#wordInputs input");
        wordInputs.forEach(input => {//Mete a palavra a vermelho
            input.style.color = "red";
        });
        
        for (let i = 0; i < word.length; i++) {//Insere a palavra que era suposto adivinhar
            inputs.querySelectorAll("input")[i].value = word[i];
        }
        typingInput.disabled = true;
    }
}

//Verificar se a palavra ja foi usada, para não haver repetições
function isWordUsed(word) {
    return usedWords.includes(word);
}

//Quando o jogo acaba
function completeGame() {
    document.querySelector(".guessesLeft").innerHTML = "";
    document.querySelector(".wrongLetters").innerHTML = "";
    document.querySelector(".hint").innerHTML = "Parabéns!! Você acertou 3 palavras seguidas!!";
    resetBtn.style.display = "block";
    resetBtn.innerText = "Sair do Minigame";
    resetBtn.removeEventListener("click", restartGame);
    resetBtn.addEventListener("click", closeGameGuessWord);
    typingInput.disabled = true;
    gameFinishedGuess = true;
}
    

//Função que renicia o jogo quando o jogador perde
function restartGame() {
    correctWords = 0;
    resetBtn.style.display = "none";
    randomWord();
}

//Função que abre o jogo
function openGameGuessWord() {
    addEventListeners();
    stopMovement = true;
    setTimeout(() => {
        document.getElementById("guessWordGame").style.display = "block";
        if (!gameInitialized) {
            randomWord();
            gameInitialized = true;
        }
        typingInput.focus();
        document.addEventListener("keydown", handleEscKey);
    }, 50);
}

//Função que fecha o jogo
function closeGameGuessWord() {
    removeEventListeners()
    stopMovement = false;
    document.getElementById("guessWordGame").style.display = "none";
    document.removeEventListener("keydown", handleEscKey);
    if (gameFinishedGuess == true ) minigamesOn++;
}

//Esconde o jogo caso o menu seje aberto
function handleEscKey(event) {
    if (event.key === "Escape") {
        removeEventListeners()
        stopMovement = true;
        document.getElementById("guessWordGame").style.display = "none";
        document.removeEventListener("keydown", handleEscKey);
    }
}

//Adicionar/remover cliques aos botões

function addEventListeners() {
    resetBtn.addEventListener("click", restartGame);
    typingInput.addEventListener("input", initGame);
    inputs.addEventListener("click", () => typingInput.focus());
    document.addEventListener("keydown", () => typingInput.focus());
}

function removeEventListeners() {
    resetBtn.removeEventListener("click", restartGame);
    typingInput.removeEventListener("input", initGame);
    inputs.removeEventListener("click", () => typingInput.focus());
    document.removeEventListener("keydown", () => typingInput.focus());
}

