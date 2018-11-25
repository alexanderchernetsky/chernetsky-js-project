// model
(function (window) {
  class ObstaclesModel {
    constructor(width, height, x, y) {
      this.image = new Image();
      this.image.src = `img/obstacles/car${Math.floor(Math.random() * (10 - 1 + 1)) + 1}.png`; // generate random src for image of obstacle
      this.width = width;
      this.height = height;
      this.posX = x;
      this.posY = y;
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

    move(speed) {
      this.posY += speed;
      this.updateView();
    }
  }

  window.raceGame = window.raceGame || {};
  window.raceGame.ObstaclesModel = ObstaclesModel;
}(window));
