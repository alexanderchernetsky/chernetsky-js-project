// controller
(function (window) {
  class CounterController {
    constructor() {
      this.myModel = null;
      this.myField = null;
    }

    start(model, field) {
      this.myModel = model;
      this.myField = field;
    }

    changeScore() {
      this.myModel.changeText();
    }
  }

  window.raceGame = window.raceGame || {};
  window.raceGame.CounterController = CounterController;
}(window));
