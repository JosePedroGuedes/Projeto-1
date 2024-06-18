let inventory = [];
// Função para adicionar um item ao inventário
function addToInventory(item) {
    inventory.push(item);
    if(item.name == "Mochila1" || item.name == "Mochila2" || item.name == "Mochila3" || item.name == "Mochila4") {
        numberBackpacks++;
    }

    if(numberBackpacks == 1 && item.name!= "Bilhete" && item.name!= "Chave") showDialog(22);
    if(numberBackpacks == 4 && item.name!= "Bilhete" && item.name!= "Chave"){
        if(levelLoad == 0) animateSecretDoorOpening(CorredorSala4, CorredorSala4Image, "Right", "open");
        CorredorSala4.isOpen = true;
        CorredorSala4.x = 13;
        CorredorSala4Image.src = '../assets/objects/RightDoorStage3.png';
        isStop = true;
        isPaused = true;
        showDialog(20);
    }
    updateInventoryUI();
}

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

        

        // Adiciona um ouvinte de evento de clique ao itemElement
        itemElement.addEventListener('click', function() {
            // Verifica qual item foi clicado usando switch
            if(item.name == "Bilhete"){
                showDialog(2);
            }
        });
    });
}

function animateSecretDoorOpening(door, doorimage, side, direction) {
    let frame;
    let startFrame;
    let endFrame;
    
    if (direction === 'open') {
        frame = 1;
        startFrame = 1;
        endFrame = 3;
    } else if (direction === 'close') {
        frame = 3;
        startFrame = 3;
        endFrame = 1;
    } else {
        console.error('Invalid direction parameter. Use "open" or "close".');
        return;
    }

    const doorOpeningInterval = setInterval(() => {
        if ((direction === 'open' && frame <= endFrame) || (direction === 'close' && frame >= endFrame)) {
            const doorImagePath = `../assets/objects/${side}DoorStage${frame}.png`;
            doorimage.src = doorImagePath;
            ctx.clearRect(door.x, door.y, door.width, door.height);
            ctx.drawImage(doorimage, door.x, door.y, door.width, door.height);
            
            if (frame === endFrame) {
                if (direction === 'open') {
                    drawPlayer();
                } else if (direction === 'close') {
                    // Optionally do something when door closes completely
                }
            }
            
            if (direction === 'open') {
                frame++;
            } else if (direction === 'close') {
                frame--;
            }
        } else {
            clearInterval(doorOpeningInterval);
        }
    }, 200);
}
