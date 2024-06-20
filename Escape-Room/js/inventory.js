let inventory = []; //Função que guarda a informação de que itens já estão no inventário

// Função para adicionar um item ao inventário
function addToInventory(item) {
    inventory.push(item);
    if(item.name == "Mochila1" || item.name == "Mochila2" || item.name == "Mochila3" || item.name == "Mochila4") { //Verificar se é mochila para depois ser contado
        numberBackpacks++;
    }

    if(numberBackpacks == 1 && item.name!= "Bilhete" && item.name!= "Chave") showDialog(22); // Caso seja a primeira mochila a ser apanhada mostra um diálogo a explicar o que o jogador tem de fazer
    if(numberBackpacks == 4 && item.name!= "Bilhete" && item.name!= "Chave"){
        //Quando as 4 mochilas são coletadas mostra o dialogo a dizer que a porta foi aberta, e caso o jogador esteja no corredor ele consegue ver a porta a ser animada

        if(levelLoad == 0) animateSecretDoorOpening(CorredorSala4, CorredorSala4Image, "Right", "open"); //verificar se está no corredor e animar a porta
        else CorredorSala4Image.src = '../assets/objects/RightDoorStage3.png'; //só muda a imagem caso o jogador não esteja no corredor

        //mudar as variaveis em relação á porta e parar o jogador para mostrar o diálogo
        CorredorSala4.isOpen = true;
        CorredorSala4.x = 13;
        isStop = true;
        isPaused = true;
        showDialog(20);
    }
    updateInventoryUI();
}
//atualiza o html do inventário
function updateInventoryUI() { 
    const inventoryList = document.getElementById('inventoryList');
    inventoryList.innerHTML = '';
    inventory.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'inventory-item';
        const itemImage = document.createElement('img');
        itemImage.src = item.imageSrc;
        itemImage.alt = item.name;
        itemElement.appendChild(itemImage);
        inventoryList.appendChild(itemElement);

        itemElement.addEventListener('click', function() {//Adiciona a possibilidade de clicar nos itens do inventario, mas neste caso é so para o bilhete
            if(item.name == "Bilhete"){
                showDialog(2);
            }
        });
    });
}

//Função para animar a porta secreta, e que depois também sereá usada para aa fechar quando o jogador for expulso da sala
function animateSecretDoorOpening(door, doorimage, side, direction) {
    let frame;
    let startFrame;
    let endFrame;
    
    if (direction === 'open') {//ver se é para abrir a porta
        frame = 1;
        startFrame = 1;
        endFrame = 3;
    } else if (direction === 'close') {//ver se é para fechar a porta
        frame = 3;
        startFrame = 3;
        endFrame = 1;
    } else {
        console.error('Invalid direction parameter. Use "open" or "close".');
        return;
    }

    const doorOpeningInterval = setInterval(() => { //função responsável por fazer a imagem andar pelos os 3 frames para dar a ilusão de animação
        if ((direction === 'open' && frame <= endFrame) || (direction === 'close' && frame >= endFrame)) {
            
            //redefine os valores da porta
            const doorImagePath = `../assets/objects/${side}DoorStage${frame}.png`;
            doorimage.src = doorImagePath;
            ctx.clearRect(door.x, door.y, door.width, door.height);
            ctx.drawImage(doorimage, door.x, door.y, door.width, door.height);
            
            if (direction === 'open') {//quando a porta se abre, as iamgens vão do 1 - 3
                frame++;
            } else if (direction === 'close') {//quando a porta se abre, as imagens vão do 3 - 1
                frame--;
            }
        } else {
            clearInterval(doorOpeningInterval);
        }
    }, 200); //intervalo entre mudança de frames
}
