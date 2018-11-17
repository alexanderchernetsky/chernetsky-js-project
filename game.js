'use strict';
// constants
const GAMEAREAWIDTH = 500; // width of our game area
const GAMEAREAHEIGHT = 600; // height of our game area
const PLAYERCARWIDTH = 50; // width of user car
const PLAYERCARHEIGHT = 100; // height of user car
const OBSTACLEWIDTH = 50; // width of obstacle
const OBSTACLEHEIGHT = 100; // height of obstacle
const SCORESIZE = 20; // the size of our score
const BACKGROUNDIMAGEHEIGHT = 1349; //  it should be equal to full height of our background image
const ACCELERATION = 0.001; // game speed acceleration


let playerCar; // declare variable of user car
const obstacles = [];// variable for our obstacles
let obstacleSpeed = 2; // initial speed of moving obstacle = 2
let playerScore; // declare variable of user score
let background; // declare variable of game background
let backgroundSpeed = 1; // initial speed od background moving
let crashSound; // declare variable of crash car sound
let song; // declare variable of game music


// game area object
const myGameArea = {
  canvas: document.createElement('canvas'),
  start() {
    this.canvas.width = GAMEAREAWIDTH;
    this.canvas.height = GAMEAREAHEIGHT;
    this.context = this.canvas.getContext('2d');
    document.querySelector('.canvas-wrapper').appendChild(this.canvas);
  },
  clear() {
    this.context.clearRect(0, 0, GAMEAREAWIDTH, GAMEAREAHEIGHT);
  },
  frameNo: 0,
};

// creating empty game area canvas with background, car and score
(function startGame() {
  myGameArea.start();
  background = new Background(GAMEAREAWIDTH, BACKGROUNDIMAGEHEIGHT, 0, 0, 'img/road.jpg');
  playerCar = new Car(PLAYERCARWIDTH, PLAYERCARHEIGHT, 230, 500, 'img/player-car.png');
  playerScore = new Counter(SCORESIZE, 20, 20);
  crashSound = new Sound('sounds/crash.mp3');
  song = new Sound('sounds/song.mp3');
}());


// constructor for score counter
function Counter(size, x, y) {
  const self = this;
  self.text = 'SCORE:';
  self.update = function () {
    const ctx = myGameArea.context;
    ctx.fillStyle = 'white';
    ctx.font = `italic bold ${size}px Arial`;
    ctx.fillText(self.text, x, y);
  };
}

function Sound(src) {
  const self = this;
  self.sound = document.createElement('audio');
  self.sound.src = src;
  self.sound.style.display = 'none';
  document.body.appendChild(self.sound);
  self.play = function () {
    self.sound.play();
  };
  self.stop = function () {
    self.sound.pause();
  };
}


// constructor for background
function Background(width, height, x, y, src) {
  const self = this;
  self.image = new Image();
  self.image.src = src;
  self.width = width;
  self.height = height;
  self.speedY = 0;
  self.posX = x;
  self.posY = y;
  self.update = function () {
    const ctx = myGameArea.context;
    ctx.drawImage(self.image, self.posX, self.posY, self.width, self.height);
    ctx.drawImage(self.image, self.posX, self.posY - self.height, self.width, self.height);
  };
  self.changePos = function () {
    self.posY += self.speedY;
    if (self.posY >= self.height) { // more flexible option it's necessary when speed of background is high
      self.posY = 0;
    }
  };
}


// constructor for player car
function Car(width, height, x, y, src) {
  const self = this;
  self.image = new Image();
  self.image.src = src;
  self.width = width;
  self.height = height;
  /* self.speedX = 0;
  self.speedY = 0; */
  self.speed = 0;
  self.angle = 0;
  self.moveAngle = 0;
  self.actualAngle = 0;
  self.posX = x;
  self.posY = y;
  self.update = function () {
    const ctx = myGameArea.context;
    ctx.save(); // to save the current canvas context
    ctx.translate(self.posX, self.posY); // we move the entire canvas to the center of the specific component
    ctx.rotate(self.angle); // perform the wanted rotation using the rotate() method
    ctx.drawImage(self.image, self.width / -2, self.height / -2, self.width, self.height); // context.drawImage(img,x,y,width,height);
    ctx.restore(); // restore the context object back to its saved position
  };
  self.changePos = function () {
    self.actualAngle += self.moveAngle;
    if (self.actualAngle >= 360 || self.actualAngle <= -360) {
      self.actualAngle = 0;
    }
    self.angle += self.moveAngle * Math.PI / 180;
    self.posX += self.speed * Math.sin(self.angle);
    self.posY -= self.speed * Math.cos(self.angle);
  };
  self.crashWith = function (obstacleObj) {
    if (((self.actualAngle > -45) && (self.actualAngle < 45)) || ((self.actualAngle > 135) && (self.actualAngle < 225))
        || ((self.actualAngle < -135) && (self.actualAngle > -225)) || (self.actualAngle > 315)) {
      var myLeft = self.posX - self.width / 2;
      var myRight = self.posX + self.width / 2;
      var myTop = self.posY - self.height / 2;
      var myBottom = self.posY + self.height / 2;
    } else {
      var myLeft = self.posX - self.height / 2;
      var myRight = self.posX + self.height / 2;
      var myTop = self.posY - self.width / 2;
      var myBottom = self.posY + self.width / 2;
    }

    const obstacleBottom = obstacleObj.posY + obstacleObj.height;
    const obstacleTop = obstacleObj.posY;
    const obstacleRight = obstacleObj.posX + obstacleObj.width;
    const obstacleLeft = obstacleObj.posX;
    let crash = false;
    if ((myTop < obstacleBottom) && (myBottom > obstacleTop)) {
      if ((myRight > obstacleLeft) && (myLeft < obstacleRight)) {
        crash = true;
      }
    }
    return crash;
  };
  self.touchWalls = function () {
    if (self.posX < 0) {
      self.posX = 0;
    }
    if (self.posX + self.width > GAMEAREAWIDTH) {
      self.posX = GAMEAREAWIDTH - self.width;
    }
    if (self.posY < 0) {
      self.posY = 0;
    }
    if (self.posY + self.height > GAMEAREAHEIGHT) {
      self.posY = GAMEAREAHEIGHT - self.height;
    }
  };
}

// constructor for obstacles
function Obstacle(width, height, x, y) {
  const self = this;
  self.image = new Image();
  self.image.src = `img/obstacles/car${Math.floor(Math.random() * (10 - 1 + 1)) + 1}.png`; // generate random src for image of obstacle
  self.width = width;
  self.height = height;
  self.posX = x;
  self.posY = y;
  self.update = function () {
    const ctx = myGameArea.context;
    ctx.drawImage(self.image, self.posX, self.posY, self.width, self.height);
  };
  self.move = function (speed) {
    self.posY += speed;
  };
}

window.addEventListener('keydown', moveCar, false);
window.addEventListener('keyup', stopCar, false);


// functions for control our car using keypad arrow keys
// to move car
function moveCar(EO) {
  EO = EO || window.event;
  song.play();
  switch (EO.which) {
    case 37:
      playerCar.moveAngle = -1 - backgroundSpeed / 2; // it should be connected with background speed, because without it player car will become uncontrollable at a high speed
      break;
    case 39:
      playerCar.moveAngle = 1 + backgroundSpeed / 2;
      break;
    case 40:
      playerCar.speed = -2 - backgroundSpeed / 2;
      break;
    case 38:
      playerCar.speed = 4 + backgroundSpeed / 2;
      break;
    default:
      break;
  }
}

// to stop car
function stopCar(EO) {
  EO = EO || window.event;
  EO.preventDefault();
  switch (EO.which) {
    case 39:
    case 37:
      playerCar.moveAngle = 0;
      break;
    case 40:
    case 38:
      playerCar.speed = 0;
      break;
    default:
      break;
  }
}

// update of our game field
requestAnimationFrame(updateGameArea);


function updateGameArea() {
  for (let i = 0; i < obstacles.length; i += 1) {
    if (playerCar.crashWith(obstacles[i])) {
      stopGame();
      return;
    }
  }

  myGameArea.clear();
  background.speedY = backgroundSpeed;
  background.changePos();
  background.update();

  myGameArea.frameNo += 1;

  const xObstaclePos = Math.floor(Math.random() * (GAMEAREAWIDTH - OBSTACLEWIDTH) + 1); // for random x coordinate for obstacles
  if ((myGameArea.frameNo === 1) || everyObstacleInterval(100)) {
    obstacles.push(new Obstacle(OBSTACLEWIDTH, OBSTACLEHEIGHT, xObstaclePos, -100)); // -100 for smooth appearance of obstacles from top
  }
  for (let j = 0; j < obstacles.length; j += 1) {
    obstacles[j].move(obstacleSpeed);
    obstacles[j].update();
  }

  playerScore.text = `SCORE:${Math.floor(myGameArea.frameNo / 10)}`; // define the speed of score increase
  playerScore.update();

  playerCar.changePos();
  playerCar.touchWalls();
  playerCar.update();

  obstacleSpeed += ACCELERATION;
  backgroundSpeed += ACCELERATION;

  requestAnimationFrame(updateGameArea);
}

function everyObstacleInterval(n) {
  return (myGameArea.frameNo / n) % 1 == 0; // would return true if (myGameArea.frameNo / n) was an integer, a%b returns surplus of the division of 2 operands
}

function stopGame() {
  crashSound.play();
  song.stop();
  window.removeEventListener('keydown', moveCar, false);
  window.removeEventListener('keyup', stopCar, false);
  cancelAnimationFrame(updateGameArea);
  const gameEndMenu = document.querySelector('.game-end-wrapper');
  gameEndMenu.style.display = 'block';
  const scoreEl = document.getElementById('score');
  scoreEl.innerHTML = ` Score: ${Math.floor(myGameArea.frameNo / 10)}`;
  const backgroundEl = document.querySelector('.game-end-background');
  backgroundEl.style.display = 'block';
}
