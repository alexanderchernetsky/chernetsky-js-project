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
// variables
let background; // declare variable of game background
let playerCar; // declare variable of user car
let playerScore; // declare variable of user score
let crashSound; // declare variable of crash car sound
let song; // declare variable of game music
let obstacles;// variable for our obstacles
let obstacleSpeed; // initial speed of moving obstacle = 2
let backgroundSpeed; // initial speed od background moving
let myUpBtn;
let myDownBtn;
let myLeftBtn;
let myRightBtn;


// game area object
const myGameArea = {
  canvas: document.createElement('canvas'),
  start() {
    this.canvas.width = GAMEAREAWIDTH;
    this.canvas.height = GAMEAREAHEIGHT;
    this.context = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);
      /*window.addEventListener('touchstart', function (EO) {
      console.log('touchstart');
      console.log(EO);
      console.log(EO.pageX, EO.pageY);
      myGameArea.x = EO.pageX;
      myGameArea.y = EO.pageY;
    }, false);
    window.addEventListener('touchend', function (EO) {
      console.log('touchend');
      myGameArea.x = false;
      myGameArea.y = false;
    }, false);*/
    window.addEventListener('mousedown', function (EO) {
      console.log('mousedown');
      if (EO.target.tagName === 'CANVAS') {
        myGameArea.x = EO.offsetX;
        myGameArea.y = EO.offsetY;
      }
    }, false);
    window.addEventListener('mouseup', function (EO) {
      console.log('mouseup');
      myGameArea.x = false;
      myGameArea.y = false;
    }, false);
  },
  clear() {
    this.context.clearRect(0, 0, GAMEAREAWIDTH, GAMEAREAHEIGHT);
  },
  frameNo: 0,
};
