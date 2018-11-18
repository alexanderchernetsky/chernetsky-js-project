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
// game area object
const myGameArea = {
  canvas: document.createElement('canvas'),
  start() {
    this.canvas.width = GAMEAREAWIDTH;
    this.canvas.height = GAMEAREAHEIGHT;
    this.context = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);
  },
  clear() {
    this.context.clearRect(0, 0, GAMEAREAWIDTH, GAMEAREAHEIGHT);
  },
  frameNo: 0,
};
