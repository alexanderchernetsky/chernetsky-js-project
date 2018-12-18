/** Class representing the background model */
export default class BackgroundModel {
  /**
     * Create a background model. Destructuring assignment is used to pass parameters.
     * @param {number} width - the width of the background image
     * @param {number} height - the height of the background image
     * @param {number} x - the x coordinate of top-left corner of the background image
     * @param {number} y - the y coordinate of top-left corner of the background image
     * @param {string} src - the source to the image
     */
  constructor({
    width, height, x, y, src,
  } = {}) {
    this.width = width;
    this.height = height;
    this.posX = x;
    this.posY = y;
    this.speedY = 1;
    this.image = new Image();
    this.image.src = src;
    this.myView = null;
  }

  /**
     * Add links to the background view object.
     * @param {object} view - The background view object.
     */
  start(view) {
    this.myView = view;
  }

  /**
     * Call background view object method to draw image.
     */
  updateView() {
    if (this.myView) {
      this.myView.update();
    }
  }

  /**
     * Change position of background image.  Check if it's position is more or equal than
     * image height and set image position 0. It's necessary for illusion that our road is
     * infinite.
     */
  changePos() {
    this.posY += this.speedY;
    if (this.posY >= this.height) { // flexible option, necessary when background speed is high
      this.posY = 0;
    }
    this.updateView();
  }

  /**
     * Change background movement speed.
     * @param {number} speed - current value of background speed.
     */
  changeSpeedY(speed) {
    this.speedY = speed;
    this.updateView();
  }
}
