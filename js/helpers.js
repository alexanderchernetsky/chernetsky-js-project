/** This function is a template for jQuery ajax HTTP request
 *  and helps us to shorten code in spa.js file.
 * @param {function} successFunc - If the request was successful this function would be executed
 * @param {object} data - It's the object with properties that are necessary for the request.
 * @param {string} dataType - type of transferring data.
 * @param {string} url - web address of backend script.
 * @return {undefined}
 * */
function ajaxRequest(successFunc, data, dataType = 'json', url = 'http://fe.it-academy.by/AjaxStringStorage2.php') {
  $.ajax(
    {
      url,
      type: 'POST',
      data,
      cache: false,
      dataType,
      success: successFunc,
      error: errorHandler
    },
  );
}

/**
 * Show error message if ajax request was failed.
 */
function errorHandler(jqXHR, StatusStr, ErrorStr) {
  alert(`${StatusStr} ${ErrorStr}`);
}

/**
 * Ask user if he really want to close the whole browser tab. This function is used
 * with the beforeunload event listener and is active only while user is playing the game.
 * @param {Object} EO - the event object.
 * @return {string} this string is necessary for custom message.
 */
function askUser(EO) {
  EO = EO || window.event;
  const dialogText = 'Do you want to exit the game?';
  EO.returnValue = dialogText;
  return dialogText;
}

/**
 * Would return true for 1, 100, 200 and etc. It defines when we need to create new obstacle.
 * This function is used in game cycle - updateGameArea function.
 * @param {number} frameNo - number of frames (from myGameArea object).
 * @return {boolean} true if frameNo equals 1 or (frameNo / 100) is an integer,
 * a%b returns surplus of the division of 2 operands.
 */
function checkFrameNo(frameNo) {
  return (frameNo === 1) || ((frameNo / 100) % 1 === 0);
}

/**
 * Would return some random x coordinate for obstacles during the game.
 * This function is used in game cycle - updateGameArea function.
 * @param {number} gameAreaWidth - constant from myGameArea object.
 * @param {number} obstacleWidth - width of obstacles.
 * @return {number} random x coordinate of obstacle, which will be created later.
 */
function randomObstacleXCoordinate(gameAreaWidth, obstacleWidth) {
  return Math.floor(Math.random() * (gameAreaWidth - obstacleWidth) + 1);
}

/**
 * Would return array with 10 objects containing scores from the highest to the lowest.
 * This function is used inside createLeaderboard function.
 * @param {Array} arr - we put here leaderboardArray recieved from the server.
 * @return {Array} this prepared array will be used in showLeaderboard function.
 */
function prepareLeaderboardArr(arr) {
  return arr
    .sort((first, second) => ((+first.score <= +second.score) ? 1 : -1))
    .slice(0, 10);
}

/*module.exports.checkFrameNo = checkFrameNo;
module.exports.randomObstacleXCoordinate = randomObstacleXCoordinate;
module.exports.prepareLeaderboardArr = prepareLeaderboardArr;*/
