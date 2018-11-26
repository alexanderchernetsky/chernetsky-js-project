function updateGameArea() {
  // check if player car crashed (it should be first to save last view when game stops)
  for (let i = 0; i < raceGame.obstacleModels.length; i += 1) {
    if (raceGame.playerCar.crashWith(raceGame.obstacleModels[i])) {
      console.log('crash!');
      /* stopGame(); */
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
    raceGame.obstacle = new raceGame.ObstaclesModel(50, 100, ObstaclePosX, -100); // -100 for smooth appearance of obstacles from top
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
  raceGame.background = new raceGame.BackgroundModel(raceGame.GAMEAREAWIDTH, 1349, 0, 0, 'img/road.jpg');
  raceGame.backgroundView = new raceGame.BackgroundView();
  raceGame.backgroundController = new raceGame.BackgroundController();
  raceGame.counter = new raceGame.CounterModel(20, 20, 20);
  raceGame.counterView = new raceGame.CounterView();
  raceGame.counterController = new raceGame.CounterController();
  // увязываем компоненты друг с другом
  // указываем компонентам, в каком DOM им работать
  /* Увязываем все компоненты друг с другом, и сообщаем контроллеру
  и представлению, в каком DOM-элементе содержится нужная им вёрстка. */
  raceGame.playerCar.start(raceGame.playerCarView);
  raceGame.playerCarView.start(raceGame.playerCar, myGameArea);
  raceGame.playerCarController.start(raceGame.playerCar, myGameArea);
  raceGame.background.start(raceGame.backgroundView);
  raceGame.backgroundView.start(raceGame.background, myGameArea);
  raceGame.backgroundController.start(raceGame.background, myGameArea);
  raceGame.counter.start(raceGame.counterView);
  raceGame.counterView.start(raceGame.counter, myGameArea);
  raceGame.counterController.start(raceGame.counter, myGameArea);

  /* Это уже гибкая реализация активного MVC, которая
  при желании легко будет работать с несколькими
  представлениями одной модели, несколькими контроллерами
  одной модели, или вообще с несколькими комплектами
  всех компонентов на одной странице. */
  // update of our game field
  requestAnimationFrame(updateGameArea);
}

startGame();
