(function (window) {
  /** Class representing user car model */
  class CarModel {
    /**
     * Create a user car model. Destructuring assignment is used to pass parameters.
     * @param {number} width - the width of user car
     * @param {number} height - the height of user car
     * @param {number} x - the x coordinate of user car
     * @param {number} y - the y coordinate of user car
     * @param {string} src - the source to the image of user car
     */
    constructor({
      width, height, x, y, src,
    } = {}) {
      this.image = new Image();
      this.image.src = src;
      this.width = width;
      this.height = height;
      this.posX = x;
      this.posY = y;
      this.speed = 0;
      this.moveAngle = 0; // the rotation angle which we will change when push
      // keyboard button left/right keys, in deg
      this.angle = 0; // the same angle, but in radians
      this.actualAngle = 0; // current rotation angle of the car from -360 to 360, in degrees
      this.myView = null;
    }

    /**
     * Add links to the player car view object.
     * @param {object} view - player car view object.
     */
    start(view) {
      this.myView = view;
    }

    /**
     * Invoke player car view object method to draw the image of player car.
     */
    updateView() {
      if (this.myView) {
        this.myView.update();
      }
    }

    /**
     * Restrict car movement within canvas element,calculate actual angle and angle(in radians),
     * change player car position.
     * @param {object} raceGameObj - object with all game variables and constants
     */
    shift(raceGameObj) {
      const raceGame = raceGameObj;
      // touch walls
      if (this.posX < this.width) {
        this.posX = this.width;
      }
      if (this.posX + this.width > raceGame.GAMEAREAWIDTH) {
        this.posX = raceGame.GAMEAREAWIDTH - this.width;
      }
      if (this.posY < this.height / 2) {
        this.posY = this.height / 2;
      }
      if (this.posY + this.height / 2 > raceGame.GAMEAREAHEIGHT) {
        this.posY = raceGame.GAMEAREAHEIGHT - this.height / 2;
      }

      this.actualAngle += this.moveAngle;
      if (this.actualAngle >= 360 || this.actualAngle <= -360) {
        this.actualAngle = 0;
      }

      this.angle += this.moveAngle * Math.PI / 180;

      this.posX += this.speed * Math.sin(this.angle);
      this.posY -= this.speed * Math.cos(this.angle);
      this.updateView();
    }

    /**
     * Change angle of player car
     * @param {number} angle - rotation angle, which sets when user push arrow left/right keys
     */
    changeMoveAngle(angle) {
      this.moveAngle = angle;
    }

    /**
     * Change speed of player car
     * @param {number} speed - rotation angle, which sets when user push arrow back/forth keys
     */
    changeSpeed(speed) {
      this.speed = speed;
    }

    /**
     * Calculate player car borders coordinates for 2 positions (vertical and horizontal).
     * Check if it matches obstacle borders coordinates and return boolean result.
     * @param {Object} obstacleObj - obstacle model object (one of)
     * @return {boolean} crash - return true if player car borders with obstacle
     */
    crashWith(obstacleObj) {
      let myLeft;
      let myRight;
      let myTop;
      let myBottom;
      if (((this.actualAngle > -45) && (this.actualAngle < 45)) || ((this.actualAngle > 135) && (this.actualAngle < 225))
          || ((this.actualAngle < -135) && (this.actualAngle > -225)) || (this.actualAngle > 315)) {
        myLeft = this.posX - this.width / 2;
        myRight = this.posX + this.width / 2;
        myTop = this.posY - this.height / 2;
        myBottom = this.posY + this.height / 2;
      } else {
        myLeft = this.posX - this.height / 2;
        myRight = this.posX + this.height / 2;
        myTop = this.posY - this.width / 2;
        myBottom = this.posY + this.width / 2;
      }
      const obstacleBottom = obstacleObj.posY + obstacleObj.height;
      const obstacleTop = obstacleObj.posY;
      const obstacleRight = obstacleObj.posX + obstacleObj.width;
      const obstacleLeft = obstacleObj.posX;
      let crash = false;
      if ((myTop < obstacleBottom) && (myBottom > obstacleTop)) {
        if ((myRight > obstacleLeft) && (myLeft < obstacleRight)) {
          crash = true;
        }
      }
      return crash;
    }
  }

  window.raceGame = window.raceGame || {};
  window.raceGame.CarModel = CarModel;
}(window));
