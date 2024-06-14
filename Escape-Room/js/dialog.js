let dialogMap = {};
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
dialogMap[2] = `"O bilhete diz que o código da sala dos professores é ${ticket.binarycode}, mas ao o que parece o código está codificado"`;
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