(function (window) {
  /** Class representing crash sound and song. */
  class Sound {
    /**
     * Create a sound.
     * @param {string} src - The src attribute of the audio file.
     */
    constructor(src) {
      this.sound = document.createElement('audio');
      this.sound.src = src;
      this.sound.style.display = 'none';
      document.body.appendChild(this.sound);
      this.play = this.play.bind(this);
      this.stop = this.stop.bind(this);
    }

    /**
     * Play audio file.
     */
    play() {
      this.sound.play();
    }

    /**
     * Stop playing audio file.
     */
    stop() {
      this.sound.pause();
    }

    /**
     * Add event listeners to start playing music when user clicks or pushes
     * keyboard key (we can't play audio while user is inactive)
     */
    listen() {
      window.addEventListener('click', this.play, false);
      window.addEventListener('keydown', this.play, false);
    }

    /**
     * Remove event listeners when game stops.
     */
    stopListening() {
      window.removeEventListener('keydown', this.play, false);
      window.removeEventListener('click', this.play, false);
    }

    /**
     * Remove audio elements, which were created earlier (useful if we start game more than once).
     * This static function is used in startGame function.
     */
    static removeFormerAudio() {
      const audioArr = Array.from(document.getElementsByTagName('audio'));
      if (audioArr.length) {
        audioArr.forEach(el => document.body.removeChild(el));
      }
    }
  }

  window.raceGame = window.raceGame || {};
  window.raceGame.Sound = Sound;
}(window));
