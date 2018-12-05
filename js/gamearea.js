/**
 * @namespace
 * @property {HTMLElement} canvas - Create html element canvas.
 * @property {void}  start() - Add to the canvas element width and height attributes,
 * find canvas context and append to the body element.
 * @property {void}  clear() - Clear the whole canvas.
 * @property {number}  frameNo - It's the counter of frames, it is used for user score and etc
 */
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
  frameNo: 0 // every request animation frame it will increase by 1
};
