import $ from 'jquery';
import { myGameArea } from './gamearea';
import { raceGame } from './racegame';
import CarModel from './car/car-model';
import CarController from './car/car-controller';
import CarTouchController from './car/car-controller-touch';
import CarView from './car/car-view';
import ControlButton from './control-buttons';
import BackgroundModel from './background/background-model';
import BackgroundController from './background/background-controller';
import BackgroundView from './background/background-view';
import ObstaclesModel from './obstacles/obstacles-model';
import ObstaclesView from './obstacles/obstacles-view';
import ObstaclesController from './obstacles/obstacles-controller';
import CounterModel from './counter/counter-model';
import CounterController from './counter/counter-controller';
import CounterView from './counter/counter-view';
import Sound from './sound';
import { askUser, checkFrameNo, randomObstacleXCoordinate } from './helpers';
import { switchToLeaderboardPage, switchToMainPage, pushResult } from '../src/index';

/**
 *  Create new canvas element.Create model view controller for player car, background,
 *  counter, and bind them to each other. Check if current device has touch and create 4 buttons,
 *  define ratioX,Y. Create audio files. Set initial values for many variables that will change
 *  during the game. Call updateGameArea function.
 */
export function startGame() {
  myGameArea.start();

  raceGame.playerCar = new CarModel({
    width: 50, height: 100, x: 230, y: 500, src: 'img/player-car.png',
  });
  raceGame.playerCarView = new CarView();
  raceGame.playerCarController = new CarController();
  raceGame.background = new BackgroundModel({
    width: raceGame.GAMEAREAWIDTH, height: 1349, x: 0, y: 0, src: 'img/road.jpg',
  });
  raceGame.backgroundView = new BackgroundView();
  raceGame.backgroundController = new BackgroundController();
  raceGame.counter = new CounterModel({ size: 20, x: 20, y: 20 });
  raceGame.counterView = new CounterView();
  raceGame.counterController = new CounterController();
  raceGame.playerCarTouchController = new CarTouchController();

  raceGame.playerCar.start(raceGame.playerCarView);
  raceGame.playerCarView.start(raceGame.playerCar, myGameArea);
  raceGame.playerCarController.start(raceGame.playerCar, myGameArea);
  raceGame.background.start(raceGame.backgroundView);
  raceGame.backgroundView.start(raceGame.background, myGameArea);
  raceGame.backgroundController.start(raceGame.background, myGameArea);
  raceGame.counter.start(raceGame.counterView);
  raceGame.counterView.start(raceGame.counter, myGameArea);
  raceGame.counterController.start(raceGame.counter, myGameArea);
  raceGame.playerCarTouchController.start(raceGame.playerCar, myGameArea);

  if (window.navigator.maxTouchPoints) {
    // this code is necessary only for devices with touch
    raceGame.touch = true;
    raceGame.myUpBtn = new ControlButton({
      width: 50, height: 50, x: 225, y: 450, color: 'rgba(98,198,222,0.5)',
    }); // 50 - the size of buttons that are visible only when you use devices with touch
    raceGame.myDownBtn = new ControlButton({
      width: 50, height: 50, x: 225, y: 550, color: 'rgba(98,198,222,0.5)',
    });
    raceGame.myLeftBtn = new ControlButton({
      width: 50, height: 50, x: 30, y: 500, color: 'rgba(98,198,222,0.5)',
    });
    raceGame.myRightBtn = new ControlButton({
      width: 50, height: 50, x: 420, y: 500, color: 'rgba(98,198,222,0.5)',
    });
    const canvas = document.querySelector('canvas');
    [raceGame.ratioX, raceGame.ratioY] = [canvas.offsetWidth / raceGame.GAMEAREAWIDTH, canvas.offsetHeight / raceGame.GAMEAREAHEIGHT];
    // ratioX is the coefficient that shows quotient of canvas.offsetWidth to GAMEAREAWIDTH
    // (it's value will be different on different devices)
  }

  Sound.removeFormerAudio();
  raceGame.crashSound = new Sound('sounds/crash.mp3');
  raceGame.song = new Sound('sounds/song.mp3');
  raceGame.song.listen();

  // setting to default(initial) values (it's necessary if we start the game more than once)
  raceGame.obstacleModels = [];
  raceGame.obstacleViews = [];
  raceGame.obstacleControllers = [];
  raceGame.obstacleSpeed = 2;
  raceGame.backgroundSpeed = 1;
  myGameArea.frameNo = 0;

  document.querySelector('.game-end-background').style.display = 'none';
  document.querySelector('.game-end-wrapper').style.display = 'none';
  window.addEventListener('beforeunload', askUser, false);
  raceGame.playing = true;
  requestAnimationFrame(updateGameArea);
}

/**
 * updateGameArea function is a game cycle. It checks if player car is crashed,
 * clears the whole canvas element, increase frame № by 1 every time. Increases background speed
 * and obstacles speed to create effect of game speed increase.
 * Creates obstacles models,views, controllers, connects them to each other and pushes to
 * proper array. Invoke player car model method to check if it's within the canvas area and draw it.
 * Changes score. Draws 4 control buttons. Invoke itself again.
 * Game cycle would stop in 2 cases:
 * if player car crashed or if user clicked go back arrow in browser(and confirmed).
 */
export function updateGameArea() {
  if (raceGame.playing) {
    // check if player car crashed (it should be first to save last view when game stops)
    for (let i = 0; i < raceGame.obstacleModels.length; i += 1) {
      if (raceGame.playerCar.crashWith(raceGame.obstacleModels[i])) {
        stopGame();
        return;
      }
    }
    // clear our canvas
    myGameArea.clear();
    // we increase frame number by one every requestAnimationFrame
    myGameArea.frameNo += 1;
    // background
    raceGame.backgroundSpeed += 0.001;
    raceGame.backgroundController.moveBackground();
    raceGame.backgroundController.changeBackgroundSpeed(raceGame.backgroundSpeed);
    // production of obstacles
    const ObstaclePosX = randomObstacleXCoordinate(raceGame.GAMEAREAWIDTH, 50);
    // for random x coordinate for obstacles, 50-obstacle width
    if (checkFrameNo(myGameArea.frameNo)) {
      raceGame.obstacle = new ObstaclesModel({
        width: 50, height: 100, x: ObstaclePosX, y: -100, src: 'img/obstacles/car',
      }); // -100 for smooth appearance of obstacles from top
      raceGame.obstacleView = new ObstaclesView();
      raceGame.obstacleController = new ObstaclesController();
      raceGame.obstacle.start(raceGame.obstacleView);
      raceGame.obstacleView.start(raceGame.obstacle, myGameArea);
      raceGame.obstacleController.start(raceGame.obstacle, myGameArea);
      raceGame.obstacleModels.push(raceGame.obstacle);
      raceGame.obstacleViews.push(raceGame.obstacleView);
      raceGame.obstacleControllers.push(raceGame.obstacleController);
    }

    raceGame.obstacleSpeed += 0.001;
    raceGame.obstacleControllers.forEach((obstacleController) => {
      obstacleController.increaseObstacleSpeed(raceGame.obstacleSpeed);
    });
    // check if player car position within the canvas borders and render it
    raceGame.playerCar.shift(raceGame);
    // change score
    raceGame.counterController.changeScore();
    // render buttons if we use device with touch
    if (raceGame.touch) {
      raceGame.myUpBtn.update();
      raceGame.myDownBtn.update();
      raceGame.myLeftBtn.update();
      raceGame.myRightBtn.update();
      raceGame.playerCarTouchController.controlCar();
    }
    requestAnimationFrame(updateGameArea);
  }
}

/**
 * updateGameArea function is necessary to stop the game.
 * It stops playing song, plays crash sound.
 * It removes event listeners. Shows us game end menu with our final score and etc.
 */
export function stopGame() {
  cancelAnimationFrame(updateGameArea);
  raceGame.playing = false;
  raceGame.song.stopListening();
  raceGame.song.stop();
  raceGame.crashSound.play();
  window.removeEventListener('beforeunload', askUser, false);
  window.removeEventListener('keydown', raceGame.playerCar.moveCar, false);
  window.removeEventListener('keyup', raceGame.playerCar.stopCar, false);
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
