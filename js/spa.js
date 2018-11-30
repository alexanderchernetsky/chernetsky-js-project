let leaderboardArray;

/**
 * Switch browser address bar after hash to some encoded state
 * @param {Object} state - object with only one property name
 */
function switchToState(state) {
  location.hash = encodeURIComponent(JSON.stringify(state));
}

/**
 * Switch browser address bar after hash to encoded state of main page
 */
function switchToMainPage() {
  switchToState({ page: 'main' });
}

/**
 * Switch browser address bar after hash to encoded state of game page
 */
function switchToGamePage() {
  switchToState({ page: 'game' });
}

/**
 * Switch browser address bar after hash to encoded state of controls page
 */
function switchToControlsPage() {
  switchToState({ page: 'controls' });
}

/**
 * Switch browser address bar after hash to encoded state of leaderboard page
 */
function switchToLeaderboardPage() {
  switchToState({ page: 'leaderboard' });
}

/**
 * Switch browser address bar after hash to encoded state of about page
 */
function switchToAboutPage() {
  switchToState({ page: 'about' });
}

$(window).bind('hashchange', renderNewState);

$('#game').bind('click', switchToGamePage);
$('#controls').bind('click', switchToControlsPage);
$('#leaderboard').bind('click', switchToLeaderboardPage);
$('#about').bind('click', switchToAboutPage);

/**
 * Decode state from browser address bar, define which page should be rendered
 * and invoke proper function.
 */
function renderNewState() {
  const hash = window.location.hash;
  let state = decodeURIComponent(hash.substr(1));
  (state === '') ? (state = { page: 'main' }) : (state = JSON.parse(state));
  switch (state.page) {
  case 'main':
    if (raceGame.playing) {
      const doYouWantToStopGame = confirm('Do you want to finish the game?');
      if (doYouWantToStopGame) {
        stopGame();
        createMainPage();
      } else {
        switchToGamePage();
      }
    } else {
      createMainPage();
    }
    break;
  case 'game':
    createGamePage();
    break;
  case 'controls':
    createControlsPage();
    break;
  case 'leaderboard':
    createLeaderboardPage();
    break;
  case 'about':
    createAboutPage();
    break;
  }
}

renderNewState();

/**
 * Show main menu section and hide all other blocks
 */
function createMainPage() {
  $('.buttons-container').fadeIn(1000);
  $('.controls').hide();
  $('.leaderboard').hide();
  $('.about').hide();
  const canvas = $('canvas').first();
  if (canvas) {
    canvas.remove();
  }
  $('.game-end-wrapper').hide();
  $('.game-end-background').hide();
}

/**
 * Hide all blocks and invoke startGame function from game.js file
 */
function createGamePage() {
  if (raceGame.playing) { // this check if necessary for case when we pushed go back browser arrow,
    // but changed our mind
    return;
  }
  $('.buttons-container').hide();
  const canvas = $('canvas').first();
  if (canvas) {
    canvas.remove();
  }
  $('.game-end-wrapper').hide();
  $('.game-end-background').hide();

  startGame();
}

/**
 * Show main menu controls section and hide all other blocks
 */
function createControlsPage() {
  $('.buttons-container').hide();
  $('.controls').fadeIn(1000);
  $('.controls input').bind('click', switchToMainPage);
}

/**
 * Show main menu leaderboard section and hide all other blocks.
 * Send ajax request to the server to get json with all names and scores, parse it,
 * sort it and show 10 highest results in table.
 */
function createLeaderboardPage() {
  $('.buttons-container').hide();
  $('.leaderboard').fadeIn(1000);
  $('.leaderboard input').bind('click', switchToMainPage);
  const canvas = $('canvas').first();
  if (canvas) {
    canvas.remove();
  }
  $('.game-end-wrapper').hide();
  $('.game-end-background').hide();

  ajaxRequest(readReady, { f: 'READ', n: 'CHERNETSKY_RACING_LEADERBOARD' });

  /**
   * This function would be invoked if the ajaxRequest was successful. It should
   * parse json Array(ResultH.result) or show an error message.
   * @param {Object} ResultH -  json object with only one property (result or error)
   */
  function readReady(ResultH) {
    if (ResultH.error !== undefined) {
      alert(ResultH.error);
    } else {
      leaderboardArray = [];
      if (ResultH.result !== '') {
        leaderboardArray = JSON.parse(ResultH.result);
        if (!leaderboardArray.length) {
          leaderboardArray = [];
        }
      }
      showLeaderboard(prepareLeaderboardArr(leaderboardArray));
    }
  }

  /**
   * Choose all table tr(table row) elements and create array from it.
   * Slice this array with tr elements(first tr element is for table header).
   * And insert markup with scores and names into the tr elements.
   * @param {Array} arr -  prepared array
   */
  function showLeaderboard(arr) {
    const trElArray = Array.from(document.querySelectorAll('#score-table tr'));
    trElArray.slice(1).forEach((trEl, i) => trEl.innerHTML = `<td>${i + 1}</td><td>${arr[i].name}</td><td>${arr[i].score}</td>`);
  }
}

/**
 * Show main menu about section with animation and hide all other blocks
 */
function createAboutPage() {
  $('.buttons-container').hide();
  $('.about').fadeIn(1000);
  $('.about input').bind('click', switchToMainPage);

  let fontSize = parseInt($('body').css('font-size'));
  fontSize += 8;
  $('.about p').first().animate({ 'font-size': fontSize }, 2000);
}

/**
 * Validate user name input, cut long user name, create new object with player score and name.
 * Send ajax request to the server to get results and block them. Push new hash
 * with player score an name to the leaderboard array that we got from the server.
 * Send ajax request to push changed array with results to the server.
 */
function pushResult() {
  let playerName = $('#player-name').val(); // Get the current value
  // of the first element in the set of matched elements (to get player name from input)
  if (playerName === '') {
    $('.result-noname-window').show();
    $('.result-noname-window input').bind('click', () => {
      $('.result-noname-window').hide();
    });
    return;
  }
  if (playerName.length > 12) {
    playerName = playerName.substr(0, 12);
  }
  const newResultHash = { name: `${playerName}`, score: `${Math.floor(myGameArea.frameNo / 10)}` };

  const updatePassword = Math.random();
  ajaxRequest(lockGetReady, { f: 'LOCKGET', n: 'CHERNETSKY_RACING_LEADERBOARD', p: updatePassword });

  /**
   * Get relevant array with results from the server and push new hash to this array
   */
  function lockGetReady(resultH) {
    if (resultH.error !== undefined) {
      alert(resultH.error);
    } else {
      leaderboardArray = [];
      if (resultH.result != '') {
        leaderboardArray = JSON.parse(resultH.result);
        leaderboardArray.push(newResultHash);
        if (!leaderboardArray.length) { // if there is a garbage instead of CHERNETSKY_RACING_LEADERBOARD
          leaderboardArray = [];
        }
      }
    }
    // to send results to the server
    ajaxRequest(updateReady, {
      f: 'UPDATE', n: 'CHERNETSKY_RACING_LEADERBOARD', v: JSON.stringify(leaderboardArray), p: updatePassword
    });
  }
}

/**
 * Show message that results have been recorded or show alert with error.
 */
function updateReady(resultH) {
  if (resultH.error != undefined) {
    alert(resultH.error);
  } else {
    $('.result-save-window').show();
    $('.result-save-window input').bind('click', () => {
      $('.result-save-window').hide();
    });
  }
}
