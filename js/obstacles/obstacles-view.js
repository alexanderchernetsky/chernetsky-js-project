/** Class representing obstacles views */
export default class ObstaclesView {
  /**
     * Create the obstacle view object.
     */
  constructor() {
    this.myModel = null;
    this.myField = null;
  }

  /**
     * Add links to the obstacle model object and our game area object.
     * @param {object} model - The obstacle model object.
     * @param {object} field - Our game area object.
     */
  start(model, field) {
    this.myModel = model;
    this.myField = field;
  }

  /**
     * Draw the obstacle image on the canvas.
     */
  update() {
    const ctx = this.myField.context;
    ctx.drawImage(this.myModel.image, this.myModel.posX, this.myModel.posY, this.myModel.width, this.myModel.height);
  }
}
