import $ from 'jquery';
import { myGameArea } from '../js/gamearea';
import { raceGame } from '../js/racegame';
import { fetchRequest, prepareLeaderboardArr } from '../js/helpers';
import { startGame, stopGame } from '../js/game';
import '@babel/polyfill';

let leaderboardArray;

/**
 * Switch browser address bar after hash to some encoded state
 * @param {Object} state - object with only one property name
 * @return {undefined}
 */
function switchToState(state) {
  window.location.hash = encodeURIComponent(JSON.stringify(state));
}

/**
 * Switch browser address bar after hash to encoded state of main page
 */
export function switchToMainPage() {
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
export function switchToLeaderboardPage() {
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
 * @return {undefined}
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
 * Send fetch request to the server to get json with all names and scores, parse it,
 * sort it and show the highest results in the table.
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

  const stringStorageReadPromise = fetchRequest('f=READ&n=CHERNETSKY_RACING_LEADERBOARD');

  stringStorageReadPromise
    .then(response => response.json())
    .then((data) => {
      leaderboardArray = JSON.parse(data.result);
      showLeaderboard(prepareLeaderboardArr(leaderboardArray, 15));
    })
    .catch(err => alert(err));

  /**
   * Insert markup with scores and names into the table element.
   * @param {Array} arr -  prepared array
   */
  function showLeaderboard(arr) {
    const tableEl = document.querySelector('#score-table');
    tableEl.innerHTML = `
      <tr>
        <th>Place</th>
        <th>Name</th>
        <th>Score</th>
      </tr>
      ${arr.map((result, pos) => `
        <tr>
          <td>${pos + 1}</td>
          <td>${result.name}</td>
          <td>${result.score}</td>
         </tr>
      `).join('')}`;
  }
}

/**
 * Show main menu about section with animation and hide all other blocks
 * @return {undefined}
 */
function createAboutPage() {
  $('.buttons-container').hide();
  $('.about').fadeIn(1000);
  $('.about input').bind('click', switchToMainPage);
  let fontSize = parseInt($('body').css('font-size'), 10);
  fontSize += 8;
  $('.about p').first().animate({ 'font-size': fontSize }, 2000);
}

/**
 * Validate user name input, cut long user name, create new object with player score and name.
 * Send fetch request to the server to get results and block them. Push new hash
 * with player score and name to the leaderboard array that we got from the server.
 * Send fetch request to push changed array with results to the server.
 */
export function pushResult() {
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

  function* steps() {
    yield fetchRequest(`f=LOCKGET&n=CHERNETSKY_RACING_LEADERBOARD&p=${updatePassword}`);
    yield fetchRequest(`f=UPDATE&n=CHERNETSKY_RACING_LEADERBOARD&p=${updatePassword}&v=${JSON.stringify(leaderboardArray)}`);
  }

  const dataGenIterator = steps();
  dataGenIterator.next().value
    .then(response => response.json())
    .then((data) => {
      leaderboardArray = JSON.parse(data.result);
      leaderboardArray.push(newResultHash);
      dataGenIterator.next();
    })
    .then(() => {
      $('.result-save-window').show();
      $('.result-save-window input').bind('click', () => {
        $('.result-save-window').hide();
      });
    })
    .catch(err => alert(err));
}
