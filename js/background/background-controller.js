// controller
(function (window) {
  class BackgroundController {
    constructor() {
      this.myModel = null;
      this.myField = null; // внутри какого элемента DOM наша вёрстка
    }

    start(model, field) {
      this.myModel = model;
      this.myField = field;
      // ищем и запоминаем интересные нам элементы DOM
      // назначаем обработчики событий
    }

    increaseBackgroundSpeed() {
      this.myModel.increseSpeedY();
    }
  }

  window.raceGame = window.raceGame || {};
  window.raceGame.BackgroundController = BackgroundController;
}(window));
