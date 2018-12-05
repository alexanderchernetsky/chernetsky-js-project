(function (window) {
  /** Class representing control buttons, which are necessary to move the car using touch device */
  class ControlButton {
    /**
     * Create a control button. Destructuring assignment is used to pass parameters.
     * @param {number} width - The width of the button.
     * @param {number} height - The height of the button.
     * @param {number} x - The x coordinate of the top-left corner of the button.
     * @param {number} y - The y coordinate of the top-left corner of the button.
     * @param {string} color - The color of the button.
     */
    constructor({
      width, height, x, y, color
    } = {}) {
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
      this.color = color;
    }

    /**
     * Draw button on the canvas.
     */
    update() {
      const ctx = myGameArea.context;
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    /**
     * Check if button is clicked by user.
     * @return {boolean} The answer. True - if user clicked the button.
     */
    clicked() {
      let clicked = true;
      const myLeft = this.x * raceGame.ratioX;
      const myRight = (this.x + this.width) * raceGame.ratioX;
      const myTop = this.y * raceGame.ratioY;
      const myBottom = (this.y + this.height) * raceGame.ratioY;
      if ((myLeft > myGameArea.x) || (myRight < myGameArea.x) || (myTop > myGameArea.y) || (myBottom < myGameArea.y)) {
        clicked = false;
      }
      return clicked;
    }
  }

  window.raceGame = window.raceGame || {};
  window.raceGame.ControlButton = ControlButton;
}(window));
