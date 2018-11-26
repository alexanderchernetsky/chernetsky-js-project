function startGame() {
  myGameArea.start();
  // настройка, инициализация
  // создаём все три компонента
  /* Создаём объекты модели, представления, контроллера.
  Пока что они друг о друге ничего не знают. */
  raceGame.playerCar = new raceGame.CarModel({
    width: 50, height: 100, x: 230, y: 500, src: 'img/player-car.png',
  });
  raceGame.playerCarView = new raceGame.CarView();
  raceGame.playerCarController = new raceGame.CarController();
  raceGame.background = new raceGame.BackgroundModel({
    width: raceGame.GAMEAREAWIDTH, height: 1349, x: 0, y: 0, src: 'img/road.jpg',
  });
  raceGame.backgroundView = new raceGame.BackgroundView();
  raceGame.backgroundController = new raceGame.BackgroundController();
  raceGame.counter = new raceGame.CounterModel({ size: 20, x: 20, y: 20 });
  raceGame.counterView = new raceGame.CounterView();
  raceGame.counterController = new raceGame.CounterController();

  raceGame.playerCar.start(raceGame.playerCarView);
  raceGame.playerCarView.start(raceGame.playerCar, myGameArea);
  raceGame.playerCarController.start(raceGame.playerCar, myGameArea);
  raceGame.background.start(raceGame.backgroundView);
  raceGame.backgroundView.start(raceGame.background, myGameArea);
  raceGame.backgroundController.start(raceGame.background, myGameArea);
  raceGame.counter.start(raceGame.counterView);
  raceGame.counterView.start(raceGame.counter, myGameArea);
  raceGame.counterController.start(raceGame.counter, myGameArea);

  raceGame.crashSound = new raceGame.Sound('sounds/crash.mp3');
  raceGame.song = new raceGame.Sound('sounds/song.mp3');
  raceGame.song.listen();
  // setting to default(initial) values is necessary when we start the game more than once
  raceGame.obstacleModels = [];
  raceGame.obstacleViews = [];
  raceGame.obstacleControllers = [];
  raceGame.obstacleSpeed = 2; // initial value of obstacle speed (it will increase in course of time)
  raceGame.backgroundSpeed = 1; // initial value of background speed (it will increase in course of time)
  myGameArea.frameNo = 0; // every request animation frame it will increase by 1

  document.querySelector('.game-end-background').style.display = 'none';
  document.querySelector('.game-end-wrapper').style.display = 'none';
  // update of our game field
  requestAnimationFrame(updateGameArea);
}

function updateGameArea() {
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
  raceGame.background.changePos();
  raceGame.backgroundSpeed += 0.001;
  raceGame.backgroundController.increaseBackgroundSpeed(raceGame.backgroundSpeed);
  // production of obstacles
  const ObstaclePosX = Math.floor(Math.random() * (raceGame.GAMEAREAWIDTH - 50) + 1); // for random x coordinate for obstacles, 50-obstacle width
  if ((myGameArea.frameNo === 1) || ((myGameArea.frameNo / 100) % 1 === 0)) { // would return true if (myGameArea.frameNo / n) was an integer, a%b returns surplus of the division of 2 operands
    raceGame.obstacle = new raceGame.ObstaclesModel({
      width: 50, height: 100, x: ObstaclePosX, y: -100,
    }); // -100 for smooth appearance of obstacles from top
    raceGame.obstacleView = new raceGame.ObstaclesView();
    raceGame.obstacleController = new raceGame.ObstaclesController();
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
  //  change player car position, check if it within the canvas borders and render it
  raceGame.playerCar.shift(raceGame);
  raceGame.counterController.changeScore();

  requestAnimationFrame(updateGameArea);
}

function stopGame() {
  raceGame.song.stopListening();
  raceGame.song.stop();
  raceGame.crashSound.play();
  window.removeEventListener('keydown', raceGame.playerCar.moveCar, false);
  window.removeEventListener('keyup', raceGame.playerCar.stopCar, false);
  cancelAnimationFrame(updateGameArea);
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
