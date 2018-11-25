function updateGameArea() {
  // clear our canvas
  myGameArea.clear();
  myGameArea.frameNo += 1; // we increase frame number by one every requestAnimationFrame
  raceGame.background.changePos();
  raceGame.backgroundController.increaseBackgroundSpeed(); // increase game speed
  raceGame.playerCar.shift(raceGame); //  change player car position, check if it within the canvas borders and render it
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
  /* Это уже гибкая реализация активного MVC, которая
  при желании легко будет работать с несколькими
  представлениями одной модели, несколькими контроллерами
  одной модели, или вообще с несколькими комплектами
  всех компонентов на одной странице. */
  // update of our game field
  requestAnimationFrame(updateGameArea);
}

startGame();
