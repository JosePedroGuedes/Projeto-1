// Função para verificar colisões
function checkCollision(dx, dy) {
    //Defenir os limetes do jogador. Como a imagem do personagem tem partes vazias, foi necessário mexer nesses valores para não considerar as partes vazias como o limite de colisão do jogador
    let nextX = player.x + dx;
    let nextY = player.y + dy;
    let playerRect = { 
        x: nextX + 14,
        y: nextY + 5, 
        width: player.width - 35,
        height: player.height - 10
    };

    // Verifica colisões com os obstáculos
    for (let obstacle of obstacles) {
        if (!obstacle.isDoor) { // Verifica se não é uma porta, para não criar colisões com elas
            let obstacleRect = obstacle.collisionArea; 
            if (checkRectCollision(playerRect, obstacleRect)) {
                return true; // Retorna true se houver colisão
            }
        }
    }

    return false; // Retorna false se não houver colisão
}

// Função para fazer a conta para verificar a colisão entre dois objetos
function checkRectCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
}