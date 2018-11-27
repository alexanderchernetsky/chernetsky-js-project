// touch controller
(function (window) {
  class CarTouchController {
    constructor() {
      this.myModel = null;
      this.myField = null;
    }

    start(model, field) {
      this.myModel = model;
      this.myField = field;

      if (window.navigator.maxTouchPoints) {
        const canvasInfoHash = this.myField.canvas.getBoundingClientRect();
        window.addEventListener('touchstart', (EO) => {
          if (EO.target.tagName === 'CANVAS') {
            this.myField.x = EO.targetTouches[0].pageX - canvasInfoHash.left;
            this.myField.y = EO.targetTouches[0].pageY - canvasInfoHash.top;
          }
        }, false);
        window.addEventListener('touchend', (EO) => {
          this.myField.x = false;
          this.myField.y = false;
        }, false);
      }
    }

    controlCar() {
      // the code below is necessary to control car movement using touch
      if (raceGame.touch) {
        if (this.myField.x && this.myField.y) {
          if (raceGame.myUpBtn.clicked()) {
            this.myModel.changeSpeed(4 + raceGame.backgroundSpeed / 2);
          }
          if (raceGame.myDownBtn.clicked()) {
            this.myModel.changeSpeed(-2 - raceGame.backgroundSpeed / 2);
          }
          if (raceGame.myLeftBtn.clicked()) {
            this.myModel.changeMoveAngle(-1 - raceGame.backgroundSpeed / 2);
          }
          if (raceGame.myRightBtn.clicked()) {
            this.myModel.changeMoveAngle(1 + raceGame.backgroundSpeed / 2);
          }
        } else {
          this.myModel.changeMoveAngle(0);
          this.myModel.changeSpeed(0);
        }
      }
    }
  }

  window.raceGame = window.raceGame || {};
  window.raceGame.CarTouchController = CarTouchController;
}(window));
