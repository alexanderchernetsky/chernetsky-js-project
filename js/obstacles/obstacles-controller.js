/** Class representing the obstacles controllers */
export default class ObstaclesController {
  /**
     * Create a obstacle controller object.
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
     * Invoke the obstacle model object method which changes the speed of obstacle move.
     * @param {number} speed - it's current value of obstacle speed.
     */
  increaseObstacleSpeed(speed) {
    this.myModel.move(speed);
  }
}
