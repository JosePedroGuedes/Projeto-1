//Defenir a variável do canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define o tamanho do canvas
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

//Ajustar inventário para estar alinhado com o canvas
document.getElementById('inventoryImage').style.height = canvasHeight + 'px';
var novaPosicaoX = canvasWidth + 80;
document.getElementById('inventoryContainer').style.left = novaPosicaoX + 'px';

//Tamanho do canvas do Corredor
const canvasWidth2 = 500;
const canvasHeight2 = 700;

//Função responsável por limpar os objetos do nível anterior

let obstacles = []; 
function clearGameObjects() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    obstacles = [];
    document.getElementById("mathQuizBox").style.display = "none";
}

let stopMovement = false; //Variável responsável por saber se o jogador está parado

// Define as variáveis do jogo

// Definir as variáveis da chave e do bilhete
const keyImage = new Image();
keyImage.src = '../assets/collectibles/ChaveSala1.png';

let key = {
    x: 130,
    y: 83,
    width: 17,
    height: 9,
    isPickedUp: false
};

// Gerador do código binário
const randomNumberTicket = Math.floor(Math.random() * (999 - 100 + 1)) + 100; // Número aleatório entre 100 e 999 para ter sempre 3 dígitos
const binaryCode = randomNumberTicket.toString(2).padStart(7, '0');

const ticketImage = new Image();
ticketImage.src = '../assets/collectibles/bilhete.png';

const ticket = {
    x: 385,
    y: 145,
    width: 15,
    height: 20,
    binarycode: binaryCode,
    isPickedUp: false,
};

// Definir as variáveis das mochilas

const Mochila1Image = new Image();
Mochila1Image.src = '../assets/collectibles/Mochila1.png';

let mochila1 = {
    x: 438,
    y: 265,
    width: 24,
    height: 30,
    isPickedUp: false
};

const Mochila2Image = new Image();
Mochila2Image.src = '../assets/collectibles/Mochila2.png';

let mochila2 = {
    x: 365,
    y: 115,
    width: 24,
    height: 30,
    isPickedUp: false
};

const Mochila3Image = new Image();
Mochila3Image.src = '../assets/collectibles/Mochila3.png';

let mochila3 = {
    x: 180,
    y: 95,
    width: 24,
    height: 30,
    isPickedUp: false
};

const Mochila4Image = new Image();
Mochila4Image.src = '../assets/collectibles/Mochila4.png';

let mochila4 = {
    x: 290,
    y: 350,
    width: 24,
    height: 30,
    isPickedUp: false
};

// Definir as variáveis das portas
const Sala1Door1Image = new Image();
Sala1Door1Image.src = '../assets/objects/RightDoorStage1.png';

const Sala1Door1 = { // porta do nível 1
    x: 13,
    y: 122,
    width: null, 
    height: null, 
    isOpen: false,
    isDoor: true
};

const Sala2Door1Image = new Image();
Sala2Door1Image.src = '../assets/objects/LeftDoorStage3.png';

const Sala2Door1 = { // porta do nível 1
    x: 456.3,
    y: 132,
    width: null, // Inicialmente null
    height: null, // Inicialmente null
    isOpen: true,
    isDoor: true
};

const Sala3Door1Image = new Image();
Sala3Door1Image.src = '../assets/objects/RightDoorStage3.png';

const Sala3Door1 = { // porta do nível 1
    x: 13,
    y: 112,
    width: null, // Inicialmente null
    height: null, // Inicialmente null
    isOpen: true,
    isDoor: true
};

const CorredorSala1Image = new Image();
CorredorSala1Image.src = '../assets/objects/LeftDoorStage3.png';

const CorredorSala1 = { // porta do nível 2
    x: 456.3 ,
    y: 530,
    width: null, // Inicialmente null
    height: null,
    isOpen: true,
    isDoor: true
};

const CorredorSala2Image = new Image();
CorredorSala2Image.src = '../assets/objects/RightDoorStage1.png';

const CorredorSala2 = { // porta do nível 1
    x: 13,
    y: 530,
    width: null, // Inicialmente null
    height: null, // Inicialmente null
    isOpen: false,
    isDoor: true,
    code: parseInt(ticket.binarycode, 2) // código decimal do código binário no ticket
};

const CorredorSala3Image = new Image();
CorredorSala3Image.src = '../assets/objects/LeftDoorStage1.png';

const CorredorSala3 = { 
    x: 481.3,
    y: 130,
    width: null, // Inicialmente null
    height: null,
    isOpen: false,
    isDoor: true
};

const CorredorSala4Image = new Image();
CorredorSala4Image.src = '../assets/objects/RightDoorStage1.png';

const CorredorSala4 = {
    x: 13,
    y: 130,
    width: null, // Inicialmente null
    height: null,
    isOpen: false,
    isDoor: true
};

const LeaveDoorImage = new Image();
LeaveDoorImage.src = '../assets/objects/DoubleDoorStage1.png';

const LeaveDoor = {
    x: 206,
    y: 58,
    width: null, // Inicialmente null
    height: null,
    isOpen: false,
    isDoor: true
};

// Funções responsáveis por aumentar o tamanho das imagens das portas para ficarem bem no cenário e prevenir que as imagens não bugem

function adjustDoorSize(door, doorImage) {
    door.width = doorImage.width * 1.1;
    door.height = doorImage.height * 1.2;
}

Sala1Door1Image.onload = function() {
    adjustDoorSize(Sala1Door1, Sala1Door1Image);
};

Sala2Door1Image.onload = function() {
    adjustDoorSize(Sala2Door1, Sala2Door1Image);
};

Sala3Door1Image.onload = function() {
    adjustDoorSize(Sala3Door1, Sala3Door1Image);
};

CorredorSala1Image.onload = function() {
    adjustDoorSize(CorredorSala1, CorredorSala1Image);
};

CorredorSala2Image.onload = function() {
    adjustDoorSize(CorredorSala2, CorredorSala2Image);
};

CorredorSala3Image.onload = function() {
    adjustDoorSize(CorredorSala3, CorredorSala3Image);
};

CorredorSala4Image.onload = function() {
    adjustDoorSize(CorredorSala4, CorredorSala4Image);
};

LeaveDoorImage.onload = function() {
    adjustDoorSize(LeaveDoor, LeaveDoorImage);
};
