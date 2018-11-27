/**
 * @namespace
 * @property {number} GAMEAREAWIDTH - width of our game area canvas
 * @property {number}  GAMEAREAHEIGHT - height of our game area
 * @property {number}  backgroundSpeed - initial value of background speed, it will
 * increase in course of time (also it's used for car speed correction)
 * @property {Array}  obstacleModels - Here we will push our models of obstacles during the game
 * @property {Array}  obstacleViews - Here we will push our views of obstacles during the game
 * @property {Array}  obstacleControllers - Here we will push our controllers of obstacles during the game
 * @property {number}  obstacleSpeed - initial value of obstacles speed
 * @property {undefined}  touch - It would be true for devices with touch, and false for others
 * (it would be defined during startGame function executing)
 * @property {undefined}  ratioX - it's the coefficient that shows quotient of canvas.offsetWidth to GAMEAREAWIDTH
 * (it's value will be different on different devices)
 * @property {undefined}  ratioY - It's the counter of frames, it is used for user score and etc
 * @property {boolean}  playing - it's the coefficient that shows quotient of canvas.offsetHeight to GAMEAREAHEIGHT
 * (it's value will be different on different devices)
 */
window.raceGame = {
  GAMEAREAWIDTH: 500,
  GAMEAREAHEIGHT: 600,
  backgroundSpeed: 1,
  obstacleModels: [],
  obstacleViews: [],
  obstacleControllers: [],
  obstacleSpeed: 2,
  touch: undefined,
  ratioX: undefined,
  ratioY: undefined,
  playing: false,
};
