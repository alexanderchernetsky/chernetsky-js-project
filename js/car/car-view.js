/** Class representing player car view */
export default class CarView {
  /**
     * Create a player car view object.
     */
  constructor() {
    this.myModel = null;
    this.myField = null;
  }

  /**
     * Add links to the player car model object and our game area object.
     * @param {object} model - The player car model object.
     * @param {object} field - Our game area object.
     */
  start(model, field) {
    this.myModel = model;
    this.myField = field;
  }

  /**
     * Rotate player car image and draw the image on the canvas.
     */
  update() {
    const ctx = this.myField.context;
    ctx.save(); // to save the current canvas context
    ctx.translate(this.myModel.posX, this.myModel.posY); // we move the entire canvas to the center of the specific component
    ctx.rotate(this.myModel.angle); // perform the wanted rotation using the rotate() method
    ctx.drawImage(this.myModel.image, this.myModel.width / -2, this.myModel.height / -2, this.myModel.width, this.myModel.height);
    ctx.restore(); // restore the context object back to its saved position
  }
}
