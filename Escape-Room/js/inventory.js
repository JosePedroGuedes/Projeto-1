let inventory = [];
// Função para adicionar um item ao inventário
function addToInventory(item) {
    inventory.push(item);
    if(item.name == "Mochila1" || item.name == "Mochila2" || item.name == "Mochila3" || item.name == "Mochila4") {
        numberBackpacks++;
    }

    if(numberBackpacks == 4 && item.name!= "Bilhete" && item.name!= "Chave"){
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