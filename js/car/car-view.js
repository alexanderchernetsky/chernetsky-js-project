// view
(function (window) {
  class CarView {
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
      ctx.save(); // to save the current canvas context
      ctx.translate(this.myModel.posX, this.myModel.posY); // we move the entire canvas to the center of the specific component
      ctx.rotate(this.myModel.angle); // perform the wanted rotation using the rotate() method
      ctx.drawImage(this.myModel.image, this.myModel.width / -2, this.myModel.height / -2, this.myModel.width, this.myModel.height); // context.drawImage(img,x,y,width,height);
      ctx.restore(); // restore the context object back to its saved position
    }
  }

  window.raceGame = window.raceGame || {};
  window.raceGame.CarView = CarView;
}(window));
