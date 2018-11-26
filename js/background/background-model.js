// model
(function (window) {
  class BackgroundModel {
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

    start(view) {
      this.myView = view;
    }

    updateView() {
      if (this.myView) {
        this.myView.update();
      }
    }

    changePos() {
      this.posY += this.speedY;
      if (this.posY >= this.height) { // more flexible option it's necessary when speed of background is high
        this.posY = 0;
      }
      this.updateView();
    }

    increseSpeedY(speed) {
      this.speedY = speed;
      this.updateView();
    }
  }

  window.raceGame = window.raceGame || {};
  window.raceGame.BackgroundModel = BackgroundModel;
}(window));
