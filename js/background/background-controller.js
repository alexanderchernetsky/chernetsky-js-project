(function (window) {
  /** Class representing the background controller */
  class BackgroundController {
    /**
     * Create a background controller object.
     */
    constructor() {
      this.myModel = null;
      this.myField = null;
    }

    /**
     * Add links to the background model object and our game area object.
     * @param {object} model - The background model object.
     * @param {object} field - Our game area object.
     */
    start(model, field) {
      this.myModel = model;
      this.myField = field;
    }

    /**
     * Invoke the background model object method which changes the speed of background move.
     * @param {number} speed - it's current value of background speed.
     */
    changeBackgroundSpeed(speed) {
      this.myModel.changeSpeedY(speed);
    }

    /**
     * Invoke the background model object method which changes the coordinates of background image.
     */
    moveBackground() {
      this.myModel.changePos();
    }
  }

  window.raceGame = window.raceGame || {};
  window.raceGame.BackgroundController = BackgroundController;
}(window));
