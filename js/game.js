// creating empty game area canvas with background, car, score and etc
function startGame() {
  myGameArea.start();
  raceGame.background = new Background(raceGame.GAMEAREAWIDTH, 1349, 0, 0, 'img/road.jpg'); //  1349 background image height - it should be equal to full height of our background image
  raceGame.playerCar = new Car({
    width: 50, height: 100, x: 230, y: 500, src: 'img/player-car.png',
  });
  raceGame.playerScore = new Counter(20, 20, 20);
  raceGame.crashSound = new Sound('sounds/crash.mp3');
  raceGame.song = new Sound('sounds/song.mp3');

  if (window.navigator.maxTouchPoints) {
    // this code is necessary only for devices with touch
    raceGame.touch = true;
    raceGame.myUpBtn = new ControlButton(50, 50, 225, 450, 'rgba(98,198,222,0.5)'); // 50 - the size of buttons that are visible only when you use devices with touch
    raceGame.myDownBtn = new ControlButton(50, 50, 225, 550, 'rgba(98,198,222,0.5)');
    raceGame.myLeftBtn = new ControlButton(50, 50, 30, 500, 'rgba(98,198,222,0.5)');
    raceGame.myRightBtn = new ControlButton(50, 50, 420, 500, 'rgba(98,198,222,0.5)');
    const canvas = document.querySelector('canvas');
    [raceGame.ratioX, raceGame.ratioY] = [canvas.offsetWidth / raceGame.GAMEAREAWIDTH, canvas.offsetHeight / raceGame.GAMEAREAHEIGHT];
  } else {
    window.addEventListener('keydown', moveCar, false);
    window.addEventListener('keyup', stopCar, false);
  }

  raceGame.obstacles = [];
  raceGame.obstacleSpeed = 2; // initial value of obstacle speed (it will increase in course of time)
  raceGame.backgroundSpeed = 1; // initial value of background speed (it will increase in course of time)
  myGameArea.frameNo = 0; // every request animation frame it will increase by 1

  document.querySelector('.game-end-background').style.display = 'none';
  document.querySelector('.game-end-wrapper').style.display = 'none';

  // update of our game field
  requestAnimationFrame(updateGameArea);
}

// constructor for score counter
class Counter {
  constructor(size, x, y) {
    this.size = size;
    this.x = x;
    this.y = y;
    this.text = 'SCORE:';
  }

  update() {
    const ctx = myGameArea.context;
    ctx.fillStyle = 'white';
    ctx.font = `italic bold ${this.size}px Arial`;
    ctx.fillText(this.text, this.x, this.y);
  }
}


// constructor for our music and sound effects
class Sound {
  constructor(src) {
    this.sound = document.createElement('audio');
    this.sound.src = src;
    this.sound.style.display = 'none';
    document.body.appendChild(this.sound);
  }

  play() {
    this.sound.play();
  }

  stop() {
    this.sound.pause();
  }
}


// constructor for background
class Background {
  constructor(width, height, x, y, src) {
    this.width = width;
    this.height = height;
    this.posX = x;
    this.posY = y;
    this.speedY = 0;
    this.image = new Image();
    this.image.src = src;
  }

  update() {
    const ctx = myGameArea.context;
    ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    ctx.drawImage(this.image, this.posX, this.posY - this.height, this.width, this.height);
  }

  changePos() {
    this.posY += this.speedY;
    if (this.posY >= this.height) { // more flexible option it's necessary when speed of background is high
      this.posY = 0;
    }
  }
}


// constructor for player car
class Car {
  constructor(obj) {
    this.image = new Image();
    /* let {this.image.src, this.width, this.height, this.posX, this.posY} = obj; */
    this.image.src = obj.src;
    this.width = obj.width;
    this.height = obj.height;
    this.posX = obj.x;
    this.posY = obj.y;
    this.speed = 0;
    this.moveAngle = 0; // the rotation angle which we will change when push keyboard button left/right keys, in deg
    this.angle = 0; // the same angle,but in radians
    this.actualAngle = 0; // current rotation angle of the car from -360 to 360, in degrees
  }

  update() {
    const ctx = myGameArea.context;
    ctx.save(); // to save the current canvas context
    ctx.translate(this.posX, this.posY); // we move the entire canvas to the center of the specific component
    ctx.rotate(this.angle); // perform the wanted rotation using the rotate() method
    ctx.drawImage(this.image, this.width / -2, this.height / -2, this.width, this.height); // context.drawImage(img,x,y,width,height);
    ctx.restore(); // restore the context object back to its saved position
  }

  changePos() {
    this.actualAngle += this.moveAngle;
    if (this.actualAngle >= 360 || this.actualAngle <= -360) {
      this.actualAngle = 0;
    }
    this.angle += this.moveAngle * Math.PI / 180;
    this.posX += this.speed * Math.sin(this.angle);
    this.posY -= this.speed * Math.cos(this.angle);
  }

  crashWith(obstacleObj) {
    let myLeft;
    let myRight;
    let myTop;
    let myBottom;
    if (((this.actualAngle > -45) && (this.actualAngle < 45)) || ((this.actualAngle > 135) && (this.actualAngle < 225))
        || ((this.actualAngle < -135) && (this.actualAngle > -225)) || (this.actualAngle > 315)) {
      myLeft = this.posX - this.width / 2;
      myRight = this.posX + this.width / 2;
      myTop = this.posY - this.height / 2;
      myBottom = this.posY + this.height / 2;
    } else {
      myLeft = this.posX - this.height / 2;
      myRight = this.posX + this.height / 2;
      myTop = this.posY - this.width / 2;
      myBottom = this.posY + this.width / 2;
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
  }

  touchWalls() {
    if (this.posX < this.width) {
      this.posX = this.width;
    }
    if (this.posX + this.width > raceGame.GAMEAREAWIDTH) {
      this.posX = raceGame.GAMEAREAWIDTH - this.width;
    }
    if (this.posY < this.height / 2) {
      this.posY = this.height / 2;
    }
    if (this.posY + this.height / 2 > raceGame.GAMEAREAHEIGHT) {
      this.posY = raceGame.GAMEAREAHEIGHT - this.height / 2;
    }
  }
}

// constructor for obstacles
class Obstacle {
  constructor(width, height, x, y) {
    this.image = new Image();
    this.image.src = `img/obstacles/car${Math.floor(Math.random() * (10 - 1 + 1)) + 1}.png`; // generate random src for image of obstacle
    this.width = width;
    this.height = height;
    this.posX = x;
    this.posY = y;
  }

  update() {
    const ctx = myGameArea.context;
    ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
  }

  move(speed) {
    this.posY += speed;
  }
}

// constructor for control buttons which are necessary to move car using touch device
class ControlButton {
  constructor(width, height, x, y, color) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.color = color;
  }

  update() {
    const ctx = myGameArea.context;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  clicked() {
    let clicked = true;
    const myLeft = this.x * raceGame.ratioX;
    const myRight = (this.x + this.width) * raceGame.ratioX;
    const myTop = this.y * raceGame.ratioY;
    const myBottom = (this.y + this.height) * raceGame.ratioY;
    if ((myLeft > myGameArea.x) || (myRight < myGameArea.x) || (myTop > myGameArea.y) || (myBottom < myGameArea.y)) {
      clicked = false;
    }
    return clicked;
  }
}


// to move our car using keypad arrow keys
function moveCar(EO) {
  EO = EO || window.event; // there is no preventDefault because we need f12 default behavior
  raceGame.song.play();
  switch (EO.which) {
    case 37:
      raceGame.playerCar.moveAngle = -1 - raceGame.backgroundSpeed / 2; // it should be connected with background speed, because without it player car will become uncontrollable at a high speed
      break;
    case 39:
      raceGame.playerCar.moveAngle = 1 + raceGame.backgroundSpeed / 2;
      break;
    case 40:
      raceGame.playerCar.speed = -2 - raceGame.backgroundSpeed / 2;
      break;
    case 38:
      raceGame.playerCar.speed = 4 + raceGame.backgroundSpeed / 2;
      break;
    default:
      break;
  }
}

// to stop our car when we don't push keypad arrow keys
function stopCar(EO) {
  EO = EO || window.event;
  EO.preventDefault();
  switch (EO.which) {
    case 39:
    case 37:
      raceGame.playerCar.moveAngle = 0;
      break;
    case 40:
    case 38:
      raceGame.playerCar.speed = 0;
      break;
    default:
      break;
  }
}


function updateGameArea() {
  // check if player car crashed
  for (let i = 0; i < raceGame.obstacles.length; i += 1) {
    if (raceGame.playerCar.crashWith(raceGame.obstacles[i])) {
      stopGame();
      return;
    }
  }
  // clear our canvas
  myGameArea.clear();
  // set speed to background, change it's position and update view
  raceGame.background.speedY = raceGame.backgroundSpeed;
  raceGame.background.changePos();
  raceGame.background.update();
  // we increase frame number by one every requestAnimationFrame
  myGameArea.frameNo += 1;
  // production of obstacles
  const OBSTACLEWIDTH = 50;
  const OBSTACLEHEIGHT = 100;
  const ObstaclePosX = Math.floor(Math.random() * (raceGame.GAMEAREAWIDTH - OBSTACLEWIDTH) + 1); // for random x coordinate for obstacles
  if ((myGameArea.frameNo === 1) || ((myGameArea.frameNo / 100) % 1 === 0)) { // would return true if (myGameArea.frameNo / n) was an integer, a%b returns surplus of the division of 2 operands
    raceGame.obstacles.push(new Obstacle(OBSTACLEWIDTH, OBSTACLEHEIGHT, ObstaclePosX, -100)); // -100 for smooth appearance of obstacles from top
  }
  raceGame.obstacles.forEach((obstacle) => {
    obstacle.move(raceGame.obstacleSpeed);
    obstacle.update();
  });
  //updating score
  raceGame.playerScore.text = `SCORE:${Math.floor(myGameArea.frameNo / 10)}`; // define the speed of score increase
  raceGame.playerScore.update();

  // the code below is necessary to control car movement using touch
  if (raceGame.touch) {
    if (myGameArea.x && myGameArea.y) {
      if (raceGame.myUpBtn.clicked()) {
        raceGame.playerCar.speed = 4 + raceGame.backgroundSpeed / 2;
      }
      if (raceGame.myDownBtn.clicked()) {
        raceGame.playerCar.speed = -2 - raceGame.backgroundSpeed / 2;
      }
      if (raceGame.myLeftBtn.clicked()) {
        raceGame.playerCar.moveAngle = -1 - raceGame.backgroundSpeed / 2;
      }
      if (raceGame.myRightBtn.clicked()) {
        raceGame.playerCar.moveAngle = 1 + raceGame.backgroundSpeed / 2;
      }
    } else {
      raceGame.playerCar.moveAngle = 0;
      raceGame.playerCar.speed = 0;
    }
  }
  //  change player car position, check if it within the canvas borders and render it
  raceGame.playerCar.changePos();
  raceGame.playerCar.touchWalls();
  raceGame.playerCar.update();
  // render buttons if we use device with touch
  if (raceGame.touch) {
    raceGame.myUpBtn.update();
    raceGame.myDownBtn.update();
    raceGame.myLeftBtn.update();
    raceGame.myRightBtn.update();
  }
  // increase game speed
  raceGame.obstacleSpeed += 0.001; // game speed acceleration
  raceGame.backgroundSpeed += 0.001;

  requestAnimationFrame(updateGameArea);
}

function stopGame() {
  raceGame.crashSound.play();
  raceGame.song.stop();
  window.removeEventListener('keydown', moveCar, false);
  window.removeEventListener('keyup', stopCar, false);
  cancelAnimationFrame(updateGameArea);
  const scoreEl = document.getElementById('score');
  scoreEl.innerHTML = ` Score: ${Math.floor(myGameArea.frameNo / 10)}`;
  $('.game-end-background').show();
  $('.game-end-wrapper').slideDown(1000);
  document.querySelector('input[value=\'main menu\']').addEventListener('click', switchToMainPage, false);
  document.querySelector('input[value=\'high scores\']').addEventListener('click', switchToLeaderboardPage, false);
  document.querySelector('input[value=\'new game\']').addEventListener('click', startGame, false);
  document.querySelector('input[value="save result"]').addEventListener('click', pushResult, false);
  // vibration for mobile phones
  if (window.navigator.vibrate) {
    window.navigator.vibrate(300);
  }
}
