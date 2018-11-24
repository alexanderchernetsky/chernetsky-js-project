const raceGame = {
  GAMEAREAWIDTH: 500, // width of our game area
  GAMEAREAHEIGHT: 600, // height of our game area
  background: undefined, // declare variable of game background
  playerCar: undefined, // declare variable of user car
  playerScore: undefined, // declare variable of user score
  crashSound: undefined, // declare variable of crash car sound
  song: undefined, // declare variable of game music
  obstacles: undefined, // variable for our obstacles
  obstacleSpeed: undefined, // initial speed of moving obstacle = 2
  backgroundSpeed: undefined, // initial speed od background moving
  myUpBtn: undefined, // UP control button for mobile devices with touch
  myDownBtn: undefined, // DOWN control button for mobile devices with touch
  myLeftBtn: undefined, // LEFT control button for mobile devices with touch
  myRightBtn: undefined, // RIGHT control button for mobile devices with touch
  touch: undefined, // if our device had touch it would be true
  ratioX: undefined, // it's the coefficient that shows quotient of canvas.offsetWidth to GAMEAREAWIDTH (it's value will be different on different devices)
  ratioY: undefined, // it's the coefficient that shows quotient of canvas.offsetHeight to GAMEAREAHEIGHT (it's value will be different on different devices)
};
