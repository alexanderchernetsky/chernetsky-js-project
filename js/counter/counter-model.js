(function (window) {
  /** Class representing the score counter model */
  class CounterModel {
    /**
     * Create a score counter model. Destructuring assignment is used to pass parameters.
     * @param {number} size - font size for text with score
     * @param {number} x - the x coordinate of the score
     * @param {number} y - the y coordinate of the score
     */
    constructor({ size, x, y } = {}) {
      this.size = size;
      this.x = x;
      this.y = y;
      this.text = 'SCORE:';
      this.myView = null;
    }

    /**
     * Add links to the score view object.
     * @param {object} view - The score view object.
     */
    start(view) {
      this.myView = view;
    }

    /**
     * Call score view object method to draw text with score.
     */
    updateView() {
      if (this.myView) {
        this.myView.update();
      }
    }

    /**
     * Change score number.
     * @param {Object} myGameAreaObj - our game area object.
     */
    changeText(myGameAreaObj) {
      this.text = `SCORE:${Math.floor(myGameAreaObj.frameNo / 10)}`; // define the speed of score increase
      this.myView.update();
    }
  }

  window.raceGame = window.raceGame || {};
  window.raceGame.CounterModel = CounterModel;
}(window));
