window.raceGame = {
  GAMEAREAWIDTH: 500, // width of our game area
  GAMEAREAHEIGHT: 600, // height of our game area
  backgroundSpeed: undefined, // background speed will increase in course of time (necessary for car speed correction)
  obstacleModels: undefined, // variables for our obstacles
  obstacleViews: undefined,
  obstacleControllers: undefined,
  obstacleSpeed: undefined,
  touch: undefined, // if our device had touch it would be true
  ratioX: undefined, // it's the coefficient that shows quotient of canvas.offsetWidth to GAMEAREAWIDTH (it's value will be different on different devices)
  ratioY: undefined, // it's the coefficient that shows quotient of canvas.offsetHeight to GAMEAREAHEIGHT (it's value will be different on different devices)
};
