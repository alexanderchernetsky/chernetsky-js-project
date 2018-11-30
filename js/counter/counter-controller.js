(function (window) {
  /** Class representing the score counter controller */
  class CounterController {
    /**
     * Create a counter controller object
     */
    constructor() {
      this.myModel = null;
      this.myField = null;
    }

    /**
     * Add links to the counter model object and our game area object.
     * @param {object} model - The counter model object.
     * @param {object} field - Our game area object.
     */
    start(model, field) {
      this.myModel = model;
      this.myField = field;
    }

    /**
     * Invoke the counter model object method which changes the score to the current value
     */
    changeScore() {
      this.myModel.changeText(this.myField);
    }
  }

  window.raceGame = window.raceGame || {};
  window.raceGame.CounterController = CounterController;
}(window));
