// view
(function (window) {
  class CounterView {
    constructor() {
      this.myModel = null;
      this.myField = null;
    }

    start(model, field) {
      this.myModel = model;
      this.myField = field;
    }

    update() {
      const ctx = this.myField.context;
      ctx.fillStyle = 'white';
      ctx.font = `italic bold ${this.myModel.size}px Arial`;
      ctx.fillText(this.myModel.text, this.myModel.x, this.myModel.y);
    }
  }

  window.raceGame = window.raceGame || {};
  window.raceGame.CounterView = CounterView;
}(window));
