(function (window) {
  /** Class representing sounds and song. */
  class Sound {
    /**
     * Create a sound.
     * @param {string} src - The src attribute of audio file.
     */
    constructor(src) {
      this.sound = document.createElement('audio');
      this.sound.src = src;
      this.sound.style.display = 'none';
      document.body.appendChild(this.sound);
      this.play = this.play.bind(this);
      this.stopListening = this.stopListening.bind(this);
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
     * Add event listeners to play music when user click or push keyboard key(we can't play audio while user is inactive)
     */
    listen() {
      window.addEventListener('click', this.play, false);
      window.addEventListener('keydown', this.play, false);
    }
    /**
     * Remove event listeners when game stops
     */
    stopListening() {
      window.removeEventListener('keydown', this.play, false);
      window.removeEventListener('click', this.play, false);
    }
  }

  window.raceGame = window.raceGame || {};
  window.raceGame.Sound = Sound;
}(window));
