/**
 * @namespace
 * @property {number} GAMEAREAWIDTH - width of our game area canvas.
 * @property {number}  GAMEAREAHEIGHT - height of our game area.
 * @property {number}  backgroundSpeed - initial value of background speed, it will
 * increase in course of time (also it's used for car speed correction).
 * @property {Array}  obstacleModels - Here we will push our models of obstacles during the game.
 * @property {Array}  obstacleViews - Here we will push our views of obstacles during the game.
 * @property {Array}  obstacleControllers - Here we will push our controllers
 * of obstacles during the game.
 * @property {number}  obstacleSpeed - initial value of obstacles speed.
 * @property {boolean}  playing - it's true while user is playing the game.
 */
export const raceGame = {
  GAMEAREAWIDTH: 500,
  GAMEAREAHEIGHT: 600,
  backgroundSpeed: 1,
  obstacleModels: [],
  obstacleViews: [],
  obstacleControllers: [],
  obstacleSpeed: 2,
  playing: false,
};
