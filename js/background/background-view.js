(function (window) {
  /** Class representing the background view */
  class BackgroundView {
    /**
     * Create a background view object.
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
     * Draw the background image on the canvas.
     */
    update() {
      const ctx = this.myField.context;
      ctx.drawImage(this.myModel.image, this.myModel.posX, this.myModel.posY, this.myModel.width, this.myModel.height);
      ctx.drawImage(this.myModel.image, this.myModel.posX, this.myModel.posY - this.myModel.height, this.myModel.width, this.myModel.height);
    }
  }

  window.raceGame = window.raceGame || {};
  window.raceGame.BackgroundView = BackgroundView;
}(window));
