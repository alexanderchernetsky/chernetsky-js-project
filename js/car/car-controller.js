// controller
(function (window) {
  class CarController {
    constructor() {
      this.myModel = null;
      this.myField = null; // внутри какого элемента DOM наша вёрстка
      this.moveCar = this.moveCar.bind(this);
      this.stopCar = this.stopCar.bind(this);
    }

    start(model, field) {
      this.myModel = model;
      this.myField = field;
      // ищем и запоминаем интересные нам элементы DOM
      // назначаем обработчики событий
      window.addEventListener('keydown', this.moveCar, false);
      window.addEventListener('keyup', this.stopCar, false);
    }

    moveCar(EO) {
      EO = EO || window.event; // there is no preventDefault because we need f12 default behavior
      switch (EO.which) {
        case 37:
          this.myModel.changeMoveAngle(-1 - raceGame.backgroundSpeed / 2); // контроллер вызывает только методы модели
          break;
        case 39:
          this.myModel.changeMoveAngle(1 + raceGame.backgroundSpeed / 2);
          break;
        case 40:
          this.myModel.changeSpeed(-2 - raceGame.backgroundSpeed / 2);
          break;
        case 38:
          this.myModel.changeSpeed(4 + raceGame.backgroundSpeed / 2);
          break;
        default:
          break;
      }
    }

    stopCar(EO) {
      EO = EO || window.event;
      EO.preventDefault();
      switch (EO.which) {
        case 39:
        case 37:
          this.myModel.changeMoveAngle(0);// контроллер вызывает только методы модели
          break;
        case 40:
        case 38:
          this.myModel.changeSpeed(0);
          break;
        default:
          break;
      }
    }
  }

  window.raceGame = window.raceGame || {};
  window.raceGame.CarController = CarController;
}(window));
