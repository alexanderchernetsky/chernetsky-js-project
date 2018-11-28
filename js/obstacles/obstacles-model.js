(function (window) {
  /** Class representing the obstacles models */
  class ObstaclesModel {
    /**
     * Create a obstacle model. Destructuring assignment is used to pass parameters.
     * @param {number} width - the width of the obstacle image
     * @param {number} height - the height of the obstacle image
     * @param {number} x - the x coordinate of the obstacle image
     * @param {number} y - the y coordinate of the obstacle image
     * @param {string} src - the source to the all obstacle images(without number in the end)
     */
    constructor({
      width, height, x, y, src
    } = {}) {
      this.image = new Image();
      this.image.src = `${src}${Math.floor(Math.random() * (10 - 1 + 1)) + 1}.png`; // generate random src for image of obstacle
      this.width = width;
      this.height = height;
      this.posX = x;
      this.posY = y;
      this.myView = null;
    }

    /**
     * Add links to the obstacle view object.
     * @param {object} view - The obstacle view object.
     */
    start(view) {
      this.myView = view;
    }

    /**
     * Call obstacle view object method to draw image of obstacle.
     */
    updateView() {
      if (this.myView) {
        this.myView.update();
      }
    }

    /**
     * Change obstacle movement speed.
     * @param {number} speed - it's current value of obstacle speed.
     */
    move(speed) {
      this.posY += speed;
      this.updateView();
    }
  }

  window.raceGame = window.raceGame || {};
  window.raceGame.ObstaclesModel = ObstaclesModel;
}(window));
