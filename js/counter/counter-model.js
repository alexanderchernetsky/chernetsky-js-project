// model
(function (window) {
  class CounterModel {
    constructor({ size, x, y } = {}) {
      this.size = size;
      this.x = x;
      this.y = y;
      this.text = 'SCORE:';
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

    changeText() {
      this.text = `SCORE:${Math.floor(myGameArea.frameNo / 10)}`; // define the speed of score increase
      this.myView.update();
    }
  }

  window.raceGame = window.raceGame || {};
  window.raceGame.CounterModel = CounterModel;
}(window));
