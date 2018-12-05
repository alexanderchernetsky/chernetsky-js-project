(function (window) {
  /** Class representing the score counter view */
  class CounterView {
    /**
     * Create a score counter view object.
     */
    constructor() {
      this.myModel = null;
      this.myField = null;
    }

    /**
     * Add links to the score counter model object and our game area object.
     * @param {object} model - The background model object.
     * @param {object} field - Our game area object.
     */
    start(model, field) {
      this.myModel = model;
      this.myField = field;
    }

    /**
     * Draw the text with score on the canvas.
     */
    update() {
      const ctx = this.myField.context;
      ctx.fillStyle = 'white';
      ctx.font = `italic bold ${this.myModel.size}px Arial`;
      ctx.fillText(this.myModel.text, this.myModel.x, this.myModel.y);
    }
  }

  window.raceGame = window.raceGame || {};
  window.raceGame.CounterView = CounterView;
}(window));
