import { raceGame } from '../racegame';

/** Class representing the player car controller */
export default class CarController {
  /**
     * Create player car controller object.
     */
  constructor() {
    this.myModel = null;
    this.myField = null; // внутри какого элемента DOM наша вёрстка
    this.moveCar = this.moveCar.bind(this);
    this.stopCar = this.stopCar.bind(this);
  }

  /**
     * Add links to the player car model object and our game area object.
     * Add event listeners to have an ability to control the car.
     * @param {object} model - The player car model object.
     * @param {object} field - Our game area object.
     */
  start(model, field) {
    this.myModel = model;
    this.myField = field;
    // ищем и запоминаем интересные нам элементы DOM
    // назначаем обработчики событий
    window.addEventListener('keydown', this.moveCar, false);
    window.addEventListener('keyup', this.stopCar, false);
  }

  /**
     * Check which arrow key was pushed by user and invoke proper model methods.
     * @param {Object} EO - event object
     */
  moveCar(EO) {
    EO = EO || window.event; // there is no preventDefault because we need f12 default behavior
    switch (EO.which) {
      case 37:
        this.myModel.changeMoveAngle(-1 - raceGame.backgroundSpeed / 2);
        break;
      case 39:
        this.myModel.changeMoveAngle(1 + raceGame.backgroundSpeed / 2);
        break;
      case 40:
        this.myModel.changeSpeed(-2 - raceGame.backgroundSpeed / 2);
        break;
      case 38:
        this.myModel.changeSpeed(4 + raceGame.backgroundSpeed / 2);
        break;
      default:
        break;
    }
  }

  /**
     * Check which arrow key was unpressed by user and invoke proper model methods.
     * @param {Object} EO - event object
     */
  stopCar(EO) {
    EO = EO || window.event;
    EO.preventDefault();
    switch (EO.which) {
      case 39:
      case 37:
        this.myModel.changeMoveAngle(0);
        break;
      case 40:
      case 38:
        this.myModel.changeSpeed(0);
        break;
      default:
        break;
    }
  }
}
