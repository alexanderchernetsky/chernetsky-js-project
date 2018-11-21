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
const CONTROLBUTTONSIZE = 50; // size of buttons that are visible only when you use devices with touch
// variables
let background; // declare variable of game background
let playerCar; // declare variable of user car
let playerScore; // declare variable of user score
let crashSound; // declare variable of crash car sound
let song; // declare variable of game music
let obstacles;// variable for our obstacles
let obstacleSpeed; // initial speed of moving obstacle = 2
let backgroundSpeed; // initial speed od background moving
let myUpBtn; // our control buttons for mobile phones with touch
let myDownBtn;
let myLeftBtn;
let myRightBtn;
let touch; // if our device had touch it would be true
let ratioX; // it's the coefficient that shows quotient of canvas.offsetWidth to GAMEAREAWIDTH (it's value will be different on different devices)
let ratioY;
// game area object
const myGameArea = {
  canvas: document.createElement('canvas'),
  start() {
    this.canvas.width = GAMEAREAWIDTH;
    this.canvas.height = GAMEAREAHEIGHT;
    this.context = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);
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
  },
  clear() {
    this.context.clearRect(0, 0, GAMEAREAWIDTH, GAMEAREAHEIGHT);
  },
  frameNo: 0,
};
