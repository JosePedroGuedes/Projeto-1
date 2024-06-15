let inventory = [];
// Função para adicionar um item ao inventário
function addToInventory(item) {
    inventory.push(item);
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
            switch(item.name){
                case "Bilhete":
                    console.log('O elemento Bilhete foi clicado!');
                    showDialog(2);
                    break;
                case "Chave":
                    console.log('O elemento Chave foi clicado!');
                    break;
                // Adicione outros casos conforme necessário
                default:
                    console.log('Item não reconhecido.');
            }
        });
    });
}

function clickInventory(){
    var elemenoBilhete= document.querySelectorAll('[alt="Bilhete"]');

    // Itera sobre os elementos encontrados
    elemenoBilhete.forEach(function(elemento) {
        // Adiciona um ouvinte de evento de clique a cada elemento
        elemento.addEventListener('click', function() {
            // Insira aqui o código que você quer executar quando o elemento com o atributo alt específico for clicado
            console.log('O elemento com alt específico foi clicado!');
    
        });
    });
}