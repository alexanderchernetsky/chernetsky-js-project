let loaded = false;
let leaderboardArray;

function switchToState(state) {
  return location.hash = encodeURIComponent(JSON.stringify(state));
}

function switchToMainPage() {
  switchToState({ page: 'main' });
}

function switchToGamePage() {
  switchToState({ page: 'game' });
}

function switchToControlsPage() {
  switchToState({ page: 'controls' });
}

function switchToLeaderboardPage() {
  switchToState({ page: 'leaderboard' });
}

function switchToAboutPage() {
  switchToState({ page: 'about' });
}

$(window).bind('hashchange', renderNewState);
/*window.addEventListener('hashchange', renderNewState, false);*/

$('#game').bind('click', switchToGamePage);
$('#controls').bind('click', switchToControlsPage);
$('#leaderboard').bind('click', switchToLeaderboardPage);
$('#about').bind('click', switchToAboutPage);
/*document.getElementById('game').addEventListener('click', switchToGamePage, false);
document.getElementById('controls').addEventListener('click', switchToControlsPage, false);
document.getElementById('leaderboard').addEventListener('click', switchToLeaderboardPage, false);
document.getElementById('about').addEventListener('click', switchToAboutPage, false);*/

function renderNewState() {
  const hash = window.location.hash;
  let state = decodeURIComponent(hash.substr(1));
  (state === '') ? (state = { page: 'main' }) : (state = JSON.parse(state));
  switch (state.page) {
    case 'main':
      createMainPage();
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

function createMainPage() {
  $('.buttons-container').fadeIn(1000);
  $('.controls').hide();
  $('.leaderboard').hide();
  $('.about').hide();
  /*document.querySelector('.buttons-container').style.display = 'block';
  document.querySelector('.controls').style.display = 'none';
  document.querySelector('.leaderboard').style.display = 'none';
  document.querySelector('.about').style.display = 'none';*/
  
  const canvas = document.getElementsByTagName('canvas')[0];
  if (canvas) {
    document.body.removeChild(canvas);
  }
  document.querySelector('.game-end-wrapper').style.display = 'none';
  document.querySelector('.game-end-background').style.display = 'none';
}

function createGamePage() {
  document.querySelector('.buttons-container').style.display = 'none';
  const canvas = document.getElementsByTagName('canvas')[0];
  if (canvas) {
    document.body.removeChild(canvas);
  }
  document.querySelector('.game-end-wrapper').style.display = 'none';
  document.querySelector('.game-end-background').style.display = 'none';

  if (loaded) {
    startGame();
    return;
  }

  $.ajax(
    {
      url: 'game.js',
      type: 'GET',
      cache: true,
      dataType: 'script',
      success() {
        console.log('success!!!');
        loaded = true;
        startGame();
      },
      error: errorHandler,
    },
  );
}

function createControlsPage() {
  document.querySelector('.buttons-container').style.display = 'none';
  document.querySelector('.controls').style.display = 'block';
  document.querySelector('.controls input').addEventListener('click', switchToMainPage, false);
}

function createLeaderboardPage() {
  document.querySelector('.buttons-container').style.display = 'none';
  document.querySelector('.leaderboard').style.display = 'block';
  document.querySelector('.leaderboard input').addEventListener('click', switchToMainPage, false);
  const canvas = document.getElementsByTagName('canvas')[0];
  if (canvas) {
    document.body.removeChild(canvas);
  }
  document.querySelector('.game-end-wrapper').style.display = 'none';
  document.querySelector('.game-end-background').style.display = 'none';

  refreshLeaderboard();

  function refreshLeaderboard() {
    $.ajax(
      {
        url: 'http://fe.it-academy.by/AjaxStringStorage2.php',
        type: 'POST',
        data: { f: 'READ', n: 'CHERNETSKY_RACING_LEADERBOARD' },
        cache: false,
        success: readReady,
        error: errorHandler,
      },
    );
  }

  function readReady(ResultH) {
    if (ResultH.error !== undefined) {
      alert(ResultH.error);
    } else {
      leaderboardArray = [];
      if (ResultH.result !== '') {
        leaderboardArray = JSON.parse(ResultH.result);
        if (!leaderboardArray.length) { leaderboardArray = []; }
      }
      showLeaderboard();
    }
  }

  function showLeaderboard() {
    const ordered = leaderboardArray.sort((first, second) => ((+first.score <= +second.score) ? 1 : -1));
    const cutted = ordered.slice(0, 10);
    const trElArray = Array.from(document.querySelectorAll('#score-table tr'));
    trElArray.slice(1).forEach((trEl, i) => trEl.innerHTML = `<td>${i + 1}</td><td>${cutted[i].name}</td><td>${cutted[i].score}</td>`);
    /*for (let i = 0; i < 10; i++) {
      const onePlayerInfoHash = ordered[i];
      const currentTrElement = document.getElementById(`place-${i + 1}`);
      const currentTdNameEl = currentTrElement.getElementsByTagName('td')[1];
      const currentTdScoreEl = currentTrElement.getElementsByTagName('td')[2];
      currentTdNameEl.innerHTML = `${onePlayerInfoHash.name}`;
      currentTdScoreEl.innerHTML = `${onePlayerInfoHash.score}`;
    }*/
  }
}

function createAboutPage() {
  document.querySelector('.buttons-container').style.display = 'none';
  document.querySelector('.about').style.display = 'block';
  document.querySelector('.about input').addEventListener('click', switchToMainPage, false);
}

function errorHandler(jqXHR, StatusStr, ErrorStr) {
  alert(`${StatusStr} ${ErrorStr}`);
}

function pushResult() {
  let playerName = document.getElementById('player-name').value;
  if (playerName === '') {
    playerName = 'unknown';
  }
  if (playerName.length > 10) {
    playerName = playerName.substr(0, 10);
  }
  const newResultHash = { name: `${playerName}`, score: `${Math.floor(myGameArea.frameNo / 10)}` };

  let updatePassword;

  sendMessage();

  function sendMessage() {
    updatePassword = Math.random();
    $.ajax(
      {
        url: 'http://fe.it-academy.by/AjaxStringStorage2.php',
        type: 'POST',
        data: {
          f: 'LOCKGET',
          n: 'CHERNETSKY_RACING_LEADERBOARD',
          p: updatePassword,
        },
        cache: false,
        success: lockGetReady,
        error: errorHandler,
      },
    );
  }
  // to get relevant results array from server
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
    $.ajax(
      {
        url: 'http://fe.it-academy.by/AjaxStringStorage2.php',
        type: 'POST',
        data: {
          f: 'UPDATE',
          n: 'CHERNETSKY_RACING_LEADERBOARD',
          v: JSON.stringify(leaderboardArray),
          p: updatePassword,
        },
        cache: false,
        success: updateReady,
        error: errorHandler,
      },
    );
  }
}

function updateReady(resultH) {
  if (resultH.error != undefined) {
    alert(resultH.error);
  } else {
    document.querySelector('.result-save-window').style.display = 'block';
    document.querySelector('.result-save-window input').addEventListener('click', () => {
      document.querySelector('.result-save-window').style.display = 'none';
    }, false);
  }
}


/* //the code below is necessary only for the first time to push array with some random players and scores to the server

let updatePassword;


function sendMessage() {
  updatePassword = Math.random();
  $.ajax(
      {
        url: "http://fe.it-academy.by/AjaxStringStorage2.php",
        type: 'POST',
        data: {
          f: 'LOCKGET',
          n: 'CHERNETSKY_RACING_LEADERBOARD',
          p: updatePassword
        },
        cache: false,
        success: lockGetReady,
        error: errorHandler
      }
  );
}

function lockGetReady(resultH) {
  if (resultH.error !== undefined)
    alert(resultH.error);
  else {
    if (resultH.result != "") {
      leaderboardArray = [{name: 'maria', score: '800'}, {name: 'christina', score: '789'}, {name: 'francisco', score: '29'}, {name: 'roland', score: '612'}, {name: 'helen', score: '513'}, {name: 'philip', score: '470'}, {name: 'ivan', score: '88'}, {name: 'giovanni', score: '678'}, {name: 'simon', score: '96'}, {name: 'marie', score: '100'}];
      if (!leaderboardArray.length)
        leaderboardArray = [];
    }

    $.ajax(
        {
          url: "http://fe.it-academy.by/AjaxStringStorage2.php",
          type: 'POST',
          data: {
            f: 'UPDATE',
            n: 'CHERNETSKY_RACING_LEADERBOARD',
            v: JSON.stringify(leaderboardArray),
            p: updatePassword
          },
          cache: false,
          success: updateReady,
          error: errorHandler
        }
    );
  }
}

function updateReady(resultH) {
  if (resultH.error != undefined)
    alert(resultH.error);
}

sendMessage(); */
