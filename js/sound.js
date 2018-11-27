(function (window) {
  class Sound {
    constructor(src) {
      this.sound = document.createElement('audio');
      this.sound.src = src;
      this.sound.style.display = 'none';
      document.body.appendChild(this.sound);
      this.play = this.play.bind(this);
      this.stopListening = this.stopListening.bind(this);
    }

    play() {
      this.sound.play();
    }

    stop() {
      this.sound.pause();
    }

    listen() {
      window.addEventListener('click', this.play, false);
      window.addEventListener('keydown', this.play, false);
    }

    stopListening() {
      window.removeEventListener('keydown', this.play, false);
      window.removeEventListener('click', this.play, false);
    }
  }

  window.raceGame = window.raceGame || {};
  window.raceGame.Sound = Sound;
}(window));
