(function (window) {
  // constructor for control buttons, which are necessary to move car using touch device
  class ControlButton {
    constructor({
      width, height, x, y, color,
    } = {}) {
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
      this.color = color;
    }

    update() {
      const ctx = myGameArea.context;
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }

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
