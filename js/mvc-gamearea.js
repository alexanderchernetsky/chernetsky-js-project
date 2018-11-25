
// game area object
const myGameArea = {
  canvas: document.createElement('canvas'),
  start() {
    this.canvas.width = raceGame.GAMEAREAWIDTH;
    this.canvas.height = raceGame.GAMEAREAHEIGHT;
    this.context = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);
  },
  clear() {
    this.context.clearRect(0, 0, raceGame.GAMEAREAWIDTH, raceGame.GAMEAREAHEIGHT);
  },
};
