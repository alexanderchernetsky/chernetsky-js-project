window.raceGame = window.raceGame || {};
window.raceGame.GAMEAREAWIDTH = 500; // width of our game area
window.raceGame.GAMEAREAHEIGHT = 600; // height of our game area

window.raceGame.playerCar = undefined; // declare variables of user car
window.raceGame.playerCarView = undefined;
window.raceGame.playerCarController = undefined;

window.raceGame.background = undefined; // declare variables of game background
window.raceGame.backgroundView = undefined;
window.raceGame.backgroundController = undefined;
window.raceGame.backgroundSpeed = 1; // initial value of background speed (it will increase in course of time) necessary for car speed correction

window.raceGame.obstacleModels = []; // variable for our obstacles
window.raceGame.obstacleViews = [];
window.raceGame.obstacleControllers = [];
window.raceGame.obstacle = undefined;
window.raceGame.obstacleView = undefined;
window.raceGame.obstacleController = undefined;
window.raceGame.obstacleSpeed = 2; // initial value of obstacle speed (it will increase in course of time)

