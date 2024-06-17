const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define o tamanho do canvas
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

document.getElementById('inventoryImage').style.height = canvasHeight + 'px';

var novaPosicaoX = canvasWidth + 80;

document.getElementById('inventoryContainer').style.left = novaPosicaoX + 'px';

const canvasWidth2 = 500;
const canvasHeight2 = 700;

function clearGameObjects() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    obstacles = [];
    document.getElementById("mathQuizBox").style.display = "none";
}

// Define as variáveis do jogo
const keyImage = new Image();
keyImage.src = '../assets/collectibles/ChaveSala1.png';

let key = {
    x: 130,
    y: 83,
    width: 17,
    height: 9,
    isPickedUp: false
};

// Gera automaticamente o ticket com código aleatório
const randomNumberTicket = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000; // Número aleatório entre 1000 e 9999
const binaryCode = randomNumberTicket.toString(2).padStart(4, '0'); // Transforma em binário e adiciona zeros à esquerda para garantir 4 dígitos

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

console.log(ticket);

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

// Define as variáveis da porta
const Sala1Door1Image = new Image();
Sala1Door1Image.src = '../assets/objects/RightDoorStage1.png';

const Sala1Door1 = { // porta do nível 1
    x: 13,
    y: 122,
    width: null, // Inicialmente null
    height: null, // Inicialmente null
    isOpen: false,
};

const Sala2Door1Image = new Image();
Sala2Door1Image.src = '../assets/objects/LeftDoorStage3.png';

const Sala2Door1 = { // porta do nível 1
    x: 456.3,
    y: 132,
    width: null, // Inicialmente null
    height: null, // Inicialmente null
    isOpen: true,
};

const Sala3Door1Image = new Image();
Sala3Door1Image.src = '../assets/objects/RightDoorStage3.png';

const Sala3Door1 = { // porta do nível 1
    x: 13,
    y: 112,
    width: null, // Inicialmente null
    height: null, // Inicialmente null
    isOpen: true,
};

const CorredorSala1Image = new Image();
CorredorSala1Image.src = '../assets/objects/LeftDoorStage3.png';

const CorredorSala1 = { // porta do nível 2
    x: 456.3 ,
    y: 530,
    width: null, // Inicialmente null
    height: null,
    isOpen: true,
};

const CorredorSala2Image = new Image();
CorredorSala2Image.src = '../assets/objects/RightDoorStage1.png';

const CorredorSala2 = { // porta do nível 1
    x: 13,
    y: 530,
    width: null, // Inicialmente null
    height: null, // Inicialmente null
    isOpen: false,
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
};

const CorredorSala4Image = new Image();
CorredorSala4Image.src = '../assets/objects/RightDoorStage1.png';

const CorredorSala4 = {
    x: 13,
    y: 130,
    width: null, // Inicialmente null
    height: null,
    isOpen: false,
};

const LeaveDoorImage = new Image();
LeaveDoorImage.src = '../assets/objects/DoubleDoorStage1.png';

const LeaveDoor = {
    x: 206,
    y: 58,
    width: null, // Inicialmente null
    height: null,
    isOpen: false,
};

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

let obstacles = [];

let stopMovement = false;