// controller
(function (window) {
  class ObstaclesController {
    constructor() {
      this.myModel = null;
      this.myField = null;
    }

    start(model, field) {
      this.myModel = model;
      this.myField = field;
    }

    increaseObstacleSpeed(speed) {
      this.myModel.move(speed);
    }
  }

  window.raceGame = window.raceGame || {};
  window.raceGame.ObstaclesController = ObstaclesController;
}(window));
