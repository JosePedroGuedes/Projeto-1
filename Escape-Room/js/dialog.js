let dialogMap = {};
let secretDialog = false;
hideDialog();


function showDialog(key) {
    const dialogBox = document.getElementById('dialogBox');
    const dialogText = document.getElementById('dialogText');

    if (dialogMap.hasOwnProperty(key)) {
        const text = dialogMap[key];
        dialogText.textContent = text;
        dialogBox.classList.remove('hidden');
        isStop = true;
        isPaused = true;
        clearInterval(timerInterval);
        timerElement.classList.add("blink");

        // Adicionando eventos de clique e tecla Enter para avançar o diálogo
        setTimeout(function() {
            document.addEventListener('click', handleClickToAdvanceDialog);
            document.addEventListener('keydown', handleKeyPressToAdvanceDialog);
        }, 500);
    } else {
        console.error("Chave de diálogo inválida.");
    }
}

function hideDialog() {
    
    const dialogBox = document.getElementById('dialogBox');
    dialogBox.classList.add('hidden');
    isStop = false;
    isPaused = false;
    timerElement.classList.remove("blink");
    startTimer();
    
    // Removendo eventos de clique e tecla Enter ao ocultar o diálogo
    document.removeEventListener('click', handleClickToAdvanceDialog);
    document.removeEventListener('keydown', handleKeyPressToAdvanceDialog);

    if(secretDialog){
        CorredorSala4.isOpen = false;
        CorredorSala4.x = 13;
        CorredorSala4Image.src = '../assets/objects/RightDoorStage1.png';
        showDialog(21);
        addTime(1,30);
        secretDialog = false;
        loadLevel(0);
        player.x = CorredorSala4.x + 30;
        player.y = CorredorSala4.y;
    }
}

function handleClickToAdvanceDialog(event) {
    if (!dialogBox.contains(event.target)) {
        hideDialog();
    }
}

function handleKeyPressToAdvanceDialog(event) {
    if (event.key === 'Enter') {
        hideDialog();
    }
}

dialogMap[1] = "Bem vindo ao Escape Room do TSIW!! Aqui terá uma oportunidade de descobrir mais sobre este curso de uma forma diferente e desafiadora. Espero que se divirta!!";
dialogMap[2] = `"O bilhete diz que o código da sala dos professores é ${ticket.binarycode}. O código está em binário, vou ter que o descodificar"(podes clicar no papel novamente para ver o código)`;
dialogMap[3] = '"Ao que parece o código está errado. Devo ter errado em alguma coisa"';
dialogMap[4] = "Nesta sala vamos testar o seu conhecimento sobre Matemática. Interaja com o quadro para começar o desafio e conseguir passar para a próxima fase";
dialogMap[5] = "Ainda não completou todos os desafios para poder sair!";
dialogMap[6] = '"Assério que errei a pergunta? Agora vou ter de começar tudo de novo"';
dialogMap[7] = '"Jurava que esta era a resposta certa"';
dialogMap[8] = '"Mais valia ter feito á sorte, que talvez acertava"';
dialogMap[9] = 'Parabéns! Acertou a todas as perguntas!! A próxima sala já está disponível';
dialogMap[10] = 'Já completou o minigame do Puzzle. Agora falta acabar o outro minigame';
dialogMap[11] = 'Já completou o minigame de Advinhar Palavras. Agora falta acabar o outro minigame';
dialogMap[12] = 'Parabéns! Você completou ambos os minigames!! A porta para o próximo desafio foi aberta!!';
dialogMap[13] = '"Falta-me encontrar onde está o código desta porta. Deve estar em algum bilhete por aí"';
dialogMap[14] = 'Complete os outros desafios para poder aceder a esta porta';
dialogMap[15] = '"Preciso de encontrar a chave para abrir esta porta"';
dialogMap[16] = 'Tem de completar o desafio atual para ter acesso á porta!';
dialogMap[17] = 'Tem de completar todos os desafios para poder finalizar!!';
dialogMap[18] = 'Porta Secreta - para a abrir é preciso encontrares as cores verde, rosa, vermelho e azul';
dialogMap[19] = 'Pensavamos que ninguém iria conseguir entrar nesta sala. Estamos impressionados!! Serás recompensado por o conseguires. Mas não é suposto estares aqui, por isso SAI!!';
dialogMap[20] = 'Conseguiste decifrar o desafio da sala secreta! A porta está aberta.';
dialogMap[21] = '*Foi adicionado mais 01:30 minutos ao seu tempo*';

