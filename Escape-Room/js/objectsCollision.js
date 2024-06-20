// Função para verificar colisões
function checkCollision(dx, dy) {
    let nextX = player.x + dx;
    let nextY = player.y + dy;
    let playerRect = { 
        x: nextX + 14, // Adiciona um deslocamento para a esquerda
        y: nextY + 5, // Mantém a mesma posição vertical
        width: player.width - 35, // Reduz a largura para as laterais
        height: player.height - 10 // Mantém a mesma altura
    };

    // Verifica colisões com os obstáculos
    for (let obstacle of obstacles) {
        if (!obstacle.isDoor) { // Verifica se não é uma porta
            let obstacleRect = obstacle.collisionArea; // Use a área de colisão do obstáculo
            if (checkRectCollision(playerRect, obstacleRect)) {
                return true; // Retorna true se houver colisão
            }
        }
    }

    // Verifica colisão com a porta apenas se o jogador estiver no nível correspondente
    if ((levelLoad === 1 && !Sala1Door1.isOpen && !Sala1Door1.isDoor && checkRectCollision(playerRect, Sala1Door1)) ||
        (levelLoad === 2 && !CorredorSala2.isOpen && !CorredorSala2.isDoor && checkRectCollision(playerRect, CorredorSala2)) ||
        (levelLoad === 2 && !CorredorSala3.isOpen && !CorredorSala3.isDoor && checkRectCollision(playerRect, CorredorSala3))) {
        return true; // Retorna true se houver colisão com a porta
    }

    return false; // Retorna false se não houver colisão
}


// Função para verificar colisão entre dois retângulos
function checkRectCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
}