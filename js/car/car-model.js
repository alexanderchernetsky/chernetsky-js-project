// model
(function (window) {
  class CarModel {
    constructor(obj) {
      this.image = new Image();
      this.image.src = obj.src;
      this.width = obj.width;
      this.height = obj.height;
      this.posX = obj.x;
      this.posY = obj.y;
      this.speed = 0;
      this.moveAngle = 0; // the rotation angle which we will change when push keyboard button left/right keys, in deg
      this.angle = 0; // the same angle,but in radians
      this.actualAngle = 0; // current rotation angle of the car from -360 to 360, in degrees
      this.myView = null;
    }

    start(view) {
      this.myView = view;
    }

    updateView() {
      // при любых изменениях модели попадаем сюда
      // представление может быть любым,
      // лишь бы имело метод Update()
      if (this.myView) {
        this.myView.update();
      }
    }

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
      this.updateView(); // модель при любых изменениях
      // вызывает обновление представления
    }

    changeMoveAngle(angle) {
      this.moveAngle = angle;
    }

    changeSpeed(speed) {
      this.speed = speed;
    }
  }

  window.raceGame = window.raceGame || {};
  window.raceGame.CarModel = CarModel;
}(window));
