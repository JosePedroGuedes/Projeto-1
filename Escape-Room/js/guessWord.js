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

const inputs = document.querySelector("#wordInputs"),
      hintTag = document.querySelector(".hint span"),
      guessLeft = document.querySelector(".guessesLeft span"),
      wrongLetter = document.querySelector(".wrongLetters span"),
      rightWords = document.querySelector(".rightWords span"),
      resetBtn = document.querySelector("#guessWordGame .reset-btn"),
      typingInput = document.querySelector("#letterInput");

let wordListIndex, word, maxGuesses, incorrectLetters = [], correctLetters = [], correctWords = 0, gameInitialized = false, gameFinishedGuess = false;

function checkGuessFinish(){
    return gameFinishedGuess;
}

function normalizeString(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function randomWord() {
    resetBtn.style.display = "none";
    resetBtn.innerText = "Tentar novamente";
    resetBtn.removeEventListener("click", closeGameGuessWord);
    resetBtn.addEventListener("click", restartGame);
    wordListIndex = Math.floor(Math.random() * wordList.length);
    let ranItem = wordList[wordListIndex];
    word = normalizeString(ranItem.word);
    maxGuesses = word.length >= 5 ? 6 : 6;
    correctLetters = []; incorrectLetters = [];
    hintTag.innerText = ranItem.hint;
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrectLetters.join(" ");
    rightWords.innerText = correctWords + "/3";

    console.log("Palavra a ser adivinhada:", word);

    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" id="eachLetter" disabled>`;
    }
    inputs.innerHTML = html;
    typingInput.disabled = false;
    typingInput.focus();
}

function initGame(e) {
    if (!gameInitialized || document.getElementById("guessWordGame").style.display === "none" || maxGuesses < 1) return;
    let key = normalizeString(e.target.value);
    key = key.toLowerCase();
    if (key.match(/^[a-z]+$/) && !incorrectLetters.includes(` ${key}`)) {
        if (word.includes(key)) {
            for (let i = 0; i < word.length; i++) {
                if (word[i] === key) {
                    inputs.querySelectorAll("input")[i].value = key;
                    if (!correctLetters.includes(key + i)) {
                        correctLetters.push(key + i);
                    }
                }
            }
        } else {
            maxGuesses--;
            incorrectLetters.push(` ${key}`);
        }
        guessLeft.innerText = maxGuesses;
        wrongLetter.innerText = incorrectLetters.join(" ");
    }
    typingInput.value = "";

    let allCorrect = true;
    for (let i = 0; i < word.length; i++) {
        if (!correctLetters.includes(word[i] + i)) {
            allCorrect = false;
            break;
        }
    }

    if (allCorrect) {
        correctWords++;
        rightWords.innerText = correctWords + "/3";
        if (correctWords === 3) {
            completeGame();
        } else {
            correctLetters = [];
            incorrectLetters = [];
            maxGuesses = word.length >= 5 ? 6 : 6;
            setTimeout(randomWord, 100);
        }
    } else if (maxGuesses < 1) {
        guessLeft.innerText = 0;
        resetBtn.style.display = "block";
        correctLetters = [];
        incorrectLetters = [];
        maxGuesses = 0;
        let wordInputs = document.querySelectorAll("#wordInputs input");
        wordInputs.forEach(input => {
            input.style.color = "red";
        });
        
        for (let i = 0; i < word.length; i++) {
            inputs.querySelectorAll("input")[i].value = word[i];
        }
        typingInput.disabled = true;
    }
}

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
    

function restartGame() {
    correctWords = 0;
    resetBtn.style.display = "none";
    randomWord();
}

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

function closeGameGuessWord() {
    removeEventListeners()
    stopMovement = false;
    document.getElementById("guessWordGame").style.display = "none";
    document.removeEventListener("keydown", handleEscKey);
}

function handleEscKey(event) {
    if (event.key === "Escape") {
        removeEventListeners()
        stopMovement = true;
        document.getElementById("guessWordGame").style.display = "none";
        document.removeEventListener("keydown", handleEscKey);
    }
}

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

