// controller
(function (window) {
  class CarController {
    constructor() {
      this.myModel = null;
      this.myField = null; // внутри какого элемента DOM наша вёрстка
      this.moveCar = this.moveCar.bind(this);
      this.stopCar = this.stopCar.bind(this);
    }

    start(model, field) {
      this.myModel = model;
      this.myField = field;
      // ищем и запоминаем интересные нам элементы DOM
      // назначаем обработчики событий
      window.addEventListener('keydown', this.moveCar, false);
      window.addEventListener('keyup', this.stopCar, false);
    }

    moveCar(EO) {
      EO = EO || window.event; // there is no preventDefault because we need f12 default behavior
      switch (EO.which) {
        case 37:
          this.myModel.changeMoveAngle(-1 - raceGame.backgroundSpeed / 2); // контроллер вызывает только методы модели
          break;
        case 39:
          this.myModel.changeMoveAngle(1 + raceGame.backgroundSpeed / 2);
          break;
        case 40:
          this.myModel.changeSpeed(-2 - raceGame.backgroundSpeed / 2);
          break;
        case 38:
          this.myModel.changeSpeed(4 + raceGame.backgroundSpeed / 2);
          break;
        default:
          break;
      }
    }

    stopCar(EO) {
      EO = EO || window.event;
      EO.preventDefault();
      switch (EO.which) {
        case 39:
        case 37:
          this.myModel.changeMoveAngle(0);// контроллер вызывает только методы модели
          break;
        case 40:
        case 38:
          this.myModel.changeSpeed(0);
          break;
        default:
          break;
      }
    }
  }

  window.raceGame = window.raceGame || {};
  window.raceGame.CarController = CarController;
}(window));

if (window.navigator.maxTouchPoints) {
  // this code is necessary only for devices with touch
  raceGame.touch = true;
  raceGame.myUpBtn = new ControlButton(50, 50, 225, 450, 'rgba(98,198,222,0.5)'); // 50 - the size of buttons that are visible only when you use devices with touch
  raceGame.myDownBtn = new ControlButton(50, 50, 225, 550, 'rgba(98,198,222,0.5)');
  raceGame.myLeftBtn = new ControlButton(50, 50, 30, 500, 'rgba(98,198,222,0.5)');
  raceGame.myRightBtn = new ControlButton(50, 50, 420, 500, 'rgba(98,198,222,0.5)');
  const canvas = document.querySelector('canvas');
  [raceGame.ratioX, raceGame.ratioY] = [canvas.offsetWidth / raceGame.GAMEAREAWIDTH, canvas.offsetHeight / raceGame.GAMEAREAHEIGHT];
}


/*
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

// render buttons if we use device with touch
if (raceGame.touch) {
  raceGame.myUpBtn.update();
  raceGame.myDownBtn.update();
  raceGame.myLeftBtn.update();
  raceGame.myRightBtn.update();



  //from gamearea.js
  if (window.navigator.maxTouchPoints) {
      const canvas = document.querySelector('canvas');
      const canvasInfoHash = canvas.getBoundingClientRect();
      window.addEventListener('touchstart', (EO) => {
        if (EO.target.tagName === 'CANVAS') {
          myGameArea.x = EO.targetTouches[0].pageX - canvasInfoHash.left;
          myGameArea.y = EO.targetTouches[0].pageY - canvasInfoHash.top;
        }
      }, false);
      window.addEventListener('touchend', (EO) => {
        myGameArea.x = false;
        myGameArea.y = false;
      }, false);
    }
}*/
