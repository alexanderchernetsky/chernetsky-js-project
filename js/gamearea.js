// game area object
const myGameArea = {
  canvas: document.createElement('canvas'),
  start() {
    this.canvas.width = raceGame.GAMEAREAWIDTH;
    this.canvas.height = raceGame.GAMEAREAHEIGHT;
    this.context = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);
    if (window.navigator.maxTouchPoints) {
      const canvas = document.querySelector('canvas');
      const canvasInfoHash = canvas.getBoundingClientRect();
      window.addEventListener('touchstart', (EO) => {
        if (EO.target.tagName === 'CANVAS') {
          myGameArea.x = EO.targetTouches[0].pageX - canvasInfoHash.left;
          myGameArea.y = EO.targetTouches[0].pageY - canvasInfoHash.top;
        }
      }, false);
      window.addEventListener('touchend', (EO) => {
        myGameArea.x = false;
        myGameArea.y = false;
      }, false);
    }
  },
  clear() {
    this.context.clearRect(0, 0, raceGame.GAMEAREAWIDTH, raceGame.GAMEAREAHEIGHT);
  },
  frameNo: 0,
};
