// view
(function (window) {
  class ObstaclesView {
    constructor() {
      this.myModel = null; // с какой моделью работаем
      this.myField = null; // внутри какого элемента DOM наша вёрстка
    }

    start(model, field) {
      this.myModel = model;
      this.myField = field;
    }

    update() {
      const ctx = this.myField.context;
      ctx.drawImage(this.myModel.image, this.myModel.posX, this.myModel.posY, this.myModel.width, this.myModel.height);
    }
  }

  window.raceGame = window.raceGame || {};
  window.raceGame.ObstaclesView = ObstaclesView;
}(window));
